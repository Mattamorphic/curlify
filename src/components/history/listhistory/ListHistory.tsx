/**
 * @file ListHistory component
 * @author Mattamorphic
 */
import React from 'react';
import ListHistoryEntry from './listhistoryentry/ListHistoryEntry';
import './css/ListHistory.css';

import { ConfigData } from '../../config/Config';
import { DataData } from '../../data/Data';
import { HistoryEntry } from '../History';

interface ListHistoryProps {
  history: HistoryEntry[];
  updateConfig: (config: ConfigData) => void;
  updateData: (data: DataData) => void;
}

const ListHistory: React.FunctionComponent<ListHistoryProps> = props => {
  return (
    <div className="ListHistory">
      {props.history.map((historyEntry: HistoryEntry, i: number) => (
        <ListHistoryEntry
          className={i % 2 === 0 ? 'dark' : 'light'}
          config={historyEntry.config}
          data={historyEntry.data}
          id={historyEntry.id}
          updateConfig={props.updateConfig}
          updateData={props.updateData}
        />
      ))}
    </div>
  );
};

export default ListHistory;
