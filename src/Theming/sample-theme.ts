'use client';
import { SxProps, Theme, createTheme, ThemeOptions } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { Themes } from '../types/Theming';
// For Injecting Next Link Behaviour Into MUI Links
import NextLinkInjector from './NextLinkInjector';
// Font Import Example
import { Roboto_Mono } from 'next/font/google';
const roboto = Roboto_Mono({ subsets: ['latin'] });

const baseTheme = {
  //Components
  components: {
    MuiButton: {
      styleOverrides: {
        root: (props: { theme: any; ownerState: any }): SxProps => {
          return {
            fontWeight: 'bold',
            fontSize: '14px',
            textTransform: 'capitalize' as const,
            // Bind Text Colour To Normal Text
            color: props.theme.palette.text.primary,
            // Change Buttons Between Light and Dark Variants with Theme
            backgroundColor: props.theme.palette[props.ownerState.color][props.theme.palette.mode],
          };
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: ({ theme }: { theme: Theme }): SxProps => ({
          color: theme.palette.text.primary,
        }),
        body1: {
          margin: '1rem 0',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme, ownerState }: { theme: any; ownerState: any }): SxProps => ({
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette[ownerState?.color ?? 'primary'][theme.palette.mode === 'dark' ? 'light' : 'dark'],
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette[ownerState?.color ?? 'primary'][theme.palette.mode === 'dark' ? 'light' : 'dark'],
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme, ownerState }: { theme: any; ownerState: any }): SxProps => ({
          '&.Mui-focused': {
            color: theme.palette[ownerState?.color ?? 'primary'][theme.palette.mode === 'dark' ? 'light' : 'dark'],
          },
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }): SxProps => ({
          backgroundColor: theme.palette.primary[theme.palette.mode],
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme, ownerState }: { theme: any; ownerState: any }): SxProps => ({
          color: Object.keys(theme.palette).includes(ownerState?.color)
            ? theme.palette[ownerState?.color ?? 'primary'][theme.palette.mode === 'dark' ? 'light' : 'dark']
            : ownerState.color,
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        component: NextLinkInjector,
        href: '/',
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: NextLinkInjector,
      },
    },
  },
  // Anything that you override from here https://mui.com/material-ui/customization/dark-mode/ needs to also be overridden in dark or it won't be applied.
  palette: {
    colorblind: false,
    primary: {
      light: '#F00',
      main: '#C00',
      dark: '#900',
    },
    secondary: {
      light: '#0F0',
      main: '#0C0',
      dark: '#090',
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
const darkOverrides = {
  palette: {
    mode: 'dark',
  },
};
const colorblindPalette = {
  light: '#CCC',
  main: '#999',
  dark: '#333',
};
const colorblindOverrides = {
  palette: {
    colorblind: true,
    primary: {
      ...colorblindPalette,
    },
    secondary: {
      ...colorblindPalette,
    },
  },
};
export const themeLight = createTheme(baseTheme as ThemeOptions);
export const themeDark = createTheme(deepmerge(baseTheme, darkOverrides) as ThemeOptions);
export const themeLightColorblind = createTheme(deepmerge(baseTheme, colorblindOverrides) as ThemeOptions);
export const themeDarkColorblind = createTheme(
  deepmerge(deepmerge(baseTheme, darkOverrides), colorblindOverrides) as ThemeOptions,
);
const themes = {
  light: themeLight,
  dark: themeDark,
  lightColorblind: themeLightColorblind,
  darkColorblind: themeDarkColorblind,
} as Themes;
export default themes;
