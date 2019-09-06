import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import './css/Saving.css';

interface SavingProps {
  className?: string;
  label?: string;
  isSaved: boolean;
}

const Saving: React.FunctionComponent<SavingProps> = (props) => {
  const saved = props.label ? `Saved ${props.label}` : 'Saved';
  const notSaved = props.label ? `${props.label} Not Saved` : 'Not Saved';
  return (
    <CSSTransitionGroup
      transitionName="save-notice"
      transitionLeave={false}
      transitionEnter={true}
      transitionEnterTimeout={500}>
      <div
        className={
          ((props.isSaved) ? 'Saved' : 'NotSaved')
          +  " SavingNotice "
          + (props.className || '')
        }
        key={"notice-" + props.isSaved}>
        {props.isSaved ? saved : notSaved}
      </div>
    </CSSTransitionGroup>
  )
}

export default Saving;
