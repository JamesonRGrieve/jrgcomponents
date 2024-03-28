import { Box } from '@mui/material';
import React from 'react';
import { FieldProps as Field, Message } from '../FormControl/Field';

export type FormProps = {
  fields: { [id: string]: Field };
  messages: Message[];
};
export default function Form({ fields, messages }: FormProps) {
  return <Box component='form'></Box>;
}
