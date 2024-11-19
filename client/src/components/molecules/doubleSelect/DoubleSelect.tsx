import React, { useState, useEffect } from 'react';

import { IoMdArrowDropdown } from 'react-icons/io';
import { styled } from 'styled-components';

import { IconButton } from '../../../components/atom';
import { COLOR } from '../../constants';

type ItemSelectProps = {
  code: string;
  name: string;
};

type DoubleSelectProps = {
  industryList: ItemSelectProps[];
  industryDetailList: ItemSelectProps[];
  industryValue: string;
  detailVaule: string;
  idxValue: string;
  industryCoadValue: React.Dispatch<React.SetStateAction<string | null>>;
  detailCoadValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export function DoubleSelect({
  industryList,
  industryDetailList,
  industryValue,
  detailVaule,
  idxValue,
  industryCoadValue,
  detailCoadValue,
}: DoubleSelectProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  console.log(industryValue);
  console.log(detailVaule);
  useEffect(() => {
    if (industryValue === null) {
      setSelectedIndustry(null);
    } else {
      setSelectedIndustry(industryValue);
    }
  }, [industryValue]);

  useEffect(() => {
    if (detailVaule === null) {
      setSelectedDetail(null);
    } else {
      setSelectedDetail(detailVaule);
    }
  }, [detailVaule]);

  const handelOnChangeIndustry = (value: string, code: string) => {
    setSelectedIndustry(value);
    industryCoadValue(code);
    setSelectedDetail('');
    detailCoadValue(null);
  };
  const handelOnChangeDetail = (value: string, code: string) => {
    setSelectedDetail(value);
    detailCoadValue(code);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {/* 업태 Select */}
      <Select
        options={industryList}
        selectedValue={selectedIndustry}
        onChange={(value, code) =>
          handelOnChangeIndustry(value as string, code as string)
        }
        placeholder="업태"
      />
      {/* 종목 Select */}
      <Select
        options={industryDetailList}
        selectedValue={selectedDetail}
        onChange={(value, code) =>
          handelOnChangeDetail(value as string, code as string)
        }
        placeholder="종목"
        disabled={!selectedIndustry} // 업태 선택 전 비활성화
      />
    </div>
  );
}

type SelectProps = {
  options: ItemSelectProps[];
  selectedValue: string | null;
  onChange: (value: string | null, coad: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
};

function Select({
  options,
  selectedValue,
  onChange,
  placeholder = 'Select',
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string | null, code: string | null) => {
    onChange(value, code);
    setIsOpen(false);
  };

  return (
    <Component
      $disabled={disabled}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
      onClick={() => !disabled && setIsOpen((prev) => !prev)}
    >
      {/* Selected Value */}
      <SelectedValue $disabled={disabled}>
        <span>{selectedValue || placeholder}</span>
        <IoMdArrowDropdown size={20}></IoMdArrowDropdown>
      </SelectedValue>

      {/* Dropdown List */}
      {isOpen && (
        <SelectOptionListWrapper>
          {options.map((option) => (
            <SelectOptionList
              key={option.code}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option.name, option.code);
              }}
            >
              {option.name}
            </SelectOptionList>
          ))}
        </SelectOptionListWrapper>
      )}
    </Component>
  );
}

const Component = styled.div<{ $disabled: boolean }>`
  position: relative;
  width: 240px;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
`;

const SelectedValue = styled.div<{ $disabled: boolean }>`
  padding: 6px;
  height: 35px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  font-size: 14px;
  background-color: ${({ $disabled }) => ($disabled ? '#f5f5f5' : '#fff')};
  display: flex;
  justify-content: space-between;
  border-radius: 5px;

  span {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    border-color: ${({ $disabled }) =>
      $disabled ? `${COLOR.BORDER_GRAY}` : `${COLOR.PRIMARY}`};
  }
`;
const SelectOptionListWrapper = styled.ul`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  max-height: 250px; // 드롭다운 높이 제한
  overflow-y: auto;
  border: 1px solid ${COLOR.BORDER_GRAY};
  background-color: #fff;
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: 10;
`;
const SelectOptionList = styled.li`
  padding: 10px;
  border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
  cursor: 'pointer';
  height: 40px; // 개별 항목 높이 지정
  display: flex;
  align-items: center;
  font-size: 14px;

  &:hover {
    background-color: ${COLOR.HOVER};
  }
`;
