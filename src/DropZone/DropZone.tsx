import React, { Children, PropsWithChildren } from 'react';
import { Box, Typography, BoxProps, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { DropZoneProvider, useDropZone } from './DropZoneContext';

interface DropZoneProps {
  onUpload: (files: File[]) => void;
  [key: string]: any;
}

const DropZone: React.FC<PropsWithChildren<DropZoneProps>> & {
  Active: React.FC<PropsWithChildren<BoxProps>>;
} = ({ children, onUpload, ...props }) => {
  const activeChildProvided = Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.props['data-type'] === 'active',
  );

  return (
    <DropZoneProvider onUpload={onUpload}>
      <Box position='relative' {...props}>
        {!activeChildProvided && <DropZone.Active />}
        {children}
      </Box>
    </DropZoneProvider>
  );
};

const Active: React.FC<PropsWithChildren<BoxProps>> = ({ children, ...props }) => {
  const { isDragActive, setIsDragActive } = useDropZone();

  if (!isDragActive) {
    return null;
  }

  return (
    <Box
      data-type='active'
      position='absolute'
      top={0}
      left={0}
      right={0}
      bottom={0}
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor='rgba(255, 255, 255, 0.75)'
      zIndex={10}
      border='2px dashed blue'
      color='black'
      {...props}
    >
      {children || <Typography variant='h6'>Drop files here</Typography>}

      {/* Manual close button because drag events are janky and sometimes doesn't close properly */}
      <IconButton
        aria-label='close'
        onClick={() => setIsDragActive(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

DropZone.Active = Active;

export default DropZone;
