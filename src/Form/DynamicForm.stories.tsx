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
      timezone: { value: 'America/Edmonton', type: 'text' },
    },
  },
};

export const DynamicFromObject: StoryObj<DynamicFormProps> = {
  args: {
    onConfirm: action('Form submitted'),
    toUpdate: {
      this_used_to_be_snake_case: 'John Doe',
      thisUsedToBeCamelCase: 50,
      ThisUsedToBePascalCase: true,
    },
  },
};
