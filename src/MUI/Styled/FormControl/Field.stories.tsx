// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import { useState } from 'react';
import React from 'react';
import FieldComponent, { FieldProps, Message } from './Field';

type Story = StoryObj<typeof meta>;


// Configure Component Stories.
export const TextFieldStory: Story = (args: FieldProps) => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue); // Update input value
  
    // Perform validation and update messages
    if (!newValue.trim()) {
      setMessages([{ level: 'error', value: 'This field cannot be empty' }]);
    } else {
      setMessages([]);
    }
  };

  return (
    <FieldComponent
      {...args}
      value={value}
      onChange={handleChange}
      messages={[{ level: 'error', value: 'Static error message for testing' }]} // Static test data
      nameID="textField"
    />
  );
};

TextFieldStory.args = {
  label: 'Text Field',
  description: 'Enter text here',
  type: 'text',
};
// Password Field Story
export const PasswordFieldStory: Story = (args: FieldProps) => {
  return (
    <FieldComponent
      {...args}
      value=""
      onChange={() => { }}
      messages={[]}
      nameID="passwordField"
    />
  );
};
PasswordFieldStory.args = {
  label: 'Password Field',
  description: 'Enter your password',
  type: 'password',
};

// Select Field Story
export const SelectFieldStory: Story = (args: FieldProps) => {
  return (
    <FieldComponent
      {...args}
      value=""
      onChange={() => { }}
      messages={[]}
      nameID="selectField"
      items={[{ value: 'option1', label: 'Option 1' }, { value: 'option2', label: 'Option 2' }]}
    />
  );
};
SelectFieldStory.args = {
  label: 'Select Field',
  description: 'Choose an option',
  type: 'select',
};

export const TimeFieldStory: Story = (args: FieldProps) => {
  return (
    <FieldComponent
      {...args}
      value=""
      onChange={() => { }}
      messages={[]}
      nameID="timeField"
    />
  );
};
TimeFieldStory.args = {
  label: 'Time Field',
  description: 'Select a time',
  type: 'time',
};

export const CheckboxFieldStory: Story = (args: FieldProps) => {
  // Assume the checkbox is initially unchecked
  const [isChecked, setIsChecked] = useState(false);

  return (
    <FieldComponent
      {...args}
      value={isChecked.toString()}
      onChange={() => setIsChecked(!isChecked)}
      messages={[]}
      nameID="checkboxField"
    />
  );
};
CheckboxFieldStory.args = {
  label: 'Checkbox Field',
  description: 'I agree to the terms and conditions',
  type: 'checkbox',
};

// export const RadioFieldStory: Story = (args: FieldProps) => {
//   // Handle radio selection state
//   const [selectedValue, setSelectedValue] = useState('');

//   return (
//     <FieldComponent
//       {...args}
//       value={selectedValue}
//       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedValue(e.target.value)}
//       messages={[]}
//       nameID="radioField"
//       items={[{ value: 'radio1', label: 'Radio Option 1' }, { value: 'radio2', label: 'Radio Option 2' }]}
//     />
//   );
// };
// RadioFieldStory.args = {
//   label: 'Radio Field',
//   description: 'Choose one of the options',
//   type: 'radio',
// };

// Configure Metadata.
const meta: Meta = {
  title: 'Forms/TextFieldWithAlert',
  component: FieldComponent,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    bodyText: { control: 'text' },
    buttonText: { control: 'text' },
  },
  parameters: {
    componentSubtitle: 'A TextFieldWithAlert Component',
    docs: {
      description: {
        component: 'This component is meant to illustrate how to effectively document components.',
      },
    },
    references: [],
  },
};
export default meta;
