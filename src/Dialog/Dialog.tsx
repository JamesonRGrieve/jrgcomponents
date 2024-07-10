'use client';
import React, { MouseEventHandler, useState } from 'react';
import Button from '@mui/material/Button';
import {
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

export type CommonDialogProps = {
  onClose?: () => void;
  title?: string;
  sx?: { [key: string]: string | number };
};
export type DialogProps = CommonDialogProps & {
  onConfirm?: (data?: any) => void;
  content?: React.ReactNode | string;
  ButtonComponent?: React.FC<{ onClick: MouseEventHandler<any> }> | any;
  ButtonProps?: object;
};

const Dialog: React.FC<DialogProps> = ({
  onClose = (): object => ({}),
  onConfirm,
  title = 'Dialog Title',
  content = '',
  ButtonComponent = Button,
  ButtonProps = {},
  sx = {},
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleClose(): void {
    setDialogOpen(false);
    onClose();
  }

  function handleCancel(): void {
    handleClose();
  }
  return (
    <>
      <ButtonComponent
        onClick={() => {
          setDialogOpen(true);
        }}
        {...ButtonProps}
      />
      <MUIDialog
        open={dialogOpen}
        onClose={handleClose}
        sx={{ position: 'fixed' }}
        PaperProps={{ sx: { py: '1rem', ...sx } }}
      >
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '0.2rem', right: '0.2rem' }}>
          <Close />
        </IconButton>
        {title && (
          <DialogTitle id='dialog-title' sx={{ textAlign: 'center' }}>
            {title}
          </DialogTitle>
        )}
        <DialogContent sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {typeof content === 'string' ? (
            <DialogContentText id='dialog-description' textAlign='center'>
              {content}
            </DialogContentText>
          ) : (
            content
          )}
        </DialogContent>
        {onConfirm && (
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              onClick={() => {
                setDialogOpen(false);
                onConfirm();
              }}
              color='primary'
            >
              Confirm
            </Button>
          </DialogActions>
        )}
      </MUIDialog>
    </>
  );
};

export default Dialog;
