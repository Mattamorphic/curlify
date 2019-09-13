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
        queryParams: {}
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

  addToHistory = (config: ConfigData, data: DataData, status: number): void => {
    this.setState(_ => {
      utils.addToHistory(config, data, status);
      return {
        history: utils.getHistory()
      };
    });
  };

  clearHistory = (): void => {
    window.localStorage.clear();
    this.setState({
      history: []
    });
  };

  onConfigChange = (config: ConfigData): void => {
    console.log(config.headers);
    this.setState(
      {
        config: {
          domain: config.domain,
          endpoint: config.endpoint,
          headers: config.headers.map(header => header),
          method: config.method,
          queryParams: config.queryParams
        }
      },
      () => this.setState({ validation: this.validatePayload() })
    );
  };

  onDataChange = (data: DataData): void => {
    this.setState(
      {
        data
      },
      () => this.setState({ validation: this.validatePayload() })
    );
  };

  onProxyChange = (proxy: ProxyData): void => {
    this.setState({
      proxy
    });
  };

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
