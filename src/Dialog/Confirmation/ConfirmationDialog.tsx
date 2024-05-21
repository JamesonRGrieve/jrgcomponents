"use client";

import React from 'react';
import Dialog, { CommonDialogProps } from '../Dialog';

export type ConfirmationDialogProps = CommonDialogProps & {
  content: string;
  onConfirm: () => void;
  ButtonComponent: React.FC<{ onClick: () => void }>;
  ButtonProps: any;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onClose,
  title,
  sx,
  content,
  onConfirm,
  ButtonComponent,
  ButtonProps
}) => {
  // Pass only the necessary handlers and content to the Dialog component
  return (
    <Dialog
      onClose={onClose}
      title={title}
      sx={sx}
      content={content}
      onConfirm={onConfirm}
      ButtonComponent={ButtonComponent}
      ButtonProps={ButtonProps}
    />
  );
};

export default ConfirmationDialog;