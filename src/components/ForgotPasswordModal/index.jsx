import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiMail, FiX } from 'react-icons/fi';

import { supabase } from '../../services/supabase';
import { Input } from '../Input';
import { Button } from '../Button';
import { Overlay, ModalContainer } from './styles';

export function ForgotPasswordModal({ onClose }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRecoverPassword() {
        if (!email) {
            return toast.warn("Por favor, digite seu e-mail.");
        }

        setLoading(true);
        try {
            const redirectUrl = `${window.location.origin}/reset-password`;

            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: redirectUrl,
            });

            if (error) throw error;

            toast.success("E-mail enviado! Verifique sua caixa de entrada.");
            onClose(); 
        } catch (error) {
            console.error("Erro ao recuperar senha:", error);
            toast.error("Erro ao enviar e-mail. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
            <ModalContainer>
                <header>
                    <h2>Recuperar Senha</h2>
                    <button type="button" onClick={onClose} title="Fechar">
                        <FiX />
                    </button>
                </header>

                <p>
                    Digite o e-mail associado à sua conta e enviaremos um link 
                    para você redefinir sua senha.
                </p>

                <div>
                    <Input
                        placeholder="E-mail"
                        type="email"
                        icon={FiMail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    
                    <Button 
                        title={loading ? "Enviando..." : "Enviar Link de Recuperação"} 
                        onClick={handleRecoverPassword}
                        disabled={loading}
                    />
                </div>
            </ModalContainer>
        </Overlay>
    );
}