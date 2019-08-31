import React from 'react';

import './css/Request.css';

import Button from '../../shared/Button';
import Confirm from '../../shared/Confirm';


interface RequestProps {
  shouldConfirm: boolean;
  incompleteData?: string;
  onRequest: () => void;
}

const Request: React.FunctionComponent<RequestProps> = (props) => {
  const onConfirm = props.onRequest;
  const onCancel = () => {};


  return (
    <div className="row">
      <div className="Request">
        {
          props.shouldConfirm
            ? <Confirm
                className="u-full-width"
                label="Test"
                onConfirm={onConfirm}
                onCancel={onCancel}
                message="Are you sure?" />
            :  <Button
                className="u-full-width"
                isPrimary={false}
                label="Test"
                onClick={props.onRequest} />
        }
      </div>
    </div>
  );
}

export default Request;
