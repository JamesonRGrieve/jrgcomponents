'use client';

import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    deleteCookie('jwt');
    router.push('/');
  }, []);

  return <></>;
};
export default Logout;
