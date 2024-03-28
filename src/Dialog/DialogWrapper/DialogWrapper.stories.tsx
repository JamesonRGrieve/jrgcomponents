// DialogWrapper.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DialogWrapperComponent, { DialogWrapperProps } from './DialogWrapper';
import Box from '@mui/material/Box';

const meta: Meta = {
    title: 'Dialog/DialogWrapper',
    component: DialogWrapperComponent,
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

export const DialogWrapper: Story = (args: DialogWrapperProps) => <DialogWrapperComponent {...args} />;
DialogWrapper.args = {};