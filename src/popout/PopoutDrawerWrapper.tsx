import { ReactNode, useState } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
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
  title: string;
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
    shouldForwardProp: (prop) => prop !== 'openLeft' && prop !== 'openRight'
  })(
    ({
      theme,
      openLeft,
      openRight
    }: {
      theme?: any;
      openLeft: any;
      openRight: any;
    }) => ({
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      ...(openLeft && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: `${(left as Menu)?.width}`
      }),
      ...(openRight && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: (left as Menu)?.width
      })
    })
  );
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'openLeft' && prop !== 'openRight'
  })(({ openLeft, openRight }: { openLeft: any; openRight: any }) => ({
    height: height,
    ...(openLeft && {
      width: `calc(100% - ${(left as Menu)?.width})`,
      marginLeft: `${(left as Menu)?.width}`
    }),
    ...(openRight && {
      width: `calc(100% - ${(right as Menu)?.width})`,
      marginRight: `${(right as Menu)?.width}`
    }),
    ...(openLeft &&
      openRight && {
        width: `calc(100% - ${(right as Menu)?.width}px - ${(left as Menu)?.width}px)`
      })
  }));
  const [openLeft, setOpenLeft] = useState(Boolean((left as Menu)?.width));
  const handleDrawerOpenLeft = () => {
    setOpenLeft(true);
  };
  const handleDrawerCloseLeft = () => {
    setOpenLeft(false);
  };
  const [openRight, setOpenRight] = useState(Boolean((right as Menu)?.heading));
  const handleDrawerOpenRight = () => {
    setOpenRight(true);
  };
  const handleDrawerCloseRight = () => {
    setOpenRight(false);
  };
  return (
    <>
      <AppBar position='relative' openLeft={openLeft} openRight={openRight}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", height: "100%" }}>
          {(left as Menu)?.heading !== undefined ?
          <PopoutDrawerWrapperAppBarButton
            open={openLeft}
            handleOpen={handleDrawerOpenLeft}
            side='left'
            heading={(left as Menu)?.heading}
          /> : <Box sx={{flex: 1, ml: "1rem"}}>{left as ReactNode}</Box>} 
          <Typography variant='h6' component='h1' noWrap>
            {title}
          </Typography>
          {(right as Menu)?.heading !== undefined ?
          <PopoutDrawerWrapperAppBarButton
            open={openRight}
            handleOpen={handleDrawerOpenRight}
            side='right'
            heading={(right as Menu)?.heading}
          /> : <Box sx={{flex: 1, display: "flex", justifyContent: "flex-end", mr: "1rem"}}>{right as ReactNode}</Box>}
        </Box>
      </AppBar>
      {(left as Menu)?.heading !== undefined ? (
        <PopoutDrawer
          side='left'
          width={(left as Menu)?.width}
          open={openLeft}
          handleClose={handleDrawerCloseLeft}
          heading={(left as Menu).heading}
          menu={(left as Menu).menu}
          swr={(left as Menu).swr}
          top={"0px"}
          height={height}
        />
      ) : null}
      <Main openLeft={openLeft} openRight={openRight}>
        {children}
      </Main>
      {(right as Menu)?.heading !== undefined ? (
        <PopoutDrawer
          side='right'
          width={(left as Menu)?.width}
          open={openRight}
          handleClose={handleDrawerCloseRight}
          heading={(right as Menu).heading}
          menu={(right as Menu).menu}
          swr={(right as Menu).swr}
          top={"0px"}
          height={height}
        />
      ) : null}
    </>
  );
}
