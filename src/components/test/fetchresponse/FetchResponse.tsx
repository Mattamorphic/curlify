/**
 * @file FetchResponse component
 * @author Mattamorphic
 */
import './css/FetchResponse.css';

import React from 'react';
import ResponseHeaders from './responseheaders/ResponseHeaders';
import ResponseJson from './responsejson/ResponseJson';
import ResponseRaw from './responseraw/ResponseRaw';

interface FetchResponseProps {
  data: string;
  headers: Headers;
}

const FetchResponse: React.FunctionComponent<FetchResponseProps> = props => {
  let json = {};
  try {
    json = JSON.parse(props.data);
  } catch (_) {
    json = {};
  }

  return (
    <div className="FetchResponse">
      <ResponseHeaders headers={props.headers} />
      <ResponseRaw data={props.data} />
      <ResponseJson data={json} />
    </div>
  );
};

export default FetchResponse;
