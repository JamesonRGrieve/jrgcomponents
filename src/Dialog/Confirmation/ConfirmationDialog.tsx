import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';

export type ConfirmationDialogProps = {
  title: string;
  content: string;
  onClose: () => void;
  onConfirm?: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  content,
  onClose,
}) => {
  const handleConfirm = () => {
    onClose();
  };

  return (
    <Box>
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Box>

  );
};

export default ConfirmationDialog;