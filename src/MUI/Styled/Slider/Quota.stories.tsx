// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import QuotaSliderComponent, { QuotaSliderProps } from './Quota';
import { SliderProps } from '@mui/material/Slider';
import { Container } from '@mui/material';

type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const QuotaSlider: Story = (args: QuotaSliderProps & SliderProps) => (
  <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <QuotaSliderComponent {...args} />
  </Container>
);
QuotaSlider.args = {
  min: 0,
  used: 43,
  limit: 70,
  max: 140,
};

// Configure Metadata.
const meta: Meta = {
  title: 'MUI/Styled/Slider/Quota Slider',
  component: QuotaSliderComponent,
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
