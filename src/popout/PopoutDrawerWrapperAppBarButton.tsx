import { Box, Typography, IconButton } from '@mui/material';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import React, { ReactNode } from 'react';

export default function PopoutDrawerWrapperAppBarButton({
  open,
  handleOpen,
  side,
  heading,
  icon
}: {
  open: any;
  handleOpen: any;
  side: any;
  heading: any;
  icon?: ReactNode;
}) {
  return (
    <>
      {open || !heading ? (
        <Box flex="1"></Box>
      ) : heading ? (
        <Box
          aria-label='open drawer'
          onClick={handleOpen}
          sx={{
            margin: `0 ${side === 'right' ? '1rem' : '0'} 0 ${
              side === 'left' ? '1rem' : '0'
            }`,
            justifyContent: side === 'left' ? 'flex-start' : 'flex-end',
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            ...(open && { display: 'none' })
          }}
        >
          {side === 'right' && !icon ? (
            <IconButton color='inherit' edge='start' sx={{ ml: '0.2rem' }}>
              <ChevronLeft />
            </IconButton>
          ) : null}
          {icon ? icon : 
          <Typography variant='h6' component='h1' noWrap>
            {heading}
          </Typography>}
          {side === 'left' && !icon ? (
            <IconButton color='inherit' edge='start' sx={{ ml: '0.2rem' }}>
              <ChevronRight />
            </IconButton>
          ) : null}
        </Box>
      ) : null}
    </>
  );
}
