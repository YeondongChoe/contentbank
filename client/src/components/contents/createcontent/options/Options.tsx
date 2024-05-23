import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { GrPlan } from 'react-icons/gr';
import styled from 'styled-components';

import { classificationInstance } from '../../../../api/axios';
import { Button, IconButton, Select } from '../../../../components/atom';
import { CommonDate, Modal } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';
import { ItemCategoryType } from '../../../../types';
import { COLOR } from '../../../constants/COLOR';
import { SchoolInputModal } from '../SchoolInputModal';

import { OtionsSelect } from './OtionsSelect';

export function Options({ listItem }: { listItem: ItemCategoryType }) {
  const { openModal } = useModal();
  const [startDate, setStartDate] = useState<string>('');
  const [schoolNameValue, setSchoolNameValue] = useState('');
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

    // setContent((prevContent) => [...prevContent, value]);
  };

  const schoolName = useMemo(() => {
    if (schoolNameValue !== '') {
      return schoolNameValue;
    } else {
      return '학교명';
    }
  }, [schoolNameValue]);

  // 셀렉트 api 호출
  const getCategoryItems = async () => {
    const response = await classificationInstance.get(
      `/v1/category/${listItem.idx}`,
    );
    return response.data.data.categoryClassList;
  };
  const { data: categoryItems, refetch: categoryItemsRefetch } = useQuery({
    queryKey: ['get-category-items', listItem.idx],
    queryFn: getCategoryItems,
    meta: {
      errorMessage: 'get-category-items 에러 메세지',
    },
  });

  useEffect(() => {
    console.log('listItem-----------', listItem.idx);
    if (categoryItems) categoryItemsRefetch();
  }, [listItem]);
  console.log('categoryItems-----------', categoryItems);

  return (
    <OptionWrapper>
      <li>
        {listItem?.type === 'INPUT' && (
          <input placeholder={`${listItem.name}`} />
        )}
      </li>
      <li>
        {listItem?.type === 'DATEPICKER' && (
          <CommonDate
            setDate={setStartDate}
            $button={
              <IconButton
                width={'130px'}
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
      </li>
      <li>
        {listItem?.type === 'MODAL' && (
          <input
            className="modal_input"
            readOnly
            placeholder={`${listItem.name}`}
            onClick={(e) => openCreateModal(e)}
            value={schoolName}
          />
        )}
      </li>
      <li>
        {categoryItems && listItem?.type === 'SELECT' && (
          <OtionsSelect
            width={'115px'}
            height={'30px'}
            defaultValue={listItem.name}
            key={listItem.name}
            options={categoryItems}
            onSelect={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => selectCategoryOption(event)}
            $positionTop
            selected={''}
            setSelected={() => {}}
          />
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
