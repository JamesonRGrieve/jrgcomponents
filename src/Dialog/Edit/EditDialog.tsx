'use client';

import React, { useState, useEffect } from 'react';
import Dialog, { DialogProps } from '../Dialog';
import DynamicForm, { DynamicFormFieldValueTypes, DynamicFormProps } from '../../Form/DynamicForm';
import { Collapse, Typography } from '@mui/material';

export type EditDialogProps = DynamicFormProps &
  DialogProps & {
    onConfirm: (values: { [key: string]: DynamicFormFieldValueTypes }) => void;
  };
// TODO Maintain a state object of the form field values. Initialize it as their incoming values if present.
// TODO When the form is submitted, validate the fields first and call the onConfirm callback if all fields are valid.

const EditDialog: React.FC<EditDialogProps> = ({ onClose, title, sx, fields, onConfirm, ButtonComponent, ButtonProps }) => {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <Dialog
      onClose={onClose}
      title={title}
      sx={sx}
      content={
        <>
          <DynamicForm
            fields={fields}
            onSubmit={(values) => {
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
      onConfirm={onConfirm}
      ButtonComponent={ButtonComponent}
      ButtonProps={ButtonProps}
    />
  );
};

export default EditDialog;
