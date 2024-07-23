'use client';

import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

export type LogoutProps = { redirectTo?: string };

const Logout = ({ redirectTo = '/' }: LogoutProps): ReactNode => {
  const router = useRouter();
  useEffect(() => {
    deleteCookie('jwt');
    router.push(redirectTo);
  }, [router, redirectTo]);

  return null;
};
export default Logout;
