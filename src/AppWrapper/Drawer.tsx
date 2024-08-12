import { Drawer, List, useMediaQuery } from '@mui/material';
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
  close,
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
  close: () => void;
}) {
  const isMobile = useMediaQuery('(max-width:600px)');

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
          ...(isMobile ? mobileStyles : {}),
        },
      }}
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor={side}
      open={open}
      onClose={() => close()}
    >
      <List sx={{ direction: 'ltr', padding: '0' }}>
        <MenuSWR swr={swr} menu={menu} />
      </List>
    </Drawer>
  );
}

const mobileStyles = {
  height: '100%',
  position: 'fixed',
  bottom: '0',
  top: '0',
  paddingTop: 'env(safe-area-inset-top)',
  paddingBottom: 'env(safe-area-inset-bottom)',
};
