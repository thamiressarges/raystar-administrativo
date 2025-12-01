import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { UserApi } from '../services/userApi';
import { loginSchema, signUpSchema } from '../utils/schemas';

export function useAuthForms() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const loginForm = useForm({
        resolver: zodResolver(loginSchema)
    });

    const signUpForm = useForm({
        resolver: zodResolver(signUpSchema)
    });

    const toggleView = (isLogin) => {
        setIsLoginView(isLogin);
        loginForm.reset();
        signUpForm.reset();
    };

    const handleLoginSubmit = async (data) => {
        setLoading(true);
        try {
            await login(data.email, data.password);
            toast.success("Login realizado com sucesso!");
            navigate("/order");
        } catch (error) {
            console.error(error);
            let msg = "Erro ao fazer login.";
            if (error.message.includes("Invalid login")) msg = "E-mail ou senha incorretos.";
            if (error.message.includes("inativa")) msg = error.message;
            if (error.message.includes("aguardando aprovação")) msg = error.message;
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpSubmit = async (data) => {
        setLoading(true);
        try {
            await UserApi.signUp({
                email: data.email,
                password: data.password,
                name: data.name
            });
            toast.success("Solicitação enviada! Aguarde aprovação do administrador.");
            toggleView(true); 
        } catch (error) {
            console.error(error);
            let msg = error.message;
            if (msg.includes("already registered")) msg = "Este e-mail já está cadastrado.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return {
        isLoginView,
        toggleView,
        loading,
        loginRegister: loginForm.register,
        loginErrors: loginForm.formState.errors,
        signUpRegister: signUpForm.register,
        signUpErrors: signUpForm.formState.errors,
        submitLogin: loginForm.handleSubmit(handleLoginSubmit),
        submitSignUp: signUpForm.handleSubmit(handleSignUpSubmit)
    };
}