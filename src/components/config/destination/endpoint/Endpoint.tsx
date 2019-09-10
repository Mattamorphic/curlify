import React from 'react';

import Input from '../../../shared/Input';

import './css/Endpoint.css';

interface EndpointProps {
  isFullWidth: boolean;
  value: string;
  onUpdate: (value: string) => void;
}

const Endpoint: React.FunctionComponent<EndpointProps> = props => {
  const updateValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onUpdate(e.target.value);
  };
  return (
    <Input
      className={(props.isFullWidth ? 'u-full-width' : '') + ' Endpoint'}
      onChange={updateValue}
      value={props.value}
    />
  );
};

export default Endpoint;
