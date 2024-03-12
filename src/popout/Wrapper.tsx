import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import PopoutDrawer from './Drawer';
import PopoutButton from './Button';

type Menu = {
  heading?: string;
  icon?: ReactNode;
  swr: any;
  menu: any;
  width: string;
};
type Footer = {
  children: ReactNode | ReactNode[];
  height: string;
};
export type PopoutDrawerWrapperProps = {
  title: string | ReactNode;
  height: string;
  left?: Menu | ReactNode;
  right?: Menu | ReactNode;
  children: ReactNode | ReactNode[];
  wrappedHeaderHeightSum?: string;
  inner: boolean;
  footer?: Footer;
};

export default function MenuWrapper({ title, height, left, right, inner, footer, children }: PopoutDrawerWrapperProps) {
  const [open, setOpen] = useState({ left: false, right: false });
  const theme = useTheme();
  useEffect(() => {
    console.log('Open State of popout changed: ', open);
  }, [open]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        position: 'absolute',
      }}
    >
      <AppBar sx={{ height: height, position: 'static' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {(left as Menu)?.heading ? (
            <PopoutButton
              open={open.left}
              handleToggle={() => {
                setOpen((previousState: any) => ({ ...previousState, left: !previousState.left }));
              }}
              side='left'
              heading={(left as Menu)?.heading ?? ''}
              icon={(left as Menu)?.icon ?? null}
            />
          ) : (
            <Box sx={{ flex: 1, ml: '1rem' }}>{left as ReactNode}</Box>
          )}
          {typeof title === 'string' ? (
            <Typography variant='h6' component='h1' noWrap>
              {title}
            </Typography>
          ) : (
            title
          )}
          {(right as Menu)?.heading !== undefined ? (
            <PopoutButton
              open={open.right}
              handleToggle={() => {
                setOpen((previousState: any) => ({ ...previousState, right: !previousState.right }));
              }}
              side='right'
              heading={(right as Menu)?.heading ?? ''}
              icon={(right as Menu)?.icon}
            />
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                mr: '1rem',
              }}
            >
              {right as ReactNode}
            </Box>
          )}
        </Box>
      </AppBar>
      {(left as Menu)?.menu && (
        <PopoutDrawer
          open={open.left}
          {...(left as Menu)}
          side='left'
          zIndex={1200}
          topSpacing={height}
          bottomSpacing={footer ? footer.height : '0'}
        />
      )}
      <Box
        component={inner ? 'main' : 'div'}
        sx={{
          height: `calc(100% - ${height})`,
          flexGrow: 1,
          position: 'relative',
          overflowY: 'scroll',
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing[open.left || open.right ? 'easeOut' : 'sharp'],
            duration: theme.transitions.duration[open.left || open.right ? 'enteringScreen' : 'leavingScreen'],
          }),
          margin: `0 ${open.right ? (right as Menu)?.width : 0} 0 ${open.left ? (left as Menu)?.width : 0}`,
        }}
      >
        {children}
      </Box>
      {(right as Menu)?.menu && (
        <PopoutDrawer
          open={open.right}
          {...(right as Menu)}
          side='right'
          zIndex={1200}
          topSpacing={height}
          bottomSpacing={footer ? footer.height : '0'}
        />
      )}
      {footer && (
        <AppBar
          sx={{
            justifySelf: 'end',
            height: footer.height,
            position: 'static',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {footer.children}
        </AppBar>
      )}
    </Box>
  );
}
