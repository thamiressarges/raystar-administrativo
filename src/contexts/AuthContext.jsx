import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { USER_ROLES } from "../utils/constants";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (sessionError) {
      throw sessionError;
    }

    const authUser = sessionData.user;
    if (!authUser) {
      throw new Error("Erro inesperado: usuário não retornado.");
    }

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("uid", authUser.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      throw new Error("Perfil não encontrado.");
    }

    if (profile.status !== "active" || profile.is_deleted) {
      await supabase.auth.signOut();
      throw new Error("Sua conta foi desativada ou excluída.");
    }

    setUser(authUser);
    setUserProfile(profile);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
  }

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("uid", session.user.id)
          .single();

        if (profile && profile.status === "active" && !profile.is_deleted) {
          setUser(session.user);
          setUserProfile(profile);
        } else {
          await logout();
        }
      }

      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        setUserProfile(null);
      } else if (event === "SIGNED_IN") {
        loadUser();
      }
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isSuperAdmin: userProfile?.permissions?.includes(USER_ROLES.SUPER_ADMIN),
        isAdmin: userProfile?.permissions?.includes(USER_ROLES.ADMIN),
        isClient: userProfile?.permissions?.includes(USER_ROLES.CLIENT),

        login,
        logout,
        loading,
        supabase,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}