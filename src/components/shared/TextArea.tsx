import React from 'react';

interface TextAreaProps {
  className?: string;
  isFullWidth: boolean;
  onChangeDirect?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onUpdate?: (value: string) => void;
  style?: {
    [key: string]: string;
  };
  value: string;
}

interface TextAreaState {}

export default class TextArea extends React.Component<
  TextAreaProps,
  TextAreaState
> {
  constructor(props: TextAreaProps) {
    super(props);
    this.state = {};
  }

  onUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (this.props.onChangeDirect) {
      this.props.onChangeDirect(e);
    } else if (this.props.onUpdate) {
      this.props.onUpdate(e.target.value);
    }
  };

  render() {
    return (
      <textarea
        className={
          (this.props.isFullWidth ? 'u-full-width ' : ' ') +
            this.props.className || ''
        }
        onChange={this.onUpdate}
        style={this.props.style || {}}
        value={this.props.value}
      ></textarea>
    );
  }
}
