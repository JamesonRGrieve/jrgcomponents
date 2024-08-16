'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode, useEffect, useState } from 'react';
import { useAuthentication } from './Router';
import { toTitleCase } from '../../Form/DynamicForm';
import PasswordField from '../../MUI/Styled/Input/PasswordField';
import assert from '../../utils/Assert';
export type RegisterProps = {
  additionalFields?: string[];
};

export default function Register({ additionalFields }: RegisterProps): ReactNode {
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState('');
  const authConfig = useAuthentication();

  const submitForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));
    const registerResponse = (
      await axios
        .post(`${authConfig.authServer}/v1/user`, {
          ...formData,
        })
        .catch((exception: AxiosError) => exception.response)
    ).data;
    setResponseMessage(registerResponse.detail);
    if (registerResponse.otp_uri) {
      router.push(`/user/login?otp_uri=${registerResponse.otp_uri}`);
    }
  };
  useEffect(() => {
    // TODO Assert that there are no dupes or empty strings in additionalFields (after trimming and lowercasing)
  }, [additionalFields]);
  return (
    <Box component='form' onSubmit={submitForm} display='flex' flexDirection='column' gap='1rem'>
      {authConfig.register.heading && <Typography variant='h2'>{authConfig.register.heading}</Typography>}
      <input type='hidden' id='email' name='email' value={getCookie('email')} />
      {authConfig.authModes.basic && <PasswordField />}
      {additionalFields &&
        additionalFields.length > 0 &&
        additionalFields.map((field) => (
          <TextField key={field} id={field} label={toTitleCase(field)} variant='outlined' name={field} />
        ))}
      <Button type='submit'>Register</Button>
      {responseMessage && <Typography>{responseMessage}</Typography>}
    </Box>
  );
}
