/**
 * @file Output component
 * @author Mattamorphic
 */
import './css/Output.css';

import { ConfigData } from '../config/Config';
import Curl from './curl/Curl';
import { DataData } from '../data/Data';
import { OutputType } from '../../enums';
import React from 'react';
import Selector from './selector/Selector';

interface OutputProps {
  className?: string;
  config: ConfigData;
  data: DataData;
  output: OutputType;
  updateConfig: (data: ConfigData) => void;
  updateData: (data: DataData) => void;
}

const Output: React.FunctionComponent<OutputProps> = props => {
  const updateType = (_: OutputType) => {
    // Todo : Implement changer here in future.
  };

  return (
    <div className={(props.className || '') + ' Output'}>
      <div className="row OutputHeading">
        <h4> Request Config: {props.output.toUpperCase()} </h4>
      </div>
      <div className="row">
        <div className="twelve columns">
          {props.output === OutputType.CURL && (
            <Curl
              config={props.config}
              data={props.data}
              updateConfig={props.updateConfig}
              updateData={props.updateData}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <Selector
            className="u-full-width"
            onUpdate={updateType}
            selected={props.output}
          />
        </div>
      </div>
    </div>
  );
};

export default Output;
