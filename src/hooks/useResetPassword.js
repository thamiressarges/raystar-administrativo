import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../services/supabase';
import { UserApi } from '../services/userApi';

export function useResetPassword() {
    const navigate = useNavigate();
    const [isSessionValid, setIsSessionValid] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setIsSessionValid(true);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
                setIsSessionValid(true);
            }
            if (event === "SIGNED_OUT") {
                setIsSessionValid(false);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, []);

    const resetPassword = async ({ password }) => {
        if (!isSessionValid) {
            toast.error("Sessão expirada. Solicite um novo link de recuperação.");
            return;
        }

        setLoading(true);
        try {
            await UserApi.updatePassword(password);
            toast.success("Senha atualizada com sucesso!");
            
            await supabase.auth.signOut();
            navigate("/"); 

        } catch (error) {
            console.error(error);
            toast.error("Não foi possível atualizar a senha. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return {
        isSessionValid,
        loading,
        resetPassword
    };
}