import { createContext, useContext, useEffect, useState } from "react";
// 1. IMPORTAÇÃO CORRETA: Traz o 'auth' do seu novo arquivo supabase.js
import { auth } from "../services/supabase"; 
// 2. REMOÇÃO: Não precisamos mais do firebase
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../firebase";

// Criando o contexto
const AuthContext = createContext();

// Criando um hook para usar o contexto
export function useAuth() {
  return useContext(AuthContext);
}

// Criando o provider para gerenciar o estado global
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null); // Supabase usa 'session'
  const [loading, setLoading] = useState(true);

  // Observando o estado no SUPABASE
  useEffect(() => {
    setLoading(true);
    
    // 3. OBTÉM SESSÃO ATUAL: Pega a sessão se o usuário já estiver logado
    auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 4. OBSERVA MUDANÇAS: Ouve eventos de LOGIN e LOGOUT
    const { data: authListener } = auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Limpa o "ouvinte"
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 5. FUNÇÃO DE LOGIN: Centralizada no Contexto
  const login = async (email, password) => {
    const { data, error } = await auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error; // Joga o erro para a página de SignIn tratar
    return data;
  };

  // 6. FUNÇÃO DE LOGOUT: Migrada
  const logout = () => auth.signOut();

  const value = {
    user,
    session, // Exporte a sessão, é útil
    login,   // Exporte a função de login
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}