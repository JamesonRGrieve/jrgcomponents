import { NextRequest, NextResponse } from 'next/server';
import { generateCookieString, getQueryParams, getRequestedURI } from './Data';

export type MiddlewareHook = (req: NextRequest) => {
  activated: boolean;
  response: NextResponse;
};

export const useJWTValidation: MiddlewareHook = (req) => {
  const queryParams = getQueryParams(req);
  const requestedURI = getRequestedURI(req);
  const toReturn = {
    activated: true,
    // This should set the cookie and then re-run the middleware (without query params).
    response: NextResponse.redirect(req.cookies.get('href')?.value ?? requestedURI, {
      headers: {
        // @ts-expect-error NextJS' types are wrong.
        'Set-Cookie': [
          generateCookieString('jwt', queryParams.token ?? queryParams.jwt, (86400 * 7).toString()),
          generateCookieString('href', '', (0).toString()),
        ],
      },
    }),
  };

  if (queryParams.token || queryParams.jwt) {
    toReturn.activated = true;
  }
  return toReturn;
};

export function useGTAuth(req: NextRequest): void {}
export function useMagicalAuth(req: NextRequest): void {}

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
