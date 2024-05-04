import React from 'react'; // Make sure React is imported if needed by your ESLint rules
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ConfirmationDialogComponent, { ConfirmationDialogProps } from './ConfirmationDialog';
import { Button } from '@mui/material';

const meta: Meta<ConfirmationDialogProps> = {
  title: 'Dialog/ConfirmationDialog',
  component: ConfirmationDialogComponent,
  argTypes: {
    onClose: { action: 'Dialog closed' },
    onConfirm: { action: 'Action confirmed' },
    ButtonComponent: {
      table: {
        disable: true
      },
      control: {
        type: null
      }
    },
    ButtonProps: {
      control: 'object'
    }
  },
  parameters: {
    componentSubtitle: 'A confirmation dialog component for critical user actions.',
    docs: {
      description: {
        component: 'This component is designed to confirm user actions, such as deletions or updates, using a customizable dialog.'
      }
    },
  }
};

export default meta;

// Default story for the ConfirmationDialog
export const Default: StoryObj<ConfirmationDialogProps> = {
  args: {
    onClose: action('Dialog closed'),
    onConfirm: action('Action confirmed'),
    title: 'Are you sure?',
    content: 'Do you want to perform this action? It cannot be undone.',
    ButtonComponent: ({ onClick }) => (
      <Button onClick={onClick} color="primary">
        Open Confirmation Dialog
      </Button>
    ),
    ButtonProps: {}
  }
};