import './css/Endpoint.css';

import Input from '../../../shared/Input';
import React from 'react';
import Tooltip from '../../../shared/Tooltip';

interface EndpointProps {
  isFullWidth: boolean;
  value: string;
  onUpdate: (value: string) => void;
}

const Endpoint: React.FunctionComponent<EndpointProps> = props => (
  <Tooltip text="Endpoint">
    <Input
      className={(props.isFullWidth ? 'u-full-width' : '') + ' Endpoint'}
      onChange={props.onUpdate}
      value={props.value}
    />
  </Tooltip>
);

export default Endpoint;
