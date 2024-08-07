'use client';

import React, { useState, useMemo } from 'react';
import { Collapse, Typography } from '@mui/material';
import Dialog, { DialogProps } from '../Dialog';
import DynamicForm, { DynamicFormProps } from '../../Form/DynamicForm';

export type EditDialogProps = DialogProps & DynamicFormProps & { excludeFields?: string[] };

// TODO Maintain a state object of the form field values. Initialize it as their incoming values if present.
// TODO When the form is submitted, validate the fields first and call the onConfirm callback if all fields are valid.

const EditDialog: React.FC<EditDialogProps> = ({
  onClose,
  title,
  sx,
  fields,
  toUpdate,
  excludeFields,
  readOnlyFields,
  onConfirm,
  ButtonComponent,
  ButtonProps,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const processedToUpdate = useMemo(() => {
    const toReturn = { ...toUpdate };
    if (excludeFields?.length > 0) {
      for (const key of excludeFields) {
        if (toReturn[key as keyof typeof toReturn]) {
          delete toReturn[key as keyof typeof toReturn];
        }
      }
    }
    return toReturn;
  }, [toUpdate, excludeFields]);
  return (
    <Dialog
      onClose={onClose}
      title={title}
      sx={sx}
      content={
        <>
          <DynamicForm
            toUpdate={processedToUpdate}
            fields={fields}
            readOnlyFields={readOnlyFields}
            onConfirm={(values) => {
              try {
                onConfirm(values);
              } catch (error) {
                setErrorMessage(error.message);
              }
            }}
          />
          <Collapse in={errorMessage !== ''}>
            <Typography color='error'>{errorMessage}</Typography>
          </Collapse>
        </>
      }
      ButtonComponent={ButtonComponent}
      ButtonProps={ButtonProps}
    />
  );
};

export default EditDialog;
