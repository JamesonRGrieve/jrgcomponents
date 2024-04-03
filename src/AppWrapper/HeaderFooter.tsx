import CenterAlignedBox, { CenterAlignedBoxProps } from '../Layout/CenterAlignedBox';
import SwitchColorblind from '../Theming/SwitchColorblind';
import SwitchDark from '../Theming/SwitchDark';
import { AppBar, Typography, useMediaQuery } from '@mui/material';
import React, { ReactNode } from 'react';
export type HeaderFooterProps = {
  footer?: boolean;
  height?: string;
  components?: CenterAlignedBoxProps;
};
export default function HeaderFooter({ height = '3rem', footer = false, components }: HeaderFooterProps) {
  const mobile = useMediaQuery('(max-width:600px)');
  return (
    <AppBar
      sx={{
        height: height,
        px: mobile ? '0.25rem' : '1rem',
        justifySelf: footer ? 'end' : 'unset',
        ...(footer ? { borderBottom: 'unset' } : {}),
      }}
      position='static'
    >
      <CenterAlignedBox
        left={components?.left}
        center={
          components?.center ??
          (!footer && (
            <Typography variant='subtitle1' fontWeight={'bolder'} textAlign={'center'}>
              {process.env.NEXT_PUBLIC_APP_NAME ?? 'Application Name'}
            </Typography>
          ))
        }
        right={components?.right}
      />
    </AppBar>
  );
}
