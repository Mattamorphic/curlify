import React from 'react';

interface selectProps {
  className?: string;
  isDisabled?: boolean;
  label?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected?: string | string[] | null;
  style?: {[key: string]: string};
  values: string[];
  isMultiple?: boolean;
  size?: number;
}

const Select: React.FunctionComponent<selectProps> = (props) => {
  const selected = props.selected || '';
  return (
    <>
    { props.label && (<label>{props.label}</label>) }
    <select
      className={props.className || ''}
      name={props.name || ''}
      size={props.size || 0}
      style={props.style || {}}
      disabled={props.isDisabled || false}
      multiple={props.isMultiple || false}
      onChange={props.onChange || null}
      value={selected}>
      <option value="" disabled>Please Select</option>
      {props.values.map((value: string, i:number) => (
        <option
          value={value}
          key={`${value}_${i}`}>
          {value}
        </option>
      ))}
    </select>
    </>
  );
}

export default Select;
