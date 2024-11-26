import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import styled from 'styled-components';

import { classificationInstance } from '../../../../api/axios';
import { useModal } from '../../../../hooks';
import { IdxNamePair, ItemCategoryType } from '../../../../types';
import { Button, IconButton, Select } from '../../../atom';
import { COLOR } from '../../../constants/COLOR';
import { CommonDate, Modal } from '../../../molecules';
import { SchoolInputModal } from '../SchoolInputModal';

import { OtionsSelect } from './OtionsSelect';

export function InputOptions({
  Item,
  listItem,
  onOptionChange,
  initList,
}: {
  Item: IdxNamePair;
  listItem: ItemCategoryType[];
  onOptionChange: React.Dispatch<
    React.SetStateAction<{
      titleIdx: string;
      name: string;
      value: string | number;
    }>
  >;
  initList?: any;
}) {
  const { openModal } = useModal();
  const [startDate, setStartDate] = useState<string>('');
  const [selected, setSelected] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [inputValue, setInputValue] = useState<string | number>('');
  const [schoolNameValue, setSchoolNameValue] = useState<{
    cityIdx: number;
    schoolName: string;
  }>({ cityIdx: 0, schoolName: '' });

  // 특정 키가 Item.name과 일치하는 값 찾기
  const initValue = useMemo(() => {
    if (initList && Item.name in initList) {
      return initList[Item.name];
    }
    return '';
  }, [initList, Item.name]);

  // initList에서 가져온 초기값으로 DOM 요소 상태 설정
  useEffect(() => {
    if (initValue) {
      switch (Item.inputType) {
        case 'INPUT':
          setInputValue(initValue);
          break;
        case 'DATEPICKER':
          setStartDate(initValue);
          break;
        case 'MODAL':
          setSchoolNameValue({ ...schoolNameValue, schoolName: initValue });
          break;
        case 'SELECT':
          setSelected(initValue);
          break;
        default:
          break;
      }
    }
  }, [initValue]);

  const modalData = {
    title: '',
    content: <SchoolInputModal setSchoolNameValue={setSchoolNameValue} />,
    callback: () => {},
  };

  // 모달 연뒤
  const openCreateModal = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    e.preventDefault();
    openModal(modalData);
  };

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent(value);
    onOptionChange({ titleIdx: Item.idx, name: Item.name, value });
  };

  useEffect(() => {
    console.log('titleIdx', Item.idx);
  }, [Item.idx]);
  useEffect(() => {}, [onOptionChange]);

  const schoolName = useMemo(() => {
    return schoolNameValue.schoolName !== ''
      ? schoolNameValue.schoolName
      : '학교명';
  }, [schoolNameValue]);

  useEffect(() => {
    onOptionChange({
      titleIdx: Item.idx,
      name: Item.name,
      value: schoolNameValue.schoolName,
    });
  }, [schoolNameValue]);

  useEffect(() => {
    onOptionChange({
      titleIdx: Item.idx,
      name: Item.name,
      value: startDate,
    });
  }, [startDate]);

  useEffect(() => {
    onOptionChange({
      titleIdx: Item.idx,
      name: Item.name,
      value: inputValue,
    });
  }, [inputValue]);

  // 셀렉트 api 호출
  // const getCategoryItems = async () => {
  //   const response = await classificationInstance.get(
  //     `/v1/category/${Item.idx}`,
  //   );
  //   return response.data.data.categoryClassList;
  // };
  // const { data: categoryItems, refetch: categoryItemsRefetch } = useQuery({
  //   queryKey: ['get-category-items', Item.idx],
  //   queryFn: getCategoryItems,
  //   meta: {
  //     errorMessage: 'get-category-items 에러 메세지',
  //   },
  // });

  useEffect(() => {
    // if (categoryItems) categoryItemsRefetch();
    console.log('넘어온 셀렉트 데이터', listItem);
    console.log('넘어온 데이터 타입', Item.inputType);
    console.log('넘어온 데이터 보이는여부', Item.viewList);
    console.log('넘어온 데이터 필수여부', Item.searchList);
  }, [listItem]);

  return (
    <OptionWrapper>
      <li>
        {Item?.inputType === 'INPUT' && (
          <InputWrappper>
            {Item.searchList && <span className="reddot">*</span>}
            {Item.viewList && (
              <input
                placeholder={`${Item.name}`}
                value={inputValue}
                onChange={(e) => {
                  const value = Item.name.includes('페이지')
                    ? Number(e.target.value)
                    : e.target.value;
                  setInputValue(value as number | string); // 숫자 또는 텍스트 값으로 처리
                }}
              />
            )}
          </InputWrappper>
        )}
      </li>
      <li>
        {Item?.inputType === 'DATEPICKER' && (
          <InputWrappper>
            {Item.searchList && <span className="reddot">*</span>}
            {Item.viewList && (
              <CommonDate
                setDate={setStartDate}
                $button={
                  <IconButton
                    width={'120px'}
                    height={'30px'}
                    fontSize={'14px'}
                    onClick={() => {}}
                  >
                    <span className="btn_title">
                      {startDate === '' ? `기출일시` : `${startDate}`}
                    </span>
                    <GrPlan />
                  </IconButton>
                }
              />
            )}
          </InputWrappper>
        )}
      </li>
      <li>
        {Item?.inputType === 'MODAL' && (
          <InputWrappper>
            {Item.searchList && <span className="reddot">*</span>}
            {Item.viewList && (
              <input
                className="modal_input"
                readOnly
                placeholder={`${Item.name}`}
                onClick={(e) => openCreateModal(e)}
                value={schoolName}
              />
            )}
          </InputWrappper>
        )}
      </li>
      <li>
        {listItem && Item?.inputType === 'SELECT' && (
          <InputWrappper>
            {Item.searchList && <span className="reddot">*</span>}
            {Item.viewList && (
              <OtionsSelect
                width={'115px'}
                height={'30px'}
                defaultValue={Item.name}
                key={Item.name}
                options={listItem}
                onSelect={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => selectCategoryOption(event)}
                $positionTop
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </InputWrappper>
        )}
      </li>
    </OptionWrapper>
  );
}

const OptionWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;

  input {
    height: 30px;
    padding: 10px;
    width: 120px;
    border: 1px solid ${COLOR.BORDER_GRAY};
    border-radius: 5px;
    text-overflow: ellipsis;

    &.modal_input {
      border: 1px solid ${COLOR.PRIMARY};
      cursor: pointer;
    }
  }
`;

const InputWrappper = styled.div`
  display: flex;
  .reddot {
    margin: 0 5px;
    color: ${COLOR.ALERTBAR_ERROR};
  }
`;
