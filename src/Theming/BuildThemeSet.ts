import { SxProps, Theme, createTheme, ThemeOptions } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { Themes } from '../types/Theming';
import NextLinkInjector from './NextLinkInjector';

export type ThemeInjection = {
  theme: ThemeOptions;
  darkPalette?: any;
  colorblindPalette?: any;
};
export default function buildThemeSet({
  theme,
  darkPalette = {},
  colorblindPalette = {
    primary: {
      light: '#CCC',
      main: '#999',
      dark: '#333',
    },
    secondary: { light: '#CCC', main: '#999', dark: '#333' },
  },
}: ThemeInjection): Themes {
  const baseOptions = {
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
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme, ownerState }: { theme: any; ownerState: any }): SxProps => ({
            backgroundColor: theme.palette[ownerState.color][theme.palette.mode],
            color: theme.palette.text.primary,
            borderBottom: '2px solid ' + theme.palette[ownerState.color][theme.palette.mode === 'dark' ? 'light' : 'dark'],
          }),
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
      MuiLink: {
        defaultProps: {
          component: NextLinkInjector,
          href: '/',
        },
        styleOverrides: {
          root: ({ theme }: { theme: Theme }): SxProps => ({
            color: theme.palette.primary[theme.palette.mode === 'dark' ? 'light' : 'dark'],
            textDecorationColor: theme.palette.primary[theme.palette.mode === 'dark' ? 'light' : 'dark'],
            '&:hover': {
              color: theme.palette.secondary[theme.palette.mode === 'dark' ? 'light' : 'dark'],
              textDecorationColor: theme.palette.secondary[theme.palette.mode === 'dark' ? 'light' : 'dark'],
            },
          }),
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: NextLinkInjector,
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
      MuiList: {
        styleOverrides: {
          root: ({ theme }: { theme: Theme }): SxProps => ({
            padding: 0,
          }),
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: ({ theme }: { theme: Theme }): SxProps => ({
            py: 0,
            fontSize: '1.2rem',
          }),
        },
      },
    },
    ...theme,
    palette: {
      ...theme.palette,
      colorblind: false,
    },
  };
  const darkOptions = {
    palette: {
      ...darkPalette,
      mode: 'dark',
    },
  };
  const colorblindOptions = {
    palette: {
      ...colorblindPalette,
      colorblind: true,
    },
  };
  return {
    light: createTheme(baseOptions as ThemeOptions),
    dark: createTheme(deepmerge(baseOptions, darkOptions) as ThemeOptions),
    lightColorblind: createTheme(deepmerge(baseOptions, colorblindOptions) as ThemeOptions),
    darkColorblind: createTheme(deepmerge(deepmerge(baseOptions, darkOptions), colorblindOptions) as ThemeOptions),
  };
}
