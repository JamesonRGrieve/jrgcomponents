'use client';

import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { AuthenticationContext } from './Router';

const CloseWindow = () => {
  const authConfig = useContext(AuthenticationContext);

  useEffect(() => {
    window.close();
  }, []);

  return authConfig.close.heading ? <Typography variant='h2'>{authConfig.close.heading}</Typography> : <></>;
};
export default CloseWindow;
