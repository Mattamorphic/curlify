import './css/Endpoint.css';

import Input from '../../../shared/Input';
import React from 'react';

interface EndpointProps {
  isFullWidth: boolean;
  value: string;
  onUpdate: (value: string) => void;
}

const Endpoint: React.FunctionComponent<EndpointProps> = props => (
  <Input
    className={(props.isFullWidth ? 'u-full-width' : '') + ' Endpoint'}
    onChange={props.onUpdate}
    value={props.value}
  />
);

export default Endpoint;
