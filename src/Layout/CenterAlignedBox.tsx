import { Box, useMediaQuery } from '@mui/material';
import React, { ReactNode } from 'react';
export type CenterAlignedBoxProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};
export default function CenterAlignedBox({ left, center, right }: CenterAlignedBoxProps) {
  const mobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ flex: '1 1 50%', display: 'flex', alignItems: 'center', minWidth: mobile ? 'unset' : '25%' }}>
        {left ?? '\u00A0'}
      </Box>

      <Box sx={{ flex: '0 0 auto', minWidth: mobile ? 'unset' : '25%' }}>{center ?? '\u00A0'}</Box>

      <Box
        sx={{
          flex: '1 1 50%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          minWidth: mobile ? 'unset' : '25%',
        }}
      >
        {right ?? '\u00A0'}
      </Box>
    </Box>
  );
}
