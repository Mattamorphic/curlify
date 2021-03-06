/**
 * @file App component
 * @author Mattamorphic
 */
// 'None' imports
import './css/App.css';

// 'All' imports
import * as utils from './utils';

// 'Single' Imports
import Heading from './components/heading/Heading';
import Output from './components/output/Output';
import { ProxyData } from './components/test/request/proxy/Proxy';
import React from 'react';

// 'Multiple' imports
import { ColumnCount, DataType, HTTPMethods, OutputType } from './enums';
import Config, { ConfigData } from './components/config/Config';
import Data, { DataData } from './components/data/Data';
import History, { HistoryEntry } from './components/history/History';
import Test, { ValidatePayloadResult } from './components/test/Test';

interface AppProps {}

interface AppState {
  config: ConfigData;
  data: DataData;
  history: HistoryEntry[];
  output: OutputState;
  proxy: ProxyData;
  validation: ValidatePayloadResult;
}

interface OutputState {
  type: OutputType;
}

export default class App extends React.Component<AppProps, AppState> {
  isStorageAvailable = false;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      config: {
        domain: 'https://api.github.com',
        endpoint: '/users/octocat',
        headers: [],
        method: HTTPMethods.GET,
        queryParams: [],
        urlString: 'https://api.github.com/users/octocat'
      },
      data: {
        data: {
          form: null,
          graphQL: { query: 'query {viewer {username}}' },
          json: { test: 'value' }
        },
        type: DataType.JSON
      },
      history: utils.getHistory(),
      output: {
        type: OutputType.CURL
      },
      proxy: {
        isEnabled: true,
        url: utils.PROXY
      },
      validation: {
        message: [],
        success: true
      }
    };
    // Only called once, no need to add to state
    this.isStorageAvailable = utils.isStorageAvailable();
  }

  /**
   * Updates the history in the state, and calls the util function to update history
   *
   * @params {ConfigData} config The configuration of the request
   * @params {DataData}   data   The data payload in the request
   * @params {number}     status The status code for the request
   */
  addToHistory = (config: ConfigData, data: DataData, status: number): void => {
    this.setState(_ => {
      utils.addToHistory(config, data, status);
      return {
        history: utils.getHistory()
      };
    });
  };

  /**
   * Clears the history from the local storage
   */
  clearHistory = (): void => {
    utils.clearHistory();
    this.setState({
      history: []
    });
  };

  /**
   * Handle state change for the request config
   *
   * @params {ConfigData} config The config for the requestt
   */
  onConfigChange = (config: ConfigData): void => {
    this.setState(
      {
        config: {
          domain: config.domain,
          endpoint: config.endpoint,
          // Forces array to update the state
          headers: config.headers.map(header => header),
          method: config.method,
          // Forces array to update the state
          queryParams: config.queryParams.map(qp => qp),
          urlString: config.urlString
        }
      },
      // Once we've updated the state, validate the request
      () => this.setState({ validation: this.validatePayload() })
    );
  };

  /**
   * Handle state change for the request payload
   *
   * @params {DataData} data The Data for the requestt
   */
  onDataChange = (data: DataData): void => {
    this.setState(
      {
        data
      },
      // Once we've updated the state, validate the request
      () => this.setState({ validation: this.validatePayload() })
    );
  };

  /**
   * Handle state change for the request proxy
   *
   * @params {ProxyData} proxy The proxy for the requestt
   */
  onProxyChange = (proxy: ProxyData): void => {
    this.setState({
      proxy
    });
  };

  /**
   * Validate the request config in the state
   *
   * @returns {ValidatePayloadResult}
   */
  validatePayload = (): ValidatePayloadResult => {
    const result = {
      message: [] as string[],
      success: true
    };
    if (!utils.isValidMethod(this.state.config.method)) {
      result.message.push(
        `Invalid ${this.state.config.method}, check settings above`
      );
      result.success = false;
    }
    if (!utils.isValidHeaders(this.state.config.headers)) {
      result.message.push(`Invalid headers, check settings above`);
      result.success = false;
    }
    if (
      !utils.isValidURL(this.state.config.domain, this.state.config.endpoint)
    ) {
      result.message.push(
        `Invalid URL ${this.state.config.domain} or ${this.state.config.endpoint}, check settings above`
      );
      result.success = false;
    }

    if (
      this.state.data.type === DataType.GQL &&
      !utils.isValidGraphQLString(this.state.data.data.graphQL.query)
    ) {
      result.message.push(`Invalid GraphQL string, check settings above`);
      result.success = false;
    }
    return result;
  };

  render() {
    const showData = utils.methodHasPayload(this.state.config.method);
    return (
      <div className="container App">
        <div className="row">
          <Heading imageSrc={process.env.PUBLIC_URL + '/images/banner.png'} />
        </div>
        <div className="row">
          <Config data={this.state.config} updateConfig={this.onConfigChange} />
        </div>
        <div className="row">
          <div className={showData ? ColumnCount.SIX : ColumnCount.TWELVE}>
            <Output
              className="u-full-width"
              config={this.state.config}
              data={this.state.data}
              output={this.state.output.type}
              updateConfig={this.onConfigChange}
              updateData={this.onDataChange}
            />
          </div>
          {showData && (
            <div className="six columns">
              <Data
                className="u-full-width"
                data={this.state.data}
                updateData={this.onDataChange}
              />
            </div>
          )}
        </div>
        {this.isStorageAvailable && (
          <div className="row">
            <History
              clearHistory={this.clearHistory}
              history={this.state.history}
              updateConfig={this.onConfigChange}
              updateData={this.onDataChange}
            />
          </div>
        )}
        <div className="row">
          <Test
            addToHistory={this.addToHistory}
            config={this.state.config}
            data={this.state.data}
            proxy={this.state.proxy}
            updateConfig={this.onConfigChange}
            updateData={this.onDataChange}
            updateProxy={this.onProxyChange}
            validation={this.state.validation}
          />
        </div>
      </div>
    );
  }
}
