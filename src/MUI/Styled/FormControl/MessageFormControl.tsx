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
  AlertColor,
  FormLabel,
} from '@mui/material';
import React from 'react';

export type InputWithAlertProps = {
  id: string;
  label: string;
  autoComplete: string;
  value: string;
  onChange: any;
  submit?: any;
  placeholder?: string;
  error?: string | string[];
  warning?: string | string[];
  info?: string | string[];
  variant?: 'text' | 'password' | 'select' | 'checkbox' | 'radio';
  items?: {
    value: string;
    label: string;
  }[];
  sx?: any;
};
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
      placeholder={placeholder}
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
const InputWithAlert: React.FC<InputWithAlertProps> = ({
  id,
  label,
  autoComplete,
  value,
  onChange,
  submit,
  placeholder = '',
  error = '',
  warning = '',
  info = '',
  variant = 'text',
  items,
  sx,
}) => {
  const renderSeverity = (severity: AlertColor, strOrArray: string | string[]): JSX.Element => {
    return typeof strOrArray === 'string' ? (
      <Alert severity={severity}>{strOrArray}</Alert>
    ) : (
      (strOrArray.map((alert: string) => {
        <Alert severity={severity}>{alert}</Alert>;
      }) as unknown as JSX.Element)
    );
  };
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <FormControl required fullWidth sx={{ my: '1rem' }}>
      <FormLabel key={'label'} id={props.id}>
        {props.label}
      </FormLabel>
      {variants[variant]}
      <Collapse in={Boolean(error || warning || info)}>
        {renderSeverity('error', error)}
        {renderSeverity('warning', warning)}
        {renderSeverity('info', info)}
      </Collapse>
    </FormControl>
  );
};

export default InputWithAlert;
