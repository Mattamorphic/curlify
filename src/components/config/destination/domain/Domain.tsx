import React from 'react';

import Input from '../../../shared/Input';

import './css/Domain.css';

import { InputTypes } from '../../../../enums';

interface DomainProps {
  isFullWidth: boolean;
  value: string;
  onUpdate: (value: string) => void;
}

const Domain: React.FunctionComponent<DomainProps> = props => {
  const updateValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onUpdate(e.target.value);
  };

  return (
    <Input
      className={(props.isFullWidth ? 'u-full-width' : '') + ' Domain'}
      onChange={updateValue}
      type={InputTypes.URL}
      value={props.value}
    />
  );
};

export default Domain;
