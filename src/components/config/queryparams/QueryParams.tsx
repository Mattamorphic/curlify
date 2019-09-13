/**
 * @file QueryParams component
 * @author Mattamorphic
 */
import React from 'react';
import Toggler from '../../shared/Toggler';

export interface QueryParamsData {
  [key: string]: any;
}

interface QueryParamsProps {
  queryParams: QueryParamsData;
  updateQueryParams: (qp: QueryParamsData) => void;
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
      showQueryParams: Object.keys(this.props.queryParams).length > 0
    };
  }

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
            {Object.keys(this.props.queryParams).join(', ')}
            &nbsp;
          </em>
        }
        heading="Query Parameters"
        label="Query Parameter"
        onToggle={this.toggleQueryParams}
        isToggled={this.state.showQueryParams}
        tooltip="Configure query parameters"
      >
        <>Test</>
      </Toggler>
    );
  }
}
