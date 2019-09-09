import React from 'react';

import Button from './Button';

interface TogglerProps {
  className?: string;
  label: string | JSX.Element;
  onToggle: () => void;
  isToggled: boolean;
}

const Toggler: React.FunctionComponent<TogglerProps> = (props) => {

  return (
    <div>
      <div className="row">
      <Button
        className="u-full-width"
        isPrimary={false}
        onClick={props.onToggle}>
        {
          typeof props.label === 'string'
            ? ((!props.isToggled ? 'Show ' : 'Hide ') + props.label)
            : props.label
        }

      </Button>
      </div>
      {
        props.isToggled && (
          <div className={props.className || ''}>
          <div className="row">{props.children}</div>
          </div>
        )
      }
    </div>
  )
}

export default Toggler;
