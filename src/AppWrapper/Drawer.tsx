'use client';

import React, { useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const drawerClasses = `
    ${isMobile ? 'fixed' : 'absolute'}
    ${side}-0
    bg-white
    overflow-y-auto
    transition-transform
    duration-300
    ease-in-out
    ${open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'}
  `;

  const overlayClasses = 'fixed inset-0 bg-black bg-opacity-50';

  return (
    <>
      {isMobile && open && <div className={overlayClasses} style={{ zIndex: zIndex - 1 }} onClick={close} />}
      <div
        className={drawerClasses}
        style={{
          width,
          top: topSpacing,
          bottom: bottomSpacing ?? '0',
          zIndex,
          paddingTop: isMobile ? 'env(safe-area-inset-top)' : undefined,
          paddingBottom: isMobile ? 'env(safe-area-inset-bottom)' : undefined,
        }}
      >
        <ul className='p-0 m-0 list-none'>
          <MenuSWR swr={swr} menu={menu} />
        </ul>
      </div>
    </>
  );
}
