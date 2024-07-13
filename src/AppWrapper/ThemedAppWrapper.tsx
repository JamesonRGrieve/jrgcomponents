'use client';
import React from 'react';
import ThemeWrapper from '../Theming/ThemeWrapper';
import { ThemeInjection } from '../Theming/BuildThemeSet';
import AppWrapper, { AppWrapperProps } from './AppWrapper';

export default function ThemedAppWrapper({
  appWrapperConfig,
  themeConfig,
  children,
}: {
  appWrapperConfig?: AppWrapperProps;
  themeConfig: {
    themeInjection: ThemeInjection;
    defaultTheme?: {
      dark: boolean;
      colorblind: boolean;
    };
  };
  children: any;
}) {
  return (
    <ThemeWrapper {...themeConfig}>
      <AppWrapper {...appWrapperConfig}>{children}</AppWrapper>
    </ThemeWrapper>
  );
}
