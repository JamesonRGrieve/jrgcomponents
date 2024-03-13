import { Box, Typography, IconButton } from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import React, { ReactNode } from 'react';

export default function PopoutDrawerWrapperAppBarButton({
  open,
  handleToggle,
  side,
  heading,
  icon,
}: {
  open: boolean;
  handleToggle: any;
  side: 'left' | 'right';
  heading: string;
  icon?: ReactNode;
}) {
  return (
    <Box
      aria-label='open drawer'
      onClick={handleToggle}
      sx={{
        margin: `0 ${side === 'right' ? '1rem' : '0'} 0 ${side === 'left' ? '1rem' : '0'}`,
        justifyContent: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        height: '100%',
        flexDirection: side == 'left' ? 'row-reverse' : 'row',
      }}
    >
      <IconButton color='inherit' edge='start' sx={{ ml: '0.2rem' }}>
        {icon ?? ((side == 'left') !== open ? <ChevronRight /> : <ChevronLeft />)}
      </IconButton>
      <Typography variant='h6' component='h1' noWrap>
        {heading}
      </Typography>
    </Box>
  );
}
