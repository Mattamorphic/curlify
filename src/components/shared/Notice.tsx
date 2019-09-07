/**
 * @file Notice component
 * @author Mattamorphic
 */
import React from 'react';

import './css/Notice.css';

interface NoticeProps {
  className?: string;
  heading: string;
}

const Notice: React.FunctionComponent<NoticeProps> = (props) => {

  return (
    <div className={(props.className || '') + ' Notice'}>
      <h4> {props.heading} </h4>
      <>
        {props.children}
      </>
    </div>
  )
};

export default Notice;
