/**
 * @file ListHistoryEntry component
 * @author Mattamorphic
 */
import './css/ListHistoryEntry.css';

import { ConfigData } from '../../../config/Config';
import Copy from '../../../shared/Copy';
import { DataData } from '../../../data/Data';
import LoadHistoryEntry from './loadhistoryentry/LoadHistoryEntry';
import React from 'react';
import Tooltip from '../../../shared/Tooltip';

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
          <Tooltip text="Status code">
            <div
              className={statusClass + ' u-full-width ListHistoryEntryStatus'}
            >
              {props.status}
            </div>
          </Tooltip>
        </div>
        <div className="two columns">
          <Tooltip text="Request method">
            <div
              className={
                props.config.method.toLowerCase() +
                ' u-full-width ListHistoryEntryMethod'
              }
            >
              {props.config.method}
            </div>
          </Tooltip>
        </div>
        <div className="two columns">
          <div
            className={
              props.config.method.toLowerCase() +
              ' u-full-width ListHistoryEntryID'
            }
          >
            <Copy
              content={props.id}
              noIcon={true}
              tooltip="Copy Timestamp / ID"
              useDiv={true}
            >
              {props.id}
            </Copy>
          </div>
        </div>
        <div className="four columns">
          <Copy content={url} noIcon={true} tooltip="Copy URL" useDiv={true}>
            <div className="u-full-width ListHistoryEntryDest">{url}</div>
          </Copy>
        </div>
        <div className="two columns ListHistoryEntryAction">
          <Tooltip text="Load entry">
            <LoadHistoryEntry
              className="u-full-width"
              config={props.config}
              data={props.data}
              updateConfig={props.updateConfig}
              updateData={props.updateData}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ListHistoryEntry;
