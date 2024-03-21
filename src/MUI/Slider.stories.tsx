// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// Import Component and related types.
import { Delete } from '@mui/icons-material';
import SliderComponent, { SliderProps } from '@mui/material/Slider';
import { Container } from '@mui/material';

type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const QuotaSlider: Story = (args: SliderProps) => (
  <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <SliderComponent {...args} />
  </Container>
);
QuotaSlider.args = {
  min: 0,
  max: 140,
  step: 1,
  marks: [
    { label: '43 Used', value: 43 },
    { label: '70 Max', value: 70 },
    { label: '140 Available', value: 140 },
  ],
  valueLabelFormat: (value: any) => `New Max: ${value}`,
  valueLabelDisplay: 'on',
  track: 'normal',
  components: {},
  componentsProps: {},
  sx: {
    '& .MuiSlider-rail': {
      position: 'relative',
      backgroundColor: '#5F9EA0',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '0',
        right: `${((140 - 43) / 140) * 100}%`,
        backgroundColor: '#00F',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${((140 - 70) / 140) * 100}%`,
        right: '0',
        backgroundColor: '#555',
      },
    },
  },
};

// Configure Metadata.
const meta: Meta = {
  title: 'MUI/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    componentSubtitle: 'A ButtonWithIcon Component',
    docs: {
      description: {
        component: 'This component is meant to illustrate how to effectively document components.',
      },
    },
    references: [],
  },
};
export default meta;
