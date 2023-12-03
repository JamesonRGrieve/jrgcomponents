// Import React.
import React from 'react';

// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component.
import PopoutDrawerWrapperComponent, {
  PopoutDrawerWrapperProps
} from './PopoutDrawerWrapper';
import { Box } from '@mui/material';

type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const DoubleMenuSingleLayer: Story = (
  args: PopoutDrawerWrapperProps
) => (
  <PopoutDrawerWrapperComponent {...args}>
    <p>Page Contents</p>
  </PopoutDrawerWrapperComponent>
);
DoubleMenuSingleLayer.args = {
  title: 'Menus/Popout Menu',
  left: {
    heading: 'Left Menu',
    swr: null,
    menu: () => {
      return <div>Left Menu Contents</div>;
    },
    width: '20rem'
  },
  right: {
    heading: 'Right Menu',
    swr: null,
    menu: () => {
      return <div>Left Menu Contents</div>;
    },
    width: '20rem'
  },
  height: '3rem'
};
export const DoubleMenuDoubleLayer: Story = (args: any) => (
  <PopoutDrawerWrapperComponent {...args.outer}>
    <PopoutDrawerWrapperComponent {...args.inner}>
      <p>Page Contents</p>
    </PopoutDrawerWrapperComponent>
  </PopoutDrawerWrapperComponent>
);
DoubleMenuDoubleLayer.args = {
  inner: {
    title: 'Inner Popout Menu',
    left: {
      heading: 'Inner Left Menu',
      swr: null,
      menu: () => {
        return <div>Inner Left Menu Contents</div>;
      },
      width: '20rem'
    },
    right: {
      heading: 'Inner Right Menu',
      swr: null,
      menu: () => {
        return <div>Inner Right Menu Contents</div>;
      },
      width: '20rem'
    },
    height: '3rem',
    topOffset: '3rem'
  },
  outer: {
    title: 'Outer Popout Menu',
    left: {
      heading: 'Outer Left Menu',
      swr: null,
      menu: () => {
        return <div>Outer Left Menu Contents</div>;
      },
      width: '20rem'
    },
    right: {
      heading: 'Outer Right Menu',
      swr: null,
      menu: () => {
        return <div>Outer Right Menu Contents</div>;
      },
      width: '20rem'
    },
    height: '3rem'
  }
};
// Configure Metadata.
const meta: Meta = {
  title: 'Popout Menu',
  component: PopoutDrawerWrapperComponent,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A Double-Sided Popout Menu',
    docs: {
      description: {
        component: 'Provides an app bar with popout menus on either side.'
      }
    },
    references: [],
    argTypes: {
      title: { control: 'text' }
    },
    layout: 'fullscren'
  }
} satisfies Meta<typeof PopoutDrawerWrapperComponent>;
export default meta;
