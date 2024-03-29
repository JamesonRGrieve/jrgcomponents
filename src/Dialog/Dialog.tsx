import React, { ReactNode, useState } from 'react';
import Button from '@mui/material/Button';
import ConfirmationDialog from './Confirmation/ConfirmationDialog';

export type DialogProps = {
  children: ReactNode;
  onCancel: () => void;
  onConfirm?: () => void;
  sx?: { [key: string]: string | number };
  onSubmit: () => void;
};

const Dialog: React.FC<DialogProps> = ({ onSubmit, onCancel, onConfirm, children, sx }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the open status of the confirmation dialog
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose(); // Close the confirmation dialog after confirming
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onConfirm) {
      handleOpen(); // Open the confirmation dialog
    } else {
      onSubmit(); // If no confirmation needed, proceed with submit
    }
  };

  return (
    <div style={sx}>
      <form onSubmit={handleSubmit}>
        {children}
        <Button type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </form>
      {onConfirm && (
        <ConfirmationDialog
          title="Confirm Action"
          content="Are you sure you want to proceed?"
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Dialog;