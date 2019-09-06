/**
 * @file Curl component
 * @author Mattamorphic
 */
import React from 'react';

// Imported components
import Button from '../../shared/Button';
import Copy from '../../shared/Copy';
import Saving from '../../shared/Saving';
import TextArea from '../../shared/TextArea';

// CSS imports
import './css/Json.css';

// Type imports
import {payloadType} from '../Data';

interface JsonProps {
  data: payloadType;
  onUpdateData: (value: payloadType) => void;
}

interface JsonState {
  draft: string;
  hasDraft: boolean;
}

export default class Json extends React.PureComponent<JsonProps, JsonState> {

  constructor(props: JsonProps) {
    super(props);
    this.state = {
      draft: JSON.stringify(props.data, null, 2),
      hasDraft: false,
    };
  }

  /**
   * @function We have to update the state based on the props, this needs removing
   *
   * @param {JsonProps} newProps The new received props
   * @param {JsonState} state    The current state
   *
   * @return {JsonState}
   */
  static getDerivedStateFromProps(newProps: JsonProps, state: JsonState): JsonState {
    let draft = state.draft;
    let hasDraft = state.hasDraft;
    if (!state.hasDraft && JSON.stringify(newProps.data) !== JSON.stringify(JSON.parse(state.draft))) {
      draft = JSON.stringify(newProps.data, null, 2);
      hasDraft = false;
    } else {
      try {
        JSON.parse(draft);
        hasDraft = false;
      } catch(_) {}
    }
    return {
      draft,
      hasDraft,
    };
  }

  /**
   * @function Update the data from the json string
   *
   * @param {string} value The possible json string
   */
  updateJson = (value: string) => {
    this.setState({
      draft: value,
      hasDraft: true
    });
    try {
      const object = JSON.parse(value);
      this.props.onUpdateData(object);
    } catch (_) {}
  }

  /**
   * @function Pretty print the json in the state
   */
  pretty = () => {
    try {
      this.setState({
        draft: JSON.stringify(JSON.parse(this.state.draft), null, 2),
        hasDraft: true,
      });
    } catch (_) {
      return;
    }
  }

  render() {
    return (
      <div className="Json">
        <div className="row">
          <div className="two columns">
            <Saving
              className="u-full-width"
              isSaved={!this.state.hasDraft} />
          </div>
          <div className="four columns">
            <Button
              className="u-full-width"
              label="Pretty"
              onClick={this.pretty}
              isPrimary={false} />
          </div>
          <div className="four columns">
            <Copy
              className="u-full-width"
              content={this.state.draft}
              label={`Copy` } />
          </div>
        </div>
        <div className="row">
          <TextArea
            isFullWidth={true}
            onUpdate={this.updateJson}
            style={{
              background: `url('${process.env.PUBLIC_URL}/images/textarea.png')`,
              backgroundAttachment: 'local',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#19404A',
              color: '#EEE8D5',
            }}
            value={this.state.draft} />
        </div>
      </div>
    )
  }
}
