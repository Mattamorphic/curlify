import React from 'react';

interface selectProps {
  className?: string;
  id?: string;
  isDisabled?: boolean;
  label?: string;
  name?: string;
  onChange: (value: string, name?: string) => void;
  placeholder?: string;
  selected?: string | string[] | null;
  style?: { [key: string]: string };
  values: string[];
  isMultiple?: boolean;
  size?: number;
}

const Select: React.FunctionComponent<selectProps> = props => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value, props.name);
  };

  const selected = props.selected || '';
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <select
        className={props.className || ''}
        disabled={props.isDisabled || false}
        id={props.id || ''}
        multiple={props.isMultiple || false}
        name={props.name || ''}
        onChange={onChange}
        size={props.size || 0}
        style={props.style || {}}
        value={selected}
      >
        <option value="" disabled>
          {props.placeholder || 'Please Select'}
        </option>
        {props.values.map((value: string, i: number) => (
          <option key={`${value}_${i}`} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
