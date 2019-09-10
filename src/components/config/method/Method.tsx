import './css/Method.css';

import React from 'react';
import Select from '../../shared/Select';
import Tooltip from '../../shared/Tooltip';

import { ColumnCount, HTTPMethods } from '../../../enums/';

interface methodProps {
  onUpdate: (value: HTTPMethods) => void;
  selected: HTTPMethods;
  width: ColumnCount;
}

const Method: React.FunctionComponent<methodProps> = props => {
  const updateSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value: HTTPMethods = e.target.value as HTTPMethods;
    props.onUpdate(value);
  };

  return (
    <div className={props.width}>
      <Tooltip text="Method">
        <Select
          className="u-full-width Method"
          onChange={updateSelected}
          selected={props.selected}
          values={Object.values(HTTPMethods)}
        />
      </Tooltip>
    </div>
  );
};

export default Method;
