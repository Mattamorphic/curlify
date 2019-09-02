import React from 'react';

import Request from './request/Request';
import FetchResponse from './fetchresponse/FetchResponse';
import Loading from '../shared/Loading';

import './css/Test.css';

import {ConfigData} from '../config/Config';
import {DataData} from '../data/Data';

import * as utils from '../../utils';

export interface ValidatePayloadResult {
  message: string[];
  success: boolean;
}

interface TestProps {
  config: ConfigData;
  data: DataData;
  updateConfig: (data: ConfigData) => void;
  updateData: (data: DataData) => void;
  validation: ValidatePayloadResult;
}

interface TestState {
  isLoading: boolean;
  response: {
    headers?: Headers,
    data?: string,
  };
}

class Test extends React.PureComponent<TestProps, TestState> {

  constructor(props: TestProps) {
    super(props);
    this.state = {
      isLoading: false,
      response: {}
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
    this.setState(
      {isLoading: true},
      async () => {
      // Todo: Run our own proxy service instead of using this.
      const dest = new URL("https://curlify-proxy.herokuapp.com/" + this.props.config.domain + this.props.config.endpoint);
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
          shouldConfirm={false} // Todo: We need to ensure that everything matches up
          onRequest={this.onTest} />
        {
          this.state.response.headers && this.state.response.data &&
          <FetchResponse headers={this.state.response.headers} data={this.state.response.data} />
        }
      </>
    );
  };
}

export default Test;
