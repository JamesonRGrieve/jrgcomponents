import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dialog, DialogButton, DialogActions, Trigger, Content, Title, Footer, Description } from './DialogCompound';
import { Button } from '@mui/material';

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
  const handleConfirm = () => {
    alert('Confirmed!');
  };

  return (
    <Dialog>
      <Trigger>
        <Button>Open</Button>
      </Trigger>
      <Content>
        <Title>Are you absolutely sure?</Title>
        <Description>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </Description>
        <Footer>
          <DialogButton type='cancel'>Cancel</DialogButton>
          <DialogButton type='confirm' onClick={handleConfirm}>
            Confirm
          </DialogButton>
        </Footer>
      </Content>
    </Dialog>
  );
};

DefaultDialog.args = {};

export const WithActionProps: Story = () => {
  const handleConfirm = () => {
    alert('Confirmed!');
  };

  return (
    <Dialog>
      <Trigger>
        <Button>Open</Button>
      </Trigger>
      <Content>
        <Title>Same thing but with action props</Title>
        <Description>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </Description>
        <DialogActions onConfirm={handleConfirm} />
      </Content>
    </Dialog>
  );
};

WithActionProps.args = {};

export const ImageDialog: Story = () => {
  return (
    <Dialog>
      <Trigger>
        <img
          src='https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_1280.jpg'
          alt='Open Dialog'
          width='300px'
          style={{ cursor: 'pointer' }}
        />
      </Trigger>
      <Content>
        <Title>Image Title</Title>
        <img src='https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_1280.jpg' alt='Full image inside dialog' />
      </Content>
    </Dialog>
  );
};

ImageDialog.args = {};

// Add one for forms.
