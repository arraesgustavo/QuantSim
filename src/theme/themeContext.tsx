import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

// Define o tipo de dados que o nosso contexto irá fornecer
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

// Cria o contexto com um valor padrão
const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {}, // Função vazia como padrão
});

// Hook customizado para facilitar o uso do nosso contexto
export const useThemeMode = () => useContext(ThemeContext);

// O componente Provedor que irá envolver nossa aplicação
export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // O estado 'isDark' começa lendo a preferência do usuário no localStorage
  const [isDark, setIsDark] = useState(() => {
    try {
      const storedPreference = localStorage.getItem('themeMode');
      return storedPreference === 'dark';
    } catch (error) {
      return false; // Retorna false em caso de erro (ex: SSR)
    }
  });

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDark((prevIsDark) => {
      const nextTheme = !prevIsDark;
      localStorage.setItem('themeMode', nextTheme ? 'dark' : 'light');
      return nextTheme;
    });
  };

  // O useMemo garante que o objeto de tema só seja recriado se 'isDark' mudar
  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline reseta os estilos CSS e aplica cores de fundo do tema */}
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
