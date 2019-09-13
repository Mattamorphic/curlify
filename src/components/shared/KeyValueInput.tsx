/**
 * @file KeyValueInput component
 * @author Mattamorphic
 */

import Autocomplete from './Autocomplete';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input';
import React from 'react';
import Select from './Select';
import Tooltip from './Tooltip';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface InputConfig {
  type: 'TEXT' | 'AUTOCOMPLETE' | 'SELECT';
  placeholder?: string;
  values?: string[];
}

export interface KeyValueEntry {
  key: string;
  value: string;
}

interface KeyValueInputProps {
  className?: string;
  id: string;
  keyInput: InputConfig;
  valueInput: InputConfig;
  selected: KeyValueEntry[];
  onUpdateEntry: (entry: KeyValueEntry, index: number) => void;
  onAddEntry: () => void;
  onRemoveEntry: (index: number) => void;
}

const KeyValueInput: React.FunctionComponent<KeyValueInputProps> = props => {
  const addEntry = (_: any) => {
    props.onAddEntry();
  };
  const removeEntry = (_: any, name?: string) => {
    const maybeIndexStr = (name || '').split('_').pop();
    if (!maybeIndexStr) {
      throw new Error('Invalid name');
    }
    const refineIndex = parseInt(maybeIndexStr);
    props.onRemoveEntry(refineIndex);
  };

  const updateEntryKey = (key: string, index: string) => {
    const refineIndex = parseInt(index);
    const entry = props.selected[refineIndex];
    entry.key = key;
    props.onUpdateEntry(entry, refineIndex);
  };

  const updateEntryValue = (value: string, index: string) => {
    const refineIndex = parseInt(index);
    const entry = props.selected[refineIndex];
    entry.value = value;
    props.onUpdateEntry(entry, refineIndex);
  };

  const onChangeKey = (key: string, name?: string) => {
    const maybeIndexStr = (name || '').split('_').pop();
    if (!maybeIndexStr) {
      throw new Error('Invalid name');
    }
    updateEntryKey(key, maybeIndexStr);
  };

  const onChangeValue = (value: string, name?: string) => {
    const maybeIndexStr = (name || '').split('_').pop();
    if (!maybeIndexStr) {
      throw new Error('Invalid name');
    }
    updateEntryValue(value, maybeIndexStr);
  };

  if (props.selected.length === 0) {
    return (
      <div className="row">
        <Tooltip text="Add a header">
          <Button className="u-full-width" isPrimary={false} onClick={addEntry}>
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
        </Tooltip>
      </div>
    );
  }
  return (
    <div className={props.className || ''}>
      {props.selected.map((entry, index) => (
        <div className="row" key={props.id + '_' + index + '_' + 'row'}>
          <div className="two columns">
            <Tooltip text="Remove this header">
              <Button
                className="u-full-width"
                name={`remove_${props.id}_${index}`}
                isPrimary={false}
                onClick={removeEntry}
              >
                <FontAwesomeIcon icon={faMinus} size="lg" />
              </Button>
            </Tooltip>
          </div>
          <div className="four columns">
            {props.keyInput.type === 'TEXT' && (
              <Input
                name={entry.key + '_' + index}
                onChange={onChangeKey}
                placeholder={props.keyInput.placeholder || ''}
                value={entry.key}
              />
            )}
            {props.keyInput.type === 'AUTOCOMPLETE' && (
              <Autocomplete
                name={entry.key + '_' + index}
                placeholder={props.keyInput.placeholder || ''}
                selected={entry.key}
                suggestions={props.keyInput.values || []}
                onSelectSuggestion={onChangeKey}
              />
            )}
            {props.keyInput.type === 'SELECT' && (
              <Select
                name={entry.key + '_' + index}
                onChange={onChangeKey}
                placeholder={props.keyInput.placeholder || ''}
                selected={entry.key}
                values={props.keyInput.values || []}
              />
            )}
          </div>
          <div className="four columns">
            {props.valueInput.type === 'TEXT' && (
              <Input
                name={entry.value + '_' + index}
                onChange={onChangeValue}
                placeholder={props.valueInput.placeholder || ''}
                value={entry.value}
              />
            )}
            {props.valueInput.type === 'AUTOCOMPLETE' && (
              <Autocomplete
                name={entry.value + '_' + index}
                placeholder={props.valueInput.placeholder || ''}
                selected={entry.value}
                suggestions={props.keyInput.values || []}
                onSelectSuggestion={onChangeValue}
              />
            )}
            {props.valueInput.type === 'SELECT' && (
              <Select
                name={entry.value + '_' + index}
                onChange={onChangeValue}
                placeholder={props.valueInput.placeholder || ''}
                selected={entry.value}
                values={props.keyInput.values || []}
              />
            )}
          </div>
          <div className="two columns">
            <Tooltip text="Add a new header">
              <Button
                className="u-full-width"
                isPrimary={false}
                onClick={addEntry}
              >
                <FontAwesomeIcon icon={faPlus} size="lg" />
              </Button>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyValueInput;
