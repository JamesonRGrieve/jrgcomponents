import { Collapse, FormLabel, FormControl, Typography } from '@mui/material';
import React from 'react';

export type Message = {
  level: string;
  value: string;
};
export type Field = {
  label: string;
  description?: string;
  placeholder?: string;
  validate?: (value: string) => boolean;
  type?: 'text' | 'password' | 'select' | 'time' | 'date' | 'datetime' | 'checkbox' | 'radio';
  items?: {
    value: string;
    label: string;
  }[];
};
export type FieldProps = Field & {
  nameID: string;
  value: string;
  onChange: any;
  messages?: Message[];
};
const Field: React.FC<FieldProps> = ({
  nameID,
  label,
  description,
  value,
  onChange,
  placeholder = '',
  messages = [],
  type = 'text',
  items,
}) => {
  return (
    <FormControl required fullWidth sx={{ my: '1rem' }}>
      <FormLabel id={nameID} htmlFor={nameID}>
        {label}
      </FormLabel>
      {description && (
        <Typography variant='body1' gutterBottom>
          {description}
        </Typography>
      )}
      {/* Should render something from ./Input depending on the type prop. */}
      <Collapse in={messages.length > 0}>{/* Should render messages as a map of MUI Alert's */}</Collapse>
    </FormControl>
  );
};

export default Field;
