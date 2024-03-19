import React, { ReactNode } from 'react';
import ThemeWrapper from '../Theming/ThemeWrapper';
import AppWrapper, { PopoutDrawerWrapperProps } from './AppWrapper';
import { ThemeInjection } from '../Theming/BuildThemeSet';

export default function ThemedAppWrapper({
  appWrapperConfig,
  themeConfig,
  children,
}: {
  appWrapperConfig: PopoutDrawerWrapperProps;
  themeConfig: {
    themeInjection: ThemeInjection;
    defaultDark?: boolean;
    defaultColorblind?: boolean;
  };
  children: any;
}) {
  return (
    <ThemeWrapper {...themeConfig}>
      <AppWrapper {...appWrapperConfig}>{children}</AppWrapper>
    </ThemeWrapper>
  );
}
