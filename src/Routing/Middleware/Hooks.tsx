//import assert from 'assert';
import { NextRequest, NextResponse } from 'next/server';
import { AuthMode, generateCookieString, getAuthMode, getQueryParams, getRequestedURI } from './Data';

export type MiddlewareHook = (req: NextRequest) => Promise<{
  activated: boolean;
  response: NextResponse;
}>;

const getJWT = (req: NextRequest) => {
  const rawJWT = req.cookies.get('jwt')?.value;
  // Strip any and all 'Bearer 's off of JWT.
  const jwt = rawJWT?.split(' ')[rawJWT?.split(' ').length - 1] ?? rawJWT ?? '';
  console.log('JWT:', jwt);
  return jwt;
};
const verifyJWT = async (jwt: string) => {
  const authEndpoint = `${process.env.MODE === 'development' || process.env.ENV === 'development' ? process.env.NEXT_PUBLIC_AUTH_SERVER : process.env.NEXT_PUBLIC_AUTH_SERVER.replace('localhost', 'agixt')}/v1/user`;
  console.log(`Verifying JWT Bearer ${jwt} with AUTH_SERVER at ${authEndpoint}...`);
  return await fetch(authEndpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${jwt}`,
    },
  });
};

export const useAuth: MiddlewareHook = async (req) => {
  const toReturn = {
    activated: false,
    response: NextResponse.redirect(new URL(process.env.AUTH_WEB), { headers: {} }),
  };
  const requestedURI = getRequestedURI(req);
  const authMode = getAuthMode();
  console.log('Requested: ' + requestedURI);
  if (authMode) {
    const jwt = getJWT(req);
    if (jwt) {
      try {
        const response = await verifyJWT(jwt);
        console.log('Response Status: ', response.status);
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (response.status === 402) {
          // Payment Required
          // No body = no stripe ID present for user.
          // Body = that is the session ID for the user to get a new subscription.
          if (!requestedURI.startsWith(process.env.AUTH_WEB + '/subscribe')) {
            console.log(
              'Payment required. Redirecting to: ' +
                process.env.AUTH_WEB +
                '/subscribe' +
                (responseJSON.detail.customer_session.client_secret
                  ? '?customer_session=' + responseJSON.detail.customer_session.client_secret
                  : ''),
            );

            toReturn.response = NextResponse.redirect(
              new URL(
                process.env.AUTH_WEB +
                  '/subscribe' +
                  (responseJSON.detail.customer_session.client_secret
                    ? '?customer_session=' + responseJSON.detail.customer_session.client_secret
                    : ''),
              ),
            );
            toReturn.activated = true;
          }
        } else if (responseJSON?.missing_requirements || response.status === 403) {
          // Forbidden (Missing Values for User)
          if (!requestedURI.startsWith(process.env.AUTH_WEB + '/manage')) {
            toReturn.response = NextResponse.redirect(new URL(process.env.AUTH_WEB + '/manage'));
            toReturn.activated = true;
          }
        } else if (response.status >= 500 && response.status < 600) {
          // Internal Server Error
          // This should not delete the JWT.
          console.error(
            `Invalid token response, status ${response.status}, detail ${responseJSON.detail}. Server error, please try again later.`,
          );

          toReturn.response = NextResponse.redirect(new URL(process.env.AUTH_WEB + '/error', req.url));
          toReturn.activated = true;
        } else if (response.status !== 200) {
          console.log('Uncaught response error code.');
          // @ts-expect-error NextJS' types are wrong.
          toReturn.response.headers.set('Set-Cookie', [
            generateCookieString('jwt', '', (0).toString()),
            generateCookieString('href', requestedURI, (86400).toString()),
          ]);
          throw new Error(`Invalid token response, status ${response.status}, detail ${responseJSON.detail}.`);
        } else if (
          authMode === AuthMode.MagicalAuth &&
          requestedURI.startsWith(process.env.AUTH_WEB) &&
          jwt.length > 0 &&
          req.nextUrl.pathname !== '/user/manage'
        ) {
          console.log(
            `Detected authenticated user attempting to visit non-management page. Redirecting to ${process.env.AUTH_WEB}/manage...`,
          );
          toReturn.response = NextResponse.redirect(new URL(process.env.AUTH_WEB + '/manage'));
          toReturn.activated = true;
        }
        console.log('JWT is valid (or server was unable to verify it).');
      } catch (exception) {
        if (exception instanceof TypeError && exception.cause instanceof AggregateError) {
          console.error(
            `Invalid token. Failed with TypeError>AggregateError. Logging out and redirecting to AUTH_WEB at ${process.env.AUTH_WEB}. ${exception.message} Exceptions to follow.`,
          );
          for (const anError of exception.cause.errors) {
            console.error(anError.message);
          }
        } else if (exception instanceof AggregateError) {
          console.error(
            `Invalid token. Failed with AggregateError. Logging out and redirecting to AUTH_WEB at ${process.env.AUTH_WEB}. ${exception.message} Exceptions to follow.`,
          );
          for (const anError of exception.errors) {
            console.error(anError.message);
          }
        } else if (exception instanceof TypeError) {
          console.error(
            `Invalid token. Failed with TypeError. Logging out and redirecting to AUTH_WEB at ${process.env.AUTH_WEB}. ${exception.message} Cause: ${exception.cause}.`,
          );
        } else {
          console.error(`Invalid token. Logging out and redirecting to AUTH_WEB at ${process.env.AUTH_WEB}.`, exception);
        }
        toReturn.activated = true;
      }
    } else {
      console.log(
        `${requestedURI} does ${requestedURI.startsWith(process.env.AUTH_WEB) ? '' : 'not '}start with ${process.env.AUTH_WEB}.`,
      );
      if (
        authMode === AuthMode.MagicalAuth &&
        requestedURI.startsWith(process.env.AUTH_WEB) &&
        req.nextUrl.pathname !== '/user/manage'
      ) {
        console.log('Pathname: ' + req.nextUrl.pathname);
      } else {
        console.log(
          `Detected unauthenticated user attempting to visit non-auth page, redirecting to AUTH_WEB at ${process.env.AUTH_WEB}...`,
        );
        toReturn.response = NextResponse.redirect(new URL(process.env.AUTH_WEB), {
          headers: { 'Set-Cookie': generateCookieString('href', requestedURI, (86400).toString()) },
        });
        toReturn.activated = true;
      }
    }
  }
  console.log('Going to:');
  console.log(toReturn);
  return toReturn;
};

export const useJWTQueryParam: MiddlewareHook = async (req) => {
  const queryParams = getQueryParams(req);
  const requestedURI = getRequestedURI(req);
  const toReturn = {
    activated: false,
    // This should set the cookie and then re-run the middleware (without query params).
    response: req.nextUrl.pathname.startsWith('/user/close')
      ? NextResponse.next({
          headers: {
            // @ts-expect-error NextJS' types are wrong.
            'Set-Cookie': [generateCookieString('jwt', queryParams.token ?? queryParams.jwt, (86400 * 7).toString())],
          },
        })
      : NextResponse.redirect(req.cookies.get('href')?.value ?? requestedURI, {
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

export const useSocketIOBypass: MiddlewareHook = async (req) => ({
  activated: getRequestedURI(req).includes('socket.io'),
  response: NextResponse.next(),
});

export const useOAuth2: MiddlewareHook = async (req) => {
  const provider = req.nextUrl.pathname.split('?')[0].split('/').pop();
  /*
  assert(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z\d.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z\d.-]+)((?:\/[+~%/.\w-_]*)?\??[-+=&;%@.\w_]*#?\w*)?)/.test(
      process.env.AUTH_WEB,
    ),
    'Assertion Failure in useOAuth2 Middleware Hook: Invalid AUTH_WEB, must be a URI if OAuth2 is to be used.',
  );
  assert(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z\d.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z\d.-]+)((?:\/[+~%/.\w-_]*)?\??[-+=&;%@.\w_]*#?\w*)?)/.test(
      process.env.AUTH_SERVER,
    ),
    'Assertion Failure in useOAuth2 Middleware Hook: Invalid AUTH_SERVER, must be a URI if OAuth2 is to be used.',
  );
  */
  const redirect = new URL(`${process.env.AUTH_WEB}/close/${provider}`);
  let toReturn = {
    activated: false,
    response: NextResponse.redirect(redirect),
  };
  const queryParams = getQueryParams(req);
  if (queryParams.code) {
    const oAuthEndpoint = process.env.MODE === 'development' 
      ? `${process.env.NEXT_PUBLIC_AUTH_SERVER.replace('localhost', 'agixt')}/v1/oauth2/${provider}`
      : `${process.env.NEXT_PUBLIC_AUTH_SERVER}/v1/oauth2/${provider}`;
    console.log(`Exchanging code ${queryParams.code} with ${provider} at ${oAuthEndpoint}...`);
    const auth = await fetch(oAuthEndpoint, {
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
