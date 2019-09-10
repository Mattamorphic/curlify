/**
 * @file ListHistory component
 * @author Mattamorphic
 */
import './css/ListHistory.css';

import { ConfigData } from '../../config/Config';
import { DataData } from '../../data/Data';
import { HistoryEntry } from '../History';
import Input from '../../shared/Input';
import ListHistoryEntry from './listhistoryentry/ListHistoryEntry';
import React from 'react';

interface ListHistoryProps {
  history: HistoryEntry[];
  updateConfig: (config: ConfigData) => void;
  updateData: (data: DataData) => void;
}

interface ListHistoryState {
  filter: string | null;
}

export default class ListHistory extends React.PureComponent<
  ListHistoryProps,
  ListHistoryState
> {
  constructor(props: ListHistoryProps) {
    super(props);
    this.state = {
      filter: null
    };
  }

  updateFilter = (filter: string) => {
    this.setState({
      filter
    });
  };

  render() {
    const history = this.props.history.filter(entry =>
      JSON.stringify(entry).includes(this.state.filter || '')
    );

    return (
      <>
        <div className="row">
          <Input
            className="u-full-width ListHistoryFilter"
            isDisabled={this.props.history.length === 0}
            onChange={this.updateFilter}
            placeholder="Filter..."
            value={this.state.filter || ''}
          />
        </div>
        <div className="ListHistory">
          {history.map((historyEntry: HistoryEntry, i: number) => (
            <ListHistoryEntry
              className={i % 2 === 0 ? 'dark' : 'light'}
              config={historyEntry.config}
              data={historyEntry.data}
              id={historyEntry.id}
              key={historyEntry.id}
              status={historyEntry.status}
              updateConfig={this.props.updateConfig}
              updateData={this.props.updateData}
            />
          ))}
        </div>
      </>
    );
  }
}
