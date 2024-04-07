import { Drawer, List } from '@mui/material';
import React from 'react';
import MenuSWR from '../SWR/MenuSWR';

export default function PopoutDrawer({
  open,
  side,
  width,
  menu,
  swr,
  topSpacing,
  bottomSpacing,
  zIndex,
}: {
  open: any;
  side: 'left' | 'right';
  width: any;
  menu: any;
  swr: any;
  topSpacing: string;
  edgeSpacing?: string;
  bottomSpacing?: string;
  zIndex: any;
}) {
  return (
    <Drawer
      sx={{
        direction: side == 'right' ? 'lrt' : 'rtl',
        width: width,
        flexShrink: 0,
        zIndex: zIndex,
        '& .MuiDrawer-paper': {
          height: 'unset',
          width: width,
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: bottomSpacing ?? '0',
          left: side == 'left' ? '0' : 'unset',
          right: side == 'right' ? '0' : 'unset',
          top: topSpacing,
          overflowY: 'auto',
        },
      }}
      variant='persistent'
      anchor={side}
      open={open}
    >
      <List sx={{ direction: 'ltr', padding: '0' }}>
        <MenuSWR swr={swr} menu={menu} />
      </List>
    </Drawer>
  );
}
