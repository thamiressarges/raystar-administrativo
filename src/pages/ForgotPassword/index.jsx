import {Container, Form, Background} from './styles';
import {FiLock} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {Input} from '../../components/Input';
import {Button} from '../../components/Button';


export function ForgotPassword(){
    return(
        <Container>
            
            <Form>
                <h1>RayStar</h1>
                <h2>Recuperar Senha</h2>

                <p>Para recuperar sua senha, digite o seu email abaixo.</p>
                <p>Iremos enviar um link para você acessar e criar uma nova senha.</p>

                <Input
                    placeholder="Senha"
                    type="text"
                    icon={FiLock}
                />

                <Button title="Recuperar Senha"/>

                <Link to="/">Voltar</Link>
            </Form>

            <Background />
        </Container>
    )
}