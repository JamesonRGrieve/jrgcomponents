'use client';
import { ContentCopyOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useContext, FormEvent, ReactNode, useState } from 'react';
import QRCode from 'react-qr-code';
import { AuthenticationContext } from './Router';

export default function Login({ searchParams }: { searchParams: any }): ReactNode {
  const [responseMessage, setResponseMessage] = useState('');
  const authConfig = useContext(AuthenticationContext);
  const router = useRouter();
  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));
    try {
      const response = await axios
        .post(`${process.env.NEXT_PUBLIC_AGIXT_SERVER}/v1/login`, {
          ...formData,
          referrer: getCookie('href') ?? window.location.href.split('?')[0],
        })
        .catch((exception: AxiosError) => exception.response);
      if (response.status !== 200) {
        setResponseMessage(response.data.detail);
      } else {
        if (
          // /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(
          !response.data.detail.includes(' ')
        ) {
          console.log('Is URI.');
          router.push(response.data.detail);
        } else {
          console.log('Is not URI.');
          setResponseMessage(response.data.detail);
        }
      }
    } catch (exception) {
      console.error(exception);
    }
  };
  const otp_uri = searchParams.otp_uri;
  return (
    <Box component='form' onSubmit={submitForm} display='flex' flexDirection='column' gap='1rem'>
      {authConfig.login.heading && <Typography variant='h2'>{authConfig.login.heading}</Typography>}
      {otp_uri && !responseMessage && (
        <Box sx={{ backgroundColor: '#fff', padding: '0.5rem', maxWidth: '320px' }}>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={otp_uri ?? ''}
            viewBox={`0 0 256 256`}
          />
          <Typography>
            Scan the above QR code with Microsoft Authenticator, Google Authenticator or equivalent (or click the copy button
            if you are using your Authenticator device).{' '}
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(otp_uri);
              }}
            >
              <ContentCopyOutlined />
            </IconButton>
          </Typography>
        </Box>
      )}
      <input type='hidden' id='email' name='email' value={getCookie('email')} />
      <TextField id='token' label='Multi-Factor Code' variant='outlined' name='token' />
      {responseMessage && <Typography>{responseMessage}</Typography>}
      <Button type='submit'>{responseMessage ? 'Continue' : 'Login'}</Button>
    </Box>
  );
}
