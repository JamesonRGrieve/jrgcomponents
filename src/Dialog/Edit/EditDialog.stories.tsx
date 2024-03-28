// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import EditDialogComponent, { EditDialogProps } from './EditDialog';
import React from 'react';
// Configure Metadata.
const meta: Meta = {
  title: 'Dialog/EditDialog',
  component: EditDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'text' },
  },
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
export const EditDialog: Story = (args: EditDialogProps) => <EditDialogComponent {...args} />;
EditDialog.args = {};
