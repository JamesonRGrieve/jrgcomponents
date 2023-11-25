'use client';
import { darken, lighten } from '@mui/material';
import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
// Replace with import { Themes } from 'jrgcomponents/types/Theming';
import { Themes } from '../types/Theming';
// Uncomment this if you need to reference the default theme in overrides.
//const defaultTheme = createTheme();
const palette = {
  colorblind: false,
  primary: {
    main: '#273043'
  },
  secondary: {
    main: '#9c27b0'
  },
  error: {
    main: '#d32f2f'
  },
  warning: {
    main: '#ed6c02'
  },
  info: {
    main: '#0288d1'
  },
  success: {
    main: '#2e7d32'
  }
};

const baseTheme = {
  //Components
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          fontSize: '14px',
          fontFamily: 'Encode Sans Semi Expanded, Arial, sans-serif',
          textTransform: 'capitalize' as const
        },
        outlined: {
          backgroundColor: palette.primary.main,
          color: 'white',
          '&:hover': {
            backgroundColor: lighten(palette.primary.main, 0.1)
          },
          '&:disabled': {
            backgroundColor: '#000000',
            color: '#666666'
          }
        }
      }
    }
  },
  palette: {
    ...palette
  },
  typography: {
    fontFamily: 'Ubuntu Mono, sans-serif'
  }
};
const darkOverrides = {
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundColor: darken(palette.primary.main, 0.4),
          '&:hover': {
            backgroundColor: darken(palette.primary.main, 0.3)
          }
        }
      }
    }
  },
  palette: {
    mode: 'dark',
    background: {
      paper: darken(palette.primary.main, 0.4)
    }
  }
};

const colorblindOverrides = {
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundColor: '#333',
          '&:hover': {
            backgroundColor: '#333'
          }
        }
      }
    }
  },
  palette: {
    colorblind: true,
    primary: {
      light: '#CCC',
      main: '#999',
      dark: '#333'
    },
    secondary: {
      light: '#CCC',
      main: '#999',
      dark: '#333'
    },
    error: {
      main: '#AAA'
    },
    warning: {
      main: '#AAA'
    },
    info: {
      main: '#AAA'
    },
    success: {
      main: '#AAA'
    },
    background: {
      paper: '#333'
    }
  }
};
export const themeLight = createTheme(baseTheme);
export const themeDark = createTheme(deepmerge(baseTheme, darkOverrides));
export const themeLightColorblind = createTheme(deepmerge(baseTheme, colorblindOverrides));
export const themeDarkColorblind = createTheme(deepmerge(deepmerge(baseTheme, darkOverrides), colorblindOverrides));
const themes = {
  light: themeLight,
  dark: themeDark,
  lightColorblind: themeLightColorblind,
  darkColorblind: themeDarkColorblind
} as Themes;
export default themes;
