import React from 'react';
import Dialog, { CommonDialogProps } from '../Dialog'; // Adjust the import path as necessary

export type ConfirmationDialogProps = CommonDialogProps & {
  content: string;
  onConfirm: () => void;
  ButtonComponent: React.FC<{ onClick: () => void }>;
  ButtonProps: any;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  return <Dialog {...props} />;
};

export default ConfirmationDialog;
