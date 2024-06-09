import { NextRequest } from 'next/server';

export const generateCookieString = (key: string, value: string, age: string): string =>
  `${key}=${value}; Domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}; Path=/; Max-Age=${age}; Same-Site: strict;`;

export const AuthMode = {
  None: 0,
  GTAuth: 1,
  MagicalAuth: 2,
};
export const getAuthMode = (): number => {
  let authMode = AuthMode.None;
  if (process.env.AUTH_WEB && process.env.AUTH_SERVER) {
    if (process.env.APP_URI && process.env.AUTH_WEB.startsWith(process.env.APP_URI)) {
      authMode = AuthMode.MagicalAuth;
      if (!process.env.AUTH_WEB.endsWith('/user')) {
        throw new Error('Invalid AUTH_WEB. For Magical Auth implementations, AUTH_WEB must point to APP_URI/user.');
      }
    } else {
      authMode = AuthMode.GTAuth;
    }
  }
  return authMode;
};

export const getQueryParams = (req: NextRequest): any =>
  req.url.includes('?')
    ? Object.assign(
        {},
        ...req.url
          .split('?')[1]
          .split('&')
          .map((param) => ({ [param.split('=')[0]]: param.split('=')[1] })),
      )
    : {};

export const getRequestedURI = (req: NextRequest): string =>
  req.url.split('?')[0].replace('localhost:3437', process.env.APP_URI.replace('https://', '').replace('http://', ''));
