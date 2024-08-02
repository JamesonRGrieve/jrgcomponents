// Use in ./app/user/[[...slug]]/page.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { notFound } from 'next/navigation';
import User from './User';
import Login from './Login';
import Manage from './Manage';
import Register from './Register';
import Close from './Close';
import Logout, { LogoutProps } from './Logout';
import Subscribe from './Subscribe';
type AuthenticationConfig = {
  identify: { path: string; props?: any };
  login: { path: string; props?: any };
  manage: { path: string; props?: any };
  register: { path: string; props?: any };
  close: { path: string; props?: any };
  subscribe: { path: string; props?: any };
  logout: { path: string; props: LogoutProps };
  modes: {
    basic: boolean;
    oauth2: boolean;
    magical: boolean;
  };
};

// Create the context
export const AuthenticationContext = createContext<AuthenticationConfig | undefined>(undefined);

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error('useAuthentication must be used within an AuthenticationProvider');
  }
  return context;
};
export default function AuthRouter({
  params,
  searchParams,
  corePagesConfig = {
    identify: {
      path: '/',
    },
    login: {
      path: '/login',
    },
    manage: {
      path: '/manage',
    },
    register: {
      path: '/register',
    },
    close: {
      path: '/close',
    },
    subscribe: {
      path: '/subscribe',
    },
    logout: {
      path: '/logout',
      props: undefined,
    },
    modes: {
      basic: false,
      oauth2: true,
      magical: true,
    },
  },
  additionalPages = {},
}: {
  params: { slug?: string[] };
  searchParams: any;
  corePagesConfig: AuthenticationConfig;
  additionalPages: { [key: string]: ReactNode };
}) {
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
  if (path in pages) {
    return (
      <AuthenticationContext.Provider value={{ ...corePagesConfig }}>
        {pages[path.toString()]}
      </AuthenticationContext.Provider>
    );
  } else {
    return notFound();
  }
}
