import React from 'react';

import GraphQL from './graphql/GraphQL';
import Json from './json/Json';
import Selector from './selector/Selector';

import './css/Data.css';

import {
  DataType,
} from '../../enums';

export type payloadType = {[key: string]: any}
export type gqlPayloadType = {query: string}

export interface DataData {
  type: DataType;
  data: {
    [DataType.JSON]: payloadType;
    [DataType.GQL]: gqlPayloadType;
    [DataType.FORM]: null;
  }
}

interface DataProps {
  data: DataData;
  updateData: (data: DataData) => void;
}

const Data: React.FunctionComponent<DataProps> = (props) => {
  const updateType = (value: DataType) => {
    const data = props.data;
    data.type = value;
    props.updateData(data);
  }

  const updateJsonData = (value: payloadType) => {
    const data = props.data;
    data.data.json = value;
    props.updateData(data);
  }

  const updateGraphQLData = (value: gqlPayloadType) => {
    const data = props.data;
    data.data.graphQL = value
    props.updateData(data);
  }

  return (
    <div className="Data">
      <div className="row">
        <div className="twelve columns">
          <label> Data </label>
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <Selector
            className="u-full-width"
            selected={props.data.type}
            onUpdate={updateType} />
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
        {
          props.data.type === DataType.JSON
            && (<Json data={props.data.data.json} onUpdateData={updateJsonData} />)
        }
        {
          props.data.type === DataType.GQL
            && (<GraphQL
              data={props.data.data.graphQL}
              onUpdateData={updateGraphQLData} />)
        }
        </div>
      </div>
    </div>
  );
}
export default Data;
