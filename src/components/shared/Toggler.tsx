import './css/Toggler.css';

import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tooltip from './Tooltip';

import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface TogglerProps {
  className?: string;
  heading?: string;
  label: string | JSX.Element;
  onToggle: () => void;
  isToggled: boolean;
  tooltip?: string;
}

const Toggler: React.FunctionComponent<TogglerProps> = props => {
  if (props.heading) {
    return (
      <>
        <div className="row Toggler">
          <h4 className="u-pull-left"> {props.heading} </h4>
          <Button
            className="u-pull-left"
            isPrimary={false}
            onClick={props.onToggle}
          >
            <Tooltip text={props.tooltip || 'show/hide'}>
              {typeof props.label === 'string' ? (
                !props.isToggled ? (
                  <FontAwesomeIcon icon={faPlusCircle} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faMinusCircle} size="lg" />
                )
              ) : (
                props.label
              )}
            </Tooltip>
          </Button>
        </div>
        <div className="row">
          {props.isToggled && (
            <div className={props.className || ''}>
              <div className="row">{props.children}</div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="row">
        <Button
          className="u-full-width"
          isPrimary={false}
          onClick={props.onToggle}
        >
          <Tooltip text={props.tooltip || 'show/hide'}>
            {typeof props.label === 'string' ? (
              !props.isToggled ? (
                <FontAwesomeIcon icon={faPlusCircle} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faMinusCircle} size="lg" />
              )
            ) : (
              props.label
            )}
          </Tooltip>
        </Button>
      </div>
      {props.isToggled && (
        <div className={props.className || ''}>
          <div className="row">{props.children}</div>
        </div>
      )}
    </>
  );
};

export default Toggler;
