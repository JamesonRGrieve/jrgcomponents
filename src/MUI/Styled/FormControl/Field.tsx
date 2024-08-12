import React from 'react';
import { Collapse, FormLabel, FormControl, Typography, Alert, AlertColor, InputLabel } from '@mui/material';
import CheckField from '../Input/CheckField';
import PasswordField from '../Input/PasswordField';
import SelectField from '../Input/SelectField';
import TextField from '../Input/TextField';
import RadioField from '../Input/RadioField';

export type Message = {
  level: string;
  value: string;
};
export type Field = {
  label: string;
  description?: string;
  autoComplete?: string;
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
  value?: string;
  onChange?: any;
  messages?: Message[];
};

const FieldInput: React.FC<FieldProps> = ({
  nameID,
  label,
  value,
  onChange,
  autoComplete,
  placeholder = '',
  type = 'text',
  items,
}) => {
  const injectedOnChange = onChange
    ? (target: any) => {
        onChange(target, nameID);
      }
    : null;

  const commonProps = {
    id: nameID,
    name: nameID,
    value,
    onChange: injectedOnChange,
    label,
  };

  switch (type) {
    case 'text':
      return <TextField {...commonProps} autoComplete={autoComplete} placeholder={placeholder} />;
    case 'password':
      return <PasswordField {...commonProps} autoComplete={autoComplete} />;
    case 'select':
      return <SelectField {...commonProps} items={items} />;
    case 'checkbox':
      return <CheckField {...commonProps} value={['on', 'true'].includes(value?.toLowerCase())} />;
    case 'radio':
      return <RadioField {...commonProps} items={items} />;
    default:
      return <TextField {...commonProps} autoComplete={autoComplete} />;
  }
};

const Field: React.FC<FieldProps> = ({ nameID, label, description, type = 'text', messages = [], ...rest }) => {
  return (
    <FormControl required fullWidth sx={{ my: '1rem' }}>
      {['checkbox', 'radio'].includes(type) ? (
        <FormLabel id={nameID + '-label'} htmlFor={nameID}>
          {label}
        </FormLabel>
      ) : (
        type === 'select' && <InputLabel id={nameID + '-label'}>{label}</InputLabel>
      )}
      {description && (
        <Typography variant='body1' gutterBottom>
          {description}
        </Typography>
      )}
      <FieldInput nameID={nameID} label={label} type={type} {...rest} />
      {messages && (
        <Collapse in={messages?.length > 0}>
          {/* Should render messages as a map of MUI Alert's */}
          {messages?.map((message, index) => (
            <Alert key={index} severity={message.level as AlertColor} sx={{ mt: 1 }}>
              {message.value}
            </Alert>
          ))}
        </Collapse>
      )}
    </FormControl>
  );
};

export default Field;
