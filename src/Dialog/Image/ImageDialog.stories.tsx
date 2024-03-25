// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import ImageDialogComponent, { ImageDialogProps } from './ImageDialog';
import React from 'react';
// Configure Metadata.
const meta: Meta = {
  title: 'Application/Header & Footer',
  component: ImageDialogComponent,
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
export const ImageDialog: Story = (args: ImageDialogProps) => <ImageDialogComponent {...args} />;
ImageDialog.args = {};
