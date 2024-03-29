// DialogWrapper.tsx
import React, { ReactNode, useState } from 'react';
import { Dialog, DialogTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageDialog from '../Image/ImageDialog';
import EditDialog from '../Edit/EditDialog';
import ConfirmationDialog from '../Confirmation/ConfirmationDialog';

export type DialogWrapperProps = {
  componentType: 'image' | 'edit' | 'confirmation';
};

const DialogWrapper: React.FC<DialogWrapperProps> = ({ componentType }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to determine which component to render
  const renderComponent = () => {
    switch (componentType) {
      case 'image':
        return <ImageDialog src='https://fastly.picsum.photos/id/14/2500/1667.jpg?hmac=ssQyTcZRRumHXVbQAVlXTx-MGBxm6NHWD3SryQ48G-o' alt='alt-text' fill />;
      case 'edit':
        return <EditDialog toEdit={{ 'name': 'test' }} onClose={handleClose} />;
      case 'confirmation':
        return <ConfirmationDialog
          title="Confirm Action"
          content="Are you sure you want to proceed?"
          onClose={handleClose}
          onConfirm={handleClose}
        />;
      default:
        return null;
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: (theme) => theme.palette.grey[500] }}>
        Open Dialog
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Dialog is Open
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box p={2}>
          {renderComponent()}
        </Box>
      </Dialog>
    </>
  );
};

export default DialogWrapper;


/*Box, NextIMG fill to true, Icon button for close (can be within the dialog)*/