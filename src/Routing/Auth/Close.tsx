'use client';

import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAuthentication } from './Router';
export type CloseProps = {};

export default function Close() {
  const authConfig = useAuthentication();

  useEffect(() => {
    window.close();
  }, []);

  return authConfig.close.heading ? <Typography variant='h2'>{authConfig.close.heading}</Typography> : null;
}
