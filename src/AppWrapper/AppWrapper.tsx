'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import HeaderFooter from './HeaderFooter';
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
  title?: string | ReactNode;
  height?: string;
  left?: Menu | ReactNode;
  right?: Menu | ReactNode;
  inner?: boolean;
  footer?: Footer;
};

export default function AppWrapper({
  title = process.env.NEXT_PUBLIC_APP_NAME,
  height = '2rem',
  left,
  right,
  inner = true,
  footer,
  children,
}: PopoutDrawerWrapperProps & { children: ReactNode | ReactNode[] }) {
  const [open, setOpen] = useState({ left: false, right: false });
  const theme = useTheme();
  useEffect(() => {
    console.log('Open State of popout changed: ', open);
  }, [open]);
  return (
    <>
      <HeaderFooter
        height={height}
        components={{
          left: (left as Menu)?.heading ? (
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
            (left as ReactNode)
          ),
          center:
            typeof title === 'string' ? (
              <Typography variant='h6' component={inner ? 'h2' : 'h1'} textAlign='center' noWrap>
                {title}
              </Typography>
            ) : (
              <Box display='flex' justifyContent='space-between' alignItems='center' height='100%'>
                {title}
              </Box>
            ),
          right:
            (right as Menu)?.heading !== undefined ? (
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
              (right as ReactNode)
            ),
        }}
      />
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
          overflowY: 'auto',
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
      {footer && <HeaderFooter components={{ center: footer.children, right: ' ' }} height={footer.height} footer />}
    </>
  );
}
