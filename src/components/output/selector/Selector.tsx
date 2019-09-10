import React from 'react';

import Select from '../../shared/Select';

import './css/Selector.css';

import { OutputType } from '../../../enums';

interface SelectorProps {
  className?: string;
  selected: OutputType;
  onUpdate: (value: OutputType) => void;
}

const Selector: React.FunctionComponent<SelectorProps> = props => {
  const updateSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value: OutputType = e.target.value as OutputType;
    props.onUpdate(value);
  };

  return (
    <Select
      className={(props.className || '') + ' Selector'}
      onChange={updateSelected}
      selected={props.selected}
      values={Object.values(OutputType)}
    />
  );
};

export default Selector;
