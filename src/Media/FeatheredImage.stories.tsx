// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// Import Component and related types.
import FeatheredImageComponent, { FeatheredImageProps } from './FeatheredImage';

// Configure Metadata.
const meta: Meta = {
  title: 'Media/FeatheredImage',
  component: FeatheredImageComponent,
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'text' },
  },
  parameters: {
    componentSubtitle: 'An Audio Player for Base64 Audio',
    docs: {
      description: {
        component:
          'This component plays base64 audio strings with pause, stop and play buttons as well as a progress slider and time counters.',
      },
    },
    references: [],
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const FeatheredImage: Story = (args: FeatheredImageProps) => <FeatheredImageComponent {...args} />;
FeatheredImage.args = {
  height: '4rem',
  width: '10rem',
  url: 'https://placehold.co/1000x400',
};
