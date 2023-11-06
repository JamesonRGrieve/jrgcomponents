// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// Import Component and related types.
import ButtonWithIconComponent, { ButtonWithIconProps } from './ButtonWithIcon';
import { Delete } from '@mui/icons-material';

type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const ButtonWithIcon: Story = (args: ButtonWithIconProps) => <ButtonWithIconComponent {...args} />;
ButtonWithIcon.args = {
  label: 'Button Label',
  icon: <Delete />,
  action: () => {}
};

// Configure Metadata.
const meta: Meta = {
  title: 'Components/ButtonWithIcon',
  component: ButtonWithIconComponent,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    bodyText: { control: 'text' },
    buttonText: { control: 'text' }
  },
  parameters: {
    componentSubtitle: 'A ButtonWithIcon Component',
    docs: {
      description: {
        component: 'This component is meant to illustrate how to effectively document components.'
      }
    },
    references: []
  }
};
export default meta;