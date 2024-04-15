'use client';

import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { CommonDialogProps } from '../Dialog';

export type EditDialogProps = CommonDialogProps & {
  fields: {
    [key: string]: { value: string | number | boolean; validation?: (value: string | number | boolean) => boolean };
  };
  onClose: () => void;
  onConfirm: () => void;
  sx?: { [key: string]: string };
};
// TODO Maintain a state object of the form field values. Initialize it as their incoming values if present.
// TODO When the form is submitted, validate the fields first and call the onConfirm callback if all fields are valid.

const EditDialog: React.FC<EditDialogProps> = ({ fields, onClose, sx }) => {
  const [editState, setEditState] = useState<{ [key: string]: string | number | boolean }>({});

  /*  
  TODO Yes, but need refactoring.
  useEffect(() => {
    setEditState(fields);
  }, [toEdit]);
  */

  const handleChange = (key: string, value: string | number | boolean) => {
    setEditState((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
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
      <button onClick={onClose}>Confirm Edit</button>
    </Box>
  );
};

export default EditDialog;
