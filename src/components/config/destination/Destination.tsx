import React from 'react';

import Domain from './domain/Domain';
import Endpoint from './endpoint/Endpoint';

import './css/Destination.css';

import {ColumnCount} from '../../../enums';

type DomainOrEndpoint = 'domain' | 'endpoint';

interface DestinationProps {
  onUpdate: (domain: string, endpoint: string) => void;
  domain: string;
  endpoint: string;
  width: ColumnCount;
}

const Destination: React.FunctionComponent<DestinationProps> = (props) => {

  const onUpdate = (value: string, type: DomainOrEndpoint): void => {
    props.onUpdate(
      (type === 'domain') ? value : props.domain,
      (type === 'endpoint') ? value : props.endpoint,
    );
  }

  const onUpdateDomain = (domain: string): void => {
    if (domain.charAt(domain.length-1) === '/') {
      domain = domain.substr(0, domain.length-1);
    }
    onUpdate(domain, 'domain');
  }

  const onUpdateEndpoint = (endpoint: string): void => {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint;
    }
    onUpdate(endpoint, 'endpoint');
  }

  return (
    <div className={props.width + ' Destination'}>
      <div className="row">
        <div className="twelve columns">
        <label> Destination </label>
        </div>
      </div>
      <div className="row">
          <div className="six columns">
            <Domain
              isFullWidth={true}
              onUpdate={onUpdateDomain}
              value={props.domain} />
          </div>
          <div className="six columns">
            <Endpoint
              isFullWidth={true}
              onUpdate={onUpdateEndpoint}
              value={props.endpoint} />
          </div>
        </div>
      </div>
  );
}

export default Destination;