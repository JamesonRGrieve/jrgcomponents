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
  return !heading ? (
    <Box flex='1' />
  ) : (
    <Box
      aria-label='open drawer'
      onClick={handleToggle}
      sx={{
        margin: `0 ${side === 'right' ? '1rem' : '0'} 0 ${side === 'left' ? '1rem' : '0'}`,
        justifyContent: 'flex-end',
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
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
