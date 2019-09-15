/**
 * @file Endpoint component
 * @author Mattamorphic
 */
import './css/Endpoint.css';

import Input from '../../../shared/Input';
import React from 'react';
import Tooltip from '../../../shared/Tooltip';

interface EndpointProps {
  isFullWidth: boolean;
  onUpdate: (value: string) => void;
  value: string;
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
