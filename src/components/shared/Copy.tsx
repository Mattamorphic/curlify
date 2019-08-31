import React from 'react';

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
      label= {props.label || "Copy"}
      onClick={copy} />
  )
}

export default Copy;
