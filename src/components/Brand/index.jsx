import { Container } from './styles';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useMenu } from '../../contexts/MenuContext';

export function Brand(){
    const { isMenuOpen, toggleMenu } = useMenu();

    return(
        <Container $isopen={isMenuOpen}>
            {isMenuOpen && <h1>RayStar</h1>}
            
            <button onClick={toggleMenu}>
                {isMenuOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </button>
        </Container>
    )
}
