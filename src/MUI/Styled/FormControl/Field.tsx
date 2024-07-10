import { Collapse, FormLabel, FormControl, Typography, Alert, AlertColor } from '@mui/material';
import React, { useMemo } from 'react';
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
const Field: React.FC<FieldProps> = ({
  nameID,
  label,
  description,
  value,
  onChange,
  autoComplete,
  placeholder = '',
  messages = [],
  type = 'text',
  items,
}) => {
  const inputComponents = useMemo(() => {
    const injectedOnChange = onChange
      ? (target: any) => {
          onChange(target, nameID);
        }
      : null;
    return {
      text: (
        <TextField
          id={nameID}
          name={nameID}
          autoComplete={autoComplete}
          value={value}
          label={label}
          onChange={injectedOnChange}
          placeholder={placeholder}
        />
      ),
      password: (
        <PasswordField id={nameID} name={nameID} autoComplete={autoComplete} value={value} onChange={injectedOnChange} />
      ),
      select: <SelectField id={nameID} name={nameID} value={value} onChange={injectedOnChange} items={items} />,
      checkbox: (
        <CheckField
          id={nameID}
          name={nameID}
          value={['on', 'true'].includes(value?.toLowerCase())}
          onChange={injectedOnChange}
        />
      ),
      //multicheckbox: <MultiCheckField id={nameID} value={value} onChange={onChange} items={items} />,
      radio: <RadioField id={nameID} name={nameID} value={value} onChange={injectedOnChange} items={items} />,
      default: <TextField id={nameID} name={nameID} autoComplete={autoComplete} value={value} onChange={injectedOnChange} />,
    };
  }, [type, nameID, value, onChange, placeholder, items]);

  return (
    <FormControl required fullWidth sx={{ my: '1rem' }}>
      {type !== 'text' && (
        <FormLabel id={nameID} htmlFor={nameID}>
          {label}
        </FormLabel>
      )}
      {description && (
        <Typography variant='body1' gutterBottom>
          {description}
        </Typography>
      )}
      {/* Should render something from ./Input depending on the type prop. */}
      {inputComponents[type as keyof typeof inputComponents] ?? inputComponents.default}
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
