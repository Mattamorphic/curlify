/**
 * @file LoadHistoryEntry component
 * @author Mattamorphic
 */
import './css/LoadHistoryEntry.css';

import Button from '../../../../shared/Button';
import { ConfigData } from '../../../../config/Config';
import { DataData } from '../../../../data/Data';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface LoadHistoryEntryProps {
  className?: string;
  config: ConfigData;
  data: DataData;
  updateConfig: (config: ConfigData) => void;
  updateData: (data: DataData) => void;
}

const LoadHistoryEntry: React.FunctionComponent<
  LoadHistoryEntryProps
> = props => {
  const load = () => {
    props.updateConfig(props.config);
    props.updateData(props.data);
  };

  return (
    <Button className={props.className} isPrimary={false} onClick={load}>
      <FontAwesomeIcon icon={faUpload} size="lg" />
    </Button>
  );
};

export default LoadHistoryEntry;
