import React from 'react';

import {ConfigData} from '../config/Config';
import Curl from './curl/Curl';
import {DataData} from '../data/Data';

import './css/Output.css';

import {OutputType} from '../../enums';

interface OutputProps {
  config: ConfigData;
  data: DataData;
  output: OutputType;
  updateConfig: (data: ConfigData) => void;
  updateData: (data: DataData) => void;
}

const Output: React.FunctionComponent<OutputProps> = (props) => {
  return (
    <div className="Output">
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
  );
}

export default Output;
