'use client';
import { Box, Typography } from '@mui/material';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { Suspense, useContext } from 'react';
import { AuthenticationContext } from './Router';
export type SubscribeProps = { redirectTo?: string };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function Subscribe({ searchParams }: { searchParams: any }): JSX.Element {
  const router = useRouter();
  const authConfig = useContext(AuthenticationContext);

  if (process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true') {
    router.push('/');
  }
  return (
    <>
      {authConfig.subscribe.heading && <Typography variant='h2'>{authConfig.subscribe.heading}</Typography>}

      <Suspense fallback={<p>Loading pricing...</p>}>
        <h1>Subscribe</h1>
        <Box id='stripe-box'>
          <script async src='https://js.stripe.com/v3/pricing-table.js' />
          <stripe-pricing-table
            pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID ?? ''}
            publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''}
            customer-session-client-secret={searchParams?.customer_session}
            customer-email={searchParams?.customer_session ? undefined : searchParams?.email || getCookie('email')}
          />
        </Box>
      </Suspense>
    </>
  );
}
