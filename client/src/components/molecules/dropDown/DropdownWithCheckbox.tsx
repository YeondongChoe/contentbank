import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

export function DropdownWithCheckbox({
  width = '200px',
  options,
  selectedList,
}: {
  width?: string;
  options: string[];
  selectedList: (selectedItems: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 검색 입력값을 기준으로 리스트 필터링
    if (searchTerm === '') {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option: string) =>
          option.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
  }, [searchTerm, options]);

  useEffect(() => {
    // 외부 클릭 감지 이벤트 핸들러
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    // 전역 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleCheckboxChange = (option: string) => {
    const updatedSelectedItems = selectedItems.includes(option)
      ? selectedItems.filter((item) => item !== option)
      : [...selectedItems, option];

    setSelectedItems(updatedSelectedItems); // 내부 상태 업데이트
    selectedList(updatedSelectedItems); // 부모로 상태 전달
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Container className="dropdown" ref={dropdownRef} width={width}>
      <div className="dropdown_input">
        <InputWrapper>
          <input
            type="text"
            placeholder={
              selectedItems.length > 0
                ? selectedItems.join(', ')
                : '선택해주세요'
            }
            value={searchTerm}
            onChange={(e) => handleInputChange(e)}
            onClick={(e) => toggleDropdown(e)}
          />
          <TriangleIcon isOpen={isOpen} />
        </InputWrapper>
      </div>

      {isOpen && (
        <ScrollWrapper>
          <PerfectScrollbar>
            <ul className="dropdown_list">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    className={`dropdown_item ${
                      selectedItems.includes(option) ? 'selected' : ''
                    }`}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      {option}
                    </label>
                  </li>
                ))
              ) : (
                <li className="dropdown_item">No matching options</li>
              )}
            </ul>
          </PerfectScrollbar>
        </ScrollWrapper>
      )}
    </Container>
  );
}

const ScrollWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  overflow-y: auto;
  max-height: 200px;
  height: calc(100vh - 280px);
  width: 100%;
  border: 1px solid #ccc;
  background-color: white;
  z-index: 1;

  .dropdown_list input {
    margin-right: 5px;
  }

  .dropdown_item {
    padding: 8px;
    cursor: pointer;
  }

  .dropdown_item.selected {
    background-color: #e0e0e0;
  }
`;

const Container = styled.div<{ width: string }>`
  &.dropdown {
    position: relative;
    width: 200px;
    width: ${({ width }) => width};
  }

  .dropdown_input {
    display: flex;
    align-items: center;
  }
`;

const TriangleIcon = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 10px;
  width: 0;
  height: 0;
  margin-left: 8px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #000;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.1s ease-in-out;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    width: 100%;
    padding: 8px;
    padding-right: 28px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.23);
  }
`;
