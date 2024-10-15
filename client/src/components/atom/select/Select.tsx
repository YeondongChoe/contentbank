import * as React from 'react';
import { useEffect, useState } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';
import { styled } from 'styled-components';

import { ItemCategoryType } from '../../../types';
import { COLOR } from '../../constants';
import { IconButton } from '../button';

export type ItemSelectProps = {
  idx?: string | number;
  label?: string;
  code?: string;
  value?: string | number;
  name?: string;
};

type SelectProps = {
  options?: ItemCategoryType[] | ItemCategoryType | ItemSelectProps[] | any[];
  onClick?: () => void;
  onSelect?: (
    event: React.MouseEvent<HTMLButtonElement>,
    code: string | undefined,
  ) => void;
  defaultValue?: null | string;
  width?: string;
  height?: string;
  children?: string;
  padding?: string;
  margin?: string;
  text?: string;
  top?: string;
  blackMode?: boolean;
  disabled?: boolean;
  $positionTop?: boolean;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCode?: React.Dispatch<React.SetStateAction<string>>;
  setSelectedQuotientValue?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  onDefaultSelect?: () => void;
  selectedValue?: string;
  heightScroll?: string;
  isnormalizedOptions?: boolean;
};

export function Select({
  options,
  onClick,
  onSelect,
  defaultValue,
  width,
  height = '40px',
  padding,
  margin,
  text,
  blackMode,
  disabled,
  $positionTop,
  setSelectedValue,
  setSelectedQuotientValue,
  onDefaultSelect,
  selectedValue,
  heightScroll,
  isnormalizedOptions,
  setSelectedCode,
}: SelectProps) {
  const [isOptionShow, setIsOptionShow] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [code, setCode] = useState<string>();

  // useEffect(() => {
  //   setSelected(selectedValue);
  // }, [selectedValue]);

  // if (setSelectedValue !== undefined && selected && code) {
  //   setSelectedValue(selected);
  // }

  // // 권한 코드
  // if (setSelectedCode !== undefined && selected && code) {
  //   setSelectedCode(code);
  // }

  useEffect(() => {
    if (selectedValue !== undefined) {
      setSelected(selectedValue);
    }
  }, [selectedValue]);

  // `setSelectedValue`와 `setSelectedCode` 호출을 useEffect 외부에서 수행
  useEffect(() => {
    if (setSelectedValue && selected) {
      setSelectedValue(selected);
    }
    if (setSelectedCode && code) {
      setSelectedCode(code);
    }
  }, [selected, code, setSelectedValue, setSelectedCode]);

  const normalizedOptions = Array.isArray(options)
    ? options
    : options
      ? [options]
      : [];

  const optionsWithDefault = defaultValue
    ? [{ code: '', name: defaultValue }, ...normalizedOptions]
    : normalizedOptions;

  const clickQuotientValue = (value: number) => {
    if (value !== undefined && setSelectedQuotientValue) {
      setSelectedQuotientValue(value);
    }
  };

  const handleOptionSelect = (
    event: React.MouseEvent<HTMLButtonElement>,
    code: string | undefined,
  ) => {
    setSelected(event.currentTarget.value);
    setCode(event.currentTarget.classList[0]);
    setIsOptionShow(false);
    if (onSelect) onSelect(event, code);
    if (event.currentTarget.value === defaultValue && onDefaultSelect) {
      onDefaultSelect();
    }
  };

  return (
    <Component
      $padding={padding}
      $margin={margin}
      onMouseLeave={() => {
        setIsOptionShow(false);
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <IconButton
        width={width}
        height={height}
        text={text}
        fontSize="14px"
        onClick={() => setIsOptionShow(true)}
        textAlign="left"
        rightIconSrc={React.createElement(IoMdArrowDropdown)}
        blackMode={blackMode}
      >
        <span>{selected || defaultValue}</span>
      </IconButton>
      {isOptionShow && (
        <SelectOptionsList
          onClick={() => setIsOptionShow(false)}
          onMouseLeave={() => {
            setIsOptionShow(false);
          }}
          $top={height}
          $positionTop={$positionTop}
          height={height}
        >
          <ScrollWrapper $heightScroll={heightScroll}>
            {isnormalizedOptions
              ? normalizedOptions.map((el) => (
                  <div className="li" key={el.code}>
                    <button
                      disabled={disabled}
                      value={el.name}
                      className={el.code}
                      onClick={(event) => {
                        handleOptionSelect(event, el.code);
                        clickQuotientValue(el.value as number);
                      }}
                    >
                      <span>{el.name}</span>
                    </button>
                  </div>
                ))
              : optionsWithDefault.map((el) => (
                  <div className="li" key={el.code}>
                    <button
                      disabled={disabled}
                      value={el.name}
                      className={el.code}
                      onClick={(event) => handleOptionSelect(event, el.code)}
                    >
                      <span>{el.name}</span>
                    </button>
                  </div>
                ))}
          </ScrollWrapper>
        </SelectOptionsList>
      )}
    </Component>
  );
}

const Component = styled.div<{
  $padding?: string;
  $margin?: string;
  disabled?: boolean;
}>`
  position: relative;
  padding: ${({ $padding }) => ($padding ? `${$padding};` : '0px')};
  margin: ${({ $margin }) => ($margin ? `${$margin};` : '0')};
  ${({ disabled }) => disabled && 'opacity: 0.5;'};
`;

const ScrollWrapper = styled.div<{ $heightScroll?: string }>`
  overflow-y: auto;
  width: 100%;
  border-radius: 5px;
  ${({ $heightScroll }) => ($heightScroll ? `height: ${$heightScroll}` : '')};
`;

const SelectOptionsList = styled.div<{
  $top?: string;
  $positionTop?: boolean;
  height?: string;
}>`
  padding-top: 5px;
  position: absolute;
  top: ${({ $top }) => ($top ? `${$top};` : '40px')};
  margin-bottom: ${({ height, $positionTop }) =>
    height && $positionTop ? `${height};` : '0px'};
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999999999999;
  width: 100%;
  height: 100%;

  ${({ $positionTop }) =>
    $positionTop
      ? `top: auto; bottom: 0; left: 0; right: 0; padding-bottom: 5px;padding-top: 0;height: fit-content;`
      : ''};

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
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.2;
      text-align: left;
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
