import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Container, Form, Background } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { supabase } from '../../services/supabase'; 

export function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSessionValid, setIsSessionValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setIsSessionValid(true);
            }
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

    async function handleResetPassword(e) {
        e.preventDefault();

        if (!password || !confirmPassword) {
            return toast.warn("Por favor, preencha os dois campos de senha.");
        }

        if (password !== confirmPassword) {
            return toast.warn("As senhas não coincidem.");
        }

        if (password.length < 6) {
            return toast.warn("A senha deve ter no mínimo 6 caracteres.");
        }

        if (!isSessionValid) {
            return toast.error("Sessão expirada ou inválida. Solicite um novo e-mail de recuperação.");
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            toast.success("Senha atualizada com sucesso!");
            
            await supabase.auth.signOut();
            navigate("/"); 

        } catch (error) {
            console.error(error);
            toast.error("Não foi possível atualizar a senha. Tente solicitar o e-mail novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Form>
                <h1>RayStar</h1>
                <h2>Criar Nova Senha</h2>

                <p>Digite e confirme sua nova senha abaixo.</p>

                <Input
                    placeholder="Nova Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Input
                    placeholder="Confirmar Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setConfirmPassword(e.target.value)}
                />

                <Button 
                    title={loading ? "Salvando..." : "Salvar"} 
                    onClick={handleResetPassword}
                    disabled={loading || !isSessionValid}
                />
            </Form>

            <Background />
        </Container>
    );
}