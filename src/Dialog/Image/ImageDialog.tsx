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

const ImageDialog: React.FC<ImageDialogProps> = ({ src, alt, fill, width, height }) => {
  return (
    <Box style={{ display: "flex", justifyContent: "center", position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        layout={fill ? "fill" : "intrinsic"}
        objectFit="contain"
        width={fill ? undefined : width}
        height={fill ? undefined : height}
      />
    </Box>
  );
};

export default ImageDialog;