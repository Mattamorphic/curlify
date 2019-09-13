/**
 * @file Curl component
 * @author Mattamorphic
 */
import './css/Curl.css';

import * as utils from '../../../utils';

import { ConfigData } from '../../config/Config';
import Copy from '../../shared/Copy';
import { debounce } from 'lodash';
import { KeyValueEntry } from '../../shared/KeyValueInput';
import React from 'react';
import Saving from '../../shared/Saving';
import TextArea from '../../shared/TextArea';

import { DataData, payloadType } from '../../data/Data';
import { DataType, HTTPMethods } from '../../../enums';

interface ParsedURL {
  domain: string | null;
  endpoint: string | null;
  queryParams: KeyValueEntry[] | null;
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
  getHeaders(value: string): KeyValueEntry[] | null {
    const regex = utils.regEx.curlHeader;
    const headers = [];
    let match = null;
    while ((match = regex.exec(value))) {
      headers.push({
        key: match[1] as string,
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
   * @returns {ParsedURL | null}
   */
  parseUrl(value: string): ParsedURL | null {
    const regex = utils.regEx.url;
    if (!value.match(regex)) {
      return null;
    }
    const match = regex.exec(value);
    if (!match) {
      return null;
    }
    const uri = new URL(match[0]);
    const params = Object.fromEntries(new URLSearchParams(uri.search));
    return {
      domain: uri.origin,
      endpoint: uri.pathname,
      queryParams: Object.keys(params).map(key => ({ key, value: params[key] }))
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
    const url = this.parseUrl(value);

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
    if (url) {
      if (url.domain && url.domain !== config.domain) {
        hasNewConfig = true;
        config.domain = url.domain;
      }
      if (url.endpoint && url.endpoint !== config.endpoint) {
        hasNewConfig = true;
        config.endpoint = url.endpoint;
      }
      if (
        url.queryParams &&
        JSON.stringify(url.queryParams) !== JSON.stringify(config.queryParams)
      ) {
        hasNewConfig = true;
        config.queryParams = url.queryParams;
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
    this.setState(
      {
        draft: value,
        hasDraft: true
      },
      debounce(() => {
        const curl = this.serializerCurl(this.state.draft);
        if (curl.hasNewData || curl.hasNewConfig) {
          // set draft to null, we'll update with the new props
          this.setState({ hasDraft: false }, () => {
            curl.hasNewData && this.props.updateData(curl.data);
            curl.hasNewConfig && this.props.updateConfig(curl.config);
          });
        }
      }, 300)
    );
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
      `curl -X ${config.method} \\${'\n'}` +
      `${config.headers
        .map(header => `-H "${header.key}: ${header.value}" \\${'\n'}`)
        .join('')}` +
      `${
        payload &&
        Object.keys(payload).length > 0 &&
        utils.methodHasPayload(config.method)
          ? `-d '${Curl.parsePayloadString(JSON.stringify(payload))}' \\${'\n'}`
          : ''
      }` +
      `${config.domain +
        config.endpoint +
        utils.convertObjToQueryParams(config.queryParams)}`
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
          <TextArea
            isFullWidth={true}
            onUpdate={this.updateCurl}
            style={{
              background: `url('${process.env.PUBLIC_URL}/images/textarea.png')`,
              backgroundAttachment: 'local',
              backgroundColor: '#19404A',
              backgroundRepeat: 'no-repeat',
              color: '#EEE8D5'
            }}
            value={draft}
          />
        </div>
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
      </div>
    );
  }
}
