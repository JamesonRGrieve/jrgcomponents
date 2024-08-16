import React, { useState } from 'react';

interface PasswordFieldProps {
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label?: string;
  name?: string;
  autoComplete?: string;
}

export default function PasswordField({
  id = 'password',
  value,
  onChange,
  helperText = 'Please enter your password.',
  name = 'password',
  label = 'Password',
  autoComplete = 'current-password',
}: PasswordFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='w-full mb-4'>
      <div className='relative'>
        <input
          type='password'
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          className={`w-full px-3 py-2 text-gray-700 border rounded-md appearance-none focus:outline-none
            ${isFocused || value ? 'pt-6' : 'pt-3'}
            ${isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <label
          htmlFor={id}
          className={`absolute left-3 transition-all duration-200 ease-in-out
            ${isFocused || value ? 'top-1 text-xs text-blue-500' : 'top-3 text-base text-gray-500'}`}
        >
          {helperText == null ? label : helperText}
        </label>
      </div>
    </div>
  );
}
