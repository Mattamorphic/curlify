import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

import './css/Saving.css';

interface SavingProps {
  className?: string;
  label?: string;
  isSaved: boolean;
}

const Saving: React.FunctionComponent<SavingProps> = (props) => {

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
        {props.isSaved ? `Saved ${props.label}`  : `${props.label} Not Saved`}
      </div>
    </CSSTransitionGroup>
  )
}

export default Saving;
