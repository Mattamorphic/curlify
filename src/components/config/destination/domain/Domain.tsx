import './css/Domain.css';

import Input from '../../../shared/Input';
import { InputTypes } from '../../../../enums';
import React from 'react';

interface DomainProps {
  isFullWidth: boolean;
  value: string;
  onUpdate: (value: string) => void;
}

const Domain: React.FunctionComponent<DomainProps> = props => (
  <Input
    className={(props.isFullWidth ? 'u-full-width' : '') + ' Domain'}
    onChange={props.onUpdate}
    type={InputTypes.URL}
    value={props.value}
  />
);

export default Domain;
