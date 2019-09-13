import './css/Toggler.css';

import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tooltip from './Tooltip';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface TogglerProps {
  className?: string;
  collapsedData?: JSX.Element;
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
          <div className="five columns">
            <h4 className="u-pull-left"> {props.heading} </h4>
          </div>
          <div className="six columns">
            <span className="TogglerPreview">
              {!props.isToggled ? (
                props.collapsedData || <span>&nbsp;</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </span>
          </div>
          <div className="one column">
            <Button
              className="u-full-width"
              isPrimary={false}
              onClick={props.onToggle}
            >
              <Tooltip text={props.tooltip || 'show/hide'}>
                {typeof props.label === 'string' ? (
                  !props.isToggled ? (
                    <FontAwesomeIcon icon={faChevronDown} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={faChevronUp} size="lg" />
                  )
                ) : (
                  props.label
                )}
              </Tooltip>
            </Button>
          </div>
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
                <FontAwesomeIcon icon={faChevronDown} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} size="lg" />
              )
            ) : (
              props.label
            )}
          </Tooltip>
        </Button>
        {!props.isToggled && props.collapsedData}
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
