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
  default: { dark: defaultDark = false, colorblind: defaultColorblind = false },
  themeChangeCallback = null,
}: {
  children: any;
  themeInjection: ThemeInjection;
  default?: {
    dark?: boolean;
    colorblind?: boolean;
  };
  themeChangeCallback?: any;
}) {
  const [themeState, setThemeState] = useState<ThemeState>({
    dark: defaultDark,
    colorblind: defaultColorblind,
    mutate: null,
  });
  const themeSet = useMemo(() => {
    return buildThemeSet(themeInjection);
  }, [themeInjection]);
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
