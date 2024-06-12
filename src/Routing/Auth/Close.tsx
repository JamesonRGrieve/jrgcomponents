'use client';

import React, { useEffect } from 'react';

const CloseWindow = () => {
  useEffect(() => {
    window.close();
  }, []);

  return <></>;
};
export default CloseWindow;
