'use client';
import { Box, Collapse, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode } from 'react';
import { setCookie } from 'cookies-next';
import { PersonOutline } from '@mui/icons-material';
import Field from '../../MUI/Styled/FormControl/Field';
import IconButton from '../../MUI/Styled/Button/IconButton';
import OAuth from './OAuth';
import { useAuthentication } from './Router';
import assert, { useAssertion } from '../../utils/Assert';
import { validateURI } from '../../utils/Validation';
export type IdentifyProps = {
  identifyEndpoint?: string;
  redirectToOnExists?: string;
  redirectToOnNotExists?: string;
  oAuthOverrides?: any;
};
export default function Identify({
  identifyEndpoint = '/v1/user/exists',
  redirectToOnExists = '/login',
  redirectToOnNotExists = '/register',
  oAuthOverrides = {},
}): ReactNode {
  const router = useRouter();
  const authConfig = useAuthentication();

  useAssertion(validateURI(authConfig.authServer + identifyEndpoint), 'Invalid identify endpoint.', [
    authConfig.authServer,
    identifyEndpoint,
  ]);

  const pathname = usePathname();
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      setLoading(true);
      const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));
      console.log(formData);
      /*
      assert(formData.email, 'Please enter your E-Mail address.');
      assert(
        /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/.test(formData.email.toString()),
        'Invalid e-mail address.',
      );
      */
      const existsResponse = await axios
        .get(`${authConfig.authServer}${identifyEndpoint}?email=${formData.email.toString()}`)
        .catch((exception: AxiosError) => exception.response);
      /*
      assert(
        existsResponse.status === 200,
        'An error occurred while sending your E-Mail address to the server. Please try again later.',
      );
      */
      setCookie('email', formData.email.toString(), { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN });
      console.log(existsResponse.data);
      router.push(`${pathname}${existsResponse.data ? redirectToOnExists : redirectToOnNotExists}`);
      setLoading(false);
    } catch (exception) {
      setLoading(false);
      setError(exception.message);
    }
  };

  return (
    <Box component='form' onSubmit={submitForm} display='flex' flexDirection='column' gap='1rem'>
      {authConfig.identify.heading && <Typography variant='h2'>{authConfig.identify.heading}</Typography>}

      {(authConfig.authModes.basic || authConfig.authModes.magical) && (
        <>
          <Field
            nameID='email'
            label='E-Mail Address'
            autoComplete='username'
            //submit={attemptIdentify}
            placeholder='your@example.com'
            messages={error && [{ level: 'error', value: error }]}
          />
          <Collapse in={!loading}>
            <Box display='flex' flexDirection='column' gap='1rem'>
              <IconButton label='Continue' icon={<PersonOutline fontSize='large' />} iconPosition='left' type='submit' />
            </Box>
          </Collapse>
        </>
      )}
      {authConfig.authModes.oauth2 && <OAuth overrides={oAuthOverrides} />}
    </Box>
  );
}
