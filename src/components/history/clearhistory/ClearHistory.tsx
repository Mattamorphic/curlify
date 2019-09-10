/**
 * @file ClearHistory component
 * @author Mattamorphic
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from '../../shared/Button';

interface ClearHistoryProps {
  clear: () => void;
}

const ClearHistory: React.FunctionComponent<ClearHistoryProps> = props => {
  return (
    <Button isPrimary={false} onClick={props.clear}>
      <FontAwesomeIcon icon={faTrash} size="lg" />
    </Button>
  );
};

export default ClearHistory;
