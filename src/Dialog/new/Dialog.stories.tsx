import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dialog } from './Dialog';
import { Button } from '@mui/material';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  title: 'CompoundComponents/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    componentSubtitle: 'A customizable dialog',
    docs: {
      description: {
        component:
          "This component provides a customizable dialog. It's a wrapper on the MUI Dialog. It adds internal statement management and custom styling.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDialog: Story = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Open</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Are you absolutely sure?</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </Dialog.Description>
        <Dialog.Footer>
          <Dialog.Button type='cancel'>Cancel</Dialog.Button>
          <Dialog.Button type='confirm' onClick={action('onConfirm')}>
            Confirm
          </Dialog.Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

DefaultDialog.args = {};

export const WithActionProps: Story = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Open</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Same thing but with action props</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </Dialog.Description>
        <Dialog.Actions onConfirm={action('onConfirm')} />
      </Dialog.Content>
    </Dialog>
  );
};

WithActionProps.args = {};

export const ImageDialog: Story = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <img
          src='https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_1280.jpg'
          alt='Open Dialog'
          width='300px'
          style={{ cursor: 'pointer' }}
        />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Image Title</Dialog.Title>
        <img src='https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_1280.jpg' alt='Full image inside dialog' />
      </Dialog.Content>
    </Dialog>
  );
};

ImageDialog.args = {};

export const ImageWithoutTitle: Story = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <img
          src='https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_1280.jpg'
          alt='Open Dialog'
          width='300px'
          style={{ cursor: 'pointer' }}
        />
      </Dialog.Trigger>
      <Dialog.Content>
        <img src='https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_1280.jpg' alt='Full image inside dialog' />
      </Dialog.Content>
    </Dialog>
  );
};

ImageWithoutTitle.args = {};

// Add one for forms.
