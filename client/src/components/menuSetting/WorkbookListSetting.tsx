import * as React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';

import { BsArrowsMove, BsEyeSlash, BsEye } from 'react-icons/bs';
import { LuFileSearch2 } from 'react-icons/lu';
import { SlOptionsVertical } from 'react-icons/sl';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import styled from 'styled-components';

import { List, ListItem, Icon, CheckBoxI, Label, Button, Select } from '..';
import { ItemCategoryType, QuizListType, WorksheetListType } from '../../types';
import { COLOR } from '../constants';
import { SettingDnDWrapper } from '../molecules';

type CategoryDummyType = {
  idx: number;
  title: string;
  isFilter: boolean;
  isDisplay: boolean;
};

export function WorkbookListSetting() {
  const WorkbookListData: WorksheetListType[] = [
    {
      code: '1',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '중1',
      idx: 1,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 1,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '연습문제',
      userKey: '',
    },
    {
      code: '2',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '성인',
      idx: 2,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 1,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '내신대비',
      userKey: '',
    },
    {
      code: '3',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '고1',
      idx: 3,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 3,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '연습문제',
      userKey: '',
    },
    {
      code: '4',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '초3',
      idx: 4,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 4,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '모의고사',
      userKey: '',
    },
    {
      code: '5',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '성인',
      idx: 5,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 5,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '연습문제',
      userKey: '',
    },
    {
      code: '6',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '고1',
      idx: 6,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 6,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '일일TEST',
      userKey: '',
    },
    {
      code: '7',
      createdAt: '2024-04-01',
      createdBy: '',
      examiner: '홍길동',
      grade: '고1',
      idx: 7,
      isAutoGrade: true,
      isDelete: false,
      isFavorite: false,
      isUse: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '.pdf',
        idx: 7,
        originalName: '',
        storedPath: '/usr/share/nginx/html/CB',
        type: 'PDF',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      name: '드림원학원 내신대비 TEST',
      quizCnt: 0,
      tag: '연습문제',
      userKey: '',
    },
  ];
  const CategoryDummy: CategoryDummyType[] = [
    {
      idx: 1,
      title: '대상학년',
      isFilter: false,
      isDisplay: true,
    },
    {
      idx: 2,
      title: '태그',
      isFilter: true,
      isDisplay: true,
    },
    {
      idx: 3,
      title: '학습지명',
      isFilter: true,
      isDisplay: true,
    },
    {
      idx: 4,
      title: '등록일',
      isFilter: true,
      isDisplay: true,
    },
    {
      idx: 5,
      title: '작성자',
      isFilter: false,
      isDisplay: true,
    },
  ];
  const [categoryList, setCategoryList] = useState<any[]>(CategoryDummy);
  const [isStartDnD, setIsStartDnd] = useState(false);

  const whenDragEnd = (newList: any[]) => {
    setCategoryList(newList);
  };
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>학습지 리스트</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <>
              <Label value={'설정'} width="100%" bold fontSize="20px" />
              <PageDescription>
                리스트에 노출되는 필터의 순서를 변경합니다.
              </PageDescription>
              <CategoryWrapper>
                <Label
                  value={'카테고리'}
                  width="100%"
                  bold
                  fontSize="14px"
                  padding="10px 0 10px 5px"
                />
                <IconWrapper>
                  <TbFilter
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      stroke: `${COLOR.PRIMARY}`,
                    }}
                  ></TbFilter>
                  <PageDescription>검색사용</PageDescription>
                  <BsEye
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      fill: `${COLOR.PRIMARY}`,
                    }}
                  ></BsEye>
                  <PageDescription>목록노출</PageDescription>
                </IconWrapper>
              </CategoryWrapper>
              <ContentListWrapper>
                <SettingDnDWrapper
                  dragList={categoryList}
                  onDragging={() => {}}
                  onDragEnd={whenDragEnd}
                  dragSectionName={'문항리스트세팅'}
                  isStartDnD={isStartDnD}
                  setIsStartDnd={setIsStartDnd}
                >
                  {(dragItem, ref, isDragging, itemIndex) => {
                    // dragItem과 그 속성들을 안전하게 접근하기 위해 옵셔널 체이닝 사용
                    return (
                      <ContentList ref={ref}>
                        <Content>
                          <div className="icon">
                            <BsArrowsMove
                              style={{
                                width: '20px',
                                height: '20px',
                                cursor: 'grab',
                              }}
                            ></BsArrowsMove>
                          </div>
                          <div className={`title-${dragItem.isDisplay}`}>
                            {dragItem.title}
                            <div className="tag">{dragItem.tag}</div>
                          </div>
                          {dragItem.isFilter ? (
                            <div className="icon">
                              <TbFilter
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                  stroke: `${COLOR.PRIMARY}`,
                                }}
                                onClick={() => {
                                  setCategoryList((prevState) =>
                                    prevState.map((category) => {
                                      // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                      if (dragItem.title === category.title) {
                                        return {
                                          ...category,
                                          isFilter: !category.isFilter, // 해당 옵션의 isFilter만 토글
                                        };
                                      }
                                      return category; // 나머지 옵션은 그대로 유지
                                    }),
                                  );
                                }}
                              ></TbFilter>
                            </div>
                          ) : (
                            <div className="icon">
                              <TbFilterOff
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                  stroke: `${COLOR.MUTE}`,
                                }}
                                onClick={() => {
                                  setCategoryList((prevState) =>
                                    prevState.map((category) => {
                                      // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                      if (dragItem.title === category.title) {
                                        return {
                                          ...category,
                                          isFilter: !category.isFilter, // 해당 옵션의 isFilter만 토글
                                        };
                                      }
                                      return category; // 나머지 옵션은 그대로 유지
                                    }),
                                  );
                                }}
                              ></TbFilterOff>
                            </div>
                          )}
                          {dragItem.isDisplay ? (
                            <div className="icon">
                              <BsEye
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                  fill: `${COLOR.PRIMARY}`,
                                }}
                                onClick={() => {
                                  setCategoryList((prevState) =>
                                    prevState.map((category) => {
                                      // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                      if (dragItem.title === category.title) {
                                        return {
                                          ...category,
                                          isDisplay: !category.isDisplay, // 해당 옵션의 isFilter만 토글
                                        };
                                      }
                                      return category; // 나머지 옵션은 그대로 유지
                                    }),
                                  );
                                }}
                              ></BsEye>
                            </div>
                          ) : (
                            <div className="icon">
                              <BsEyeSlash
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                  fill: `${COLOR.MUTE}`,
                                }}
                                onClick={() => {
                                  setCategoryList((prevState) =>
                                    prevState.map((category) => {
                                      // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                      if (dragItem.title === category.title) {
                                        return {
                                          ...category,
                                          isDisplay: !category.isDisplay, // 해당 옵션의 isFilter만 토글
                                        };
                                      }
                                      return category; // 나머지 옵션은 그대로 유지
                                    }),
                                  );
                                }}
                              ></BsEyeSlash>
                            </div>
                          )}
                        </Content>
                      </ContentList>
                    );
                  }}
                </SettingDnDWrapper>
              </ContentListWrapper>
              <ButtonWrapper>
                <Button
                  height={'40px'}
                  width={'100%'}
                  //onClick={openWindowCreateWorksheet}
                  fontSize="13px"
                  $margin="20px 0 0 0"
                  $filled
                  cursor
                >
                  변경사항 저장
                </Button>
              </ButtonWrapper>
            </>
          </SettingWrapper>
          <ListWrapper>
            <SelectWrapper>
              {categoryList.map((category) => {
                if (category.isFilter) {
                  return (
                    <Select
                      width={'130px'}
                      defaultValue={category.title}
                      key={category.title}
                      isnormalizedOptions
                      //options={category.option}
                    />
                  );
                }
                return null; // displayedList가 false인 항목은 렌더링하지 않음
              })}
            </SelectWrapper>
            <List>
              {WorkbookListData.map((item: any) => (
                <ListItem key={item.code} isChecked={false} height={'100'}>
                  <ItemLayout>
                    <CheckBoxI
                      id={item.code}
                      value={item.idx}
                      $margin={`0 5px 0 0`}
                      readOnly
                    />
                    <Icon
                      width={`18px`}
                      $margin={'0 0 0 12px'}
                      src={`/images/icon/favorites_off_B.svg`}
                    />
                    <i className="line"></i>
                    <span>
                      <strong className="title">대상학년</strong>
                      <span className="width_20">{item.grade}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">태그</strong>
                      <span className="width_20">{item.tag}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">학습지명</strong>
                      <span className="width_20">{item.name}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">등록일</strong>
                      <span className="width_20">{item.createdAt}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">작성자</strong>
                      <span className="width_20">{item.examiner}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">미리보기</strong>
                      <span className="width_20">
                        <LuFileSearch2
                          style={{ fontSize: '22px', cursor: 'pointer' }}
                        />
                      </span>
                    </span>
                    <i className="line"></i>
                    <span className="width_5 tooltip_wrapper ">
                      <strong className="title">설정</strong>
                      <span className="width_20">
                        <SlOptionsVertical
                          style={{ fontSize: '16px', cursor: 'pointer' }}
                        />
                      </span>
                    </span>
                  </ItemLayout>
                </ListItem>
              ))}
            </List>
            <ListDescription>
              화면에 보이는 데이터는 예시로 구성된 데이터 입니다. 실제
              화면에서는 적용된 데이터로 확인하실 수 있습니다.
            </ListDescription>
          </ListWrapper>
        </MainWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 40px 40px 40px;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 30px;
  //font-weight: 800;
`;
const MainWrapper = styled.div`
  width: 100%;
  //height: 760px;
  display: flex;
  gap: 10px;
`;
const SettingWrapper = styled.div`
  width: 30%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 15px;
  padding: 10px;
`;
const PageDescription = styled.p`
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  font-weight: bold;
`;
const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  p {
    padding-right: 5px;
  }
`;
const ContentListWrapper = styled.div`
  max-height: 530px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤바 표시 */
`;
const ContentList = styled.li`
  padding: 0 10px;
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  &:last-child {
    border-bottom: 1px solid ${COLOR.BORDER_GRAY};
  }
`;
const Content = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding: 10px 0;
  .title-true {
    display: flex;
    justify-content: flex-start;
    width: 70%;
  }
  .title-false {
    display: flex;
    justify-content: flex-start;
    width: 70%;
    color: ${COLOR.FONT_GRAY};
  }
  .tag {
    display: flex;
    font-size: 12px;
    color: ${COLOR.FONT_GRAY};
    justify-content: flex-start;
    align-items: end;
    width: 50%;
    padding-left: 10px;
  }
  .icon {
    display: flex;
    justify-content: center;
    width: 10%;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  height: 430px;
  align-items: flex-end;
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
  .btn_title {
    padding-right: 5px;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 15px;
  padding: 10px;
  border: 1px solid ${COLOR.BORDER_POPUP};
`;
const ItemLayout = styled.span`
  display: flex;
  width: 100%;
  min-height: 40px;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  > span {
    display: flex;
    /* flex: 1 0 0; */
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
  }
  .title {
    width: 100%;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  .width_5 {
    width: 5%;
  }
  .width_10 {
    width: 10%;
  }
  .width_20px {
    width: 20px;
  }
  .width_50 {
    width: 50%;
  }
`;
const ListDescription = styled.p`
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: ${COLOR.PRIMARY};
  font-weight: bold;
`;
