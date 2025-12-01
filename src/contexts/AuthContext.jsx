import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------
  //        LOGIN
  // -----------------------
  async function login(email, password) {
    // 1. Login no Supabase Auth
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

    // 2. Buscar no banco (tabela users)
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("uid", authUser.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      throw new Error("Perfil não encontrado.");
    }

    // 3. VALIDAÇÕES DO NOVO SCHEMA
    if (profile.status !== "active") {
      await supabase.auth.signOut();
      throw new Error("Sua conta está inativa.");
    }

    // Tudo certo → logar
    setUser(authUser);
    setUserProfile(profile);
  }

  // -----------------------
  //        LOGOUT
  // -----------------------
  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
  }

  // -----------------------
  //    PERSISTÊNCIA LOGIN
  // -----------------------
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

        if (profile?.status === "active") {
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
        // permissões agora são ENUMS: 'admin', 'super_admin', 'client'
        isSuperAdmin: userProfile?.permissions?.includes("super_admin"),
        isAdmin: userProfile?.permissions?.includes("admin"),
        isClient: userProfile?.permissions?.includes("client"),

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
