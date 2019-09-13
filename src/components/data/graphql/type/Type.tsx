import './css/Type.css';

import { GraphQLType } from '../GraphQL';
import React from 'react';
import Select from '../../../shared/Select';

interface TypeProps {
  className?: string;
  selected: GraphQLType;
  onUpdate: (type: GraphQLType) => void;
}

const Type: React.FunctionComponent<TypeProps> = props => {
  const updateSelected = (value: string): void => {
    props.onUpdate(value as GraphQLType);
  };

  return (
    <Select
      className={(props.className || '') + ' Type'}
      onChange={updateSelected}
      selected={props.selected}
      values={Object.values(GraphQLType)}
    />
  );
};

export default Type;
