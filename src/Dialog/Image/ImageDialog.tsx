import React, { ReactNode } from 'react';
import Dialog, { CommonDialogProps } from '../Dialog';
import Image from 'next/image';
import { Box } from '@mui/material';

export type ImageDialogProps = {
  imageSrc: string;
  imageThumbnail?: ReactNode;
} & CommonDialogProps;

const ImageDialog: React.FC<ImageDialogProps> = ({ imageSrc, title, imageThumbnail = ImageThumbnail, ...props }) => {
  throw new Error(title);
  return (
    <Dialog
      title={title}
      content={
        <Box width='100%' height='100%' minWidth='10rem' minHeight='10rem'>
          <Image src={imageSrc} alt={title} fill style={{ objectFit: 'contain' }} />
        </Box>
      }
      ButtonComponent={imageThumbnail}
      ButtonProps={{
        src: imageSrc,
        alt: title,
      }}
    />
  );
};
const ImageThumbnail = ({ src, alt, ...props }: { src: string; alt: string }) => {
  return (
    <Box position='relative' width='4rem' height='4rem' sx={{ cursor: 'pointer' }} {...props}>
      <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} />
    </Box>
  );
};

export default ImageDialog;
