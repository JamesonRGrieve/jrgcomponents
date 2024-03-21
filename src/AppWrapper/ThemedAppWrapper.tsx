import React, { ReactNode } from 'react';
import ThemeWrapper from '../Theming/ThemeWrapper';
import AppWrapper, { AppWrapperProps } from './AppWrapper';
import { ThemeInjection } from '../Theming/BuildThemeSet';

export default function ThemedAppWrapper({
  appWrapperConfig,
  themeConfig,
  children,
}: {
  appWrapperConfig: AppWrapperProps;
  themeConfig: {
    themeInjection: ThemeInjection;
    defaultTheme: {
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
