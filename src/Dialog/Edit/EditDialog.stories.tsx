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
      'User Name': { value: 'John Doe', type: 'text', validation: (value) => value.toString().trim().length > 0 },
      'User Age': {
        value: 30,
        type: 'number',
        validation: (value) => {
          if (isNaN(Number(value)) || Number(value) <= 0) {
            throw new Error('Age must be a positive integer.');
          }
          return true;
        },
      },
    },
    ButtonComponent: Button,
    ButtonProps: { label: 'Edit User Details' },
  },
};
