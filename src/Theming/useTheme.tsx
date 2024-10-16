'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useState } from 'react';

const defaultThemes = ['default', 'dark', 'colorblind', 'colorblind-dark'];

export const useTheme = (customThemes?: string[]) => {
  const [themes, setThemes] = useState(() => {
    return Array.from(new Set([...defaultThemes, ...(customThemes ?? [])]));
  });
  const [currentTheme, setCurrentTheme] = useState(() => {
    return getCookie('theme')?.toString() ?? 'default';
  });

  const setTheme = (newTheme: string) => {
    const classList = document.body.classList;
    classList.remove(...themes);
    classList.add(newTheme);

    setCookie('theme', newTheme, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    });

    setCurrentTheme(newTheme);
  };

  return {
    themes,
    currentTheme,
    setThemes,
    setTheme,
  };
};
