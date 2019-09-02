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
    json?: {[key: string]: any},
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
      const dest = new URL(this.props.config.domain + this.props.config.endpoint);
      const response: Response = await fetch(
        dest.href,
        this.getFetchData(),
      )
      let json = {};
      try {
        json = await response.json();
      } catch (_) {}
      this.setState({
        isLoading: false,
        response: {
          headers: response.headers as Headers,
          json: json,
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
          this.state.response.headers && this.state.response.json &&
          <FetchResponse headers={this.state.response.headers} json={this.state.response.json} />
        }
      </>
    );
  };
}

export default Test;
