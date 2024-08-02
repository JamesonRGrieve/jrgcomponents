import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import Dialog, { CommonDialogProps } from '../Dialog';

export type ImageDialogProps = {
  imageSrc: string;
  imageThumbnail?: ReactNode;
  nextImage?: boolean;
} & CommonDialogProps;

const ImageDialog: React.FC<ImageDialogProps> = ({
  imageSrc,
  nextImage = true,
  title,
  imageThumbnail = ImageThumbnail,
  ...props
}) => {
  return (
    <Dialog
      title={title}
      content={
        <Box width='100%' height='100%' minWidth='10rem' minHeight='10rem'>
          {nextImage ? (
            <Image src={imageSrc} alt={title} fill style={{ objectFit: 'contain' }} />
          ) : (
            <img src={imageSrc} alt={title} style={{ objectFit: 'contain' }} />
          )}
        </Box>
      }
      ButtonComponent={imageThumbnail}
      ButtonProps={{
        src: imageSrc,
        alt: title,
        nextImage: nextImage,
      }}
      {...props}
    />
  );
};
const ImageThumbnail = ({ src, alt, nextImage, ...props }: { src: string; alt: string; nextImage: boolean }) => {
  return (
    <Box position='relative' width='4rem' height='4rem' sx={{ cursor: 'pointer' }} {...props}>
      {nextImage ? (
        <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} />
      ) : (
        <img src={src} alt={alt} style={{ objectFit: 'contain' }} />
      )}
    </Box>
  );
};

export default ImageDialog;
