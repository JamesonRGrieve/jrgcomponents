import { Box, Button, Divider, FormControl, Select, TextField } from '@mui/material';
import Field from '../MUI/Styled/FormControl/Field';
import timezones from 'timezones-list';

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
  readOnlyFields?: string[];
  toUpdate?: any;
  additionalButtons?: ReactNode[];
  onConfirm: (data: { [key: string]: DynamicFormFieldValueTypes }) => void;
};

export default function DynamicForm({
  fields,
  toUpdate,
  excludeFields = [],
  readOnlyFields = [],
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
  console.log(timezones);
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
      if (!excludeFields.includes(key) && !readOnlyFields.includes(key)) {
        initialState[key] = {
          value: fields
            ? fields[key].value ?? typeDefaults[fields[key].type as keyof typeof typeDefaults]
            : toUpdate[key as keyof typeof toUpdate],
          error: '',
        };
      }
    });
    setEditedState(initialState);
  }, [fields, toUpdate]); // Depend on `fields` to re-initialize state when `fields` prop changes

  return (
    <Box component='form' display='grid' gridTemplateColumns='repeat(4, 1fr)' gap='1rem'>
      {Object.entries(editedState).map(
        ([key, value]) =>
          value !== undefined && (
            <Box key={key.toLowerCase().replaceAll(' ', '-')} gridColumn='span 2'>
              {['tz', 'timezone'].includes(key) ? (
                <Field
                  nameID={key.toLowerCase().replaceAll(' ', '-')}
                  label={fields ? fields[key].display ?? toTitleCase(key) : toTitleCase(key)}
                  value={value?.value?.toString() || ''}
                  onChange={handleChange}
                  messages={value.error ? [{ level: 'error', value: value.error }] : []}
                  type='select'
                  items={timezones
                    .sort((a, b) => {
                      if (a.utc !== b.utc) {
                        return a.utc > b.utc ? 1 : -1;
                      } else {
                        return a.tzCode > b.tzCode ? 1 : -1;
                      }
                    })
                    .map((tz) => ({ value: tz.tzCode, label: tz.label }))}
                />
              ) : (
                <Field
                  nameID={key.toLowerCase().replaceAll(' ', '-')}
                  label={fields ? fields[key].display ?? toTitleCase(key) : toTitleCase(key)}
                  value={value?.value?.toString() || ''}
                  onChange={handleChange}
                  messages={value.error ? [{ level: 'error', value: value.error }] : []}
                  type={
                    fields && fields[key].type === 'boolean'
                      ? 'checkbox'
                      : (fields && fields[key].type === 'password') || key.toLowerCase().includes('password')
                        ? 'password'
                        : 'text'
                  }
                />
              )}
            </Box>
          ),
      )}
      <Button
        sx={{ gridColumn: readOnlyFields.length > 0 ? '1 / 3' : additionalButtons.length > 0 ? 'span 2' : '2 / 4' }}
        onClick={handleSubmit}
      >
        {submitButtonText}
      </Button>
      {readOnlyFields.length > 0 && <Divider sx={{ gridColumn: 'span 4' }} />}
      {readOnlyFields.map((fieldName) => {
        return (
          toUpdate[fieldName as keyof typeof toUpdate] !== undefined && (
            <Box key={fieldName.toLowerCase().replaceAll(' ', '-')} gridColumn='span 2'>
              <FormControl fullWidth sx={{ my: '1rem' }}>
                <TextField
                  fullWidth
                  id={fieldName.toLowerCase().replaceAll(' ', '-')}
                  name={fieldName.toLowerCase().replaceAll(' ', '-')}
                  label={fields ? fields[fieldName].display ?? toTitleCase(fieldName) : toTitleCase(fieldName)}
                  value={toUpdate[fieldName as keyof typeof toUpdate]?.toString() || ''}
                  disabled
                />
              </FormControl>
            </Box>
          )
        );
      })}

      {additionalButtons}
    </Box>
  );
}
