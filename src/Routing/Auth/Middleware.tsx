import { NextRequest, NextResponse } from 'next/server';
function authPrereqs(req: NextRequest): void {}
export function useGTAuth(req: NextRequest): void {}
export function useMagicalAuth(req: NextRequest): void {}

export const generateCookieString = (key: string, value: string, age: string): string =>
  `${key}=${value}; Domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}; Path=/; Max-Age=${age}; Same-Site: strict;`;

export type MiddlewareHook = (req: NextRequest) => {
  activated: boolean;
  response: NextResponse;
};

export const useNextAPIBypass: MiddlewareHook = (req) => {
  const toReturn = {
    activated: false,
    response: NextResponse.next(),
  };
  if (
    req.nextUrl.pathname.startsWith('/_next/') ||
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname === '/favicon.ico'
  ) {
    toReturn.activated = true;
  }
  return toReturn;
};
export const AuthMode = {
  None: 0,
  GTAuth: 1,
  MagicalAuth: 2,
};
export const getAuthMode = () => {
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

export const getQueryParams = (req: NextRequest) =>
  req.url.includes('?')
    ? Object.assign(
        {},
        ...req.url
          .split('?')[1]
          .split('&')
          .map((param) => ({ [param.split('=')[0]]: param.split('=')[1] })),
      )
    : {};
