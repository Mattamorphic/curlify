/**
 * @file ClearHistory component
 * @author Mattamorphic
 */
import Button from '../../shared/Button';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Tooltip from '../../shared/Tooltip';

interface ClearHistoryProps {
  clear: () => void;
}

const ClearHistory: React.FunctionComponent<ClearHistoryProps> = props => {
  return (
    <Button isPrimary={false} onClick={props.clear}>
      <Tooltip text="Clear history">
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </Tooltip>
    </Button>
  );
};

export default ClearHistory;
