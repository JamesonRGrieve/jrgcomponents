import { Theme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    colorblind: boolean;
  }
  interface PaletteOptions {
    colorblind?: boolean;
  }
}
export type Themes = {
  light: Theme;
  dark: Theme;
  lightColorblind: Theme;
  darkColorblind: Theme;
};
export type ThemeState = {
  dark: boolean;
  colorblind: boolean;
  mutate: any;
};
