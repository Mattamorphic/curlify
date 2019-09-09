/**
 * @file ListHistoryEntry component
 * @author Mattamorphic
 */
import React from 'react';

import LoadHistoryEntry from './loadhistoryentry/LoadHistoryEntry';

import './css/ListHistoryEntry.css';

import {ConfigData} from '../../../config/Config';
import {DataData} from '../../../data/Data';

interface ListHistoryEntryProps {
  className?: string;
  config: ConfigData;
  data: DataData;
  id: string;
  updateConfig: (config: ConfigData) => void;
  updateData: (data: DataData) => void;
}

const ListHistoryEntry: React.FunctionComponent<ListHistoryEntryProps> = (props) => {
  const url = props.config.domain + props.config.endpoint;

  return (
    <div className={(props.className || '') + ' ListHistoryEntry'}>
      <div className="row">
        <div className="two columns">
          <div className={props.config.method.toLowerCase() + " u-full-width ListHistoryEntryMethod"}>
            {props.config.method}
          </div>
        </div>
        <div className="two columns">
          <div className={props.config.method.toLowerCase() + " u-full-width ListHistoryEntryID"}>
            {props.id}
          </div>
        </div>
        <div className="six columns">
          <div className="u-full-width ListHistoryEntryDest">
            <a href={url}>{url}</a>
          </div>
        </div>
        <div className="two columns ListHistoryEntryAction">
          <LoadHistoryEntry
            className="u-full-width"
            config={props.config}
            data={props.data}
            updateConfig={props.updateConfig}
            updateData={props.updateData} />
        </div>
      </div>
    </div>
  )
};

export default ListHistoryEntry;
