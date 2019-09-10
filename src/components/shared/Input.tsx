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
      checked={props.isChecked}
      className={props.className || ''}
      disabled={props.isDisabled}
      id={props.id || ''}
      name={props.name || ''}
      onChange={props.onChange}
      type={props.type || InputTypes.TEXT}
      value={props.value || ''}
    />
  </>
);

export default Input;
