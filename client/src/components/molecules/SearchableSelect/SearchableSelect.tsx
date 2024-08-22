import * as React from 'react';
import { useState } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';
import { styled } from 'styled-components';

import { COLOR } from '../../constants';

type SearchableSelectProps = {
  options?: any[];
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  text?: string;
  blackMode?: boolean;
  border?: boolean;
  padding?: string;
  borderRadius?: string;
  selectedQuotientValue?: string;
  setSelectedQuotientValue?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedValue?: string;
  heightScroll?: string;
  isnormalizedOptions?: boolean;
};

export function SearchableSelect({
  options,
  placeholder,
  border,
  disabled,
  padding,
  borderRadius,
  width,
  height = '40px',
  text,
  blackMode,
  heightScroll,
  selectedQuotientValue,
  setSelectedQuotientValue,
}: SearchableSelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);
  // const [selected, setSelected] = useState<string>();
  // const [code, setCode] = useState<string>();
  // const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchValue, setSearchValue] = useState('');

  const normalizedOptions = Array.isArray(options)
    ? options
    : options
      ? [options]
      : [];

  const clickQuotientValue = (value: string) => {
    if (value !== undefined && setSelectedQuotientValue) {
      setSelectedQuotientValue(value);
    }
  };

  const handleOptionSelect = (
    event: React.MouseEvent<HTMLButtonElement>,
    code: string | undefined,
  ) => {
    //setSelected(event.currentTarget.value);
    //setCode(event.currentTarget.classList[0]);
    setIsOptionShow(false);
    clickQuotientValue(event.currentTarget.value);
  };

  const handleInputChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSearchValue(value);
    // setFilteredOptions(
    //   options?.filter((option) =>
    //     option.name.toLowerCase().includes(value.toLowerCase()),
    //   ),
    // );
    setSelectedQuotientValue && setSelectedQuotientValue(value); // Input이 변경될 때 값 설정
  };

  //하이라이트
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <Highlighted key={i}>{part}</Highlighted>
      ) : (
        part
      ),
    );
  };

  return (
    <Component
      height={height}
      $border={border}
      $padding={padding}
      $borderRadius={borderRadius}
      onMouseLeave={() => {
        setIsOptionShow(false);
      }}
    >
      <Input
        type="text"
        value={selectedQuotientValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onClick={() => {
          setIsOptionShow(!isOptionShow);
          setSelectedQuotientValue && setSelectedQuotientValue('');
          setSearchValue('');
        }}
      />
      <IoMdArrowDropdown
        onClick={() => setIsOptionShow(true)}
      ></IoMdArrowDropdown>
      {isOptionShow && (
        <SelectOptionsList
          onMouseLeave={() => {
            setIsOptionShow(false);
          }}
          $top={height}
          height={height}
        >
          <ScrollWrapper $heightScroll={heightScroll}>
            {normalizedOptions.map((el) => (
              <div className="li" key={el.code}>
                <button
                  disabled={disabled}
                  value={el.name}
                  className={el.code}
                  onClick={(event) => {
                    handleOptionSelect(event, el.code);
                    clickQuotientValue(el.name);
                  }}
                >
                  <span>{highlightText(el.name, searchValue)}</span>
                </button>
              </div>
            ))}
          </ScrollWrapper>
        </SelectOptionsList>
      )}
    </Component>
  );
}

type ComponentProps = {
  $border?: boolean;
  $borderRadius?: string;
  $padding?: string;
  height?: string;
};

const Component = styled.div<ComponentProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ height }) => (height ? ` ${height};` : '50px')};
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '15px')};
  position: relative;
  width: 400px;
  background-color: white;
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? `${$borderRadius};` : '5px'};
  ${({ $border }) =>
    $border
      ? `border: 1px solid ${COLOR.PRIMARY};`
      : `border: 1px solid rgba(0, 0, 0, 0.23);   
			&:hover {
				border: 1px solid ${COLOR.PRIMARY};
			}; 
		`};
`;
const Input = styled.input`
  width: 350px;
  border: none;
  font-size: 14px;
`;

const ScrollWrapper = styled.div<{ $heightScroll?: string }>`
  overflow-y: auto;
  width: 100%;
  border-radius: 5px;
  ${({ $heightScroll }) => ($heightScroll ? `height: ${$heightScroll}` : '')};
`;

const SelectOptionsList = styled.div<{
  $top?: string;
  height?: string;
}>`
  position: absolute;
  top: ${({ $top }) => ($top ? `${$top};` : '40px')};
  padding-top: 5px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100%;

  .li {
    width: 100%;
    border-left: 1px solid ${COLOR.LIGHT_GRAY};
    border-right: 1px solid ${COLOR.LIGHT_GRAY};
    border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
    background-color: #fff;

    &:hover {
      background-color: ${COLOR.HOVER};
    }
  }

  .li > button {
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding: 10px;
    border: none;
    background-color: transparent;

    span {
      display: flex;
      overflow: hidden;
      line-height: 1.2;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .li:first-child {
    border-top: 1px solid ${COLOR.LIGHT_GRAY};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .li:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
const Highlighted = styled.span`
  color: ${COLOR.PRIMARY};
  font-weight: bold;
`;
