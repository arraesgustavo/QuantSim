import { createTheme } from '@mui/material/styles';

// Configurações comuns que podem ser compartilhadas entre os temas
const commonSettings = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  shape: {
    borderRadius: 8, // Bordas um pouco mais arredondadas
  },
};

// Tema Claro (Light)
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#673ab7', // Roxo
    },
    secondary: {
      main: '#ff9100', // Laranja
    },
    background: {
      default: '#f4f5f7', // Um cinza bem claro
      paper: '#ffffff',
    },
  },
  ...commonSettings,
});

// Tema Escuro (Dark)
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b39ddb', // Roxo mais claro
    },
    secondary: {
      main: '#ffc947', // Laranja mais claro
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  ...commonSettings,
});
