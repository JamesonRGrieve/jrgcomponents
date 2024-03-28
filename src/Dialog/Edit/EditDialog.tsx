import { Box } from '@mui/system';
import React from 'react';

export type EditDialogProps = {
  toEdit: { [key: string]: any };
  onClose: () => void;
  sx?: { [key: string]: string };
};

const EditDialog: React.FC<EditDialogProps> = ({ toEdit, onClose, sx }) => {
  return (
    <Box style={sx}>
      <ul>
        {Object.entries(toEdit).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
      <button onClick={onClose}>Confirm Edit</button>
    </Box>
  );
};

export default EditDialog;