// Import Storybook.
import type { Meta, StoryObj } from '@storybook/react';

// Import Component and related types.
import TextFieldWithAlertComponent, { TextFieldWithAlertProps } from './TextFieldWithAlert';
import { useState } from 'react';

type Story = StoryObj<typeof meta>;

// Configure Component Stories.
export const TextFieldWithAlert: Story = (args: TextFieldWithAlertProps) => 
{
  const TextFieldWithAlertWrapper = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    return (
      <TextFieldWithAlertComponent {...args} value={value} onChange={(e: any) => setValue(e.target.value)} error={error} submit={() => {setError(error?"":"An error has occured, hit enter again to remove.")}} />
    );
  
  }
  return <TextFieldWithAlertWrapper />;
}

TextFieldWithAlert.args = {
  id: "sample-text-field",
  label: "Text Field (Hit Enter to Submit)",
  autoComplete: ""
};

// Configure Metadata.
const meta: Meta = {
  title: 'Components/TextFieldWithAlert',
  component: TextFieldWithAlertComponent,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    bodyText: { control: 'text' },
    buttonText: { control: 'text' }
  },
  parameters: {
    componentSubtitle: 'A TextFieldWithAlert Component',
    docs: {
      description: {
        component: 'This component is meant to illustrate how to effectively document components.'
      }
    },
    references: []
  }
};
export default meta;