import { ReactNode, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React from 'react';

import PopoutDrawer from './PopoutDrawer';
import PopoutDrawerWrapperAppBarButton from './PopoutDrawerWrapperAppBarButton';

type Menu = {
  heading?: string;
  icon?: ReactNode;
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
  topOffset?: string;
  nestedDepth?: number;
};
export default function MenuWrapper({
  title,
  height,
  left,
  right,
  topOffset = '0px',
  children,
  nestedDepth = 0
}: PopoutDrawerWrapperProps) {
  const MainBox = styled(MuiBox, {
    shouldForwardProp: (prop) => prop !== 'open'
  })(({ theme, open }: { theme?: any; open: {left: boolean, right: boolean} }) => ({
    height: `calc(100% - ${height})`,
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
  })(({ open }: { open:  {left: boolean, right: boolean} }) => ({
    height: height,
    transition: 'width 0.3s ease',
    ...(open.left &&
      !open.right && {
        width: `calc(100% - ${(left as Menu)?.width})`,
        marginLeft: `${(left as Menu)?.width}`
      }),
    ...(open.right &&
      !open.left && {
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
  useEffect(() => {
    console.log('Open State of popout changed: ', open);
  }, [open]);
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
            !open.left ? (
              <PopoutDrawerWrapperAppBarButton
                open={open.left}
                handleOpen={() => {
                  setOpen({ ...open, left: true });
                }}
                side='left'
                heading={(left as Menu)?.heading??""}
                icon={(left as Menu)?.icon??null}
              />
            ) : (
              <Box sx={{ flex: 1 }}></Box>
            )
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
            !open.right ? (
              <PopoutDrawerWrapperAppBarButton
                open={open.right}
                handleOpen={() => {
                  setOpen({ ...open, right: true });
                }}
                side='right'
                heading={(right as Menu)?.heading??""}
                icon={(right as Menu)?.icon??null}
              />
            ) : (
              <Box sx={{ flex: 1 }}></Box>
            )
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
          open={open.left}
          handleClose={() => {
            setOpen({ ...open, left: false });
          }}
          {...(left as Menu)}
          top={topOffset}
          height={height}
          zIndex={1200 - 100 * nestedDepth}
        />
      ) : null}
      <MainBox component='main' open={open}>
        {children}
      </MainBox>
      {(right as Menu)?.heading !== undefined ? (
        <PopoutDrawer
          rightSide
          open={open.right}
          handleClose={() => {
            setOpen({ ...open, right: false });
          }}
          {...(right as Menu)}
          top={topOffset}
          height={height}
          zIndex={1200 - 100 * nestedDepth}
        />
      ) : null}
    </>
  );
}
