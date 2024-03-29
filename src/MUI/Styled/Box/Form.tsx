import { Box } from '@mui/material';
import React from 'react';
import { FieldProps as Field, Message } from '../FormControl/Field';

export type FormProps = {
  fields: { [id: string]: Field };
  messages: Message[];
};
// Should maintain a state object
export default function Form({ fields }: FormProps) {
  // Should render `fields` as a map of Field components and track their state and messages.
  return <Box component='form'></Box>;
}
