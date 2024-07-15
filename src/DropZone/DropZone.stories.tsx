// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// Import Component and related types.
import DropZone from './DropZone';
import React from 'react';
import { Button, Typography } from '@mui/material';

// Configure Metadata.
const meta: Meta<typeof DropZone> = {
  title: 'Components/DropZone',
  component: DropZone,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A File Drop Zone Component',
    docs: {
      description: {
        component: 'This component allows users to drop files or manually select them for upload.',
      },
    },
    references: [],
  },
  argTypes: {
    onUpload: { action: 'uploaded' },
  },
};

export default meta;
type Story = StoryObj<typeof DropZone>;

// Configure Component Stories.

export const Default: Story = {
  args: {
    onUpload: action('onUpload'),
    children: <Typography>Drop files here or click to select</Typography>,
  },
};

export const WithCustomStyling: Story = {
  args: {
    onUpload: action('onUpload'),
    children: <Typography>Drop files here or click to select</Typography>,
    sx: {
      backgroundColor: '#f0f0f0',
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hoverSx: {
      backgroundColor: '#e0e0e0',
      border: '2px dashed #007bff',
    },
  },
};

export const WithManualUpload: Story = {
  render: (args) => (
    <DropZone {...args}>
      <Typography>Drop files here</Typography>
      <DropZone.ManualUpload onUpload={action('manualUpload')}>Select Files</DropZone.ManualUpload>
    </DropZone>
  ),
  args: {
    onUpload: action('onUpload'),
  },
};

export const WithDeadZone: Story = {
  render: (args) => (
    <DropZone {...args}>
      <Typography>Drop files here</Typography>
      <DropZone.DeadZone>
        <Button variant='contained' color='primary' onClick={action('buttonClick')}>
          This button won't trigger file upload
        </Button>
      </DropZone.DeadZone>
    </DropZone>
  ),
  args: {
    onUpload: action('onUpload'),
  },
};

export const ComplexExample: Story = {
  render: (args) => (
    <DropZone {...args}>
      <Typography variant='h6'>Upload Your Files</Typography>
      <Typography variant='body2' sx={{ mb: 2 }}>
        Drag and drop files here, or use the button below
      </Typography>
      <DropZone.ManualUpload onUpload={action('manualUpload')} variant='contained' color='primary'>
        Select Files
      </DropZone.ManualUpload>
      <DropZone.DeadZone sx={{ mt: 2 }}>
        <Button variant='text' color='secondary' onClick={action('helpClick')}>
          Need Help?
        </Button>
      </DropZone.DeadZone>
    </DropZone>
  ),
  args: {
    onUpload: action('onUpload'),
    sx: {
      border: '2px dashed #9e9e9e',
      borderRadius: 4,
      p: 3,
      textAlign: 'center',
    },
    hoverSx: {
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
    },
  },
};
