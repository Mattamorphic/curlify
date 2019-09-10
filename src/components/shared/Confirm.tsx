/**
 * @file $COMPONENT component
 * @author Mattamorphic
 */
import React from 'react';

import Button from './Button';

import './css/Confirm.css';

interface ConfirmProps {
  className?: string;
  label: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPrimary?: boolean;
}

const Confirm: React.FunctionComponent<ConfirmProps> = props => {
  const onConfirm = () => {
    const result = window.confirm(props.message);
    result ? props.onConfirm() : props.onCancel();
  };

  return (
    <Button
      className={props.className || ''}
      isPrimary={props.isPrimary || false}
      label={props.label}
      onClick={onConfirm}
    />
  );
};

export default Confirm;
