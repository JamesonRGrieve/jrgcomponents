'use client';

import React, { useContext, useEffect } from 'react';
import { AuthenticationContext } from './Router';
import { Typography } from '@mui/material';
const CloseWindow = () => {
  const authConfig = useContext(AuthenticationContext);

  useEffect(() => {
    window.close();
  }, []);

  return authConfig.close.heading ? <Typography variant='h2'>{authConfig.close.heading}</Typography> : <></>;
};
export default CloseWindow;
