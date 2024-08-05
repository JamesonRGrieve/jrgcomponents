'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode, useContext, useState } from 'react';
import { useAuthentication } from './Router';
export type RegisterProps = {};

export default function Register(): ReactNode {
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState('');
  const authConfig = useAuthentication();

  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));
    const registerResponse = (
      await axios
        .post(`${process.env.NEXT_PUBLIC_AGIXT_SERVER}/v1/user`, {
          ...formData,
        })
        .catch((exception: AxiosError) => exception.response)
    ).data;
    setResponseMessage(registerResponse.detail);
    if (registerResponse.otp_uri) {
      router.push(`/user/login?otp_uri=${registerResponse.otp_uri}`);
    }
  };

  return (
    <Box component='form' onSubmit={submitForm} display='flex' flexDirection='column' gap='1rem'>
      {authConfig.register.heading && <Typography variant='h2'>{authConfig.register.heading}</Typography>}

      <input type='hidden' id='email' name='email' value={getCookie('email')} />
      <TextField id='first_name' label='First Name' variant='outlined' name='first_name' />
      <TextField id='last_name' label='Last Name' variant='outlined' name='last_name' />
      <Button type='submit'>Register</Button>
      {responseMessage && <Typography>{responseMessage}</Typography>}
    </Box>
  );
}
