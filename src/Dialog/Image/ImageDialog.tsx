import React from 'react';
import Dialog, { CommonDialogProps } from '../Dialog';
import Image from 'next/image';
import { Box } from '@mui/material';

export type ImageDialogProps = {
  imageSrc: string;
} & CommonDialogProps;

const ImageDialog: React.FC<ImageDialogProps> = ({ onClose, imageSrc, title, sx }) => {
  return (
    <Dialog
      onClose={onClose}
      sx={sx}
      content={<Image src={imageSrc} alt={title} fill />}
      ButtonComponent={Image}
      ButtonProps={{
        src: imageSrc,
        alt: title,
        fill: true,
      }}
    />
  );
};

export default ImageDialog;
