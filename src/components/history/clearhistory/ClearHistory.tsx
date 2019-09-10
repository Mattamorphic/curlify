/**
 * @file ClearHistory component
 * @author Mattamorphic
 */
import Button from '../../shared/Button';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

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
