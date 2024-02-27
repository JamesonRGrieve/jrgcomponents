// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import HeaderComponent, { HeaderProps } from './Header';
import React from 'react';
// Configure Metadata.
const meta: Meta = {
  title: 'Meta/Header',
  component: HeaderComponent,
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
export const Header: Story = (args: HeaderProps) => <HeaderComponent {...args} />;
Header.args = {};
