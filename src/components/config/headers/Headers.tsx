import './css/Headers.css';

import React from 'react';
import Toggler from '../../shared/Toggler';

import KeyValueInput, { KeyValueEntry } from '../../shared/KeyValueInput';

import { ColumnCount, HTTPHeaders } from '../../../enums';

interface HeadersProps {
  onUpdate: (entry: KeyValueEntry, index: number) => void;
  onRemove: (index: number) => void;
  selected: KeyValueEntry[];
  width: ColumnCount;
}

interface HeadersState {
  showHeaders: boolean;
}

export default class Headers extends React.PureComponent<
  HeadersProps,
  HeadersState
> {
  constructor(props: HeadersProps) {
    super(props);
    this.state = {
      showHeaders: false
    };
  }

  toggleHeaders = () => {
    this.setState(prevState => ({
      showHeaders: !prevState.showHeaders
    }));
  };

  addHeader = (): void => {
    // create a pending header, add this to the end of the index
    this.props.onUpdate(
      {
        key: '',
        value: ''
      },
      this.props.selected.length
    );
  };

  render() {
    // Don't allow duplicate headers.
    const selected = this.props.selected.map(header => header.key);
    const values = Object.values(HTTPHeaders).filter(
      header => !selected.includes(header)
    );
    return (
      <Toggler
        collapsedData={
          <em>
            {this.props.selected.map(h => h.key).join(', ')}
            &nbsp;
          </em>
        }
        heading="HTTP Headers"
        label="HTTP Headers"
        onToggle={this.toggleHeaders}
        isToggled={this.state.showHeaders}
        tooltip="Configure HTTP Headers"
      >
        <KeyValueInput
          className="Headers"
          id="HTTPHeaders"
          keyInput={{
            placeholder: 'Enter HTTP Header',
            type: 'AUTOCOMPLETE',
            values: values
          }}
          valueInput={{
            placeholder: 'Enter Value',
            type: 'TEXT'
          }}
          selected={this.props.selected}
          onAddEntry={this.addHeader}
          onUpdateEntry={this.props.onUpdate}
          onRemoveEntry={this.props.onRemove}
        />
      </Toggler>
    );
  }
}
