/**
 * @file ResponseRaw component
 * @author Mattamorphic
 */
import './css/ResponseRaw.css';

import React from 'react';
import Toggler from '../../../shared/Toggler';

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
        heading="Raw Response"
        label="Raw"
        onToggle={this.toggleRaw}
      >
        <div className="ResponseRaw">{this.props.data}</div>
      </Toggler>
    );
  }
}
