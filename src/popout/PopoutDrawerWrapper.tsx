import { ReactNode, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import React from 'react';

import PopoutDrawer from './PopoutDrawer';
import PopoutDrawerWrapperAppBarButton from './PopoutDrawerWrapperAppBarButton';

type Menu = {
  heading?: string;
  swr: any;
  menu: any;
  width: string;
};
export type PopoutDrawerWrapperProps = {
  title: string | ReactNode;
  height: string;
  left?: Menu | ReactNode;
  right?: Menu | ReactNode;
  children: ReactNode | ReactNode[];
};
export default function MenuWrapper({
  title,
  height,
  left,
  right,
  children
}: PopoutDrawerWrapperProps) {
  const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open'
  })(({ theme, open }: { theme?: any; open: any }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open.left && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: `${(left as Menu)?.width}`
    }),
    ...(open.right && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: (left as Menu)?.width
    })
  }));
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
  })(({ theme, open }: { theme?: any; open: any }) => ({
    height: height,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open.left && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      width: `calc(100% - ${(left as Menu)?.width})`,
      marginLeft: `${(left as Menu)?.width}`
    }),
    ...(open.right && {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
      width: `calc(100% - ${(right as Menu)?.width})`,
      marginRight: `${(right as Menu)?.width}`
    }),
    ...(open.left &&
      open.right && {
        width: `calc(100% - ${(right as Menu)?.width}px - ${(left as Menu)
          ?.width}px)`
      })
  }));
  const [open, setOpen] = useState({ left: false, right: false });
  return (
    <>
      <AppBar position='relative' open={open}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%'
          }}
        >
          {(left as Menu)?.heading !== undefined ? (
            <PopoutDrawerWrapperAppBarButton
              open={open.left}
              handleOpen={() => {
                setOpen({ ...open, left: true });
              }}
              side='left'
              heading={(left as Menu)?.heading}
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
            <PopoutDrawerWrapperAppBarButton
              open={open.right}
              handleOpen={() => {
                setOpen({ ...open, right: true });
              }}
              side='right'
              heading={(right as Menu)?.heading}
            />
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                mr: '1rem'
              }}
            >
              {right as ReactNode}
            </Box>
          )}
        </Box>
      </AppBar>
      {(left as Menu)?.heading !== undefined ? (
        <PopoutDrawer
          width={(left as Menu)?.width}
          open={open.left}
          handleClose={() => {
            setOpen({ ...open, left: false });
          }}
          heading={(left as Menu).heading}
          menu={(left as Menu).menu}
          swr={(left as Menu).swr}
          top={'0px'}
          height={height}
        />
      ) : null}
      <Main open={open}>{children}</Main>
      {(right as Menu)?.heading !== undefined ? (
        <PopoutDrawer
          rightSide
          width={(left as Menu)?.width}
          open={open.right}
          handleClose={() => {
            setOpen({ ...open, right: false });
          }}
          heading={(right as Menu).heading}
          menu={(right as Menu).menu}
          swr={(right as Menu).swr}
          top={'0px'}
          height={height}
        />
      ) : null}
    </>
  );
}
