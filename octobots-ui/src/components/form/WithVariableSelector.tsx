import React from 'react';
import { IField } from '@octobots/ui-segments/src/types';
import FormControl from './Control';
import { VariableSelector } from './customControl/VariableSelector';

interface VariableInputProps {
  type?: 'text' | 'textarea' | 'number';
  value: string;
  onChange: (value: string | React.ChangeEvent<any>) => void;
  fields: IField[];
  placeholder?: string;
  rows?: number;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const VariableInput: React.FC<VariableInputProps> = ({
  type = 'text',
  value,
  onChange,
  fields,
  placeholder,
  rows = 3,
  label,
  required,
  disabled
}) => {

  if (type === 'textarea') {
    return (
      <VariableSelector
        fields={fields}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        multiline
        rows={rows}
        label={label}
        required={required}
        disabled={disabled}
      />
    );
  }

  return (
    <VariableSelector
      fields={fields}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      label={label}
      required={required}
      disabled={disabled}
    />
  );
};

// FormControl compatible version
export const VariableFormControl = ({
  name,
  value,
  onChange,
  fields,
  ...props
}: VariableInputProps & { name: string }) => {
  return (
    <FormControl
      name={name}
      value={value}
      onChange={onChange}
      component={VariableInput}
      fields={fields}
      {...props}
    />
  );
};


// >>>>> usage returns string
// <VariableInput
//   type="text" // or "textarea" or "number"
//   value={value}
//   onChange={setValue}
//   fields={fields}
//   placeholder="Enter value..."
//   label="My Field"
//   required
// />


// >>>>> OR Using with FormControl in a form: returns event change
// <VariableFormControl
//   name="myField"
//   type="textarea"
//   value={value}
//   onChange={handleChange}
//   fields={fields}
//   rows={5}
//   label="My Field"
//   required
// />