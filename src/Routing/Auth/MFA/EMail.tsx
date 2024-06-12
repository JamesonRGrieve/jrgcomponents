'use client';
import { CheckCircle, VpnKey } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { getCookie } from 'cookies-next';
import log from '../../../Logging/log';
import Field from '../../../MUI/Styled/FormControl/Field';
import IconButton from '../../../MUI/Styled/Button/IconButton';

export type RegisterFormProps = object;
export default function VerifyEmail({ verifiedCallback }: { verifiedCallback: any }): JSX.Element {
  const [fields, setFields] = useState({
    emailCode: '',
  });
  const [errors, setErrors] = useState({
    emailCode: '',
  });
  const [emailVerified, setEmailVerified] = useState(false);
  async function attemptEmail() {
    const emailResponse = (
      await axios.post(
        `/api/email`,
        {
          email: getCookie('email'),
          mfa_token: fields.emailCode,
        },
        {},
      )
    ).data.detail;
    //console.log(emailResponse);
    if (emailResponse.toLowerCase() === 'true') {
      verifiedCallback(true);
      setEmailVerified(true);
    } else {
      log(`Email verification of ${getCookie('email')} failed.`, process.env.NEXT_PUBLIC_LOG_VERBOSITY_CLIENT, 2);
      setErrors({
        ...errors,
        emailCode: 'Email verification failed.',
      });
    }
  }

  return (
    <>
      <Box>
        <Typography variant='h5' align='center' py='1rem'>
          Email Verification
        </Typography>
        {!emailVerified && (
          <Typography variant='body1' py='0.5rem'>
            An email with a code was sent to {getCookie('email')}. Please enter the code below.
          </Typography>
        )}
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {emailVerified ? (
          <CheckCircle sx={{ fontSize: '5rem' }} />
        ) : (
          <>
            <Field
              nameID='email-code-input'
              label='EMail Code'
              //autoComplete='email-code'
              value={fields.emailCode}
              onChange={(e: any) => setFields({ ...fields, emailCode: e.target.value })}
              //submit={null}
              //error={errors.emailCode}
            />
            <IconButton label='Verify Email' icon={<VpnKey fontSize='large' />} onClick={attemptEmail} />
          </>
        )}
      </Box>
    </>
  );
}
