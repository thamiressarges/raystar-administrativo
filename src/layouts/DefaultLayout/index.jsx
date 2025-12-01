import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Brand } from "../../components/Brand";
import { Menu } from "../../components/Menu";
import { useMenu } from "../../contexts/MenuContext";
import { LayoutContainer, ContentWrapper } from "./styles";

export function DefaultLayout() {
  const { isMenuOpen } = useMenu();

  return (
    <LayoutContainer $isopen={isMenuOpen}>
      <Brand />
      <Header />
      <Menu />
      
      <ContentWrapper>
        <Outlet /> 
      </ContentWrapper>
    </LayoutContainer>
  );
}