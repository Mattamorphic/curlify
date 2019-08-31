import React from 'react';

import './css/Loading.css';

interface LoadingProps {
  className?: string;
}

const Loading: React.FunctionComponent<LoadingProps> = (props) => {
  return (
    <div className={(props.className || '') + " LoadingContainer"}>
      <div className="Loading">
        <div />
      </div>
      <div>
        Loading
      </div>
    </div>
  );
}

export default Loading;
