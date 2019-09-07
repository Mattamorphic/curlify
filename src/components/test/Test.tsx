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
  hasRun: boolean;
  response: {
    headers?: Headers,
    data?: string,
    destination?: URL,
  };
}

class Test extends React.PureComponent<TestProps, TestState> {

  baseState: TestState;

  constructor(props: TestProps) {
    super(props);
    this.state = {
      // is the request executing
      isLoading: false,
      // has there been an execution
      hasRun: false,
      // hold the response
      response: {},
    };
    this.baseState = this.state;
  }

  componentDidUpdate(prevProps: TestProps) {
    if (utils.hasProxyChanged(prevProps.proxy, this.props.proxy)) {
      this.setState(this.baseState);
    }
  }


  getDestination = (): string => {
    const destination = this.props.config.domain + this.props.config.endpoint;
    return this.props.proxy.isEnabled
      ? this.props.proxy.url + destination
      : destination;
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
      {
        isLoading: true,
        hasRun: true,
        response: {}
      },
      async () => {
      // Todo: Run our own proxy service instead of using this.
      const dest = new URL(this.getDestination());
      let data = null;
      let response: Response | null = null;
      try {
        response = await fetch(
          dest.href,
          this.getFetchData(),
        );
        data = await response.text();
        this.setState({
          isLoading: false,
          response: {
            destination: dest,
            headers: response.headers as Headers,
            data,
          }
        });
      } catch (_) {
        this.setState({
          isLoading: false,
        });
      }
    });
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

    const proxyMessage = `${
      this.props.proxy.isEnabled
        ? 'through Proxy'
        : ''
      } to ${this.state.response.destination || this.getDestination()}`;

    return (
      <>
        <Request
          hasRun={this.state.hasRun}
          proxy={this.props.proxy}
          onUpdateProxy={this.props.updateProxy}
          shouldConfirm={false} // Todo: We need to ensure that everything matches up
          onRequest={this.onTest} />
        {
          this.state.hasRun && (
            this.state.response.headers && this.state.response.data
              ? (
                <>
                  <div className="row">
                    <Notice
                      className="twelve columns u-full-width"
                      heading="Request complete">
                      Request sent {proxyMessage}
                    </Notice>
                  </div>
                  <div className="row">
                    <FetchResponse
                      headers={this.state.response.headers}
                      data={this.state.response.data} />
                  </div>
                </>)
              : (
                <div className="row">
                  <Notice
                    className="twelve columns u-full-width"
                    heading="Request Failed">
                    Request couldn't be sent {proxyMessage}
                  </Notice>
                </div>
              )
          )
        }
      </>
    );
  };
}

export default Test;
