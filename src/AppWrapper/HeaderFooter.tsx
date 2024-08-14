import React from 'react';
import { AppBar, Typography, useMediaQuery } from '@mui/material';
import CenterAlignedBox, { CenterAlignedBoxProps } from '../Layout/CenterAlignedBox';

export type HeaderFooterProps = {
  footer?: boolean;
  height?: string;
  components?: CenterAlignedBoxProps;
};

// TODO: Remove after refactoring where this is used
export default function HeaderFooter({ height = '3rem', footer = false, components }: HeaderFooterProps) {
  return footer ? <Footer {...{ height, components }} /> : <Header {...{ height, components }} />;
}

export function Header({ height, components }: HeaderFooterProps) {
  const mobile = useMediaQuery('(max-width:600px)');
  return (
    <>
      <AppBar
        sx={{
          height: height,
          px: '1rem',
          ...(mobile
            ? {
                height: 'unset',
                px: '0.25rem',
                pt: 'calc(0.25rem + env(safe-area-inset-top))',
                pb: '0.25rem',
              }
            : {}),
        }}
        position={mobile ? 'fixed' : 'static'}
      >
        <CenterAlignedBox
          left={components?.left}
          center={
            components?.center ?? (
              <Typography variant='subtitle1' fontWeight={'bolder'} textAlign={'center'}>
                {process.env.NEXT_PUBLIC_APP_NAME ?? 'Application Name'}
              </Typography>
            )
          }
          right={components?.right}
        />
      </AppBar>
      {/* Spacer for mobile header when sticky. Here for locality */}
      {mobile && <div style={{ height: 'calc(3rem + env(safe-area-inset-top))' }} />}
    </>
  );
}

export function Footer({ height, components }: HeaderFooterProps) {
  return (
    <AppBar
      sx={{
        height: height,
        px: '1rem',
        justifySelf: 'end',
      }}
      position='static'
    >
      <CenterAlignedBox left={components?.left} center={components?.center} right={components?.right} />
    </AppBar>
  );
}
