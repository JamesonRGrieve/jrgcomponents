import React from 'react';
import Button from '@mui/material/Button';
import { Box, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void; // Used to distinguish ConfirmationDialog
  title?: string;
  content: React.ReactNode;
  sx?: { [key: string]: string | number };
};

const Dialog: React.FC<DialogProps> = ({
  onClose,
  onConfirm,
  title,
  content,
  sx
}) => {

  return (
    <Box sx={{ ...sx }}>
      {title && <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      {onConfirm && (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onConfirm()} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      )}
    </Box>
  );
};

export default Dialog;