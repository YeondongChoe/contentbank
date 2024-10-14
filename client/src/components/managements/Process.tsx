import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { BiSolidTrashAlt } from 'react-icons/bi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { COLOR } from '../../components/constants';
import { AlertBar, Button, Loader, Input } from '../atom';
import { TabMenu } from '../molecules';

export function Process() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  //프로세스명
  const [nameValue, setNameValue] = useState('');
  /* 안내 알럿 */
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  /*  모달 열기 */
  const openCreateModal = () => {
    // openModal({
    //   title: '',
    //   content: <RegisterModal memberList={totalMemberList} refetch={refetch} />,
    // });
  };

  // 탭메뉴 클릭시
  const changeTab = () => {};

  // 배경 클릭시 체크리스트 초기화
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target?.toString().includes('Div')) {
        //console.log('background div');
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  return (
    <Container ref={backgroundRef}>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'아이디가 생성 되었습니다.'}
      ></AlertBar>
      <TitleWrapper>
        <Title>프로세스 관리</Title>
        <Button
          height={'35px'}
          width={'150px'}
          onClick={openCreateModal}
          fontSize="13px"
          $filled
          cursor
        >
          신규 프로세스 추가
        </Button>
      </TitleWrapper>
      <ProcessMainWrapper>
        <ProcessListWrapper>
          <ScrollWrapper>
            <PerfectScrollbar>
              <SubTitle>
                프로세스 리스트
                <span className="sub">콘텐츠 제작 프로세스를 관리합니다.</span>
                <span className="sub">
                  작업자를 지정하여 제작 단계를 설정합니다.
                </span>
              </SubTitle>
              <ProcessListBox>
                <ProcessWrapper>
                  <ProcessName
                    onClick={() => {
                      //clickCategoryInfo(el.idx);
                    }}
                  >
                    <span className="ellipsis">수학알바1</span>
                  </ProcessName>
                  <DeleteIconWrapper>
                    <BiSolidTrashAlt
                      onClick={() => {
                        //clickDeleteCompany();
                        //삭제할 카테고리 idx값 관리
                        //setCategoryIdx(el.idx);
                      }}
                    />
                  </DeleteIconWrapper>
                </ProcessWrapper>
                {/*  */}
                {/* {isCategoryLoading && <Loader />} */}
              </ProcessListBox>
            </PerfectScrollbar>
          </ScrollWrapper>
        </ProcessListWrapper>

        {/* TODO : 데이터 연결후 로딩 처리 */}
        {/* {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )} */}
        {/* {!isLoading && memberListData && ( */}
        <></>
        {/* )} */}
        {/* 프로세스 관리 */}
        <ProcessManageWrapper>
          <SubTitle>프로세스 관리</SubTitle>
          <Input
            width="500px"
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="프로세스명을 입력해주세요"
            borderradius="5px"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            maxLength={20}
          />
        </ProcessManageWrapper>
      </ProcessMainWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  width: 100%;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
const ProcessMainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProcessListWrapper = styled.div`
  display: flex;
  width: calc(40% - 20px);
`;
const ScrollWrapper = styled.div`
  width: calc(100% - 20px);
  height: 630px;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const SubTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
  padding: 0 20px;
  margin-top: 15px;
  display: inline-block;

  .sub {
    width: 100%;
    display: block;
    font-size: 12px;
    font-weight: 400;
    color: ${COLOR.FONT_GRAY};
  }
`;
const ProcessListBox = styled.div`
  width: 100%;
  height: fit-content;
  /* border-left: 1px solid ${COLOR.SECONDARY}; */
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;
const ProcessWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 0 10px;
`;
const ProcessName = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  padding-right: 50px;
  border-radius: 5px;
  background-color: white;
  border: none;
  margin-right: 8px;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  font-size: 14px;

  &:hover {
    background-color: ${COLOR.SELECT_BLUE};
    color: white;
  }
  > span {
    display: flex;
    text-align: left;
    width: 100%;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const DeleteIconWrapper = styled.button`
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${COLOR.FONT_BLACK};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  color: #fff;
  /* background-color: transparent; */
  &:hover {
    background: ${COLOR.RED};
  }
`;
const ProcessManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
