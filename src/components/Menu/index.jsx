import { Container, MenuList } from './styles';
import { MenuItem } from '../MenuItem';
import { useMenu } from '../../contexts/MenuContext';

import { 
    FaFileAlt, FaUsers, FaFolder, 
    FaShoppingCart, FaCog, FaUser 
} from 'react-icons/fa';

export function Menu(){
    const { isMenuOpen } = useMenu();

    return(
        <Container $isopen={isMenuOpen}>
            <MenuList>
                <li><MenuItem title="Pedidos" icon={<FaFileAlt/>} to={'/order'} isMenuOpen={isMenuOpen}/></li>
                <li><MenuItem title="Clientes" icon={<FaUsers/>} to={'/clients'} isMenuOpen={isMenuOpen}/></li>
                <li><MenuItem title="Categorias" icon={<FaFolder/>} to={'/category'} isMenuOpen={isMenuOpen}/></li>
                <li><MenuItem title="Produtos" icon={<FaShoppingCart/>} to={'/products'} isMenuOpen={isMenuOpen}/></li>
                <li><MenuItem title="Configurações" icon={<FaCog/>} to={'/settings'} isMenuOpen={isMenuOpen}/></li>
                <li><MenuItem title="Perfil" icon={<FaUser/>} to={'/profile'} isMenuOpen={isMenuOpen}/></li>
            </MenuList>
        </Container>
    )
}
