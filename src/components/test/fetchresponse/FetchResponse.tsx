import React from 'react';

import ResponseHeaders from './responseheaders/ResponseHeaders';
import ResponseJson from './responsejson/ResponseJson';
import ResponseRaw from './responseraw/ResponseRaw';

import './css/FetchResponse.css';

interface FetchResponseProps {
  headers: Headers,
  data: string;
}

const FetchResponse: React.FunctionComponent<FetchResponseProps> = (props) => {
  let json = {}
  try {
    json = JSON.parse(props.data)
  } catch (_) {}

  return (
    <div className="FetchResponse">
      <ResponseHeaders headers={props.headers} />
      <ResponseRaw data={props.data} />
      <ResponseJson data={json} />
    </div>
  );
}

export default FetchResponse;
