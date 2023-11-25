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
export const PopoutDrawerWrapper: Story = (args: PopoutDrawerWrapperProps) => (
  <Box>
    <PopoutDrawerWrapperComponent {...args}>
      <p>Page Contents</p>
    </PopoutDrawerWrapperComponent>
  </Box>
);
PopoutDrawerWrapper.args = {
  title: 'Popout Menu',
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
