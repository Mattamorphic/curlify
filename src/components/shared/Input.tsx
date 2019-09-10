import { InputTypes } from '../../enums';
import React from 'react';

// Define Interfaces
interface InputProps {
  className?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  label?: string;
  name?: string;
  id?: string;
  onChange?: (value: string) => void;
  onChangeRaw?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputTypes;
  value?: string;
}

// Input Component
const Input: React.FunctionComponent<InputProps> = props => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeRaw) {
      return props.onChangeRaw(e);
    } else if (props.onChange) {
      return props.onChange(e.target.value);
    }
  };

  return (
    <>
      {props.label && <label>{props.label}</label>}
      <input
        checked={props.isChecked}
        className={props.className || ''}
        disabled={props.isDisabled}
        id={props.id || ''}
        name={props.name || ''}
        onChange={onChange}
        placeholder={props.placeholder || ''}
        type={props.type || InputTypes.TEXT}
        value={props.value || ''}
      />
    </>
  );
};

export default Input;
