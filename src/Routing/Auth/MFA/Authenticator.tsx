'use client';
import { VpnKey, CheckCircle } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { deleteCookie, getCookie } from 'cookies-next';
import Field from '../../../MUI/Styled/FormControl/Field';
import IconButton from '../../../MUI/Styled/Button/IconButton';
import log from '../../../Logging/log';

export type RegisterFormProps = object;
export default function VerifyAuthenticator({ verifiedCallback }: { verifiedCallback: any }): JSX.Element {
  const [fields, setFields] = useState({
    token: '',
  });
  const [errors, setErrors] = useState({
    token: '',
  });
  const [totpVerified, setTotpVerified] = useState(false);
  const totpUri = getCookie('totpUri');

  async function attemptTotp(): Promise<void> {
    try {
      const response = await axios.post(`/api/mfa`, {
        email: getCookie('email'),
        mfa_token: fields.token,
      });
      const totpResponse = response.data.detail;
      // console.log(totpResponse);
      if (totpResponse.toLowerCase() === 'true') {
        verifiedCallback(true);
        setTotpVerified(true);
        deleteCookie('totpUri');
      } else {
        log(`TOTP verification of ${getCookie('email')} failed.`, process.env.NEXT_PUBLIC_LOG_VERBOSITY_CLIENT, 2);
        setErrors({
          ...errors,
          token: 'TOTP verification failed.',
        });
      }
    } catch (error) {
      console.error('Error verifying TOTP:', error);
      setErrors({
        ...errors,
        token: 'Error during TOTP verification.',
      });
    }
  }

  return (
    <>
      <Box>
        <Typography variant='h5' align='center' py='1rem'>
          Authenticator App Verification
        </Typography>
        {!totpVerified && (
          <>
            <Typography variant='body1' py='0.5rem'>
              Please add the following QR code to your authenticator app of choice and enter the code below.
            </Typography>
            <Box sx={{ height: 'auto', margin: '0 auto', maxWidth: 256, width: '100%' }}>
              <QRCode
                size={256}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={totpUri ?? ''}
                viewBox={`0 0 256 256`}
              />
            </Box>
          </>
        )}
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {totpVerified ? (
          <CheckCircle sx={{ fontSize: '5rem' }} />
        ) : (
          <>
            <Field
              nameID='totp-input'
              label='MFA Code'
              //autoComplete='one-time-code'
              value={fields.token}
              onChange={(e: any) => setFields({ ...fields, token: e.target.value })}
              //submit={null}
              //error={errors.token}
            />
            <IconButton label='Verify MFA' icon={<VpnKey fontSize='large' />} onClick={attemptTotp} />
          </>
        )}
      </Box>
    </>
  );
}
