/**
 * @file QueryParams component
 * @author Mattamorphic
 */
import './css/QueryParams.css';

import React from 'react';
import Toggler from '../../shared/Toggler';

import KeyValueInput, { KeyValueEntry } from '../../shared/KeyValueInput';

interface QueryParamsProps {
  onRemove: (index: number) => void;
  onUpdate: (entry: KeyValueEntry, index: number) => void;
  selected: KeyValueEntry[];
}

interface QueryParamsState {
  showQueryParams: boolean;
}

export default class QueryParams extends React.PureComponent<
  QueryParamsProps,
  QueryParamsState
> {
  constructor(props: QueryParamsProps) {
    super(props);
    this.state = {
      showQueryParams: Object.keys(this.props.selected).length > 0
    };
  }

  addQueryParam = (): void => {
    this.props.onUpdate(
      {
        key: '',
        value: ''
      },
      this.props.selected.length
    );
  };

  toggleQueryParams = () => {
    this.setState(prevState => ({
      showQueryParams: !prevState.showQueryParams
    }));
  };

  render() {
    return (
      <Toggler
        collapsedData={
          <em>
            {this.props.selected.map(s => s.key).join(', ')}
            &nbsp;
          </em>
        }
        heading="Query Parameters"
        label="Query Parameter"
        onToggle={this.toggleQueryParams}
        isToggled={this.state.showQueryParams}
        tooltip="Configure query parameters"
      >
        <KeyValueInput
          className="QueryParams"
          id="QueryParameters"
          keyInput={{
            placeholder: 'Enter QueryParameter',
            type: 'TEXT'
          }}
          valueInput={{
            placeholder: 'Enter Value',
            type: 'TEXT'
          }}
          selected={this.props.selected}
          onAddEntry={this.addQueryParam}
          onUpdateEntry={this.props.onUpdate}
          onRemoveEntry={this.props.onRemove}
        />
      </Toggler>
    );
  }
}
