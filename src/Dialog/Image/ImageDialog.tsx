import React from 'react';
import Dialog, { CommonDialogProps } from '../Dialog';
import Image from 'next/image';

export type ImageDialogProps = {
  imageSrc: string;
} & CommonDialogProps;

const ImageDialog: React.FC<ImageDialogProps> = ({ onClose, imageSrc, title, sx }) => {
  return (
    <Dialog
      onClose={onClose}
      sx={sx}
      content={<Image src={imageSrc} alt={title} style={{ width: '100vw', height: '100vh' }} />}
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
