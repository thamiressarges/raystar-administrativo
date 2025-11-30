import { Item } from "./styles";
import { Link } from "react-router-dom";

export function MenuItem({ title, icon, to, isMenuOpen }) {
    return(
        <Item as={Link} to={to} $isopen={isMenuOpen}>
            {icon}
            {isMenuOpen && <span>{title}</span>}
        </Item>
    )
}