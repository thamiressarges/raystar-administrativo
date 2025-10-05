import {Container, Form, Options, Background} from './styles';
import {FiMail, FiLock} from 'react-icons/fi';

import {Input} from '../../components/Input';
import {Button} from '../../components/Button';


export function SignIn(){
    return(
        <Container>
            
            <Form>
                <h1>RayStar</h1>
                <h2>Faça seu login</h2>

                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                />

                <Input
                    placeholder="Senha"
                    type="text"
                    icon={FiLock}
                />

                <Options>
                    <label>
                        <input type="checkbox" />
                        Lembrar
                    </label>

                    <a href="#">Esqueceu a sua senha?</a>
                </Options>

                <Button title="Entrar"/>
            </Form>

            <Background />
        </Container>
    )
}