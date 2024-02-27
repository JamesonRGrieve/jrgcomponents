import SwitchColorblind from '../theming/SwitchColorblind';
import SwitchDark from '../theming/SwitchDark';
import { AppBar, Box, Typography } from '@mui/material';
import React from 'react';
export type HeaderProps = {
  postfix: string;
};
export default function Header({ postfix }: HeaderProps) {
  return (
    <AppBar
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        padding: '1rem',
        alignItems: 'center',
      }}
      position='static'
    >
      <Typography
        variant='subtitle1'
        fontWeight={'bolder'}
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          marginLeft: '-1.75rem',
        }}
      >
        {process.env.NEXT_PUBLIC_APP_NAME} {postfix}
      </Typography>
      <Box sx={{ justifySelf: 'end' }}>
        <SwitchDark />
        <SwitchColorblind />
      </Box>
    </AppBar>
  );
}
