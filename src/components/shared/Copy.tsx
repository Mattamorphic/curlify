import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import Button from './Button';

interface CopyProps {
  className?: string;
  label?: string;
  content: string;
}

const Copy: React.FunctionComponent<CopyProps> = (props) => {

  const copy = async () => {
    await navigator.clipboard.writeText(props.content);
  }

  return (
    <Button
      className={props.className || ''}
      isPrimary={false}
      onClick={copy}>
      <FontAwesomeIcon icon={faCopy} size="lg" />
      </Button>
  )
}

export default Copy;
