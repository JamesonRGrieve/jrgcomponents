// Use in ./app/user/[[...slug]]/page.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { notFound } from 'next/navigation';
import User from './Identify';
import Login from './Login';
import Manage from './Manage';
import Register from './Register';
import Close from './Close';
import Logout, { LogoutProps } from './Logout';
import Subscribe from './Subscribe';

type RouterPageProps = {
  path: string;
  heading?: string;
};
type AuthenticationConfig = {
  identify: RouterPageProps & { props?: any };
  login: RouterPageProps & { props?: any };
  manage: RouterPageProps & { props?: any };
  register: RouterPageProps & { props?: any };
  close: RouterPageProps & { props?: any };
  subscribe: RouterPageProps & { props?: any };
  logout: RouterPageProps & { props: LogoutProps };
  authModes: {
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
    basic: false,
    oauth2: true,
    magical: true,
  },
};
export default function AuthRouter({
  params,
  searchParams,
  corePagesConfig,
  additionalPages = {},
}: {
  params: { slug?: string[] };
  searchParams: any;
  corePagesConfig?: AuthenticationConfig;
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
      <AuthenticationContext.Provider value={{ ...pageConfigDefaults, ...corePagesConfig }}>
        {pages[path.toString()]}
      </AuthenticationContext.Provider>
    );
  } else {
    return notFound();
  }
}
