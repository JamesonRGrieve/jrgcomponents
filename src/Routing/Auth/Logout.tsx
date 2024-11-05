'use client';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAuthentication } from './Router';

export type LogoutProps = { 
  redirectTo?: string 
};

export default function Logout({ redirectTo = '/' }: LogoutProps): ReactNode {
  const router = useRouter();
  const authConfig = useAuthentication();

  useEffect(() => {
    deleteCookie('jwt', {
      path: '/',
      domain: window.location.hostname,
      secure: true,
      sameSite: 'strict'
    });
    localStorage.removeItem('jwt');
    router.refresh();
    router.push(redirectTo);
  }, [router, redirectTo]);

  return authConfig.logout.heading ? (
    <Typography variant='h2'>{authConfig.logout.heading}</Typography>
  ) : null;
}