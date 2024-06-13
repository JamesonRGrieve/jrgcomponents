'use client';

import React, { ReactNode } from 'react';

import OAuth2Login from 'react-simple-oauth2-login';
import { GitHub, Google } from '@mui/icons-material';
import IconButton from '../../MUI/Styled/Button/IconButton';
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
  return (
    <>
      {Object.values(providers).some((provider) => provider.client_id) && <hr />}
      {Object.entries(providers).map(
        ([key, provider]) =>
          provider.client_id && (
            <OAuth2Login
              key={key}
              authorizationUrl={provider.uri}
              responseType='code'
              clientId={provider.client_id}
              scope='profile email https://www.googleapis.com/auth/gmail.send'
              redirectUri='http://localhost:3437/user/close'
              onSuccess={onOAuth2Success}
              onFailure={onOAuth2Failure}
              extraParams={provider.params}
              isCrossOrigin
              render={(renderProps) => (
                <IconButton
                  label={`Login with ${key}`}
                  icon={provider.icon}
                  iconPosition='left'
                  onClick={renderProps.onClick}
                />
              )}
            />
          ),
      )}
    </>
  );
}
