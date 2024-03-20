import type { Preview } from '@storybook/react';
import { useCallback, useEffect, useMemo } from 'react';
import buildThemeSet from '../src/Theming/BuildThemeSet';
import ThemeWrapper from '../src/Theming/ThemeWrapper';
import theme from '../src/Theming/sample-theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import ReferenceGrid from '../src/Storybook/ReferenceGrid';
import ComparisonGrid from '../src/Storybook/ComparisonGrid';

export const globalTypes = {
  theme: {
    name: 'Default Theme',
    title: 'Default Theme',
    description: 'The theme that stories will start in. Changing this will also change the theme live.',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'light', left: '☀️🌈', title: 'Light Mode' },
        { value: 'lightColorblind', left: '☀️🩶', title: 'Light Colorblind Mode' },
        { value: 'dark', left: '🌙🌈', title: 'Dark Mode' },
        { value: 'darkColorblind', left: '🌙🩶', title: 'Dark Colorblind Mode' },
      ],
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ComparisonGrid />
          <ReferenceGrid />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export const withTheme = (Story: any, context: any) => {
  const { theme: themeKey } = context.globals;

  // Only recompute the theme if the themeKey changes.
  // const theme = useMemo(() => themes[themeKey as keyof typeof themes] || themes['light'], [themeKey]);

  const themeChange = useCallback((dark, colorblind) => {
    context.globals.theme = `${dark ? 'dark' : 'light'}${colorblind ? 'Colorblind' : ''}`;
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      }}
    >
      <ThemeWrapper
        themeInjection={{ theme: theme }}
        default={{ dark: themeKey.includes('dark'), colorblind: themeKey.includes('Colorblind') }}
        themeChangeCallback={themeChange}
      >
        <Story />
      </ThemeWrapper>
    </div>
  );
  /*
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    </ThemeProvider>

  );
  */
};
export default preview;
export const decorators = [withTheme];
