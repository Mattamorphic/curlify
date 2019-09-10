import './css/Saving.css';

import { CSSTransitionGroup } from 'react-transition-group';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface SavingProps {
  className?: string;
  isSaved: boolean;
}

const Saving: React.FunctionComponent<SavingProps> = props => {
  return (
    <CSSTransitionGroup
      transitionEnter={true}
      transitionEnterTimeout={500}
      transitionLeave={false}
      transitionName="save-notice"
    >
      <div
        key={'notice-' + props.isSaved}
        className={
          (props.isSaved ? 'Saved' : 'NotSaved') +
          ' SavingNotice ' +
          (props.className || '')
        }
      >
        <FontAwesomeIcon icon={faSave} size="lg" />
      </div>
    </CSSTransitionGroup>
  );
};

export default Saving;
