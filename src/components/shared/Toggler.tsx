import React from 'react';

import Button from './Button';

interface TogglerProps {
  className?: string;
  label: string;
  onToggle: () => void;
  isToggled: boolean;
}

const Toggler: React.FunctionComponent<TogglerProps> = (props) => {

  return (
    <div className={props.className || ''}>
      <div className="row">
      <Button
        className="u-full-width"
        isPrimary={false}
        label= {(!props.isToggled ? 'Show ' : 'Hide ') + props.label}
        onClick={props.onToggle} />
      </div>
      {
        props.isToggled && (
          <div className="row">{props.children}</div>
        )
      }
    </div>
  )
}

export default Toggler;
