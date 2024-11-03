'use client';
import { Box, Collapse, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { PersonOutline } from '@mui/icons-material';
import IconButton from '../../MUI/Styled/Button/IconButton';
import OAuth from './OAuth';
import { useAuthentication } from './Router';
import { useAssertion } from '../../utils/Assert';
import { validateURI } from '../../utils/Validation';
import { Separator } from '../../components/ui/separator';
import TextField from '../../MUI/Styled/Input/TextField';
import AuthCard from './AuthCard';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid E-Mail address.' }),
  redirectTo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export type IdentifyProps = {
  identifyEndpoint?: string;
  redirectToOnExists?: string;
  redirectToOnNotExists?: string;
  oAuthOverrides?: any;
};

export default function Identify({
  identifyEndpoint = '/v1/user/exists',
  redirectToOnExists = '/login',
  redirectToOnNotExists = '/register', // TODO Default this to /register if in basic mode, and /login in magical mode
  oAuthOverrides = {},
}): ReactNode {
  const router = useRouter();
  const authConfig = useAuthentication();
  const pathname = usePathname();
  console.log('TEST');
  useAssertion(validateURI(authConfig.authServer + identifyEndpoint), 'Invalid identify endpoint.', [
    authConfig.authServer,
    identifyEndpoint,
  ]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      const existsResponse = await axios.get(`${authConfig.authServer}${identifyEndpoint}?email=${formData.email}`);

      setCookie('email', formData.email, { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN });
      router.push(`${pathname}${existsResponse.data ? redirectToOnExists : redirectToOnNotExists}`);
    } catch (exception) {
      const axiosError = exception as AxiosError;
      setError('email', { type: 'server', message: axiosError.message });
    }
  };

  const showEmail = authConfig.authModes.basic || authConfig.authModes.magical;
  const showOAuth = authConfig.authModes.oauth2;
  // This logic is insufficient

  return (
    <AuthCard title='Welcome' description='Please choose an authentication method.'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {/* <div className='text-center'>
          {authConfig.identify.heading && <h2 className='text-3xl font-bold'>{authConfig.identify.heading}</h2>}
          {showEmail && showOAuth && (
            <p className='my-2 text-balance text-muted-foreground'>Please choose from one of the following</p>
          )}
        </div> */}

        {showEmail && (
          <>
            <TextField
              id='email'
              label='E-Mail Address'
              autoComplete='username'
              placeholder='your@example.com'
              error={errors.email?.message}
              {...register('email')}
            />
            <Collapse in={!isSubmitting}>
              <Box display='flex' flexDirection='column' gap='1rem'>
                <IconButton
                  label='Continue with Email'
                  icon={<PersonOutline fontSize='large' />}
                  iconPosition='left'
                  type='submit'
                />
              </Box>
            </Collapse>
          </>
        )}

        {showEmail && showOAuth ? (
          <div className='flex items-center gap-2 my-2'>
            <Separator className='flex-1' />
            <span>or</span>
            <Separator className='flex-1' />
          </div>
        ) : null}

        {showOAuth && <OAuth overrides={oAuthOverrides} />}
      </form>
    </AuthCard>
  );
}
