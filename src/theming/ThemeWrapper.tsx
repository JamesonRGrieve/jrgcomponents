"use client";
import React, { Context, useState } from "react";
import { ThemeState, Themes } from "../types/Theming";
import { CssBaseline, ThemeProvider } from "@mui/material";
export const ThemeContext: Context<ThemeState> = React.createContext<ThemeState>({
  dark: false,
  colorblind: false,
  mutate: null
});
export function ThemeWrapper({ children, themes, defaultDark = false, defaultColorblind = false }: { children: any, themes: Themes, defaultDark?: boolean, defaultColorblind?: boolean }) {
    const [themeState, setThemeState] = useState<ThemeState>({
      dark: defaultDark,
      colorblind: defaultColorblind,
      mutate: null
    });
    return (
      <ThemeContext.Provider value={{ ...themeState, mutate: setThemeState }}>
        <ThemeProvider theme={
          !themeState.dark ?
            // Light Themes
            (!themeState.colorblind ? themes.light : themes.lightColorblind) :
            // Dark Themes
            (!themeState.colorblind ? themes.dark : themes.darkColorblind)
        }>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    );
  }
  export default ThemeWrapper;