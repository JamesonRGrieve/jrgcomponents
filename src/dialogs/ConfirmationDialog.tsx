import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
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
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth='xs'
      open={props.open}
    >
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
