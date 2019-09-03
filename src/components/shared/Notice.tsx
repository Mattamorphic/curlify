/**
 * @file Notice component
 * @author Mattamorphic
 */
import React from 'react';

import './css/Notice.css';

interface NoticeProps {
  className?: string;
  heading: string;
  content: string;
}

const Notice: React.FunctionComponent<NoticeProps> = (props) => {
  const lines = props.content.split("\n");

  return (
    <div className={(props.className || '') + ' Notice'}>
      <h4> {props.heading} </h4>
      {
        lines.map(line => (<>{line} <br /></>))
      }
    </div>
  )
};

export default Notice;
