/**
 * @file Data component
 * @author Mattamorphic
 */
import './css/Data.css';

import { DataType } from '../../enums';
import GraphQL from './graphql/GraphQL';
import Json from './json/Json';
import React from 'react';
import Selector from './selector/Selector';

export type payloadType = { [key: string]: any };
export type gqlPayloadType = { query: string };

export interface DataData {
  data: {
    [DataType.FORM]: null;
    [DataType.GQL]: gqlPayloadType;
    [DataType.JSON]: payloadType;
  };
  type: DataType;
}

interface DataProps {
  className?: string;
  data: DataData;
  updateData: (data: DataData) => void;
}

const Data: React.FunctionComponent<DataProps> = props => {
  const updateType = (value: DataType) => {
    const data = props.data;
    data.type = value;
    props.updateData(data);
  };

  const updateJsonData = (value: payloadType) => {
    const data = props.data;
    data.data.json = value;
    props.updateData(data);
  };

  const updateGraphQLData = (value: gqlPayloadType) => {
    const data = props.data;
    data.data.graphQL = value;
    props.updateData(data);
  };

  return (
    <div className={(props.className || '') + ' Data'}>
      <div className="row DataHeading">
        <h4> Request Data: {props.data.type.toUpperCase()} </h4>
      </div>
      <div className="row">
        <div className="twelve columns">
          {props.data.type === DataType.JSON && (
            <Json data={props.data.data.json} onUpdateData={updateJsonData} />
          )}
          {props.data.type === DataType.GQL && (
            <GraphQL
              data={props.data.data.graphQL}
              onUpdateData={updateGraphQLData}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <Selector
            className="u-full-width"
            onUpdate={updateType}
            selected={props.data.type}
          />
        </div>
      </div>
    </div>
  );
};
export default Data;
