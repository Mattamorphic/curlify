import Destination from './destination/Destination';
import Method from './method/Method';
import Notice from '../shared/Notice';
import React from 'react';
import Toggler from '../shared/Toggler';

import { ColumnCount, HTTPMethods } from '../../enums';
import Headers, { Header } from './headers/Headers';

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

  updateMethod = (value: HTTPMethods) => {
    const data = this.props.data;
    data.method = value;
    this.props.updateConfig(data);
  };

  updateHeaders = (value: Header | null, index: number): void => {
    const data = this.props.data;
    if (!data.headers[index] && value) {
      data.headers.push(value);
    } else {
      if (!value) {
        delete data.headers[index];
        data.headers = data.headers.filter(header => header);
      } else {
        data.headers[index] = value;
      }
    }
    this.props.updateConfig(data);
  };

  updateDestination = (domain: string, endpoint: string) => {
    const data = this.props.data;
    data.domain = domain;
    data.endpoint = endpoint;
    this.props.updateConfig(data);
  };

  toggleConfigSettings = () => {
    this.setState(prevState => ({
      showConfigSettings: !prevState.showConfigSettings
    }));
  };

  render() {
    const destination = this.props.data.domain + this.props.data.endpoint;
    return (
      <>
        <div className="row">
          <Toggler
            className="Config"
            isToggled={this.state.showConfigSettings}
            label="Config Settings"
            onToggle={this.toggleConfigSettings}
          >
            <div className="row">
              <h4>Request Config Settings</h4>
            </div>
            <div className="row">
              <Headers
                onUpdate={this.updateHeaders}
                selected={this.props.data.headers}
                width={ColumnCount.TWELVE}
              />
            </div>
            <div className="row">
              <Method
                onUpdate={this.updateMethod}
                selected={this.props.data.method}
                width={ColumnCount.TWO}
              />
              <Destination
                domain={this.props.data.domain}
                endpoint={this.props.data.endpoint}
                onUpdate={this.updateDestination}
                width={ColumnCount.TEN}
              />
            </div>
          </Toggler>
        </div>
        {!this.state.showConfigSettings && (
          <Notice heading="Request Config Settings">
            Sending a [<strong>{this.props.data.method}</strong>] request to: [
            <strong>
              <a href={destination}>{destination}</a>
            </strong>
            ]
            {this.props.data.headers.length > 0 && (
              <>
                , with the HTTP Headers:{' '}
                {this.props.data.headers.map(header => (
                  <>
                    <br />
                    <strong>{header.type}</strong>: <em>{header.value}</em>
                  </>
                ))}
              </>
            )}
          </Notice>
        )}
      </>
    );
  }
}
