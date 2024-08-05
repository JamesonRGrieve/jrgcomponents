'use client';

import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAuthentication } from './Router';

export type LogoutProps = { redirectTo?: string };

const Logout = ({ redirectTo = '/' }: LogoutProps): ReactNode => {
  const router = useRouter();
  const authConfig = useAuthentication();

  useEffect(() => {
    deleteCookie('jwt');
    router.push(redirectTo);
  }, [router, redirectTo]);

  return authConfig.logout.heading ? <Typography variant='h2'>{authConfig.logout.heading}</Typography> : <></>;
  null;
};
export default Logout;
