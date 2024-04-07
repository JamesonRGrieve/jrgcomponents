import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';

export type ImageDialogProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ src, alt}) => {
  return (
    <Box style={{ display: "flex", justifyContent: "center", position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        fill
        objectFit="contain"
      />
    </Box>
  );
};

export default ImageDialog;