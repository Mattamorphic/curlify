/**
 * @file Tooltip component
 * @author Mattamorphic
 */
import './css/Tooltip.css';

import React from 'react';

interface TooltipProps {
  text: string;
}

const Tooltip: React.FunctionComponent<TooltipProps> = props => {
  return (
    <div className="Tooltip">
      <span className="TooltipText">{props.text}</span>
      {props.children}
    </div>
  );
};

export default Tooltip;
