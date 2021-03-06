/**
 * @file History component
 * @author Mattamorphic
 */
import './css/History.css';

import ClearHistory from './clearhistory/ClearHistory';
import { ConfigData } from '../config/Config';
import { DataData } from '../data/Data';
import ListHistory from './listhistory/ListHistory';
import React from 'react';
import Toggler from '../shared/Toggler';

export interface HistoryEntry {
  id: string;
  config: ConfigData;
  data: DataData;
  status: number;
}

interface HistoryProps {
  history: HistoryEntry[];
  clearHistory: () => void;
  updateConfig: (config: ConfigData) => void;
  updateData: (data: DataData) => void;
}

interface HistoryState {
  showHistory: boolean;
}

export default class History extends React.PureComponent<
  HistoryProps,
  HistoryState
> {
  constructor(props: HistoryProps) {
    super(props);
    this.state = {
      showHistory: false
    };
  }

  loadHistory = (id: string): boolean => {
    const item = window.localStorage.getItem(id);
    if (item === null) {
      return false;
    }
    const payload = JSON.parse(item);
    this.props.updateConfig(payload.config);
    this.props.updateData(payload.data);
    return true;
  };

  toggleHistory = (): void => {
    this.setState(prevState => ({
      showHistory: !prevState.showHistory
    }));
  };

  render() {
    return (
      <Toggler
        className="History"
        collapsedData={<>{this.props.history.length} items in history</>}
        isToggled={this.state.showHistory}
        heading="History"
        label="History"
        onToggle={this.toggleHistory}
        tooltip="Toggle history"
      >
        <ListHistory
          history={this.props.history}
          updateConfig={this.props.updateConfig}
          updateData={this.props.updateData}
        />
        <ClearHistory clear={this.props.clearHistory} />
      </Toggler>
    );
  }
}
