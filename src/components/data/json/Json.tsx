/**
 * @file Json component
 * @author Mattamorphic
 */
import './css/Json.css';

import Button from '../../shared/Button';
import Copy from '../../shared/Copy';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { payloadType } from '../Data';
import React from 'react';
import Saving from '../../shared/Saving';
import TextArea from '../../shared/TextArea';
import Tooltip from '../../shared/Tooltip';

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
      hasDraft: false
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
  static getDerivedStateFromProps(
    newProps: JsonProps,
    state: JsonState
  ): JsonState {
    let draft = state.draft;
    let hasDraft = state.hasDraft;
    if (
      !state.hasDraft &&
      JSON.stringify(newProps.data) !== JSON.stringify(JSON.parse(state.draft))
    ) {
      draft = JSON.stringify(newProps.data, null, 2);
      hasDraft = false;
    } else {
      try {
        JSON.parse(draft);
        hasDraft = false;
      } catch (_) {}
    }
    return {
      draft,
      hasDraft
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
    } catch (_) {
      // Todo: print the error
    }
  };

  /**
   * @function Pretty print the json in the state
   */
  pretty = () => {
    try {
      this.setState({
        draft: JSON.stringify(JSON.parse(this.state.draft), null, 2),
        hasDraft: true
      });
    } catch (_) {
      // Todo: Print the error;
      return;
    }
  };

  render() {
    return (
      <div className="Json">
        <div className="row">
          <TextArea
            isFullWidth={true}
            onUpdate={this.updateJson}
            style={{
              background: `url('${process.env.PUBLIC_URL}/images/textarea.png')`,
              backgroundAttachment: 'local',
              backgroundColor: '#19404A',
              backgroundRepeat: 'no-repeat',
              color: '#EEE8D5'
            }}
            value={this.state.draft}
          />
        </div>
        <div className="row">
          <div className="two columns">
            <Saving className="u-full-width" isSaved={!this.state.hasDraft} />
          </div>
          <div className="four columns">
            <Tooltip text="Pretty payload">
              <Button
                className="u-full-width JsonPretty"
                isDisabled={this.state.hasDraft}
                isPrimary={false}
                onClick={this.pretty}
              >
                <FontAwesomeIcon icon={faMagic} size="lg" />
              </Button>
            </Tooltip>
          </div>
          <div className="four columns">
            <Copy className="u-full-width" content={this.state.draft} />
          </div>
        </div>
      </div>
    );
  }
}
