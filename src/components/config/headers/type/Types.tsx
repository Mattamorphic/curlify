import React from 'react';

import Select from '../../../shared/Select';

import './css/Types.css';

import {HTTPHeaders} from '../../../../enums';

interface TypeProps {
  index: number;
  isFullWidth: boolean;
  values: (HTTPHeaders | string)[];
  selected: HTTPHeaders | string;
  onUpdate: (value: HTTPHeaders, index: number) => void;
}

const Types: React.FunctionComponent<TypeProps> = (props) => {
  const updateSelected = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const value: HTTPHeaders = e.target.value as HTTPHeaders;
    props.onUpdate(value, props.index);
  }

  return (
    <Select
      className={(props.isFullWidth ? 'u-full-width' : '') + ' Types'}
      onChange={updateSelected}
      selected={props.selected}
      values={props.values} />
  );
}

export default Types;
