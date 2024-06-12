'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode } from 'react';
import { setCookie } from 'cookies-next';
import OAuth2Login from 'react-simple-oauth2-login';
import { access } from 'fs';
import { GitHub, Google } from '@mui/icons-material';

const onOAuth2Success = (response: any) => console.log(response);
const onOAuth2Failure = (response: any) => console.error(response);

const providers = {
  GitHub: {
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    uri: '',
    params: {},
    icon: <GitHub />,
  },
  Google: {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    uri: 'https://accounts.google.com/o/oauth2/v2/auth',
    params: {
      access_type: 'offline',
    },
    icon: <Google />,
  },
};

export default function Identify(): ReactNode {
  console.log('OAuth.tsx: Identify()', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  return Object.entries(providers).map(
    ([key, provider]) =>
      provider.client_id && (
        <OAuth2Login
          key={key}
          authorizationUrl={provider.uri}
          responseType='code'
          clientId={provider.client_id}
          scope='profile https://www.googleapis.com/auth/gmail.send'
          redirectUri='http://localhost:3437/user/oauth'
          onSuccess={onOAuth2Success}
          onFailure={onOAuth2Failure}
          extraParams={provider.params}
          isCrossOrigin
          render={(renderProps) => (
            <Button onClick={renderProps.onClick} sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              {provider.icon} Login with {key}
            </Button>
          )}
        />
      ),
  );
}
