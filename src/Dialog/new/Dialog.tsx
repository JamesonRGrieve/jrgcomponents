'use client';

import React, { isValidElement, cloneElement, PropsWithChildren } from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogActions as DialogFooter,
  DialogContent as DialogDescription,
  IconButton,
  Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDialog, DialogProvider } from './DialogContext';

const Dialog = ({ children }: PropsWithChildren) => <DialogProvider>{children}</DialogProvider>;

const DialogTrigger = ({ children }: PropsWithChildren) => {
  const { openDialog: onClick } = useDialog();
  if (!isValidElement(children)) {
    throw new Error('DialogTrigger must be a valid React element');
  }
  return cloneElement(children, { onClick } as any);
};

const DialogContent = ({ children, ...props }: PropsWithChildren<any>) => {
  const { open, closeDialog } = useDialog();
  return (
    <MuiDialog open={open} onClose={closeDialog} {...props}>
      {children}
      <IconButton
        aria-label='close'
        onClick={closeDialog}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </MuiDialog>
  );
};

interface DialogButtonProps {
  type: 'cancel' | 'confirm' | 'other';
  onClick?: () => void;
}

const DialogButton = ({ type, onClick, children }: PropsWithChildren<DialogButtonProps>) => {
  const { closeDialog } = useDialog();

  const handleClick = () => {
    if (type === 'cancel') {
      closeDialog();
    }
    if (onClick) {
      onClick();
    }
  };

  return <Button onClick={handleClick}>{children}</Button>;
};

const DialogActions = ({ onConfirm }: { onConfirm: () => void }) => {
  const { closeDialog } = useDialog();

  return (
    <DialogFooter>
      <Button onClick={closeDialog}>Cancel</Button>
      <Button onClick={onConfirm}>Confirm</Button>
    </DialogFooter>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Title = DialogTitle;
Dialog.Footer = DialogFooter;
Dialog.Description = DialogDescription;
Dialog.Button = DialogButton;
Dialog.Actions = DialogActions;

export { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogDescription, DialogButton, DialogActions };

export default Dialog;
