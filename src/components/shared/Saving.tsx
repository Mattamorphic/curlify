import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import './css/Saving.css';

interface SavingProps {
  className?: string;
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
        <FontAwesomeIcon icon={faSave} size="lg" />
      </div>
    </CSSTransitionGroup>
  )
}

export default Saving;
