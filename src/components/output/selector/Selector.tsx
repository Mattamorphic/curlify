/**
 * @file Selector component
 * @author Mattamorphic
 */
import './css/Selector.css';

import { OutputType } from '../../../enums';
import React from 'react';
import Select from '../../shared/Select';

interface SelectorProps {
  className?: string;
  selected: OutputType;
  onUpdate: (value: OutputType) => void;
}

const Selector: React.FunctionComponent<SelectorProps> = props => {
  const updateSelected = (value: string): void => {
    props.onUpdate(value as OutputType);
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
