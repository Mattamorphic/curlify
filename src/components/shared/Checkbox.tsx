/**
 * @file Checkbox component
 * @author Mattamorphic
 */
import Input from './Input';
import { InputTypes } from '../../enums';
import React from 'react';

interface CheckboxProps {
  className?: string;
  isDisabled?: boolean;
  label?: string;
  isCheckedLabel?: string;
  isNotCheckedLabel?: string;
  name?: string;
  id?: string;
  isChecked: boolean;
  onChange: (value: boolean) => void;
  value?: string;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = props => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  };

  const label = props.isChecked
    ? props.isCheckedLabel || props.label
    : props.isNotCheckedLabel || props.label;

  return (
    <div className={props.className || ''}>
      <Input
        type={InputTypes.CHECKBOX}
        isChecked={props.isChecked}
        isDisabled={props.isDisabled || false}
        name={props.name || ''}
        id={props.id || ''}
        onChange={onChange}
        value={props.value || ''}
      />
      <span> {label} </span>
    </div>
  );
};

export default Checkbox;
