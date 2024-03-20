'use client';
// Font Import Example
import { Roboto_Mono } from 'next/font/google';
const roboto = Roboto_Mono({ subsets: ['latin'] });

const theme = {
  // Anything that you override from here https://mui.com/material-ui/customization/dark-mode/ needs to also be overridden in dark or it won't be applied.
  palette: {
    primary: {
      light: '#B1C7F3',
      main: '#527BCB',
      dark: '#1D3461',
    },
    secondary: {
      light: '#A1E3B7',
      main: '#52CB7B',
      dark: '#1D6134',
    },
  },
  typography: {
    fontFamily: `${roboto.style.fontFamily}, Arial, sans-serif`,
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      '@media (min-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      fontWeight: 'bold',
      fontSize: '14px',
    },
  },
};
export default theme;
