import React from 'react';

import Types from './type/Types';
import Value from './value/Value';

import './css/Headers.css';

import {
  ColumnCount,
  HTTPHeaders,
} from '../../../enums';

export interface Header {
  type: HTTPHeaders | string;
  value: string;
};

interface HeadersProps {
  onUpdate: (value: Header | null, index: number) => void;
  selected: Header[];
  width: ColumnCount,
}


const Headers: React.FunctionComponent<HeadersProps> = (props) => {

  const updateType = (type: HTTPHeaders, index: number): void => {
    const header = props.selected[index];
    header.type = type;
    props.onUpdate(header, index);
  }

  const updateValue = (value: string, index: number): void => {
    const header = props.selected[index];
    header.value = value;
    props.onUpdate(header, index);
  }

  const addHeader = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    // create a pending header, add this to the end of the index
    props.onUpdate(
      {
        type: '',
        value: '',
      },
      props.selected.length,
    );
  }

  const removeHeader = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    const index = e.currentTarget.id.split('_').pop();

    if (index === undefined) {
      // oh no...
      return;
    }
    props.onUpdate(null, parseInt(index));
  }

  // Don't allow duplicate headers. 
  const selected = props.selected.map(header => header.type);
  const values = Object.values(HTTPHeaders).filter(header => !selected.includes(header));

  return (

    <div className={props.width + ' Headers'}>
      <div className="row">
        <div className="twelve rows">
          <label> HTTP Headers </label>
        </div>
      </div>

        {
          props
            .selected
            .map(
              (header: Header, index: number) => (

                <div className="row" key={`${header.type}_${index}`}>
                {
                  // TODO: selected and values aren't behaving below
                }
                  <div className="two columns">
                    <button
                      className='u-full-width'
                      onClick={removeHeader}
                      id={`remove_${index}`}>
                      Remove
                    </button>
                  </div>
                  <div className="four columns">
                    <Types
                      index={index}
                      isFullWidth={true}
                      values={[...values, header.type]}
                      selected={header.type}
                      onUpdate={updateType} />
                  </div>
                  <div className="four columns">
                    <Value
                      index={index}
                      isFullWidth={true}
                      value={header.value || ''}
                      onUpdate={updateValue} />
                  </div>
                  <div className="two columns">
                    <button
                      className='u-full-width'
                      onClick={addHeader}>
                      Add
                    </button>
                  </div>
                </div>
            )
          )
        }
        {
          props.selected.length === 0 && (
            <div className="row">
              <button
                className='u-full-width'
                onClick={addHeader}>
                Click to add header
              </button>
            </div>
          )
        }
    </div>
  );
}

export default Headers;
