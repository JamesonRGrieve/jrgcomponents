// Import React.
import React from 'react';

// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component.
import AppWrapperComponent, { AppWrapperProps } from './AppWrapper';
import { Box, Typography } from '@mui/material';
import SwitchDark from '../Theming/SwitchDark';
import SwitchColorblind from '../Theming/SwitchColorblind';
import CenterAlignedBox from '../Layout/CenterAlignedBox';

type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const DoubleMenuSingleLayer: Story = (args: AppWrapperProps) => (
  <AppWrapperComponent {...args}>
    <p>Page Contents</p>
  </AppWrapperComponent>
);
DoubleMenuSingleLayer.args = {
  header: {
    components: {
      center: 'Single Layer Menu',
      left: {
        heading: 'Left Menu',
        swr: null,
        menu: () => {
          return <div>Left Menu Contents</div>;
        },
        width: '20rem',
      },
      right: {
        heading: 'Right Menu',
        swr: null,
        menu: () => {
          return <div>Right Menu Contents</div>;
        },
        width: '20rem',
      },
    },
    height: '3rem',
  },
};
export const DoubleMenuDoubleLayer: Story = (args: any) => (
  <AppWrapperComponent {...args.outer}>
    <AppWrapperComponent {...args.inner}>
      <p>Page Contents</p>
    </AppWrapperComponent>
  </AppWrapperComponent>
);
DoubleMenuDoubleLayer.args = {
  inner: {
    header: {
      components: {
        center: 'Inner Popout Menu',
        left: {
          heading: 'Inner Left Menu',
          swr: null,
          menu: () => {
            return <div>Inner Left Menu Contents</div>;
          },
          width: '20rem',
        },
        right: {
          heading: 'Inner Right Menu',
          swr: null,
          menu: () => {
            return <div>Inner Right Menu Contents</div>;
          },
          width: '20rem',
        },
      },
      height: '3rem',
      inner: true,
    },
  },
  outer: {
    header: {
      components: {
        center: (
          <CenterAlignedBox
            center={
              <Typography variant='h6' component='h1' textAlign='center' height='100%'>
                Outer Popout Menu
              </Typography>
            }
            right={
              <>
                <SwitchDark />
                <SwitchColorblind />
              </>
            }
          />
        ),

        left: {
          heading: 'Outer Left Menu',
          swr: null,
          menu: () => {
            return <div>Outer Left Menu Contents</div>;
          },
          width: '20rem',
        },
        right: {
          heading: 'Outer Right Menu',
          swr: null,
          menu: () => {
            return <div>Outer Right Menu Contents</div>;
          },
          width: '20rem',
        },
      },
      height: '3rem',
    },
    footer: {
      components: {
        center: (
          <Typography key='by' variant='h6' component='p' textAlign='center' height='100%'>
            Created by Jameson Grieve
          </Typography>
        ),
      },
      height: '2rem',
    },
  },
};
// Configure Metadata.
const meta: Meta = {
  title: 'Application/AppWrapper',
  component: AppWrapperComponent,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A Double-Sided Popout Menu',
    docs: {
      description: {
        component: 'Provides an app bar with popout menus on either side.',
      },
    },
    references: [],
    argTypes: {
      title: { control: 'text' },
    },
    layout: 'fullscren',
  },
} satisfies Meta<typeof AppWrapperComponent>;
export default meta;
