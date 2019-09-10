/**
 * @file ListHistoryEntry component
 * @author Mattamorphic
 */
import './css/ListHistoryEntry.css';

import { ConfigData } from '../../../config/Config';
import { DataData } from '../../../data/Data';
import LoadHistoryEntry from './loadhistoryentry/LoadHistoryEntry';
import React from 'react';

interface ListHistoryEntryProps {
  className?: string;
  config: ConfigData;
  data: DataData;
  id: string;
  status: number;
  updateConfig: (config: ConfigData) => void;
  updateData: (data: DataData) => void;
}

const ListHistoryEntry: React.FunctionComponent<
  ListHistoryEntryProps
> = props => {
  const url = props.config.domain + props.config.endpoint;
  let statusClass = 'success';
  if (props.status > 200) {
    if (props.status < 400) {
      statusClass = 'redirect';
    } else if (props.status < 500) {
      statusClass = 'client';
    } else {
      statusClass = 'server';
    }
  }

  return (
    <div className={(props.className || '') + ' ListHistoryEntry'}>
      <div className="row">
        <div className="two columns">
          <div className={statusClass + ' u-full-width ListHistoryEntryStatus'}>
            {props.status}
          </div>
        </div>
        <div className="two columns">
          <div
            className={
              props.config.method.toLowerCase() +
              ' u-full-width ListHistoryEntryMethod'
            }
          >
            {props.config.method}
          </div>
        </div>
        <div className="two columns">
          <div
            className={
              props.config.method.toLowerCase() +
              ' u-full-width ListHistoryEntryID'
            }
          >
            {props.id}
          </div>
        </div>
        <div className="four columns">
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
            updateData={props.updateData}
          />
        </div>
      </div>
    </div>
  );
};

export default ListHistoryEntry;
