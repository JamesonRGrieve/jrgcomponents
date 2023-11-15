import Typography from '@mui/material/Typography';
import React from 'react';

export default function ContentSWR({
  swr,
  authSWR = null,
  content
}: {
  swr: any;
  authSWR?: any;
  content: any;
}) {
  return swr.isLoading || (authSWR && authSWR.isLoading) ? (
    <Typography
      variant='h6'
      component='h1'
      noWrap
      sx={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}
    >
      Loading...
    </Typography>
  ) : swr.error ? (
    <>
      <Typography
        variant='h6'
        component='h1'
        noWrap
        sx={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}
      >
        Error!
      </Typography>
      <Typography paragraph>{swr.error.message}</Typography>
    </>
  ) : authSWR && authSWR.error ? (
    <>
      <Typography
        variant='h6'
        component='h1'
        noWrap
        sx={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}
      >
        Unauthorized!
      </Typography>
      <Typography paragraph sx={{ width: '100%', textAlign: 'center' }}>
        {authSWR.error.message}
      </Typography>
    </>
  ) : (
    content({ data: swr.data })
  );
}
