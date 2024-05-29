import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DynamicForm, { DynamicFormProps } from './DynamicForm';

const meta: Meta<DynamicFormProps> = {
  title: 'Dialog/DynamicForm',
  component: DynamicForm,
  argTypes: {
    onConfirm: { action: 'Form submitted' },
  },
  parameters: {
    docs: {
      description: {
        component: 'DynamicForm allows editing of various fields.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj<DynamicFormProps> = {
  args: {
    onConfirm: action('Form submitted'),
    fields: {
      name: { value: 'John Doe', type: 'text', validation: (value) => value.toString().trim().length > 0 },
      age: { value: 30, type: 'number', validation: (value) => !isNaN(Number(value)) && Number(value) > 0 },
    },
  },
};
