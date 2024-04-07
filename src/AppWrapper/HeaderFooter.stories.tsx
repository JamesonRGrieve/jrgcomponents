// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import React from 'react';
import HeaderFooterComponent, { HeaderFooterProps } from './HeaderFooter';
// Configure Metadata.
const meta: Meta = {
  title: 'Application/Header & Footer',
  component: HeaderFooterComponent,
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
export const Header: Story = (args: HeaderFooterProps) => <HeaderFooterComponent {...args} />;
Header.args = {};
