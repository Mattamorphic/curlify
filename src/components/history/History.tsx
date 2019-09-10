/**
 * @file History component
 * @author Mattamorphic
 */
import React from 'react';

import './css/History.css';

import { ConfigData } from '../config/Config';
import { DataData } from '../data/Data';

import ClearHistory from './clearhistory/ClearHistory';
import ListHistory from './listhistory/ListHistory';

import Toggler from '../shared/Toggler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

export interface HistoryEntry {
  id: string;
  config: ConfigData;
  data: DataData;
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
        isToggled={this.state.showHistory}
        className="History"
        label={<FontAwesomeIcon icon={faHistory} size="lg" />}
        onToggle={this.toggleHistory}
      >
        <h4> History</h4>
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
