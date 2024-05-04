'use client';

import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import Dialog, { CommonDialogProps } from '../Dialog';

export type EditDialogProps = CommonDialogProps & {
  fields: {
    [key: string]: { value: string | number | boolean; validation?: (value: string | number | boolean) => boolean };
  };
  ButtonComponent: React.FC<{ onClick: () => void }>;
  ButtonProps: any;
  onConfirm: () => void;
  sx?: { [key: string]: string };
};
// TODO Maintain a state object of the form field values. Initialize it as their incoming values if present.
// TODO When the form is submitted, validate the fields first and call the onConfirm callback if all fields are valid.

const EditDialog: React.FC<EditDialogProps> = ({
  onClose,
  title,
  sx,
  fields,
  onConfirm,
  ButtonComponent,
  ButtonProps,
}) => {
  const [editState, setEditState] = useState<{ [key: string]: string | number | boolean }>({});

  const handleChange = (key: string, value: string | number | boolean) => {
    setEditState((prevState) => ({ ...prevState, [key]: value }));
  };

  // Initial state setup in useEffect to handle incoming props correctly
  useEffect(() => {
    const initialState = {};
    Object.keys(fields).forEach(key => {
      initialState[key] = fields[key].value;
    });
    setEditState(initialState);
  }, [fields]);  // Depend on `fields` to re-initialize state when `fields` prop changes

  return (
    <Dialog
      onClose={onClose}
      title={title}
      sx={sx}
      content={
        <Box
          sx={{
            li: {
              listStyleType: 'none',
            },
          }}
        >
          <ul>
            {Object.entries(editState).map(([key, value]) => (
              <li key={key}>
                {`${key}: `}
                <input type='text' value={value.toString()} onChange={(e) => handleChange(key, e.target.value)} />
              </li>
            ))}
          </ul>
        </Box>}
      onConfirm={onConfirm}
      ButtonComponent={ButtonComponent}
      ButtonProps={ButtonProps}
    />
  );
};

export default EditDialog;
