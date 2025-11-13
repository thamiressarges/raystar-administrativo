import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (sessionError) {
      throw sessionError;
    }

    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("uid", sessionData.user.id)
      .single();

    if (profileError) {
      await supabase.auth.signOut();
      throw new Error("Perfil não encontrado.");
    }

    if (profile.status === 'pending') {
      await supabase.auth.signOut();
      throw new Error("Sua conta está aguardando aprovação.");
    }

    setUser(sessionData.user);
    setUserProfile(profile);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
  }

  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("uid", session.user.id)
          .single();
        
        if (profile && profile.status === 'active') {
          setUser(session.user);
          setUserProfile(profile);
        } else {
          await logout();
        }
      }
      setLoading(false);
    }
    loadUser();

    const { data: { subscription: listener } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserProfile(null);
        } else if (event === 'SIGNED_IN') {
          loadUser();
        }
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isSuperAdmin: userProfile?.permissions?.includes('super_admin'),
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
  const context = useContext(AuthContext);
  return context;
}