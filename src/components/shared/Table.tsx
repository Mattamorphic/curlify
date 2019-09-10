/**
 * @file Table component
 * @author Mattamorphic
 */
import React from 'react';

import './css/Table.css';

export interface TableRow {
  [key: string]: string | JSX.Element;
}

interface TableProps {
  className?: string;
  data: TableRow[];
}

const Table: React.FunctionComponent<TableProps> = props => {
  if (props.data.length === 0) {
    return <table className={props.className || ''} />;
  }

  const headers = Object.keys(props.data[0]);

  return (
    <table className={props.className || ''}>
      <thead>
        {headers.map((header: string, i: number) => (
          <th key={`header_${i}`}>{header}</th>
        ))}
      </thead>
      <tbody>
        {props.data.map((row: TableRow, i: number) => (
          <tr key={`tr_${i}`}>
            {headers.map((header: string, j: number) => (
              <td key={`tr_${i}_${j}`} data-label={header}>
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
