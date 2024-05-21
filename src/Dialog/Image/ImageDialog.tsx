import React, { useState } from 'react';
import Dialog, { CommonDialogProps } from '../Dialog';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import Image from 'next/image';

export type ImageDialogProps = {
  onClose: () => void;
  imageSrc: string;
  title?: string;
  sx?: { [key: string]: string | number };
};

const ImageDialog: React.FC<ImageDialogProps> = ({ onClose, imageSrc, title, sx }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleImageClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} sx={sx} content={dialogOpen ? <Image src={imageSrc} alt={title} style={{ width: '100vw', height: '100vh' }} /> : (
      <Image src={imageSrc} alt={title} onClick={handleImageClick} style={{ cursor: 'pointer', ...sx }} width={50} height={50} />
    )} ButtonComponent={({ onClick }) => (
      <Image src={imageSrc} alt={title} onClick={onClick} style={{ display: 'none' }} width={50} height={50} />
    )} ButtonProps={{}}>
      {dialogOpen && (
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1 }}>
          <Close />
        </IconButton>
      )}
    </Dialog>
  );
};

export default ImageDialog;