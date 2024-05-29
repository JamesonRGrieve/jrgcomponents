// Import your Storybook setup
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Form, { FormProps } from './Form';

const meta: Meta<FormProps> = {
  title: 'Components/Form',
  component: Form,
};

export default meta;

export const TestForm: StoryObj<FormProps> = {
  render: (args) => <Form {...args} />,
  args: {
    fields: {
      username: {
        nameID: 'username',
        label: 'Username',
        type: 'text',
        value: '',
        placeholder: 'Enter your username',
        // Provide a no-op function or simple console log for onChange
        onChange: () => console.log('Username changed'),
        messages: [],
      },
      password: {
        nameID: 'password',
        label: 'Password',
        type: 'password',
        value: '',
        placeholder: 'Enter your password',
        // Provide a no-op function or simple console log for onChange
        onChange: () => console.log('Password changed'),
        messages: [],
      },
      accountType: {
        nameID: 'accountType',
        label: 'Account Type',
        type: 'select',
        value: '',
        items: [
          { value: 'personal', label: 'Personal' },
          { value: 'business', label: 'Business' },
        ],
        // Provide a no-op function or simple console log for onChange
        onChange: () => console.log('Account Type changed'),
        messages: [],
      },
      agreeTerms: {
        nameID: 'agreeTerms',
        label: 'Agree to Terms',
        type: 'checkbox',
        value: 'false',
        // Provide a no-op function or simple console log for onChange
        onChange: () => console.log('Agree to Terms changed'),
        messages: [],
      },
    },
    messages: [
      // Define any initial form-wide messages here
    ],
  },
};
