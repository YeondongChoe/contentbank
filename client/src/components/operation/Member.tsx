import * as React from 'react';
import { useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getMemberList } from '../../api/getAxios';
import { Button } from '../../components/atom';
import { COLOR } from '../constants/COLOR';
import { Search } from '../../components/molecules';
import { registerBoolAtom, editerBoolAtom } from '../../state/memberAtom';
import { pageAtom, totalPageAtom } from '../../state/utilAtom';
import { EditPopup } from '../member/EditPopup';
import { RegisterPopup } from '../member/RegisterPopup';
import { MemberTable } from '../tableWrap/MemberTable';

type memberListProps = {
  seq: number;
  authority: {
    seq: number;
    code: string;
    name: string;
    sort: number;
  };
  name: string;
  key: string;
  id: string;
  comment: null;
  createdBy: null;
  createdDate: string;
  lastModifiedBy: null;
  lastModifiedDate: string;
  enabled: boolean;
};

export function Member() {
  const [isRegister, SetIsRegister] = useRecoilState(registerBoolAtom);
  const isEditer = useRecoilValue(editerBoolAtom);
  const [memberList, setMemberList] = useState<memberListProps[]>([]);
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 8;

  const [searchValue, setSearchValue] = useState<string>('');

  const filterSearchValue = () => {
    getMemberList({
      setMemberList,
      settotalPage,
      searchValue,
      page,
      size,
    });
    setSearchValue('');
  };

  const openRegisterPopup = () => {
    SetIsRegister(true);
    setSearchValue('');
  };

  return (
    <Container>
      <Wrapper>
        <Search
          value={searchValue}
          width={'250px'}
          onClick={() => filterSearchValue()}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="이름, 권한 검색"
        />
        <Button
          buttonType="button"
          onClick={openRegisterPopup}
          height={'35px'}
          width={'150px'}
          $margin={'0 0 0 10px'}
        >
          <span>아이디만들기</span>
        </Button>
      </Wrapper>
      <ContentWrapper>
        <MemberTable searchMemberList={memberList} />
      </ContentWrapper>
      {isRegister ? <RegisterPopup /> : ''}
      {isEditer ? <EditPopup /> : ''}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 40px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const ContentWrapper = styled.div`
  border-top: 1px solid ${COLOR.BORDER_BLUE};
`;
