import {
  TextField,
  Collapse,
  Alert,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from '@mui/material';
import React from 'react';

export type InputWithAlertProps = {
  id: string;
  label: string;
  autoComplete: string;
  value: string;
  onChange: any;
  submit?: any;
  error?: string;
  info?: string;
  variant?: 'text' | 'password' | 'select' | 'checkbox' | 'radio';
  items?: {
    value: string;
    label: string;
  }[];
  sx?: any;
};

const InputWithAlert: React.FC<InputWithAlertProps> = ({
  id,
  label,
  autoComplete,
  value,
  onChange,
  submit,
  error = '',
  info = '',
  variant = 'text',
  items,
  sx,
}) => {
  const variants = {
    text: (
      <TextField
        sx={sx}
        id={id}
        label={label}
        type='text'
        autoComplete={autoComplete}
        variant='filled'
        margin='normal'
        value={value}
        onChange={(e: any) => onChange(e)}
        onKeyUp={
          submit
            ? (e: any) => {
                if (e.key === 'Enter') {
                  submit();
                }
              }
            : undefined
        }
      />
    ),
    password: (
      <TextField
        sx={sx}
        id={id}
        label={label}
        type='password'
        autoComplete={autoComplete}
        variant='filled'
        margin='normal'
        value={value}
        onChange={(e: any) => onChange(e)}
        onKeyUp={
          submit
            ? (e: any) => {
                if (e.key === 'Enter') {
                  submit();
                }
              }
            : undefined
        }
      />
    ),
    select: (
      <Select sx={sx} id={id} label={label} variant='filled' value={value} onChange={(e: any) => onChange(e)}>
        {items?.map((item: any) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    ),
    checkbox: (
      <FormGroup id={id}>
        {items?.map((item: any) => {
          return (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={
                    value
                      .split('|')
                      .filter((itemValue) => itemValue.split('=')[0] == item.value)[0]
                      .split('=')[1] === 'true'
                  }
                />
              }
              onChange={(e: any) => {
                console.log(e);
              }}
              label={item.label}
            />
          );
        })}
      </FormGroup>
    ),
    radio: (
      <RadioGroup value={value} onChange={(e: any) => onChange(e)} id={id}>
        {items?.map((item: any) => {
          return <FormControlLabel key={item.value} control={<Radio />} label={item.label} />;
        })}
      </RadioGroup>
    ),
  };
  return (
    <>
      {variants[variant]}
      <Collapse in={error != '' || info != ''}>
        {info ? <Alert severity='info'>{info}</Alert> : null}
        {error ? <Alert severity='error'>{error}</Alert> : null}
      </Collapse>
    </>
  );
};

export default InputWithAlert;
