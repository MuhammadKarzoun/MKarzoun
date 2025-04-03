import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from './Icon';
import { Alert } from '../utils';
import { ISelectedVar } from '../types';
const CustomMultiValueRemove = () => {
  return null;
};
const CustomClearText = (props) => {
  const [selectedValues, setSelectedValues] = useState('');
  const { getValue } = props;
  const handleCopyClick = (event) => {
    event.stopPropagation();
    console.log(selectedValues);
    let values = '';
    getValue().forEach((value) => {
      values += value.value + ' ';
    }
    );
    setSelectedValues(values);
    Alert.success(`Variables copied to your clipboard !`);
  };
  return (
    <CopyToClipboard
      text={selectedValues} onCopy={handleCopyClick}>
      <div style={{ cursor: 'pointer', color: '#999' }} onMouseDown={handleCopyClick}>
        <Icon icon="copy" size={20} />
      </div>
    </CopyToClipboard>
  );
};
type Props = {
  options: Array<{ value: string; label: string }>;
  isMulti?: boolean;
  isOverride?: boolean;
  name?: string;
  onSelect: (selectedOption: any) => void;
};
export default ({ options, isMulti = true, isOverride = false, name = 'vars', onSelect }: Props) => {
  const [selectedOption, setSelectedOption] = useState<Array<any>>([]);
  const selectRef = useRef<any>(null);
  const copyToClipboard = async () => {
    let values = '';
    const vals = selectRef.current.getValue();
    vals.forEach((value) => {
      values += value.value + ' ';
    }
    );
    await navigator.clipboard.writeText(values)
    Alert.success(`Variables copied to your clipboard !`);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'c') {
      copyToClipboard();
    }
  };
  const handleSelection = (option) => {
    if (isOverride) {
      if (option && option.length > 0) {
        setSelectedOption([option[option.length - 1]]);
        onSelect([option[option.length - 1]]);
      } else {
        setSelectedOption([]);
        onSelect([]);
      }
    }
    else {
      setSelectedOption(option);
      onSelect(option);
    }
  }
  return (<Select
    value={selectedOption}
    ref={selectRef}
    styles={{
      control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? '#6569df' : 'grey',
      }),
    }}
    components={{
      ClearIndicator: props => (CustomClearText(props)),
      MultiValueRemove: CustomMultiValueRemove,
    }}
    isMulti={isMulti}
    name={name}
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={handleSelection}
    isClearable={true}
    onKeyDown={(event) => handleKeyDown(event)}
  />)
};
