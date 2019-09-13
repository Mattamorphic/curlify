import './css/Headers.css';

import Button from '../../shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Toggler from '../../shared/Toggler';
import Types from './type/Types';
import Value from './value/Value';

import { ColumnCount, HTTPHeaders } from '../../../enums';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export interface Header {
  type: HTTPHeaders | string;
  value: string;
}

interface HeadersProps {
  onUpdate: (value: Header | null, index: number) => void;
  selected: Header[];
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

  updateType = (type: HTTPHeaders, index: number): void => {
    let header = this.props.selected[index];
    header.type = type;
    this.props.onUpdate(header, index);
  };

  updateValue = (value: string, index: number): void => {
    const header = this.props.selected[index];
    header.value = value;
    this.props.onUpdate(header, index);
  };

  addHeader = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    // create a pending header, add this to the end of the index
    this.props.onUpdate(
      {
        type: '',
        value: ''
      },
      this.props.selected.length
    );
  };

  removeHeader = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const index = e.currentTarget.id.split('_').pop();

    if (index === undefined) {
      // oh no...
      return;
    }
    this.props.onUpdate(null, parseInt(index));
  };

  render() {
    // Don't allow duplicate headers.
    const selected = this.props.selected.map(header => header.type);
    const values = Object.values(HTTPHeaders).filter(
      header => !selected.includes(header)
    );
    return (
      <Toggler
        collapsedData={
          <em>
            {this.props.selected.map(h => h.type).join(', ')}
            &nbsp;
          </em>
        }
        heading="HTTP Headers"
        label="HTTP Headers"
        onToggle={this.toggleHeaders}
        isToggled={this.state.showHeaders}
        tooltip="Configure HTTP Headers"
      >
        <div className={this.props.width + ' Headers'}>
          {this.props.selected.map((header: Header, index: number) => (
            <div key={`${header.type}_${index}`} className="row">
              <div className="two columns">
                <Button
                  className="u-full-width"
                  id={`remove_${index}`}
                  isPrimary={false}
                  onClick={() => {}}
                  onClickRaw={this.removeHeader}
                >
                  <FontAwesomeIcon icon={faMinus} size="lg" />
                </Button>
              </div>
              <div className="four columns">
                <Types
                  index={index}
                  isFullWidth={true}
                  onUpdate={this.updateType}
                  selected={header.type}
                  values={[...values, header.type]}
                />
              </div>
              <div className="four columns">
                <Value
                  index={index}
                  isFullWidth={true}
                  onUpdate={this.updateValue}
                  value={header.value || ''}
                />
              </div>
              <div className="two columns">
                <Button
                  className="u-full-width"
                  isPrimary={false}
                  onClick={() => {}}
                  onClickRaw={this.addHeader}
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" />
                </Button>
              </div>
            </div>
          ))}
          {this.props.selected.length === 0 && (
            <div className="row">
              <Button
                className="u-full-width"
                isPrimary={false}
                onClick={() => {}}
                onClickRaw={this.addHeader}
              >
                Configure Headers
              </Button>
            </div>
          )}
        </div>
      </Toggler>
    );
  }
}
