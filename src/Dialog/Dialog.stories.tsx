// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// Import Component and related types.
import DialogComponent, { DialogProps } from './Dialog';
import React, { Component } from 'react';
import { Button } from '@mui/material';
// Configure Metadata.
const meta: Meta = {
  title: 'Dialog/Dialog',
  component: DialogComponent,

  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A Sample Component',
    docs: {
      description: {
        component: 'This component is meant to illustrate how to effectively document components.',
      },
    },
    references: [],
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const Dialog: Story = (args: DialogProps) => <DialogComponent {...args} />;
Dialog.args = {
  onClose: action('onClose'),
  onConfirm: action('onConfirm'),
  title: 'Dialog Title',
  content: 'Dialog Content',
  ButtonComponent: Button,
  ButtonProps: {
    children: 'Open Dialog',
  },
};
