import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiLock } from 'react-icons/fi';

import { Container, Form, Background, ErrorText } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { useResetPassword } from '../../hooks/useResetPassword';
import { resetPasswordSchema } from '../../utils/schemas';

export function ResetPassword() {
    const { isSessionValid, loading, resetPassword } = useResetPassword();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(resetPasswordSchema)
    });

    return (
        <Container>
            <Form onSubmit={handleSubmit(resetPassword)}>
                <h1>RayStar</h1>
                <h2>Criar Nova Senha</h2>

                <p>Digite e confirme sua nova senha abaixo.</p>

                <div style={{ width: '100%', marginBottom: 12 }}>
                    <Input
                        placeholder="Nova Senha"
                        type="password"
                        icon={FiLock}
                        {...register("password")}
                    />
                    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                </div>

                <div style={{ width: '100%', marginBottom: 12 }}>
                    <Input
                        placeholder="Confirmar Senha"
                        type="password"
                        icon={FiLock}
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
                </div>

                <Button 
                    title={loading ? "Salvando..." : "Salvar"} 
                    type="submit"
                    disabled={loading || !isSessionValid}
                />
            </Form>

            <Background />
        </Container>
    );
}