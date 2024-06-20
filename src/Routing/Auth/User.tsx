'use client';
import { Box, Collapse } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { FormEvent, ReactNode } from 'react';
import { setCookie } from 'cookies-next';
import OAuth from './OAuth';
import Field from '../../MUI/Styled/FormControl/Field';
import IconButton from '../../MUI/Styled/Button/IconButton';
import { PersonOutline } from '@mui/icons-material';

export default function Identify(): ReactNode {
  const router = useRouter();
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
        .get(`${process.env.NEXT_PUBLIC_AUTH_SERVER}/v1/user/exists?email=${formData.email.toString()}`)
        .catch((exception: AxiosError) => exception.response);
      /*
      assert(
        existsResponse.status === 200,
        'An error occurred while sending your E-Mail address to the server. Please try again later.',
      );
      */
      setCookie('email', formData.email.toString(), { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN });
      console.log(existsResponse.data);
      router.push(`${pathname}/${existsResponse.data ? 'login' : 'register'}`);
      setLoading(false);
    } catch (exception) {
      setLoading(false);
      setError(exception.message);
    }
  };

  return (
    <Box component='form' onSubmit={submitForm} display='flex' flexDirection='column' gap='1rem'>
      {process.env.NEXT_PUBLIC_ALLOW_EMAIL_SIGN_IN === 'true' && (
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
      <OAuth />
    </Box>
  );
}
