import './css/Types.css';

import { HTTPHeaders } from '../../../../enums';
import React from 'react';
// import Select from '../../../shared/Select';
import Autocomplete from '../../../shared/Autocomplete';

interface TypeProps {
  index: number;
  isFullWidth: boolean;
  suggested: (HTTPHeaders | string)[];
  selected: HTTPHeaders | string;
  onUpdate: (value: string, index: number) => void;
}

const Types: React.FunctionComponent<TypeProps> = props => {
  const updateSelected = (value: string): void => {
    props.onUpdate(value, props.index);
  };

  return (
    <Autocomplete
      className="Types"
      onSelectSuggestion={updateSelected}
      selected={props.selected}
      suggestions={props.suggested}
    />
  );
};

export default Types;
