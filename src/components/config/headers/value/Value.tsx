import React from 'react';

import Input from '../../../shared/Input';

import './css/Value.css';

interface ValueProps {
  index: number;
  isFullWidth: boolean;
  value: string;
  onUpdate: (value: string, index: number) => void;
}

const Value: React.FunctionComponent<ValueProps> = props => {
  const updateValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onUpdate(e.target.value, props.index);
  };

  return (
    <Input
      className={(props.isFullWidth ? 'u-full-width' : '') + ' Value'}
      onChange={updateValue}
      value={props.value}
    />
  );
};

export default Value;
