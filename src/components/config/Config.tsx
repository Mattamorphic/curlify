import './css/Config.css';

import * as utils from '../../utils';

import Destination from './destination/Destination';
import Method from './method/Method';
import React from 'react';
import Toggler from '../shared/Toggler';

import { ColumnCount, HTTPMethods } from '../../enums';
import Headers from './headers/Headers';
import { KeyValueEntry } from '../shared/KeyValueInput';
import QueryParams from './queryparams/QueryParams';

export interface ConfigData {
  method: HTTPMethods;
  headers: KeyValueEntry[];
  domain: string;
  endpoint: string;
  queryParams: KeyValueEntry[];
  urlString: string;
}

interface ConfigProps {
  data: ConfigData;
  updateConfig: (data: ConfigData) => void;
}

interface ConfigState {
  showConfigSettings: boolean;
}

export default class Config extends React.PureComponent<
  ConfigProps,
  ConfigState
> {
  constructor(props: ConfigProps) {
    super(props);
    this.state = {
      showConfigSettings: true
    };
  }

  toggleConfigSettings = () => {
    this.setState(prevState => ({
      showConfigSettings: !prevState.showConfigSettings
    }));
  };

  updateDestination = (
    domain: string,
    endpoint: string,
    queryParams: KeyValueEntry[],
    rawUrl: string
  ) => {
    const data = this.props.data;
    data.domain = domain;
    data.endpoint = endpoint;
    data.queryParams = queryParams;
    data.urlString = rawUrl;
    this.props.updateConfig(data);
  };

  updateHeaders = (value: KeyValueEntry, index: number): void => {
    const data = this.props.data;
    if (!data.headers[index] && value) {
      data.headers.push(value);
    } else {
      data.headers[index] = value;
    }
    this.props.updateConfig(data);
  };

  removeHeader = (index: number): void => {
    const data = this.props.data;
    delete data.headers[index];
    data.headers = data.headers.filter(header => header);
    this.props.updateConfig(data);
  };

  updateMethod = (value: HTTPMethods) => {
    const data = this.props.data;
    data.method = value;
    this.props.updateConfig(data);
  };

  updateQueryParams = (value: KeyValueEntry, index: number): void => {
    const data = this.props.data;
    if (!data.queryParams[index] && value) {
      data.queryParams.push(value);
    } else {
      data.queryParams[index] = value;
    }
    data.urlString =
      data.domain +
      data.endpoint +
      utils.convertObjToQueryParams(data.queryParams);
    this.props.updateConfig(data);
  };

  removeQueryParameter = (index: number): void => {
    const data = this.props.data;
    delete data.queryParams[index];
    data.queryParams = data.queryParams.filter(queryparam => queryparam);
    this.props.updateConfig(data);
  };

  render() {
    const destination = this.props.data.domain + this.props.data.endpoint;
    return (
      <>
        <Toggler
          className="Config"
          collapsedData={
            <>
              Sending a [<strong>{this.props.data.method}</strong>] request to:
              [
              <strong>
                <a href={destination}>{destination}</a>
              </strong>
              ]
              {this.props.data.headers.length > 0 && (
                <>
                  , with the HTTP Headers:{' '}
                  {this.props.data.headers.map(header => (
                    <span key={header.key + '_snip'}>
                      <br />
                      <strong>{header.key}</strong>: <em>{header.value}</em>
                    </span>
                  ))}
                </>
              )}
            </>
          }
          isToggled={this.state.showConfigSettings}
          heading="Request Config Settings"
          label="Config Settings"
          tooltip="Toggle request config"
          onToggle={this.toggleConfigSettings}
        >
          <div className="row">
            <Method
              onUpdate={this.updateMethod}
              selected={this.props.data.method}
              width={ColumnCount.TWO}
            />
            <Destination
              domain={this.props.data.domain}
              endpoint={this.props.data.endpoint}
              queryParams={this.props.data.queryParams}
              onUpdate={this.updateDestination}
              width={ColumnCount.TEN}
            />
          </div>
          <div className="row">
            <QueryParams
              onUpdate={this.updateQueryParams}
              onRemove={this.removeQueryParameter}
              selected={this.props.data.queryParams}
            />
          </div>
          <div className="row">
            <Headers
              onRemove={this.removeHeader}
              onUpdate={this.updateHeaders}
              selected={this.props.data.headers}
              width={ColumnCount.TWELVE}
            />
          </div>
        </Toggler>
      </>
    );
  }
}
