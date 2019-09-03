import React from 'react';

import Request from './request/Request';
import FetchResponse from './fetchresponse/FetchResponse';
import Loading from '../shared/Loading';
import Notice from '../shared/Notice';

import './css/Test.css';

import {ConfigData} from '../config/Config';
import {DataData} from '../data/Data';
import {ProxyData} from './request/proxy/Proxy';

import * as utils from '../../utils';

export interface ValidatePayloadResult {
  message: string[];
  success: boolean;
}

interface TestProps {
  config: ConfigData;
  data: DataData;
  proxy: ProxyData;
  updateConfig: (data: ConfigData) => void;
  updateData: (data: DataData) => void;
  updateProxy: (data: ProxyData) => void;
  validation: ValidatePayloadResult;
}

interface TestState {
  isLoading: boolean;
  response: {
    headers?: Headers,
    data?: string,
  };
  finalDestination: string;
}

class Test extends React.PureComponent<TestProps, TestState> {

  constructor(props: TestProps) {
    super(props);
    this.state = {
      isLoading: false,
      response: {},
      finalDestination: ''
    };
  }

  getFetchData = () => {
    const fetchData: RequestInit = {
      method: this.props.config.method,
      body: null,
      headers: new Headers(
        this.props.config.headers.map(header => [header.type, header.value]),
      ),
    };

    if (utils.methodHasPayload(this.props.config.method)) {
      fetchData.body = JSON.stringify(this.props.data.data[this.props.data.type]);
    }
    return fetchData;
  }

  onTest = async () => {
    const finalDestination = ((this.props.proxy.isEnabled) ? this.props.proxy.url : '')
      + this.props.config.domain
      + this.props.config.endpoint;
    this.setState(
      {isLoading: true, finalDestination},
      async () => {
      // Todo: Run our own proxy service instead of using this.
      const dest = new URL(finalDestination);
      const response: Response = await fetch(
        dest.href,
        this.getFetchData(),
      );
      const data = await response.text();
      this.setState({
        isLoading: false,
        response: {
          headers: response.headers as Headers,
          data,
        }
      })
      }
    );
  }

  render () {
    if (!this.props.validation.success) {
      return (
        <div className="row">
          <div className="Test Disabled">
            {
              this.props.validation.message.map(
                (string, idx) => (
                  <label key={`validation_${idx}`}> {string} </label>
                ),
              )
            }
          </div>
        </div>
      )
    }
    if (this.state.isLoading) {
      return (
        <div className="row">
          <Loading />
        </div>
      );
    }
    return (
      <>
        <Request
          proxy={this.props.proxy}
          onUpdateProxy={this.props.updateProxy}
          shouldConfirm={false} // Todo: We need to ensure that everything matches up
          onRequest={this.onTest} />
        {
          this.state.response.headers && this.state.response.data &&
          <>
            <div className="row">
              <Notice
                className="twelve columns u-full-width"
                heading="Request complete"
                content={`Request sent ${this.props.proxy.isEnabled ? 'through Proxy' : ''} to ${this.state.finalDestination}`} />
            </div>
            <div className="row">
              <FetchResponse headers={this.state.response.headers} data={this.state.response.data} />
            </div>
          </>
        }
      </>
    );
  };
}

export default Test;
