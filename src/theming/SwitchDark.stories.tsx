// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import SwitchDarkComponent from './SwitchDark';
import React from 'react';
// Configure Metadata.
const meta: Meta = {
  title: 'Styled/Switch/Dark',
  component: SwitchDarkComponent,
  tags: ['autodocs'],
  argTypes: {
  },
  parameters: {
    componentSubtitle: 'A Sample Component',
    docs: {
      description: {
        component: 'This component is meant to illustrate how to effectively document components.'
      }
    },
    references: []
  }
};
export default meta;
type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const SwitchDark: Story = (args: any) => <SwitchDarkComponent {...args} />;
SwitchDark.args = {};

