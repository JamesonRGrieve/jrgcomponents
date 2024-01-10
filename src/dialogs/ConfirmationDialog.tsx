import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  warning: string;
  onClose: (value?: boolean) => void;
}

export default function ConfirmationDialog(props: ConfirmationDialogRawProps) {
  const handleCancel = () => {
    props.onClose(false);
  };

  const handleConfirm = () => {
    props.onClose(true);
  };

  return (
    <Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth='xs' open={props.open}>
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{props.warning}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
