/**
 * @file ResponseHeaders component
 * @author Mattamorphic
 */

import './css/ResponseHeaders.css';

import * as utils from '../../../../utils';

import React from 'react';
import Table from '../../../shared/Table';
import Toggler from '../../../shared/Toggler';

interface ResponseHeadersProps {
  headers: Headers;
}

interface ResponseHeadersState {
  showHeaders: boolean;
}

export default class ResponseHeaders extends React.PureComponent<
  ResponseHeadersProps,
  ResponseHeadersState
> {
  constructor(props: ResponseHeadersProps) {
    super(props);
    this.state = {
      showHeaders: false
    };
  }

  parse = (value: string): string | JSX.Element => {
    if (utils.isStringANumber(value)) {
      return <span className="header-value header-number">{value}</span>;
    }
    if (utils.isStringADate(value)) {
      return <span className="header-value header-date">{value}</span>;
    }
    if (utils.isStringAURL(value)) {
      return (
        <span className="header-value header-url">
          <a href={value}>{value}</a>
        </span>
      );
    }
    if (utils.isStringBooleanOrNull(value)) {
      return <span className="header-value header-boolean">{value}</span>;
    }
    return <span className="header-value header-string">{value}</span>;
  };

  toggleHeaders = () => {
    this.setState(prevState => ({
      showHeaders: !prevState.showHeaders
    }));
  };

  render() {
    const headerKeys = Array.from(this.props.headers.keys());
    return (
      <Toggler
        className="ResponseHeaders"
        isToggled={this.state.showHeaders}
        heading="Response Headers"
        label="Headers"
        onToggle={this.toggleHeaders}
      >
        <Table
          className="u-max-full-width ResponseHeadersTable"
          data={headerKeys.map(key => ({
            Header: this.parse(key),
            Value: this.parse(this.props.headers.get(key) || '')
          }))}
        />
      </Toggler>
    );
  }
}
