import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import EditDialog, { EditDialogProps } from './EditDialog';
import { Button } from '@mui/material';

const meta: Meta<EditDialogProps> = {
  title: 'Dialog/EditDialog',
  component: EditDialog,
  argTypes: {
    onClose: { action: 'Dialog closed' },
    onConfirm: { action: 'Edit confirmed' },
  },
  parameters: {
    docs: {
      description: {
        component: 'EditDialog allows editing of various fields within a dialog window.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj<EditDialogProps> = {
  args: {
    onClose: action('Dialog closed'),
    onConfirm: action('Edit confirmed'),
    title: 'Edit User Details',
    fields: {
      name: { value: 'John Doe', validation: (value) => value.trim().length > 0 },
      age: { value: 30, validation: (value) => !isNaN(value) && value > 0 },
    },
    ButtonComponent: ({ onClick }) => <Button onClick={onClick} color="primary">Open Edit Dialog</Button>,
    ButtonProps: {}
  }
};