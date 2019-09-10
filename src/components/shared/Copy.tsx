import Button from './Button';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tooltip from './Tooltip';

interface CopyProps {
  className?: string;
  label?: string;
  content: string;
}

const Copy: React.FunctionComponent<CopyProps> = props => {
  const copy = async () => {
    await navigator.clipboard.writeText(props.content);
  };

  return (
    <Tooltip text="Copy">
      <Button
        className={props.className || ''}
        isPrimary={false}
        onClick={copy}
      >
        <FontAwesomeIcon icon={faCopy} size="lg" />
      </Button>
    </Tooltip>
  );
};

export default Copy;
