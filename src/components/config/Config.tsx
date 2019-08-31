import React from 'react';

import Method from './method/Method';
import Headers, { Header } from './headers/Headers';
import Destination from './destination/Destination';

import {
  ColumnCount,
  HTTPMethods,
} from '../../enums';

export interface ConfigData {
  method: HTTPMethods;
  headers: Header[];
  domain: string;
  endpoint: string;
}

interface ConfigProps {
  data: ConfigData;
  updateConfig: (data: ConfigData) => void;
}

const Config: React.FunctionComponent<ConfigProps> = (props) => {
  const updateMethod = (value: HTTPMethods) => {

    const data = props.data;
    data.method = value;
    props.updateConfig(data);
  }

  const updateHeaders = (value: Header | null, index: number): void => {

    const data = props.data;
    if (!data.headers[index] && value) {
      data.headers.push(value);
    } else {
      if (!value) {
        delete data.headers[index];
        ;
        data.headers = data.headers.filter(header => header);
        ;
      } else {
        data.headers[index] = value;
      }
    }
    props.updateConfig(data);
  }

  const updateDestination = (domain: string, endpoint: string) => {

    const data = props.data;
    data.domain = domain;
    data.endpoint = endpoint;
    props.updateConfig(data);
  }

  return (
    <>
      <div className="row">
        <Headers
          onUpdate={updateHeaders}
          selected={props.data.headers}
          width={ColumnCount.TWELVE} />
      </div>
      <div className="row">
      <Method
        selected={props.data.method}
        width={ColumnCount.TWO}
        onUpdate={updateMethod} />
      <Destination
        onUpdate={updateDestination}
        domain={props.data.domain}
        endpoint={props.data.endpoint}
        width={ColumnCount.TEN} />
      </div>
    </>
  );
}
export default Config;
