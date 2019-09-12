import Button from './Button';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tooltip from './Tooltip';

interface CopyProps {
  className?: string;
  noIcon?: boolean;
  useDiv?: boolean;
  content: string;
  tooltip?: string;
}

const Copy: React.FunctionComponent<CopyProps> = props => {
  const copy = async () => {
    await navigator.clipboard.writeText(props.content);
  };
  if (!props.useDiv) {
    return (
      <Tooltip text={props.tooltip || 'Copy'}>
        <Button
          className={props.className || ''}
          isPrimary={false}
          onClick={copy}
        >
          {!props.noIcon && <FontAwesomeIcon icon={faCopy} size="lg" />}
          {props.children}
        </Button>
      </Tooltip>
    );
  }
  return (
    <Tooltip text={props.tooltip || 'Copy'}>
      <div className={props.className || ''} onClick={copy}>
        {!props.noIcon && <FontAwesomeIcon icon={faCopy} size="lg" />}
        {props.children}
      </div>
    </Tooltip>
  );
};

export default Copy;
