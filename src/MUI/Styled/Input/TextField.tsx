import React from 'react';

interface TextFieldProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label?: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
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
}: TextFieldProps) {
  return (
    <div className='w-full mb-4'>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <input
        type='text'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
      />
      {helperText && <p className='mt-2 text-sm text-gray-500'>{helperText}</p>}
    </div>
  );
}
