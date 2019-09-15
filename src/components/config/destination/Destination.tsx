/**
 * @file Destination component
 * @author Mattamorphic
 */
import './css/Destination.css';

import * as utils from '../../../utils';

import { ColumnCount } from '../../../enums';
import Domain from './domain/Domain';
import Endpoint from './endpoint/Endpoint';
import { KeyValueEntry } from '../../shared/KeyValueInput';
import React from 'react';

interface DestinationProps {
  domain: string;
  endpoint: string;
  onUpdate: (
    domain: string,
    endpoint: string,
    queryParams: KeyValueEntry[],
    rawUrl: string
  ) => void;
  queryParams: KeyValueEntry[];
  width: ColumnCount;
}

const Destination: React.FunctionComponent<DestinationProps> = props => {
  const onUpdate = (value: string): void => {
    const url = utils.parseURLString(value);
    props.onUpdate(url.domain, url.endpoint, url.queryParams, url.rawUrl);
  };

  const onUpdateDomain = (domain: string): void => {
    onUpdate(
      domain +
        props.endpoint +
        utils.convertKeyValueArrayToQueryParams(props.queryParams)
    );
  };

  const onUpdateEndpoint = (endpoint: string): void => {
    onUpdate(
      props.domain +
        endpoint +
        utils.convertKeyValueArrayToQueryParams(props.queryParams)
    );
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
