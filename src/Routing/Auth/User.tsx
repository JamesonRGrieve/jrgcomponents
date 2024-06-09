'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode } from 'react';
import { setCookie } from 'cookies-next';

export default function Identify(): ReactNode {
  const router = useRouter();
  const [error, setError] = React.useState<string>('');
  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));
    const existsResponse = await axios
      .get(`${process.env.NEXT_PUBLIC_AGIXT_SERVER}/v1/user/exists?email=${formData.email.toString()}`)
      .catch((exception: AxiosError) => exception.response);
    console.log(existsResponse);
    if (existsResponse.status !== 200) {
      setError('An error occurred. Please try again later.');
    } else {
      try {
        setCookie('email', formData.email.toString(), { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN });
        router.push(existsResponse.data ? '/user/login' : '/user/register');
      } catch (exception) {
        console.error(exception);
      }
    }
  };

  return (
    <Box component='form' onSubmit={submitForm} display='flex' flexDirection='column' gap='1rem'>
      <TextField id='email' label='E-Mail Address' variant='outlined' name='email' />
      {error && <Typography>{error}</Typography>}
      <Button type='submit'>Continue</Button>
    </Box>
  );
}
