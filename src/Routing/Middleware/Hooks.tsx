import { NextRequest, NextResponse } from 'next/server';
import { AuthMode, generateCookieString, getAuthMode, getQueryParams, getRequestedURI } from './Data';

export type MiddlewareHook = (req: NextRequest) => Promise<{
  activated: boolean;
  response: NextResponse;
}>;

export const useAuth: MiddlewareHook = async (req) => {
  const toReturn = {
    activated: false,
    response: NextResponse.redirect(new URL(process.env.AUTH_WEB), { headers: {} }),
  };
  const requestedURI = getRequestedURI(req);
  const authMode = getAuthMode();
  // @ts-expect-error NextJS' types are wrong.
  toReturn.response.headers.set('Set-Cookie', [
    generateCookieString('jwt', '', (0).toString()),
    generateCookieString('href', requestedURI, (86400).toString()),
  ]);

  if (authMode) {
    const rawJWT = req.cookies.get('jwt')?.value;
    // Strip any and all 'Bearer 's off of JWT.
    const jwt = rawJWT?.split(' ')[rawJWT?.split(' ').length - 1] ?? rawJWT ?? '';
    console.log('JWT:', jwt);
    if (jwt) {
      try {
        const authEndpoint = `${process.env.NEXT_PUBLIC_AUTH_SERVER}/v1/user`;
        console.log(`Verifying JWT Bearer ${jwt} with AUTH_SERVER at ${authEndpoint}...`);
        const response = await fetch(authEndpoint, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${jwt}`,
          },
        });
        if (response.status !== 200) {
          throw new Error(`Invalid token response, status ${response.status}, detail ${(await response.json()).detail}.`);
        }
        console.log('JWT is valid.');
      } catch (exception) {
        console.error(`Invalid token. Logging out and redirecting to AUTH_WEB at ${process.env.AUTH_WEB}.`, exception);
        toReturn.activated = true;
      }
    } else {
      console.log(
        `${requestedURI} does ${requestedURI.startsWith(process.env.AUTH_WEB) ? '' : 'not '}start with ${process.env.AUTH_WEB}.`,
      );
      if (authMode === AuthMode.MagicalAuth && requestedURI.startsWith(process.env.AUTH_WEB)) {
        // Don't let users visit Identify, Register or Login pages if they're already logged in.
        if (jwt.length > 0 && req.nextUrl.pathname !== '/user/manage') {
          toReturn.response = NextResponse.redirect(new URL(process.env.AUTH_WEB + '/manage'));
          toReturn.activated = true;
        }
      } else {
        toReturn.response = NextResponse.redirect(new URL(process.env.AUTH_WEB), {
          headers: { 'Set-Cookie': generateCookieString('href', requestedURI, (86400).toString()) },
        });
        toReturn.activated = true;
      }
    }
  }
  return toReturn;
};

export const useJWTQueryParam: MiddlewareHook = async (req) => {
  const queryParams = getQueryParams(req);
  const requestedURI = getRequestedURI(req);
  const toReturn = {
    activated: false,
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
  if ((queryParams.token || queryParams.jwt) && !req.nextUrl.pathname.startsWith('/user/close')) {
    toReturn.activated = true;
  }
  return toReturn;
};

export const useNextAPIBypass: MiddlewareHook = async (req) => {
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

export const useOAuth2: MiddlewareHook = async (req) => {
  const provider = req.nextUrl.pathname.split('?')[0].split('/').pop();

  const redirect = new URL(`${process.env.AUTH_WEB}/close/${provider}`);
  let toReturn = {
    activated: false,
    response: NextResponse.redirect(redirect),
  };
  const queryParams = getQueryParams(req);
  if (queryParams.code) {
    const auth = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVER}/v1/oauth2/${provider}`, {
      method: 'POST',
      body: JSON.stringify({
        code: queryParams.code,
        referrer: redirect,
      }),
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Invalid token response, status ${response.status}.`);
      }
      return response.json();
    });
    toReturn = {
      activated: true,
      response: NextResponse.redirect(auth.detail),
    };
  }
  return toReturn;
};
