import React, { useState } from 'react';

interface SelectFieldProps {
  id: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  items: any[];
  name: string;
  label: string;
}

export default function SelectField({ id, value, onChange, items, name, label }: SelectFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='relative'>
      <label htmlFor={id} className='absolute left-2 -top-2 bg-white px-1 text-xs text-gray-600 transition-all'>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-3 py-2 text-gray-700 bg-white border rounded-md appearance-none focus:outline-none
          ${isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
      >
        <option value='' disabled hidden>
          Select an option
        </option>
        {items?.map((item: any, index: number) => (
          <option key={index} value={item.value ?? item}>
            {item.label ?? item}
          </option>
        ))}
      </select>
      <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
        <svg className='w-4 h-4 fill-current text-gray-400' viewBox='0 0 20 20'>
          <path
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
            fillRule='evenodd'
          ></path>
        </svg>
      </div>
    </div>
  );
}
