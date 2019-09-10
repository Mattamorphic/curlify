import './css/Test.css';

import * as utils from '../../utils';

import { ConfigData } from '../config/Config';
import { DataData } from '../data/Data';
import FetchResponse from './fetchresponse/FetchResponse';
import Loading from '../shared/Loading';
import Notice from '../shared/Notice';
import { ProxyData } from './request/proxy/Proxy';
import React from 'react';
import Request from './request/Request';

export interface ValidatePayloadResult {
  message: string[];
  success: boolean;
}

interface TestProps {
  config: ConfigData;
  data: DataData;
  proxy: ProxyData;
  addToHistory: (config: ConfigData, data: DataData, status: number) => void;
  updateConfig: (data: ConfigData) => void;
  updateData: (data: DataData) => void;
  updateProxy: (data: ProxyData) => void;
  validation: ValidatePayloadResult;
}

interface TestState {
  isLoading: boolean;
  hasRun: boolean;
  response: {
    headers?: Headers;
    data?: string;
    destination?: URL;
    status?: number;
  };
}

class Test extends React.PureComponent<TestProps, TestState> {
  baseState: TestState;

  constructor(props: TestProps) {
    super(props);
    this.state = {
      // has there been an execution
      hasRun: false,
      // is the request executing
      isLoading: false,
      // hold the response
      response: {}
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
  };

  getFetchData = () => {
    const fetchData: RequestInit = {
      body: null,
      headers: new Headers(
        this.props.config.headers.map(header => [header.type, header.value])
      ),
      method: this.props.config.method
    };

    if (utils.methodHasPayload(this.props.config.method)) {
      fetchData.body = JSON.stringify(
        this.props.data.data[this.props.data.type]
      );
    }
    return fetchData;
  };

  onTest = async () => {
    // Update the local state
    this.setState(
      {
        hasRun: true,
        isLoading: true,
        response: {}
      },
      async () => {
        // Todo: Run our own proxy service instead of using this.
        const dest = new URL(this.getDestination());
        let data = null;
        let response: Response | null = null;
        try {
          response = await fetch(dest.href, this.getFetchData());
          data = await response.text();
          this.setState({
            isLoading: false,
            response: {
              data,
              destination: dest,
              headers: response.headers as Headers,
              status: response.status
            }
          });
        } catch (_) {
          this.setState({
            isLoading: false
          });
        } finally {
          // Store the request in the session history
          this.props.addToHistory(
            this.props.config,
            this.props.data,
            response ? response.status : 0
          );
        }
      }
    );
  };

  render() {
    if (!this.props.validation.success) {
      return (
        <div className="row">
          <div className="Test Disabled">
            {this.props.validation.message.map((string, idx) => (
              <label key={`validation_${idx}`}> {string} </label>
            ))}
          </div>
        </div>
      );
    }
    if (this.state.isLoading) {
      return (
        <div className="row">
          <Loading />
        </div>
      );
    }

    const proxyMessage = `${
      this.props.proxy.isEnabled ? 'through Proxy' : ''
    } to ${this.state.response.destination || this.getDestination()}`;

    return (
      <>
        <Request
          hasRun={this.state.hasRun}
          onRequest={this.onTest}
          onUpdateProxy={this.props.updateProxy}
          proxy={this.props.proxy} // Todo: We need to ensure that everything matches up
          shouldConfirm={false}
        />
        {this.state.hasRun &&
          (this.state.response.headers && this.state.response.data ? (
            <>
              <div className="row">
                <Notice
                  className="twelve columns u-full-width"
                  heading="Request complete"
                >
                  Request sent {proxyMessage}
                </Notice>
              </div>
              <div className="row">
                <FetchResponse
                  data={this.state.response.data}
                  headers={this.state.response.headers}
                />
              </div>
            </>
          ) : (
            <div className="row">
              <Notice
                className="twelve columns u-full-width"
                heading="Request Failed"
              >
                Request couldn&apos;t be sent {proxyMessage}
              </Notice>
            </div>
          ))}
      </>
    );
  }
}

export default Test;
