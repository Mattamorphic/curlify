import React from 'react';

import Toggler from '../shared/Toggler'

import Selector from './selector/Selector';

import {ConfigData} from '../config/Config';
import Curl from './curl/Curl';
import {DataData} from '../data/Data';

import './css/Output.css';

import {OutputType} from '../../enums';

interface OutputProps {
  className?: string;
  config: ConfigData;
  data: DataData;
  output: OutputType;
  updateConfig: (data: ConfigData) => void;
  updateData: (data: DataData) => void;
}

const Output: React.FunctionComponent<OutputProps> = (props) => {
  const updateType = (_: OutputType) => {
    // Todo : Implement changer here in future.
  }

  return (
    <div className={(props.className || '' ) + ' Output'}>
      <label> {props.output} </label>
      <div className="row">
        <div className="twelve columns">
          {
            (props.output === OutputType.CURL) && (
              <Curl
                config={props.config}
                data={props.data}
                updateConfig={props.updateConfig}
                updateData={props.updateData} />
            )
          }
        </div>
      </div>
      <div className="row">
      <div className="twelve columns">
        <Selector
          className="u-full-width"
          selected={props.output}
          onUpdate={updateType} />
      </div>
      </div>
    </div>
  );
}

export default Output;
