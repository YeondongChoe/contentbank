import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { Modal } from '../../../components';
import { useModal } from '../../../hooks';
import { AlertBar, Button, Loader, Input, ValueNone } from '../../atom';
import { COLOR } from '../../constants';

import { ProcessAddModal, ProcessEditModal } from './modal';

export function Process() {
  const DummyData = [
    {
      title: '제작',
      type: '등록/수정/조회',
      card: [{ name: '홍길동', id: 'admin1', authority: 'ADMIN' }],
    },
    {
      title: '검수',
      type: '조회',
      card: [
        { name: '김명구', id: 'moung9', authority: 'ADMIN' },
        { name: '홍상원', id: 'hong31', authority: 'ADMIN' },
        { name: '정도전', id: 'challengeJ', authority: 'ADMIN' },
      ],
    },
    {
      title: '편집',
      type: '수정/조회',
      card: [{ name: '이순진', id: 'soon2', authority: 'ADMIN' }],
    },
    {
      title: '검수',
      type: '조회',
      card: [],
    },
    // {
    //   title: '검수',
    //   type: '조회',
    // },
    // {
    //   title: '검수',
    //   type: '조회',
    // },
  ];
  // const backgroundRef = useRef<HTMLDivElement>(null);
  const [processList, setProcessList] = useState(DummyData);
  //프로세스명
  const [nameValue, setNameValue] = useState('');
  /* 안내 알럿 */
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };
  const { openModal } = useModal();

  const openCreateGroupModal = () => {
    openModal({
      title: '',
      content: <ProcessEditModal processListData={processList} />,
    });
  };

  const openSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.add('show');
  };
  const closeSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.remove('show');
  };

  const deleteCard = (id: string) => {
    setProcessList((prev) =>
      prev.map((list) => {
        return {
          ...list,
          card: list.card.filter((el) => el.id !== id),
        };
      }),
    );
  };

  /*  모달 열기 */
  const openAddModal = () => {
    openModal({
      title: '',
      content: <ProcessAddModal />,
    });
  };

  // 배경 클릭시 체크리스트 초기화
  // useEffect(() => {
  //   const handleClick = (e: MouseEvent) => {
  //     if (e.target?.toString().includes('Div')) {
  //       //console.log('background div');
  //     }
  //   };
  //   window.addEventListener('click', handleClick);
  //   return () => window.removeEventListener('click', handleClick);
  // }, [backgroundRef]);

  return (
    <Container>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'아이디가 생성 되었습니다.'}
      ></AlertBar>
      <Title>프로세스 관리</Title>
      <ProcessMainWrapper>
        <ProcessListWrapper>
          <ScrollWrapper>
            <PerfectScrollbar>
              <ListTitle>
                프로세스 리스트
                <span className="sub">콘텐츠 제작 프로세스를 관리합니다.</span>
                <span className="sub">
                  작업자를 지정하여 제작 단계를 설정합니다.
                </span>
              </ListTitle>
              {/* 데이터 들어올때 map으로 변경 */}
              <ProcessListBox>
                <ProcessList>
                  <ProcessWrapper>
                    <ProcessName
                      $isSelected={true}
                      onClick={() => {
                        //clickCategoryInfo(el.idx);
                      }}
                    >
                      <div className="title">수학알바1</div>
                    </ProcessName>
                  </ProcessWrapper>
                  <DeleteIconWrapper>
                    <BiSolidTrashAlt
                      onClick={() => {
                        //clickDeleteCompany();
                        //삭제할 카테고리 idx값 관리
                        //setCategoryIdx(el.idx);
                      }}
                    />
                  </DeleteIconWrapper>
                </ProcessList>
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
          <InfoTitleWrapper>
            <InfoTitle>프로세스 관리</InfoTitle>
            <Button
              height={'35px'}
              width={'150px'}
              //onClick={openCreateModal}
              fontSize="13px"
              $filled
              cursor
            >
              신규 프로세스 추가
            </Button>
          </InfoTitleWrapper>
          <Input
            width={`calc(100% - 40px)`}
            height="35px"
            padding="10px"
            margin="0 20px"
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
          <ProcessCardList>
            {processList.map((list, i) => {
              return (
                <ProcessCardWrapper key={i}>
                  <CardTitleWrapper>
                    <CardTitle>{list.title}</CardTitle>
                    <ProcessType>{list.type}</ProcessType>
                  </CardTitleWrapper>
                  {list.card.map((card, i) => (
                    <>
                      <ProcessCard key={i}>
                        <CradInfo>
                          <span className="name">
                            {card.name}({card.id})
                          </span>
                          <span className="authority">{card.authority}</span>
                        </CradInfo>
                        <SettingButton
                          type="button"
                          onClick={(e) => openSettingList(e)}
                          onMouseLeave={(e) => closeSettingList(e)}
                        >
                          <SlOptionsVertical
                            style={{ fontSize: '14px', cursor: 'pointer' }}
                          />
                          <SettingList>
                            <li>
                              <button
                                type="button"
                                onClick={(e) => {
                                  deleteCard(card.id);
                                }}
                              >
                                삭제
                              </button>
                            </li>
                          </SettingList>
                        </SettingButton>
                      </ProcessCard>
                    </>
                  ))}
                  <IncreaseBox onClick={openAddModal}>+</IncreaseBox>
                </ProcessCardWrapper>
              );
            })}
          </ProcessCardList>
          <ButtonWrapper>
            <Button
              height={'35px'}
              width={'120px'}
              onClick={openCreateGroupModal}
              fontSize="13px"
              cursor
            >
              단계 수정
            </Button>
            <Button
              height={'35px'}
              width={'120px'}
              //onClick={openCreateModal}
              fontSize="13px"
              $filled
              cursor
            >
              저장
            </Button>
          </ButtonWrapper>
        </ProcessManageWrapper>
      </ProcessMainWrapper>
      <Modal />
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  width: 100%;
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
  min-width: 430px;
  //width: calc(40% - 20px);
`;
const ScrollWrapper = styled.div`
  width: calc(100% - 20px);
  height: 630px;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const ListTitle = styled.span`
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
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;
const ProcessList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProcessWrapper = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-right: 8px;
  margin-bottom: 5px;
  background-color: white;
  border-radius: 5px;
`;
const ProcessName = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  ${({ $isSelected }) =>
    $isSelected
      ? `color: ${COLOR.PRIMARY}; border: 1px solid ${COLOR.PRIMARY};`
      : 'none'};

  .title {
    display: flex;
    justify-content: center;
  }

  &:hover {
    background-color: ${COLOR.SELECT_BLUE};
    color: white;
    border-radius: 5px;
  }
  /* .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  } */
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
const InfoTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const InfoTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
const ProcessCardList = styled.li`
  max-width: 1000px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  //white-space: nowrap;
`;
const ProcessCardWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  min-width: 230px;
  height: 450px;
`;
const CardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;
const CardTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 12px;
`;
const ProcessType = styled.span`
  font-weight: bold;
  color: ${COLOR.PRIMARY};
  font-size: 12px;
`;
const ProcessCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${COLOR.BORDER_GRAY};
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
`;
const CradInfo = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-weight: bold;
    font-size: 14px;
  }
  .authority {
    font-size: 12px;
    color: ${COLOR.FONT_GRAY};
  }
`;
const IncreaseBox = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted ${COLOR.FONT_GRAY};
  color: ${COLOR.FONT_GRAY};
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
const SettingButton = styled.button`
  position: relative;
  padding: 5px;
  margin: -5px;
  border: none;
  background-color: white;
  color: black;
`;

const SettingList = styled.ul`
  padding-left: 0;
  display: none;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid ${COLOR.SECONDARY};
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;

  &.show {
    display: block;
  }

  li {
    padding-left: 0;
    width: 70px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      font-size: 12px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: ${COLOR.GRAY};
      transition: all 0.1s;
      z-index: 2;
      border: none;

      &:hover {
        background-color: ${COLOR.HOVER};
        color: ${COLOR.ERROR};
      }
    }
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 5px 20px;
`;
