// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import ImageDialogComponent, { ImageDialogProps } from './ImageDialog';
import React from 'react';
import { Box } from '@mui/material';

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
const sampleImageUrl = 'https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_1280.jpg';

export const ImageDialog: Story = (args: ImageDialogProps) => (
  <Box display='flex' width='100%' height='100%' justifyContent='center' alignItems='center'>
    <Box position='relative' width='50px' height='50px'>
      <ImageDialogComponent {...args} />
    </Box>
  </Box>
);
ImageDialog.args = {
  onClose: () => console.log('Close clicked'),
  imageSrc: sampleImageUrl,
  title: 'Sample Image',
};
