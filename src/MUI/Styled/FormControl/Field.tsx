import { Collapse, Alert, AlertColor, FormLabel, FormControl, Typography } from '@mui/material';
import React from 'react';
export type Message = {
  level: String;
  value: String;
};
export type Field = {
  label: string;
  description?: string;
  value: string;
  onChange: any;
  placeholder?: string;
  messages?: Message[];
  type?: 'text' | 'password' | 'select' | 'checkbox' | 'radio';
  items?: {
    value: string;
    label: string;
  }[];
};
export type FieldProps = Field & {
  nameID: string;
};
const renderSeverity = (severity: AlertColor, strOrArray: string | string[]): JSX.Element => {
  return typeof strOrArray === 'string' ? (
    <Alert severity={severity}>{strOrArray}</Alert>
  ) : (
    (strOrArray.map((alert: string) => {
      <Alert severity={severity}>{alert}</Alert>;
    }) as unknown as JSX.Element)
  );
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
      {/* Field Goes Here */}
      <Collapse in={messages.length > 0}>{/* Messages go here */}</Collapse>
    </FormControl>
  );
};

export default Field;
