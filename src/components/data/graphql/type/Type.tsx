/**
 * @file Type component
 * @author Mattamorphic
 */
import './css/Type.css';

import { GraphQLType } from '../GraphQL';
import React from 'react';
import Select from '../../../shared/Select';

interface TypeProps {
  className?: string;
  onUpdate: (type: GraphQLType) => void;
  selected: GraphQLType;
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
