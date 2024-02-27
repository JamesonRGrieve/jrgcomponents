import { Box, Typography } from '@mui/material';
import React from 'react';

export type FooterProps = object;
export default function Footer() {
  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Box></Box>
      <Typography variant='body1'>
        &copy; {process.env.NEXT_PUBLIC_APP_NAME} {new Date().getFullYear()}
      </Typography>
      <Box></Box>
    </Box>
  );
}
