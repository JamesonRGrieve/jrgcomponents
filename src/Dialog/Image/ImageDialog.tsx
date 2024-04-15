import React from 'react';
import Dialog, { CommonDialogProps } from '../Dialog'; // Adjust the import path as necessary

export type ConfirmationDialogProps = CommonDialogProps & {
  src: string;
};

// TODO: Implement Image component to display the image from src. The ButtonComponent and ButtonProps should be a fill implementation of the image component.
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onClose, title, src, sx }) => {
  return null; //<Dialog {...{ onClose, title, sx }} content={<Image />} />;
};

export default ConfirmationDialog;
