'use client';
import React, { Context, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeState, Themes } from '../types/Theming';
import buildThemeSet, { ThemeInjection } from './BuildThemeSet';
export const ThemeContext: Context<ThemeState> = React.createContext<ThemeState>({
  dark: false,
  colorblind: false,
  mutate: null,
});
export function ThemeWrapper({
  children,
  themeInjection,
  defaultDark = false,
  defaultColorblind = false,
}: {
  children: any;
  themeInjection: ThemeInjection;
  defaultDark?: boolean;
  defaultColorblind?: boolean;
}) {
  const [themeState, setThemeState] = useState<ThemeState>({
    dark: defaultDark,
    colorblind: defaultColorblind,
    mutate: null,
  });
  const themeSet = useMemo(() => {
    return buildThemeSet(themeInjection);
  }, [themeInjection]);
  return (
    <ThemeContext.Provider value={{ ...themeState, mutate: setThemeState }}>
      <ThemeProvider
        theme={
          !themeState.dark
            ? // Light Themes
              !themeState.colorblind
              ? themeSet.light
              : themeSet.lightColorblind
            : // Dark Themes
              !themeState.colorblind
              ? themeSet.dark
              : themeSet.darkColorblind
        }
      >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
export default ThemeWrapper;
