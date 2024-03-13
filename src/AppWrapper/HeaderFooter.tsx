import SwitchColorblind from '../Theming/SwitchColorblind';
import SwitchDark from '../Theming/SwitchDark';
import { AppBar, Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
export type HeaderProps = {
  footer?: boolean;
  height?: string;
  components: {
    left?: ReactNode | ReactNode[];
    center?: ReactNode | ReactNode[];
    right?: ReactNode | ReactNode[];
  };
};
export default function Header({ height = '2rem', footer = false, components }: HeaderProps) {
  return (
    <AppBar
      sx={{
        height: height,
        display: 'flex', // changed from 'grid'
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: '1rem',
        justifySelf: footer ? 'end' : 'unset',
      }}
      position='static'
    >
      <Box sx={{ flex: '1 1 auto', display: 'flex', alignItems: 'center' }}>{components?.left}</Box>

      <Box sx={{ flex: '2 1 auto' }}>
        {components?.center ? (
          components.center
        ) : (
          <Typography variant='subtitle1' fontWeight={'bolder'} textAlign={'center'}>
            {process.env.NEXT_PUBLIC_APP_NAME ?? 'Application Name'}
          </Typography>
        )}
      </Box>

      <Box sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {components?.right ?? (
          <>
            <SwitchDark />
            <SwitchColorblind />
          </>
        )}
      </Box>
    </AppBar>
  );
}
