'use client';

import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';

export type EditDialogProps = {
  toEdit: { [key: string]: string | number | boolean };
  onClose: () => void;
  sx?: { [key: string]: string };
};

const EditDialog: React.FC<EditDialogProps> = ({ toEdit, onClose, sx }) => {

  const [editState, setEditState] = useState<{ [key: string]: string | number | boolean }>({});

  useEffect(() => {
    setEditState(toEdit);
  }, [toEdit]);

  const handleChange = (key: string, value: string | number | boolean) => {
    setEditState(prevState => ({ ...prevState, [key]: value }));
  };


  return (
    <Box sx={{
      li: {
        listStyleType: 'none',
      }
    }}>
      <ul>
        {Object.entries(editState).map(([key, value]) => (
          <li key={key}>
            {`${key}: `}
            <input
              type='text'
              value={value.toString()}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Confirm Edit</button>
    </Box>
  );
};

export default EditDialog;