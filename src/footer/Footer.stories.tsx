// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import FooterComponent, { FooterProps } from './Footer';

import React from 'react';

// Configure Metadata.
const meta: Meta = {
  title: 'Meta/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    bodyText: { control: 'text' },
    buttonText: { control: 'text' },
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
export const Footer: Story = (args: FooterProps) => <FooterComponent {...args} />;
Footer.args = {};
