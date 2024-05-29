import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

interface MultiCheckFieldProps {
  id: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  items: string[];
}

export default function MultiCheckField({ id, value, onChange, items }: MultiCheckFieldProps) {
  return (
    <FormGroup>
      {items.map((item, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              id={`${id}_${item.replace(/[\W_]+/g, '')}`}
              checked={value.includes(item)}
              onChange={(event) => {
                const newValue = [...value];
                if (event.target.checked) {
                  newValue.push(item);
                } else {
                  const index = newValue.indexOf(item);
                  if (index > -1) {
                    newValue.splice(index, 1);
                  }
                }
                //onChange({ target: { ...EventTarget, value: newValue.toString() } });
              }}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
}
