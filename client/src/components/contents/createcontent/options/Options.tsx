import * as React from 'react';

import styled from 'styled-components';

import { Button, Select } from '../../../../components/atom';
import { useModal } from '../../../../hooks';
import { COLOR } from '../../../constants/COLOR';
import { SchoolInputModal } from '../SchoolInputModal';

import { OptionsdepthProps, OptionsItemProps } from './OtionsSelect';

export function Options({ listItem }: { listItem: OptionsItemProps }) {
  const { openModal } = useModal();
  const modalData = {
    title: '',
    content: <SchoolInputModal />,
    callback: () => {},
  };

  // 모달 연뒤
  const openCreateModal = () => {
    openModal(modalData);
  };

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    // setContent((prevContent) => [...prevContent, value]);
  };

  return (
    <OptionWrapper>
      <li>
        {listItem?.type === 'input' && (
          <input placeholder={`${listItem.label}`} />
        )}
      </li>
      <li>
        {listItem?.type === 'datepickup' && (
          <Button
            width="90px"
            height="30px"
            fontSize="13px"
            $normal
            onClick={() => {}}
            cursor
          >
            기출일시
          </Button>
        )}
      </li>
      <li>
        {listItem?.type === 'modal' && (
          <Button
            width="90px"
            height="30px"
            fontSize="13px"
            $normal
            onClick={() => openCreateModal()}
            cursor
          >
            {listItem.label}
          </Button>
        )}
      </li>
      <li>
        {listItem?.type === 'select' && (
          <Select
            width={'110px'}
            height={'30px'}
            defaultValue={listItem.label}
            key={listItem.label}
            options={listItem.options as OptionsdepthProps[]}
            onSelect={(event) => selectCategoryOption(event)}
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
  }
`;
