import { TextField, Collapse, Alert } from '@mui/material';
export type TextFieldWithAlertProps = {
  id: string;
  label: string;
  autoComplete: string;
  value: string;
  onChange: any;
  submit: any;
  error: string;
};
import React from 'react';

const TextFieldWithAlert: React.FC<TextFieldWithAlertProps> = ({
  id,
  label,
  autoComplete,
  value,
  onChange,
  submit,
  error
}) => {
  return (
    <>
      <TextField
        id={id}
        label={label}
        type={label.includes('password') ? 'password' : 'text'}
        autoComplete={autoComplete}
        variant='filled'
        margin='normal'
        value={value}
        onChange={(e) => onChange(e)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />
      <Collapse in={error != ''}>
        <Alert severity='error'>{error}</Alert>
      </Collapse>
    </>
  );
};

export default TextFieldWithAlert;
