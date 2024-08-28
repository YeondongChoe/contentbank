import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { COLOR } from '../../../components/constants';
import { Button, Loader, ValueNone } from '../../atom';

export function GroupManagement() {
  /*  모달 열기 */
  const openCreateModal = () => {
    // openModal({
    //   title: '',
    //   content: <RegisterModal memberList={totalMemberList} refetch={refetch} />,
    // });
  };
  return (
    <>
      <SubTitle className="center">
        <span>
          그룹 리스트
          <span>
            카테고리를 그룹화하여 화면 노출 여부를 설정할 수 있습니다.
          </span>
        </span>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={openCreateModal}
          fontSize="13px"
          $filled
          cursor
        >
          그룹 생성
        </Button>
      </SubTitle>

      <ScrollWrapper>
        <PerfectScrollbar></PerfectScrollbar>
      </ScrollWrapper>
    </>
  );
}

const SubTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  padding-top: 10px;

  &.center {
    padding: 10px 0;
    width: 100%;
    justify-content: center;
  }
`;

const ScrollWrapper = styled.div`
  width: calc(100% - 20px);
  height: 580px;
  background-color: ${COLOR.LIGHT_GRAY};
`;
