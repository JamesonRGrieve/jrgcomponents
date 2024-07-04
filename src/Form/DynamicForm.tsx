import { Box, Button } from '@mui/material';
import Field from '../MUI/Styled/FormControl/Field';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
function toTitleCase(str: string) {
  // Replace underscores, or capital letters (in the middle of the string) with a space and the same character
  str = str.replace(/(_)|((?<=\w)[A-Z])/g, ' $&');

  // Remove underscore if exists
  str = str.replace(/_/g, '');

  // Convert to title case
  str = str.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return str;
}
const typeDefaults = {
  text: '',
  password: '',
  number: 0,
  boolean: false,
};
export type DynamicFormFieldValueTypes = string | number | boolean;
export type DynamicFormProps = {
  fields?: {
    [key: string]: {
      type: 'text' | 'number' | 'password' | 'boolean';
      display?: string;
      value?: DynamicFormFieldValueTypes;
      validation?: (value: DynamicFormFieldValueTypes) => boolean;
    };
  };
  submitButtonText?: string;
  excludeFields?: string[];
  toUpdate?: {};
  additionalButtons?: ReactNode[];
  onConfirm: (data: { [key: string]: DynamicFormFieldValueTypes }) => void;
};

export default function DynamicForm({
  fields,
  toUpdate,
  excludeFields = [],
  onConfirm,
  submitButtonText = 'Submit',
  additionalButtons = [],
}: DynamicFormProps) {
  if (fields === undefined && toUpdate === undefined) {
    throw new Error('Either fields or toUpdate must be provided to DynamicForm.');
  }
  const [editedState, setEditedState] = useState<{ [key: string]: { value: DynamicFormFieldValueTypes; error: string } }>(
    {},
  );

  const handleChange = useCallback((event: any, id?: string) => {
    setEditedState((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], value: event.target.value },
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    Object.keys(fields ?? toUpdate).forEach((key: string) => {
      try {
        if (fields) {
          if (fields[key].validation && fields[key].validation(editedState[key].value)) {
            setEditedState((prevState) => ({ ...prevState, [key]: { ...prevState[key], error: '' } }));
          } else {
            setEditedState((prevState) => ({
              ...prevState,
              [key]: { ...prevState[key], error: 'Invalid value, please double check your input.' },
            }));
          }
        } else {
          if (typeof toUpdate[key as keyof typeof toUpdate] === 'number' && isNaN(Number(editedState[key].value))) {
            setEditedState((prevState) => ({
              ...prevState,
              [key]: { ...prevState[key], error: 'Expected a number for this input.' },
            }));
          } else {
            setEditedState((prevState) => ({ ...prevState, [key]: { ...prevState[key], error: '' } }));
          }
        }
      } catch (error) {
        setEditedState((prevState) => ({ ...prevState, [key]: { ...prevState[key], error: error.message } }));
      }
    });
    console.log('No errors!');
    if (Object.values(editedState).every((field) => field.error === '')) {
      const formattedForReturn = Object.fromEntries(Object.entries(editedState).map(([key, value]) => [key, value.value]));
      console.log(formattedForReturn);
      onConfirm(formattedForReturn);
    }
  }, [editedState, fields, onConfirm]);

  // Initial state setup in useEffect to handle incoming props correctly
  useEffect(() => {
    console.log('Setting initial state');
    const initialState: { [key: string]: { value: DynamicFormFieldValueTypes; error: string } } = {};
    Object.keys(fields ?? toUpdate).forEach((key) => {
      if (!excludeFields.includes(key))
        initialState[key] = {
          value: fields
            ? fields[key].value ?? typeDefaults[fields[key].type as keyof typeof typeDefaults]
            : toUpdate[key as keyof typeof toUpdate],
          error: '',
        };
    });
    console.log(initialState);
    setEditedState(initialState);
  }, [fields, toUpdate]); // Depend on `fields` to re-initialize state when `fields` prop changes

  return (
    <Box component='form' display='grid' gridTemplateColumns='repeat(4, 1fr)' gap='1rem'>
      {Object.entries(editedState).map(
        ([key, value]) =>
          value !== undefined && (
            <Box key={key.toLowerCase().replaceAll(' ', '-')} gridColumn='span 2'>
              <Field
                nameID={key.toLowerCase().replaceAll(' ', '-')}
                label={fields ? fields[key].display ?? toTitleCase(key) : toTitleCase(key)}
                value={value?.value?.toString() || ''}
                onChange={handleChange}
                messages={value.error ? [{ level: 'error', value: value.error }] : []}
              />
            </Box>
          ),
      )}
      <Button sx={{ gridColumn: additionalButtons.length > 0 ? 'span 2' : '2 / 4' }} onClick={handleSubmit}>
        {submitButtonText}
      </Button>
      {additionalButtons}
    </Box>
  );
}
