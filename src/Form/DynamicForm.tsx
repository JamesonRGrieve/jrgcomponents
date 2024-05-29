import { Box, Button } from '@mui/material';
import Field from '../MUI/Styled/FormControl/Field';
import React, { useCallback, useEffect, useState } from 'react';
function toTitleCase(str: string) {
  // Replace underscores, or capital letters (in the middle of the string) with a space and the same character
  str = str.replace(/(_)|((?<=\w)[A-Z])/g, ' $&');

  // Remove underscore if exists
  str = str.replace(/_/g, '');

  // Convert to title case
  str = str.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return str;
}
export type DynamicFormFieldValueTypes = string | number | boolean;
export type DynamicFormProps = {
  fields?: {
    [key: string]: {
      type: 'text' | 'number' | 'password' | 'boolean';
      value: DynamicFormFieldValueTypes;
      validation?: (value: DynamicFormFieldValueTypes) => boolean;
    };
  };
  toUpdate?: {};
  onConfirm: (data: { [key: string]: DynamicFormFieldValueTypes }) => void;
};

export default function DynamicForm({ fields, toUpdate, onConfirm }: DynamicFormProps) {
  if (fields === undefined && toUpdate === undefined) {
    throw new Error('Either fields or toUpdate must be provided to DynamicForm.');
  }
  const [editedState, setEditState] = useState<{ [key: string]: { value: DynamicFormFieldValueTypes; error: string } }>({});

  const handleChange = useCallback((event: any, label?: string) => {
    setEditState((prevState) => ({
      ...prevState,
      [label]: { ...prevState[label], value: event.target.value },
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    Object.keys(fields ?? toUpdate).forEach((key: string) => {
      try {
        if (fields) {
          if (fields[key].validation(editedState[key].value)) {
            setEditState((prevState) => ({ ...prevState, [key]: { ...prevState[key], error: '' } }));
          } else {
            setEditState((prevState) => ({
              ...prevState,
              [key]: { ...prevState[key], error: 'Invalid value, please double check your input.' },
            }));
          }
        } else {
          if (typeof toUpdate[key as keyof typeof toUpdate] === 'number' && isNaN(Number(editedState[key].value))) {
            setEditState((prevState) => ({
              ...prevState,
              [key]: { ...prevState[key], error: 'Expected a number for this input.' },
            }));
          } else {
            setEditState((prevState) => ({ ...prevState, [key]: { ...prevState[key], error: '' } }));
          }
        }
      } catch (error) {
        setEditState((prevState) => ({ ...prevState, [key]: { ...prevState[key], error: error.message } }));
      }
    });
    if (Object.values(editedState).every((field) => field.error === '')) {
      onConfirm(Object.fromEntries(Object.entries(editedState).map(([key, value]) => [key, value.value])));
    }
  }, [editedState, fields, onConfirm]);

  // Initial state setup in useEffect to handle incoming props correctly
  useEffect(() => {
    console.log('Setting initial state');
    const initialState: { [key: string]: { value: DynamicFormFieldValueTypes; error: string } } = {};
    Object.keys(fields ?? toUpdate).forEach((key) => {
      initialState[fields ? key : toTitleCase(key)] = {
        value: fields ? fields[key].value : toUpdate[key as keyof typeof toUpdate],
        error: '',
      };
    });

    setEditState(initialState);
  }, [fields, toUpdate]); // Depend on `fields` to re-initialize state when `fields` prop changes

  return (
    <Box component='form'>
      {Object.entries(editedState).map(([key, value]) => (
        <Field
          key={key.toLowerCase().replaceAll(' ', '-')}
          nameID={key.toLowerCase().replaceAll(' ', '-')}
          label={key}
          value={value.value.toString()}
          onChange={handleChange}
          messages={value.error ? [{ level: 'error', value: value.error }] : []}
        />
      ))}
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
