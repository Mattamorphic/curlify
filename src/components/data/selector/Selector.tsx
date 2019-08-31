import React from 'react';

import Select from '../../shared/Select';

import './css/Selector.css';

import {DataType} from '../../../enums';

interface SelectorProps {
  className?: string;
  selected: DataType;
  onUpdate: (value: DataType) => void;
}

const Selector: React.FunctionComponent<SelectorProps> = (props) => {
  const updateSelected = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const value: DataType = e.target.value as DataType;
    props.onUpdate(value);
  }

  return (
    <Select
      className={(props.className || '') + " Selector"}
      onChange={updateSelected}
      selected={props.selected}
      values={Object.values(DataType)} />
  );
}

export default Selector;
