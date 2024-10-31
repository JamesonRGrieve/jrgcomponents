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
  open: boolean;
  side: 'left' | 'right';
  width: string;
  menu: any;
  swr: any;
  topSpacing: string;
  bottomSpacing?: string;
  zIndex: number;
  close: () => void;
}) {
  const isMobile = window.innerWidth <= 600;

  const drawerStyles = {
    width: width,
    top: topSpacing,
    bottom: bottomSpacing ?? '0',
    zIndex: zIndex,
    transform: open
      ? 'translateX(0)'
      : side === 'left'
        ? 'translateX(-100vw)' // Moves the closed drawer completely off the screen to the left
        : 'translateX(100vw)', // Moves the closed drawer completely off the screen to the right
    transition: 'transform 0.3s ease-in-out',
    position: 'absolute' as const,
    [side]: '0',
    overflowY: 'auto' as const,
    boxSizing: 'border-box' as const,
    backgroundColor: 'white',
    ...(isMobile
      ? {
          height: '100%',
          position: 'fixed' as const,
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }
      : {}),
  };

  const overlayStyles = {
    position: 'fixed' as const,
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: zIndex - 1,
  };

  return (
    <>
      {isMobile && open && <div style={overlayStyles} onClick={close} />}
      <div style={drawerStyles}>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          <MenuSWR swr={swr} menu={menu} />
        </ul>
      </div>
    </>
  );
}
