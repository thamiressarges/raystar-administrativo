import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { MenuProvider } from './contexts/MenuContext';
import { theme } from './styles/theme';
import GlobalStyle from './styles/global';
import { Routes } from './pages/routes';
import { Toast } from "./components/Toast";

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}> 
      <GlobalStyle /> 
      <MenuProvider>
        <Toast /> 
        <Routes />
      </MenuProvider>
    </ThemeProvider>
  </StrictMode>,
);
