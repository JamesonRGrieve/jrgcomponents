import { Box } from '@mui/material';
import React from 'react';
import { FieldProps as Field, Message } from '../FormControl/Field';

export type FormProps = {
  fields: { [id: string]: Field };
  messages: Message[];
};
// Should maintain a state object
const [fields, setFields] = React.useState<FormProps['fields']>({});
const [messages, setMessages] = React.useState<FormProps['messages']>([]);


export default function Form({ fields }: FormProps) {
  // Should render `fields` as a map of Field components and track their state and messages.
  return <Box component='form'>
    <Field
      nameID='name'
      label='Name'
      value={fields.name.value}
      onChange={fields.name.onChange}
      placeholder='Enter your name'
      validate={fields.name.validate}
      type='text' messages={fields.name.messages}
    />
  </Box>;
}
