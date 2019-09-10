/**
 * @file ResponseRaw component
 * @author Mattamorphic
 */
import React from 'react';

import Toggler from '../../../shared/Toggler';

import './css/ResponseRaw.css';

interface ResponseRawProps {
  data: string;
}

interface ResponseRawState {
  showRaw: boolean;
}

export default class ResponseRaw extends React.PureComponent<
  ResponseRawProps,
  ResponseRawState
> {
  constructor(props: ResponseRawProps) {
    super(props);
    this.state = {
      showRaw: false
    };
  }

  toggleRaw = () => {
    this.setState(prevState => ({
      showRaw: !prevState.showRaw
    }));
  };

  render() {
    return (
      <Toggler
        isToggled={this.state.showRaw}
        label="Raw"
        onToggle={this.toggleRaw}
      >
        <div className="ResponseRaw">{this.props.data}</div>
      </Toggler>
    );
  }
}
