import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DropZone from './DropZone'; // Adjust the import according to your file structure
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof DropZone> = {
  title: 'Components/DropZone',
  component: DropZone,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    componentSubtitle: 'A customizable drag and drop zone',
    docs: {
      description: {
        component:
          'This component provides a customizable drag and drop zone. It includes handling for drag events and custom styling.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultDropZone: Story = () => {
  return (
    <DropZone onUpload={action('onUpload')}>
      <Typography variant='body1'>Whatever you want</Typography>
      <Typography>Can have multiple children</Typography>
    </DropZone>
  );
};

DefaultDropZone.args = {};

export const WithActiveComponent: Story = () => {
  return (
    <DropZone onUpload={action('onUpload')}>
      <DropZone.Active sx={{ bgcolor: 'pink', color: 'white' }} />
      <Typography variant='body1'>Whatever you want</Typography>
      <Typography>Can have multiple children</Typography>
    </DropZone>
  );
};

WithActiveComponent.args = {};

export const CustomActiveBody: Story = () => {
  return (
    <DropZone onUpload={action('onUpload')}>
      <DropZone.Active sx={{ bgcolor: 'grey', color: 'white', border: '1px dashed black' }}>
        <Typography variant='body1'>Custom message to drag and drop</Typography>
        <Box sx={{ p: 2 }}>
          <Typography>More stuff here</Typography>
        </Box>
      </DropZone.Active>
      <Typography variant='body1'>Whatever you want</Typography>
      <Typography>Can have multiple children</Typography>
    </DropZone>
  );
};

CustomActiveBody.args = {};
