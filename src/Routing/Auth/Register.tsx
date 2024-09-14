'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode, useEffect, useState } from 'react';
import { useAuthentication } from './Router';
import { toTitleCase } from '../../Form/DynamicForm';
import PasswordField from '../../MUI/Styled/Input/PasswordField';
import { ReCAPTCHA } from 'react-google-recaptcha';
import assert, { useAssertion } from '../../utils/Assert';
import { validateURI } from '../../utils/Validation';
import AuthCard from './AuthCard';

export type RegisterProps = {
  additionalFields?: string[];
  userRegisterEndpoint?: string;
};

export default function Register({ additionalFields, userRegisterEndpoint = '/v1/user' }: RegisterProps): ReactNode {
  const router = useRouter();
  const [captcha, setCaptcha] = useState<string | null>(null);

  const [responseMessage, setResponseMessage] = useState('');
  const authConfig = useAuthentication();
  useAssertion(validateURI(authConfig.authServer + userRegisterEndpoint), 'Invalid login endpoint.', [
    authConfig.authServer,
    userRegisterEndpoint,
  ]);
  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (authConfig.recaptchaSiteKey && !captcha) {
      setResponseMessage('Please complete the reCAPTCHA.');
      return;
    }
    const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));
    if (authConfig.authModes.basic) {
      if (!formData['password']) setResponseMessage('Please enter a password.');
      if (!formData['password-again']) setResponseMessage('Please enter your password again.');
      if (formData['password'] !== formData['password-again']) setResponseMessage('Passwords do not match.');
    }

    const registerResponse = (
      await axios
        .post(`${authConfig.authServer}${userRegisterEndpoint}`, {
          ...formData,
        })
        .catch((exception: AxiosError) => exception.response)
    ).data;
    // TODO Check for status 418 which is app disabled by admin.
    setResponseMessage(registerResponse.detail);
    if (registerResponse.otp_uri) {
      router.push(`/user/login?otp_uri=${registerResponse.otp_uri}`);
    }
  };
  useEffect(() => {
    // TODO Assert that there are no dupes or empty strings in additionalFields (after trimming and lowercasing)
  }, [additionalFields]);
  return (
    <AuthCard title='Create Account' description='Welcome, please complete your registration.' showBackButton>
      <form onSubmit={submitForm} className='flex flex-col gap-4'>
        {/* {authConfig.register.heading && <Typography variant='h2'>{authConfig.register.heading}</Typography>} */}

        <input type='hidden' id='email' name='email' value={getCookie('email')} />
        {authConfig.authModes.basic && (
          <>
            <PasswordField />
            <PasswordField id='password-again' name='password-again' label='Password (Again)' />
          </>
        )}
        {additionalFields &&
          additionalFields.length > 0 &&
          additionalFields.map((field) => (
            <TextField key={field} id={field} label={toTitleCase(field)} variant='outlined' name={field} />
          ))}
        {authConfig.recaptchaSiteKey && (
          <Box
            sx={{
              my: '0.8rem',
            }}
          >
            <ReCAPTCHA
              sitekey={authConfig.recaptchaSiteKey}
              onChange={(token: string | null) => {
                setCaptcha(token);
              }}
            />
          </Box>
        )}
        <Button type='submit'>Register</Button>
        {responseMessage && <AuthCard.ResponseMessage>{responseMessage}</AuthCard.ResponseMessage>}
      </form>
    </AuthCard>
  );
}
