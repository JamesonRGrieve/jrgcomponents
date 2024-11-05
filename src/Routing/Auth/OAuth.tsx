'use client';

import React, { ReactNode, useCallback, useContext, useMemo } from 'react';
import deepMerge from '../../utils/Merge';
import OAuth2Login from 'react-simple-oauth2-login';

import { useRouter } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import IconButton from '../../MUI/Styled/Button/IconButton';

import providers from './OAuthProviders';
export type OAuthProps = {
  overrides?: any;
};
export default function OAuth({ overrides }: OAuthProps): ReactNode {
  const router = useRouter();
  const oAuthProviders = useMemo(() => deepMerge(providers, overrides) as typeof providers, [providers, overrides]);
  console.log('OAuth Providers: ', oAuthProviders);
  const onOAuth2 = useCallback(
    (response: any) => {
      const redirect = getCookie('href') ?? '/';
      deleteCookie('href');
      router.push(redirect);
    },
    [router],
  );
  //console.log('OAuth Providers: ');
  //console.log(oAuthProviders);
  /*
  // Eventually automatically launch if it's the only provider.
  useEffect(() => {
    if (Object.values(providers).filter((provider) => provider.client_id).length === 1) {
      
    }
  }, []);
  */
  return (
    <>
      {Object.values(oAuthProviders).some((provider) => provider.client_id) &&
        process.env.NEXT_PUBLIC_ALLOW_EMAIL_SIGN_IN === 'true' && <hr />}
      {Object.entries(oAuthProviders).map(
        ([key, provider]) =>
          provider.client_id && (
            <OAuth2Login
              key={key}
              authorizationUrl={provider.uri}
              responseType='code'
              clientId={provider.client_id}
              scope={provider.scope}
              redirectUri={`${process.env.NEXT_PUBLIC_AUTH_WEB}/close/${key.replaceAll('.', '-').replaceAll(' ', '-').replaceAll('_', '-').toLowerCase()}`}
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
