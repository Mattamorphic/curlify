/**
 * @file Curl component
 * @author Mattamorphic
 */
import React from 'react';

// Imported components
import Copy from '../../shared/Copy';
import Saving from '../../shared/Saving';
import TextArea from '../../shared/TextArea';

// Resuable helper functions / objects
import * as utils from '../../../utils';

// Imported types / interfaces
import { ConfigData } from '../../config/Config';
import { DataData, payloadType } from '../../data/Data';
import { Header } from '../../config/headers/Headers';

// CSS imports
import './css/Curl.css';

// Enum imports
import { DataType, HTTPHeaders, HTTPMethods } from '../../../enums';

interface DomainAndEndpoint {
  domain: string | null;
  endpoint: string | null;
}

interface SerializedCurl {
  config: ConfigData;
  data: DataData;
  hasNewConfig: boolean;
  hasNewData: boolean;
}

interface CurlProps {
  config: ConfigData;
  data: DataData;
  updateConfig: (data: ConfigData) => void;
  updateData: (data: DataData) => void;
}

interface CurlState {
  draft: string;
  hasDraft: boolean;
}

export default class Curl extends React.Component<CurlProps, CurlState> {
  constructor(props: CurlProps) {
    super(props);
    this.state = {
      draft: Curl.getValue(props.config, props.data),
      hasDraft: false
    };
  }

  /**
   * @function Get the headers from a curl string
   *
   * @param {string} value A Curl string
   *
   * @returns {Header[] | null}
   */
  getHeaders(value: string): Header[] | null {
    const regex = utils.regEx.curlHeader;
    const headers = [];
    let match = null;
    while ((match = regex.exec(value))) {
      headers.push({
        type: match[1] as HTTPHeaders,
        value: match[2] as string
      });
    }
    if (headers.length === 0) {
      return null;
    }
    return headers;
  }

  /**
   * @function Get the method from a curl string
   *
   * @param {string} value A Curl string
   *
   * @returns {HTTPMethods | null}
   */
  getMethod(value: string): HTTPMethods | null {
    const regex = utils.regEx.curlMethod;
    if (!value.match(regex)) {
      return null;
    }
    const match = regex.exec(value);
    if (!match) {
      return null;
    }
    return match[1] as HTTPMethods;
  }

  /**
   * @function Get the data from a curl string
   *
   * @param {string} value A Curl string
   *
   * @returns {payloadType | null}
   */
  getData(value: string): payloadType | null {
    const regex = utils.regEx.curlData;
    if (!value.match(regex)) {
      return null;
    }
    const match = regex.exec(value);
    if (!match) {
      return null;
    }
    try {
      return JSON.parse(match[1]);
    } catch (_) {
      return null;
    }
  }

  /**
   * @function Get the domain and endpoint from a curl string
   *
   * @param {string} value A Curl string
   *
   * @returns {DomainAndEndpoint | null}
   */
  getDomainAndEndpoint(value: string): DomainAndEndpoint | null {
    const regex = utils.regEx.url;
    if (!value.match(regex)) {
      return null;
    }
    const match = regex.exec(value);
    if (!match) {
      return null;
    }
    return {
      domain: match[1] || null,
      endpoint: match[2] || null
    };
  }

  /**
   * @function Serialize a curl string
   *
   * @param {string} value A Curl string
   *
   * @returns {SerializedCurl}
   */
  serializerCurl = (value: string): SerializedCurl => {
    // Get the current values
    const config = this.props.config;
    const data = this.props.data;

    let hasNewConfig = false;
    let hasNewData = false;

    // decide which method to use
    const method = this.getMethod(value);

    // decide which headers to use
    const headers = this.getHeaders(value);

    // decide which data to use
    const newData = this.getData(value);

    // decide which domain and endpoint to use
    const domainAndEndpoint = this.getDomainAndEndpoint(value);

    if (
      method &&
      method !== config.method &&
      Object.values(HTTPMethods).includes(method)
    ) {
      hasNewConfig = true;
      config.method = method;
    }

    // Todo - this needs to actually check the header
    if (headers) {
      hasNewConfig = true;
      config.headers = headers;
    }
    if (
      newData &&
      JSON.stringify(newData) !== JSON.stringify(data.data[data.type])
    ) {
      hasNewData = true;
      switch (data.type) {
        case DataType.GQL:
          data.data.graphQL.query = newData.query;
          break;
        case DataType.JSON:
          data.data.json = newData;
          break;
        case DataType.FORM:
          break;
      }
    }
    if (domainAndEndpoint) {
      if (
        domainAndEndpoint.domain &&
        domainAndEndpoint.domain !== config.domain
      ) {
        hasNewConfig = true;
        config.domain = domainAndEndpoint.domain;
      }
      if (
        domainAndEndpoint.endpoint &&
        domainAndEndpoint.endpoint !== config.endpoint
      ) {
        hasNewConfig = true;
        config.endpoint = domainAndEndpoint.endpoint;
      }
    }

    return {
      config,
      data,
      hasNewConfig,
      hasNewData
    };
  };

  /**
   * @function Update the data from the curl string
   *
   * @param {string} value The curl string
   */
  updateCurl = (value: string): void => {
    const curl = this.serializerCurl(value);
    console.log(curl);
    if (curl.hasNewData || curl.hasNewConfig) {
      // set draft to null, we'll update with the new props
      this.setState({ hasDraft: false }, () => {
        curl.hasNewData && this.props.updateData(curl.data);
        curl.hasNewConfig && this.props.updateConfig(curl.config);
      });
    }
    // set the draft to true, let's use this
    if (!curl.hasNewData && !curl.hasNewConfig) {
      this.setState({ draft: value, hasDraft: true });
    }
  };

  /**
   * @function Pass the config and data into a curl string
   *
   * @params {ConfigData} config The Configuration data for the curl request
   * @params {DataData}   data   The data for the curl request
   */
  static getValue(config: ConfigData, data: DataData): string {
    let payload = {};
    switch (data.type) {
      case DataType.JSON:
        payload = data.data.json;
        break;
      case DataType.GQL:
        payload = data.data.graphQL;
        break;
      case DataType.FORM:
        break;
    }

    return (
      `curl -X ${config.method} \\ \n` +
      `${config.headers
        .map(header => `-H "${header.type}": "${header.value}" \\ \n`)
        .join('')}` +
      `${
        payload &&
        Object.keys(payload).length > 0 &&
        utils.methodHasPayload(config.method)
          ? `-d '${Curl.parsePayloadString(JSON.stringify(payload))}' \\ \n`
          : ''
      }` +
      `${config.domain + config.endpoint}`
    );
  }

  /**
   * @function Parse a string remove new line / tab and remove multiple spaces
   *
   * @param {string} value
   */
  static parsePayloadString(value: string): string {
    return value
      .replace(utils.regEx.newLineAndTab, '')
      .replace(utils.regEx.multipleSpaces, ' ')
      .replace(utils.regEx.singleEscapedNewLine, '');
  }

  render() {
    const draft = this.state.hasDraft
      ? this.state.draft
      : Curl.getValue(this.props.config, this.props.data);
    return (
      <div className="Curl">
        <div className="row">
          <div className="two columns">
            <Saving className="u-full-width" isSaved={!this.state.hasDraft} />
          </div>
          <div className="six columns">
            <div className="u-full-width" />
          </div>
          <div className="four columns">
            <Copy className="u-full-width" content={draft} />
          </div>
        </div>
        <div className="row">
          <TextArea
            isFullWidth={true}
            onUpdate={this.updateCurl}
            style={{
              background: `url('${process.env.PUBLIC_URL}/images/textarea.png')`,
              backgroundAttachment: 'local',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#19404A',
              color: '#EEE8D5'
            }}
            value={draft}
          />
        </div>
      </div>
    );
  }
}
