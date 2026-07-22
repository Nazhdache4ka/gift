import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },

  colorSchemes: {
    light: true,

    dark: {
      palette: {
        primary: {
          main: '#a78bfa',
          light: '#c4b5fd',
          dark: '#7c3aed',
          contrastText: '#18181b',
        },
        secondary: {
          main: '#f472b6',
        },
        background: {
          default: '#18181b',
          paper: '#27272a',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
        },
        divider: '#3f3f46',
      },
    },
  },

  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: { fontFamily: '"Comfortaa", sans-serif' },
    h2: { fontFamily: '"Comfortaa", sans-serif' },
    h3: { fontFamily: '"Comfortaa", sans-serif' },
    body1: { fontFamily: '"Comfortaa", sans-serif' },
  },
});
