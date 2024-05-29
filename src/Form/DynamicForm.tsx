import { Box, Button } from '@mui/material';
import Field from '../MUI/Styled/FormControl/Field';
import React, { useCallback, useEffect, useState } from 'react';

export type DynamicFormFieldValueTypes = string | number | boolean;
export type DynamicFormProps = {
  fields: {
    [key: string]: {
      type: 'text' | 'number' | 'password' | 'boolean';
      value: DynamicFormFieldValueTypes;
      validation?: (value: DynamicFormFieldValueTypes) => boolean;
    };
  };
  onSubmit: (values: { [key: string]: DynamicFormFieldValueTypes }) => void;
};

export default function DynamicForm({ fields, onSubmit }: DynamicFormProps) {
  const [editedState, setEditState] = useState<{ [key: string]: { value: DynamicFormFieldValueTypes; error: string } }>({});

  const handleChange = useCallback((key: string, value: DynamicFormFieldValueTypes) => {
    setEditState((prevState) => ({ ...prevState, [key]: { ...prevState[key], value: value } }));
  }, []);

  const handleSubmit = useCallback(() => {
    Object.keys(fields).forEach((key: string) => {
      try {
        fields[key].validation?.(editedState[key as keyof typeof editedState].value);
        setEditState((prevState) => ({ ...prevState, [key]: { ...prevState[key], error: '' } }));
      } catch (error) {
        setEditState((prevState) => ({ ...prevState, [key]: { ...prevState[key], error: error.message } }));
      }
    });
    if (Object.values(editedState).every((field) => field.error === '')) {
      onSubmit(Object.fromEntries(Object.entries(editedState).map(([key, value]) => [key, value.value])));
    }
  }, [editedState, fields, onSubmit]);

  // Initial state setup in useEffect to handle incoming props correctly
  useEffect(() => {
    const initialState: { [key: string]: { value: DynamicFormFieldValueTypes; error: string } } = {};
    Object.keys(fields).forEach((key) => {
      initialState[key] = { value: fields[key as keyof typeof fields].value, error: '' };
    });
    setEditState(initialState);
  }, [fields]); // Depend on `fields` to re-initialize state when `fields` prop changes

  return (
    <Box component='form'>
      {Object.entries(editedState).map(([key, value]) => (
        <Field
          key={key.toLowerCase().replaceAll(' ', '-')}
          nameID={key.toLowerCase().replaceAll(' ', '-')}
          label={key}
          value={value.toString()}
          onChange={handleChange}
        />
      ))}
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
