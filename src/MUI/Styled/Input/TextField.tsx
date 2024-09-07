import React from 'react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label?: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  type?: string;
}

export default function TextField({
  id,
  value,
  onChange,
  helperText,
  label,
  placeholder,
  name,
  autoComplete,
  className,
  type = 'text',
  ...props
}: TextFieldProps) {
  return (
    <div className='flex flex-col w-full gap-2 mb-4'>
      <Label htmlFor={id}>{label}</Label>
      <Input {...{ id, value, onChange, name, autoComplete, placeholder, className, type, ...props }} required />
      {helperText && <p className='text-sm text-gray-500'>{helperText}</p>}
    </div>
  );
}
