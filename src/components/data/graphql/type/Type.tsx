import React from 'react';

import Select from '../../../shared/Select';

import './css/Type.css';

import {GraphQLType} from '../GraphQL';

interface TypeProps {
  className?: string;
  selected: GraphQLType;
  onUpdate: (type: GraphQLType) => void;
}

const Type: React.FunctionComponent<TypeProps> = (props) => {
  const updateSelected = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const value: GraphQLType = e.target.value as GraphQLType;
    props.onUpdate(value);
  }

  return (
    <Select
      className={(props.className || '') + " Type"}
      onChange={updateSelected}
      selected={props.selected}
      values={Object.values(GraphQLType)} />
  );
}

export default Type
