// components/ImageDialog.tsx
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';

export type ImageDialogProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ src, alt, width = 800, height = 800 }) => {
  return (
    <Box style={{ maxWidth: "100%", maxHeight: "80vh", display: "flex", justifyContent: "center" }}>
      {/* Using Next.js Image component for optimized images */}
      <Image src={src} alt={alt} width={width} height={height} layout="intrinsic" objectFit="contain" />
    </Box>
  );
};

export default ImageDialog;
