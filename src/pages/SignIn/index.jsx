import {Container, Form, Options, Background} from './styles';
import {FiMail, FiLock} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';  

import {Input} from '../../components/Input';
import {Button} from '../../components/Button';


export function SignIn(){

    const navigate = useNavigate(); 

    function handleSignIn() {
        navigate('/order'); 
    }

    return(
        <Container>
            
            <Form>
                <h1>RayStar</h1>
                <h2>Faça seu login</h2>

                <Input
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                />

                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                />

                <Options>
                    <label>
                        <input type="checkbox" />
                        Lembrar
                    </label>

                    <Link to="/forgotpassword">Esqueceu a sua senha?</Link>
                </Options>

                <Button title="Entrar" onClick={handleSignIn}/>
            </Form>

            <Background />
        </Container>
    )
}