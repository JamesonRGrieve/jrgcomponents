'use client';
import { Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

function StripePricingTable() {
  const params = useSearchParams();
  return params?.get('customer_session') ? (
    // Returning Customer
    <stripe-pricing-table
      pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID ?? ''}
      publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''}
      customer-session-client-secret={params?.get('customer_session')}
    />
  ) : (
    // New Customer
    <stripe-pricing-table
      pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID ?? ''}
      publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''}
      customer-email={params?.get('email')}
    />
  );
}

export default function Subscribe(): JSX.Element {
  const router = useRouter();
  if (process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true') {
    router.push('/');
  }
  return (
    <Suspense fallback={<p>Loading pricing...</p>}>
      <h1>Subscribe</h1>
      <Box id='stripe-box'>
        <script async src='https://js.stripe.com/v3/pricing-table.js' />
        <StripePricingTable />
      </Box>
    </Suspense>
  );
}
