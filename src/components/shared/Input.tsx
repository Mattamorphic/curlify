// Import React
import React from 'react';

// Import Enums
import {InputTypes} from '../../enums';

// Define Interfaces
interface InputProps {
  className?: string;
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
const Input: React.FunctionComponent<InputProps> = (props) => (
  <>
  { props.label && (<label>{props.label}</label>) }
  <input
    type={props.type || InputTypes.TEXT}
    className={props.className || ''}
    name={props.name || ''}
    id={props.id || ''}
    value={props.value || ''}
    disabled={props.isDisabled || false}
    onChange={props.onChange}
     />
  </>
);

export default Input;
