import React from 'react';
import Config, {ConfigData} from './components/config/Config';
import Data, {DataData} from './components/data/Data';
import Heading from './components/heading/Heading';
import Output from './components/output/Output';
import Test, {ValidatePayloadResult} from './components/test/Test';

import './css/App.css'

import * as utils from './utils';

import {
  DataType,
  HTTPMethods,
  OutputType,
} from './enums';

interface OutputState {
  type: OutputType;
}

interface AppState {
  config: ConfigData;
  data: DataData;
  output: OutputState;
  validation: ValidatePayloadResult;
}

interface AppProps {}

export default class App extends React.Component<AppProps, AppState> {

  onConfigChange = (config: ConfigData): void => {
    this.setState({
      config,
    }, () => this.setState({validation: this.validatePayload()}));
  }

  onDataChange = (data: DataData) : void => {
    this.setState({
      data,
    }, () => this.setState({validation: this.validatePayload()}));
  }

  constructor(props: AppProps) {
    super(props);
    this.state = {
      config: {
        method: HTTPMethods.GET,
        headers: [],
        domain: 'https://api.github.com',
        endpoint: '/users/octocat',
      },
      data: {
        type: DataType.JSON,
        data: {
          json: {test: "value"},
          graphQL: {query: "query {viewer {username}}"},
          form: null,
        },
      },
      output: {
        type: OutputType.CURL,
      },
      validation: {
        message: [],
        success: true,
      }
    }
  }

  validatePayload = (): ValidatePayloadResult => {
    console.log(this.state.config, utils.isValidURL(
      this.state.config.domain,
      this.state.config.endpoint,
    ), (this.state.config.domain + '/' + this.state.config.endpoint).match(utils.regEx.url));
    const result = {
      message: [] as string[],
      success: true,
    };
    if (!utils.isValidMethod(this.state.config.method)) {
      result.message.push(
        `Invalid ${this.state.config.method}, check settings above`,
      );
      result.success = false;
    }
    // if (!utils.isValidHeaders(this.props.config.headers)) {
    //
    // }
    if (!utils.isValidURL(
      this.state.config.domain,
      this.state.config.endpoint,
    )) {
      result.message.push(
        `Invalid URL ${this.state.config.domain} or ${this.state.config.endpoint}, check settings above`,
      );
      result.success = false;
    }

    if (
      this.state.data.type === DataType.GQL
      && !utils.isValidGraphQLString(this.state.data.data.graphQL.query)) {
        result.message.push(
          `Invalid GraphQL string, check settings above`,
        );
        result.success = false;
      }
    console.log(result);
    return result;
  }

  render () {
    return (
      <div className='container App'>
        <div className="row">
          <Heading imageSrc={process.env.PUBLIC_URL + '/images/banner.png'} />
        </div>
        <div className="row">
          <Config
            data={this.state.config}
            updateConfig={this.onConfigChange} />
        </div>
        <div className="row">
          {
            utils.methodHasPayload(this.state.config.method) &&
              (<Data data={this.state.data} updateData={this.onDataChange} />)
          }
        </div>
        <div className="row">
          <Output
            config={this.state.config}
            data={this.state.data}
            output={this.state.output.type}
            updateConfig={this.onConfigChange}
            updateData={this.onDataChange} />
        </div>
        <div className="row">
          <Test
            validation={this.state.validation}
            config={this.state.config}
            data={this.state.data}
            updateConfig={this.onConfigChange}
            updateData={this.onDataChange} />
        </div>
      </div>
    );
  }
}
