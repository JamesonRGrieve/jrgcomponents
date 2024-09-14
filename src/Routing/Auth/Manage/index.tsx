'use client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { ReactNode, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { DynamicFormFieldValueTypes } from '../../../Form/DynamicForm';
import { useAuthentication } from '../Router';
import { validateURI } from '../../../utils/Validation';
import { useAssertion } from '../../../utils/Assert';
import { Button } from '../../../components/ui/button';
import { Profile } from './Profile';
import { Account } from './Account';
import { Appearance } from './Appearance';
import { Notifications } from './Notifications';

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
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-transparent p-4 md:gap-8 md:p-10'>
        <div className='flex justify-between w-full max-w-6xl gap-2 mx-auto'>
          {authConfig.manage.heading && <h2 className='text-3xl font-semibold'>{authConfig.manage.heading}</h2>}
          <Button
            key='done'
            onClick={() => {
              router.push('/');
            }}
          >
            Go to {authConfig.appName}
          </Button>
        </div>
        <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
          <Nav {...{ active, setActive }} />
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

const Nav = ({ active, setActive }: { active: ActivePage; setActive: (page: ActivePage) => void }) => {
  return (
    <nav className='flex space-x-2 md:flex-col lg:space-x-0 lg:space-y-1'>
      {['Profile', 'Account', 'Appearance', 'Notifications'].map((label) => (
        <Button
          key={label}
          variant='ghost'
          className={'justify-start' + (active === label ? ' bg-muted' : '')}
          disabled={label === 'Notifications'}
          onClick={() => setActive(label as ActivePage)}
        >
          {label}
        </Button>
      ))}
    </nav>
  );
};
