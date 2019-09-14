import './css/Destination.css';

import * as utils from '../../../utils';

import { ColumnCount } from '../../../enums';
import Domain from './domain/Domain';
import Endpoint from './endpoint/Endpoint';
import { KeyValueEntry } from '../../shared/KeyValueInput';
import React from 'react';

interface DestinationProps {
  onUpdate: (
    domain: string,
    endpoint: string,
    queryParams: KeyValueEntry[],
    rawUrl: string
  ) => void;
  domain: string;
  endpoint: string;
  queryParams: KeyValueEntry[];
  width: ColumnCount;
}

const Destination: React.FunctionComponent<DestinationProps> = props => {
  const onUpdate = (value: string): void => {
    const url = utils.parseURLString(value);

    // TODO: handle query params / draft state
    props.onUpdate(url.domain, url.endpoint, url.queryParams, url.rawUrl);
  };

  const onUpdateEndpoint = (endpoint: string): void => {
    onUpdate(props.domain + endpoint);
  };

  const onUpdateDomain = (domain: string): void => {
    onUpdate(domain + props.endpoint);
  };

  return (
    <div className={props.width + ' Destination'}>
      <div className="row">
        <div className="six columns">
          <Domain
            isFullWidth={true}
            onUpdate={onUpdateDomain}
            value={props.domain}
          />
        </div>
        <div className="six columns">
          <Endpoint
            isFullWidth={true}
            onUpdate={onUpdateEndpoint}
            value={props.endpoint}
          />
        </div>
      </div>
    </div>
  );
};

export default Destination;
