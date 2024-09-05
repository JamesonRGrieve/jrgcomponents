'use client';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import React, { FormEvent, ReactNode, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import DynamicForm, { DynamicFormFieldValueTypes } from '../../Form/DynamicForm';
import { useAuthentication } from './Router';
import { validateURI } from '../../utils/Validation';
import { useAssertion } from '../../utils/Assert';
import PasswordField from '../../MUI/Styled/Input/PasswordField';
import { Separator } from '../../components/ui/separator';
import SwitchDark from '../../Theming/SwitchDark';
import SwitchColorblind from '../../Theming/SwitchColorblind';

export type ManageProps = {
  userDataSWRKey?: string;
  userDataEndpoint?: string;
  userUpdateEndpoint?: string;
  userPasswordChangeEndpoint?: string;
};

type ActivePage = 'Profile' | 'Account' | 'Appearance' | 'Notifications';

export default function Manage({
  userDataSWRKey = '/user',
  userDataEndpoint = '/v1/user',
  userUpdateEndpoint = '/v1/user',
  userPasswordChangeEndpoint = '/v1/user/password',
}: ManageProps): ReactNode {
  const [responseMessage, setResponseMessage] = useState('');
  const [active, setActive] = useState<ActivePage>('Profile');

  type User = {
    missing_requirements?: {
      [key: string]: {
        type: 'number' | 'boolean' | 'text' | 'password';
        value: DynamicFormFieldValueTypes;
        validation?: (value: DynamicFormFieldValueTypes) => boolean;
      };
    };
  };
  const router = useRouter();
  const authConfig = useAuthentication();
  useAssertion(validateURI(authConfig.authServer + userDataEndpoint), 'Invalid identify endpoint.', [
    authConfig.authServer,
    userDataEndpoint,
  ]);
  useAssertion(validateURI(authConfig.authServer + userUpdateEndpoint), 'Invalid identify endpoint.', [
    authConfig.authServer,
    userUpdateEndpoint,
  ]);
  const { data, error, isLoading } = useSWR<User, any, string>(userDataSWRKey, async () => {
    return (
      await axios.get(`${authConfig.authServer}${userDataEndpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookie('jwt'),
        },
        validateStatus: (status) => [200, 403].includes(status),
      })
    ).data;
  });

  return (
    <div className='w-full'>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        <div className='grid w-full max-w-6xl gap-2 mx-auto'>
          {authConfig.manage.heading && <h2 className='text-3xl font-semibold'>{authConfig.manage.heading}</h2>}
        </div>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
          <nav className='flex space-x-2 md:flex-col lg:space-x-0 lg:space-y-1'>
            {['Profile', 'Account', 'Appearance', 'Notifications'].map((label) => (
              <button
                key={label}
                className={
                  'inline-flex items-center justify-start px-4 py-2 text-sm font-medium transition-colors rounded-md disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 hover:bg-muted' +
                  (active === label ? ' bg-muted' : '')
                }
                disabled={label === 'Notifications'}
                onClick={() => setActive(label as ActivePage)}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className=''>
            {active === 'Profile' && (
              <Profile
                {...{
                  isLoading,
                  error,
                  data,
                  router,
                  authConfig,
                  userDataSWRKey,
                  responseMessage,
                  userUpdateEndpoint,
                  setResponseMessage,
                }}
              />
            )}
            {active === 'Account' && <Account {...{ authConfig, data, userPasswordChangeEndpoint, setResponseMessage }} />}
            {active === 'Appearance' && <Appearance />}
            {active === 'Notifications' && <Notifications />}
          </div>
        </div>
      </main>
    </div>
  );
}

const Profile = ({
  isLoading,
  error,
  data,
  router,
  authConfig,
  userDataSWRKey,
  responseMessage,
  userUpdateEndpoint,
  setResponseMessage,
}: {
  isLoading: boolean;
  error: any;
  data: any;
  router: any;
  authConfig: any;
  userDataSWRKey: string;
  responseMessage: string;
  userUpdateEndpoint: string;
  setResponseMessage: (message: string) => void;
}) => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>Apply basic changes to your profile</p>
      </div>
      <Separator className='my-4' />
      {isLoading ? (
        <Typography>Loading Current Data...</Typography>
      ) : error ? (
        <Typography>{error.message}</Typography>
      ) : (data.missing_requirements && Object.keys(data.missing_requirements).length === 0) ||
        !data.missing_requirements ? (
        <DynamicForm
          toUpdate={data}
          submitButtonText='Update'
          excludeFields={['missing_requirements', 'email', 'subscription', 'ip_address']}
          readOnlyFields={['input_tokens', 'output_tokens']}
          additionalButtons={[
            <Button
              key='done'
              sx={{ gridColumn: 'span 2' }}
              onClick={() => {
                router.push('/');
              }}
            >
              Go to {authConfig.appName}
            </Button>,
          ]}
          onConfirm={async (data) => {
            console.log(data);

            const updateResponse = (
              await axios
                .put(
                  `${authConfig.authServer}${userUpdateEndpoint}`,
                  {
                    ...Object.entries(data).reduce((acc, [key, value]) => {
                      return value ? { ...acc, [key]: value } : acc;
                    }, {}),
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: getCookie('jwt'),
                    },
                  },
                )
                .catch((exception: any) => exception.response)
            ).data;
            console.log(updateResponse);
            setResponseMessage(updateResponse.detail.toString());
            await mutate('/user');
          }}
        />
      ) : (
        <>
          <DynamicForm
            submitButtonText='Submit Missing Information'
            fields={Object.entries(data.missing_requirements).reduce((acc, [key, value]) => {
              // @ts-expect-error This is a valid assignment.
              acc[Object.keys(value)[0]] = { type: Object.values(value)[0] };
              return acc;
            }, {})}
            onConfirm={async (data) => {
              console.log(data);
              const updateResponse = (
                await axios
                  .put(
                    `${authConfig.authServer}${userUpdateEndpoint}`,
                    {
                      ...data,
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: getCookie('jwt'),
                      },
                    },
                  )
                  .catch((exception: any) => exception.response)
              ).data;
              if (updateResponse.detail) {
                setResponseMessage(updateResponse.detail.toString());
              }
              await mutate(userDataSWRKey);
              if (data.missing_requirements && Object.keys(data.missing_requirements).length === 0) {
                const redirect = getCookie('href') ?? '/';
                deleteCookie('href');
                router.push(redirect);
              }
            }}
          />
          {responseMessage && <Typography>{responseMessage}</Typography>}
        </>
      )}
    </div>
  );
};

const Account = ({
  authConfig,
  data,
  userPasswordChangeEndpoint = '/v1/user/password',
  setResponseMessage,
}: {
  authConfig: any;
  data: any;
  userPasswordChangeEndpoint?: string;
  setResponseMessage: (message: string) => void;
}) => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Account</h3>
        <p className='text-sm text-muted-foreground'>Update your account information</p>
      </div>
      <Separator className='my-4' />
      {authConfig.authModes.basic && (
        <form
          onSubmit={async (event: FormEvent<HTMLFormElement>): Promise<void> => {
            const formData = Object.fromEntries(new FormData((event.currentTarget as HTMLFormElement) ?? undefined));

            if (!formData['password']) setResponseMessage('Please enter a password.');
            if (!formData['password-again']) setResponseMessage('Please enter your password again.');
            if (formData['password'] !== formData['password-again']) setResponseMessage('Passwords do not match.');
            const passwordResetResponse = await axios
              .put(
                `${authConfig.authServer}${userPasswordChangeEndpoint}`,
                {
                  ...data,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: getCookie('jwt'),
                  },
                },
              )
              .catch((exception: any) => exception.response);
            if (passwordResetResponse.data.detail) {
              setResponseMessage(passwordResetResponse.data.detail.toString());
            }
            if (passwordResetResponse.status === 200) {
              window.location.reload();
            }
          }}
        >
          <PasswordField id='old-password' name='old-password' label='Your Old Password' />
          <PasswordField id='new-password' name='new-password' label='Your New Password' />
          <PasswordField id='new-password-again' name='new-password-again' label='Your New Password (Again)' />
        </form>
      )}
      {
        // TODO MFA management / backup codes.
        // TODO Quota management for user mode.
      }
    </div>
  );
};

const Appearance = () => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Appearance</h3>
        <p className='text-sm text-muted-foreground'>
          Customize the interface. Switch between light and dark mode as well as colorblind mode
        </p>
      </div>
      <Separator className='my-4' />
      <SwitchDark />
      <SwitchColorblind />
    </div>
  );
};

const Notifications = () => {
  return (
    <div>
      <div>
        <h3 className='text-lg font-medium'>Notifications</h3>
        <p className='text-sm text-muted-foreground'>Change your notification preferences</p>
      </div>
      <Separator className='my-4' />
    </div>
  );
};
