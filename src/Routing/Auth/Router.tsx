'use client';
// Use in ./app/user/[[...slug]]/page.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { notFound } from 'next/navigation';
import User, { IdentifyProps } from './Identify';
import Login, { LoginProps } from './Login';
import Manage, { ManageProps } from './Manage';
import Register, { RegisterProps } from './Register';
import Close, { CloseProps } from './Close';
import Logout, { LogoutProps } from './Logout';
import Subscribe, { SubscribeProps } from './Subscribe';
import { AuthenticationContext } from './AuthenticationContext';
import { assert } from '../../utils/Assert';

type RouterPageProps = {
  path: string;
  heading?: string;
};
export type AuthenticationConfig = {
  identify: RouterPageProps & { props?: IdentifyProps };
  login: RouterPageProps & { props?: LoginProps };
  manage: RouterPageProps & { props?: ManageProps };
  register: RouterPageProps & { props?: RegisterProps };
  close: RouterPageProps & { props?: CloseProps };
  subscribe: RouterPageProps & { props?: SubscribeProps };
  logout: RouterPageProps & { props: LogoutProps };
  authModes: {
    basic: boolean;
    oauth2: boolean;
    magical: boolean;
  };
  authServer: string;
  appName: string;
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  assert(context.authModes.basic !== context.authModes.magical, 'Basic and Magical modes cannot both be enabled.');
  if (context === undefined) {
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
  }
  return context;
};
const pageConfigDefaults: AuthenticationConfig = {
  identify: {
    path: '/',
    heading: 'Please Enter Your E-Mail Address',
  },
  login: {
    path: '/login',
    heading: 'Welcome Back, Please Authenticate',
  },
  manage: {
    path: '/manage',
    heading: 'Account Management',
  },
  register: {
    path: '/register',
    heading: 'Welcome, Please Register',
  },
  close: {
    path: '/close',
    heading: '',
  },
  subscribe: {
    path: '/subscribe',
    heading: 'Please Subscribe to Access The Application',
  },
  logout: {
    path: '/logout',
    props: undefined,
    heading: '',
  },
  authModes: {
    basic: process.env.NEXT_PUBLIC_ALLOW_EMAIL_SIGN_IN === 'true',
    oauth2: true,
    magical: true,
  },
  authServer: process.env.NEXT_PUBLIC_AUTH_SERVER,
  appName: process.env.NEXT_PUBLIC_APP_NAME,
};
export default function AuthRouter({
  params,
  searchParams,
  corePagesConfig = pageConfigDefaults,
  additionalPages = {},
}: {
  params: { slug?: string[] };
  searchParams: any;
  corePagesConfig?: AuthenticationConfig;
  additionalPages: { [key: string]: ReactNode };
}) {
  // TODO If we're doing this, these probably don't need to be in context, which can be used for just enabled modes etc.
  const pages = {
    [corePagesConfig.identify.path]: <User {...corePagesConfig.identify.props} />,
    [corePagesConfig.login.path]: <Login searchParams={searchParams} {...corePagesConfig.login.props} />,
    [corePagesConfig.manage.path]: <Manage {...corePagesConfig.manage.props} />,
    [corePagesConfig.register.path]: <Register {...corePagesConfig.register.props} />,
    [corePagesConfig.close.path]: <Close {...corePagesConfig.close.props} />,
    [corePagesConfig.subscribe.path]: <Subscribe searchParams={searchParams} {...corePagesConfig.subscribe.props} />,
    [corePagesConfig.logout.path]: <Logout {...corePagesConfig.logout.props} />,
    ...additionalPages,
  };

  const path = params.slug ? `/${params.slug.join('/')}` : '/';
  if (path in pages || path.startsWith(corePagesConfig.close.path)) {
    return (
      <AuthenticationContext.Provider value={{ ...pageConfigDefaults, ...corePagesConfig }}>
        {/* TODO Needs to be deep merged. */}
        {path.startsWith(corePagesConfig.close.path) ? pages[corePagesConfig.close.path] : pages[path.toString()]}
      </AuthenticationContext.Provider>
    );
  } else {
    return notFound();
  }
}
