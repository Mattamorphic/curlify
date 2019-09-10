/**
 * @file Notice component
 * @author Mattamorphic
 */
import './css/Notice.css';

import React from 'react';

interface NoticeProps {
  className?: string;
  heading: string;
}

const Notice: React.FunctionComponent<NoticeProps> = props => {
  return (
    <div className={(props.className || '') + ' Notice'}>
      <h4> {props.heading} </h4>
      <>{props.children}</>
    </div>
  );
};

export default Notice;
