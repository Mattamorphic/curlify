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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputTypes;
  value?: string;
}

// Input Component
const Input: React.FunctionComponent<InputProps> = props => (
  <>
    {props.label && <label>{props.label}</label>}
    <input
      type={props.type || InputTypes.TEXT}
      checked={props.isChecked}
      className={props.className || ''}
      name={props.name || ''}
      id={props.id || ''}
      value={props.value || ''}
      disabled={props.isDisabled}
      onChange={props.onChange}
    />
  </>
);

export default Input;
