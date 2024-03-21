'use client';
import React, { Context, useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeState } from '../types/Theming';
import buildThemeSet, { ThemeInjection } from './BuildThemeSet';
export const ThemeContext: Context<ThemeState> = React.createContext<ThemeState>({
  dark: false,
  colorblind: false,
  mutate: null,
});
export function ThemeWrapper({
  children,
  themeInjection,
  defaultTheme = { dark: false, colorblind: false },
  themeChangeCallback = null,
}: {
  children: any;
  themeInjection: ThemeInjection;
  defaultTheme?: {
    dark?: boolean;
    colorblind?: boolean;
  };
  themeChangeCallback?: any;
}) {
  console.log(`Defaults:`, defaultTheme);
  const [themeState, setThemeState] = useState<ThemeState>({
    dark: defaultTheme.dark,
    colorblind: defaultTheme.colorblind,
    mutate: null,
  });
  const themeSet = useMemo(() => {
    return buildThemeSet(themeInjection);
  }, [themeInjection]);
  useEffect(() => {
    setThemeState({
      dark: defaultTheme.dark,
      colorblind: defaultTheme.colorblind,
      mutate: setThemeState,
    });
  }, [defaultTheme.dark, defaultTheme.colorblind]);
  useEffect(() => {
    if (themeChangeCallback) themeChangeCallback(themeState.dark, themeState.colorblind);
  }, [themeState, themeChangeCallback]);
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
