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
    let draft = '';
    let hasDraft = state.hasDraft;
    try {
      // if we can parse the draft it must be valid
      JSON.parse(state.draft);
      draft = hasDraft ? state.draft : JSON.stringify(newProps.data);
      hasDraft = false;
    } catch (_) {
      draft = state.draft;
      hasDraft = true;
    }
    return {
      hasDraft,
      draft,
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
          <div className="six columns">
            <Saving isSaved={!this.state.hasDraft} label="Json" />
          </div>
          <div className="four columns">
            <Button className="u-pull-right" label="Pretty" onClick={this.pretty} isPrimary={false} />
          </div>
          <div className="two columns">
            <Copy
              className="u-pull-right"
              content={this.state.draft}
              label={`Copy JSON data` } />
          </div>
        </div>
        <div className="row">
          <TextArea
            isFullWidth={true}
            onUpdate={this.updateJson}
            value={this.state.draft} />
        </div>
      </div>
    )
  }
}
