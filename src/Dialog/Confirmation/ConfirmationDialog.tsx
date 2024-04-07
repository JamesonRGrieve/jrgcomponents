import React from 'react';
import { DialogProps } from '../Dialog';
import Dialog from '../Dialog'; // Adjust the import path as necessary

export interface ConfirmationDialogProps extends Omit<DialogProps, 'onConfirm'> {
  onConfirm: () => void;
  title: string;
  content: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  sx
}) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      content={content}
      sx={sx}
    />
  );
};

export default ConfirmationDialog;