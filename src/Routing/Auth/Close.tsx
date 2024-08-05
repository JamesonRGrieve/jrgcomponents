'use client';

import React, { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAuthentication } from './Router';
export type CloseProps = {};

const CloseWindow = () => {
  const authConfig = useAuthentication();

  useEffect(() => {
    window.close();
  }, []);

  return authConfig.close.heading ? <Typography variant='h2'>{authConfig.close.heading}</Typography> : <></>;
};
export default CloseWindow;
