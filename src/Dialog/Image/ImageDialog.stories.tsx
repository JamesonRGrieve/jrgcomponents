// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import ImageDialogComponent, { ImageDialogProps } from './ImageDialog';
import React from 'react';

// Configure Metadata.
const meta: Meta = {
  title: 'Dialog/ImageDialog',
  component: ImageDialogComponent,
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

// Sample image URL for testing
const sampleImageUrl = 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U';

export const ImageDialog: Story = (args: ImageDialogProps) => <ImageDialogComponent {...args} />;
ImageDialog.args = {
  onClose: () => console.log('Close clicked'),
  imageSrc: sampleImageUrl,
  title: 'Sample Image',
};
