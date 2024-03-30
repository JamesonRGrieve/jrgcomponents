import { Collapse, Alert, AlertColor, FormLabel, FormControl, Typography } from '@mui/material';
import React from 'react';
import CheckField from '../Input/CheckField';
import EmailField from '../Input/EmailField';
import MultiCheckField from '../Input/MultiCheckField';
import PasswordField from '../Input/PasswordField';
import SelectField from '../Input/SelectField';
import TextField from '../Input/TextField';
import TimeField from '../Input/TimeField';

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
  const renderInputcomponent = () => {
    switch (type) {
      case 'text':
        return <TextField id={nameID} value={value} onChange={onChange} placeholder={placeholder} />;
      case 'password':
        return <PasswordField id={nameID} value={value} onChange={onChange} placeholder={placeholder} />;
      case 'select':
        return <SelectField id={nameID} value={value} onChange={onChange} items={items} />;
      case 'time':
        return <TimeField id={nameID} value={value} onChange={onChange} />;
      case 'checkbox':
        return <CheckField id={nameID} value={value} onChange={onChange} />;
        case 'radio':
          return <MultiCheckField id={nameID} value={value} onChange={onChange} items={items} />;
      default:
        return <TextField id={nameID} value={value} onChange={onChange} placeholder={placeholder} />;
    }
  }
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
      {renderInputcomponent()}
      <Collapse in={messages.length > 0}>
        {/* Should render messages as a map of MUI Alert's */}
        {messages.map((message, index) => (
          <Alert key={index} severity={message.level as AlertColor} sx={{ mt: 1 }}>
            {message.value}
          </Alert>
        ))}
      </Collapse>
    </FormControl>
  );
};

export default Field;
