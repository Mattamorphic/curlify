import React from 'react';

interface ButtonProps {
  className?: string;
  id?: string;
  isDisabled?: boolean;
  isPrimary: boolean;
  label?: string;
  onClick: () => void;
  onClickRaw?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick();
  }

  return (
    <button
      className={(props.isPrimary ? 'button-primary ' : ' ') + props.className || ' '}
      disabled={props.isDisabled}
      id={props.id}
      onClick={props.onClickRaw || clickHandler}>
      {props.children || props.label || ''}
      </button>
  );
}

export default Button;
