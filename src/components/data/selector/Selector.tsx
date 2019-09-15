/**
 * @file Selector component
 * @author Mattamorphic
 */
import './css/Selector.css';

import { DataType } from '../../../enums';
import React from 'react';
import Select from '../../shared/Select';

interface SelectorProps {
  className?: string;
  selected: DataType;
  onUpdate: (value: DataType) => void;
}

const Selector: React.FunctionComponent<SelectorProps> = props => {
  const updateSelected = (value: string): void => {
    props.onUpdate(value as DataType);
  };

  return (
    <Select
      className={(props.className || '') + ' Selector'}
      onChange={updateSelected}
      selected={props.selected}
      values={Object.values(DataType)}
    />
  );
};

export default Selector;
