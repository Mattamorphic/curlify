import React from 'react';

interface ButtonProps {
  className?: string;
  isDisabled?: boolean;
  isPrimary: boolean;
  label: string;
  onClick: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick();
  }

  return (
    <input
      type="button"
      className={(props.isPrimary ? 'button-primary ' : ' ') + props.className || ' '}
      disabled={props.isDisabled}
      onClick={clickHandler}
      value={props.label} />
  );
}

export default Button;
