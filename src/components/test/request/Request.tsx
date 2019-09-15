/**
 * @file Request component
 * @author Mattamorphic
 */
import './css/Request.css';

import Button from '../../shared/Button';
import Confirm from '../../shared/Confirm';
import React from 'react';

import Proxy, { ProxyData } from './proxy/Proxy';

interface RequestProps {
  shouldConfirm: boolean;
  incompleteData?: string;
  hasRun: boolean;
  proxy: ProxyData;
  onRequest: () => void;
  onUpdateProxy: (data: ProxyData) => void;
}

const Request: React.FunctionComponent<RequestProps> = props => {
  const onConfirm = props.onRequest;
  const onCancel = () => {};

  return (
    <div className="row">
      <div className="Request">
        <Proxy onUpdateProxy={props.onUpdateProxy} proxy={props.proxy} />
        {props.shouldConfirm ? (
          <Confirm
            className="u-full-width"
            label="Test"
            message="Are you sure?"
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        ) : (
          <Button
            className="u-full-width"
            isPrimary={false}
            label="Test"
            onClick={props.onRequest}
          />
        )}
      </div>
    </div>
  );
};

export default Request;
