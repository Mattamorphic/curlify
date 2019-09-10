import './css/Value.css';

import Input from '../../../shared/Input';
import React from 'react';

interface ValueProps {
  index: number;
  isFullWidth: boolean;
  value: string;
  onUpdate: (value: string, index: number) => void;
}

const Value: React.FunctionComponent<ValueProps> = props => {
  const updateValue = (value: string): void => {
    props.onUpdate(value, props.index);
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
