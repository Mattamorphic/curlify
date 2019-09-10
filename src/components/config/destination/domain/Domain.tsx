import './css/Domain.css';

import Input from '../../../shared/Input';
import { InputTypes } from '../../../../enums';
import React from 'react';
import Tooltip from '../../../shared/Tooltip';

interface DomainProps {
  isFullWidth: boolean;
  value: string;
  onUpdate: (value: string) => void;
}

const Domain: React.FunctionComponent<DomainProps> = props => (
  <Tooltip text="Domain">
    <Input
      className={(props.isFullWidth ? 'u-full-width' : '') + ' Domain'}
      onChange={props.onUpdate}
      type={InputTypes.URL}
      value={props.value}
    />
  </Tooltip>
);

export default Domain;
