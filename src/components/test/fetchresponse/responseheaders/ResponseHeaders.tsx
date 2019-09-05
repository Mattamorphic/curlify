/**
 * @file ResponseHeaders component
 * @author Mattamorphic
 */
import React from 'react';

import Table from '../../../shared/Table';
import Toggler from '../../../shared/Toggler';

import './css/ResponseHeaders.css';


interface ResponseHeadersProps {
  headers: Headers;
}

interface ResponseHeadersState {
  showHeaders: boolean
}

export default class ResponseHeaders extends React.PureComponent<
  ResponseHeadersProps,
  ResponseHeadersState> {
  constructor(props: ResponseHeadersProps) {
    super(props);
    this.state = {
      showHeaders: false,
    };
  }

  toggleHeaders = () => {
    this.setState(prevState => ({
      showHeaders: !prevState.showHeaders
    }));
  }

  render() {

    return (
      <Toggler
        isToggled={this.state.showHeaders}
        className="Headers"
        label="Headers"
        onToggle={this.toggleHeaders}>
        <Table
          className="u-max-full-width"
          data={
            Array.from(this.props.headers.keys()).map(
              key => ({
                Header: key,
                Value: this.props.headers.get(key) || '',
              })
            )
          } />
      </Toggler>
    );
  }
}
