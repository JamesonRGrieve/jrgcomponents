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
  FormControl,
  Typography,
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
      <Typography key={'text'} variant='body1' gutterBottom>
        {props.desc}
      </Typography>
      {/* Field Goes Here */}
      <Collapse in={Boolean(error || warning || info)}>
        {renderSeverity('error', error)}
        {renderSeverity('warning', warning)}
        {renderSeverity('info', info)}
      </Collapse>
    </FormControl>
  );
};

export default InputWithAlert;
