'use client';

import React, { ReactNode, useCallback } from 'react';

import OAuth2Login from 'react-simple-oauth2-login';

import IconButton from '../../MUI/Styled/Button/IconButton';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

import providers from './OAuthProviders';

export default function Identify(): ReactNode {
  console.log('OAuth.tsx: Identify()', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  const router = useRouter();
  const onOAuth2 = useCallback(
    (response: any) => {
      console.log('CLOSED POPUP');
      router.push(getCookie('href') ?? '/');
    },
    [router],
  );
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
              scope={provider.scope}
              redirectUri={`http://localhost:3437/user/close/${key.toLowerCase()}`}
              onSuccess={onOAuth2}
              onFailure={onOAuth2}
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
