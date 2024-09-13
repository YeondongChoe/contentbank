import * as React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';

import { BsArrowsMove, BsEyeSlash, BsEye } from 'react-icons/bs';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import styled from 'styled-components';

import { List, ListItem, Label, Button, Select } from '..';
import { COLOR } from '../constants';
import { SettingDnDWrapper } from '../molecules';

export function WorkbookCSATSetting() {
  const ContentListData = [
    {
      idx: 1,
      tag: '경시',
      school: '고등',
      grade: '1학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '수2',
      type: 'A타입',
      year: '2024',
      quizCount: '25',
    },
    {
      idx: 2,
      tag: '경시',
      school: '고등',
      grade: '2학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '수1',
      type: 'B타입',
      year: '2024',
      quizCount: '7',
    },
    {
      idx: 3,
      tag: '경시',
      school: '중등',
      grade: '1학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '미적분',
      type: 'A타입',
      year: '2024',
      quizCount: '100',
    },
    {
      idx: 4,
      tag: '경시',
      school: '중등',
      grade: '3학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '확률과 통계',
      type: 'B타입',
      year: '2024',
      quizCount: '9',
    },
    {
      idx: 5,
      tag: '학력평가',
      school: '고등',
      grade: '1학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '적분',
      type: 'A타입',
      year: '2024',
      quizCount: '5',
    },
    {
      idx: 6,
      tag: '학력평가',
      school: '중등',
      grade: '1학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '수1',
      type: 'B타입',
      year: '2024',
      quizCount: '17',
    },
    {
      idx: 7,
      tag: '학력평가',
      school: '고등',
      grade: '2학년',
      name: '드림 고등학교',
      host: '서울교육청',
      subject: '수2',
      type: 'A타입',
      year: '2024',
      quizCount: '10',
    },
  ];
  const CategoryDummy = [
    {
      idx: 1,
      title: '기출속성',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 2,
      title: '학교급',
      isFilter: true,
      isDisplay: true,
      tag: '텍스트 입력',
    },
    {
      idx: 3,
      title: '학년',
      isFilter: true,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 4,
      title: '기출명',
      isFilter: true,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 5,
      title: '주관사',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 6,
      title: '교과',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 7,
      title: '과목',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 8,
      title: '시험지 타입',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 9,
      title: '기출년도',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
  ];
  const SelectDummy = {
    tageClassList: [
      {
        idx: 1,
        name: '연습문제',
        code: '1',
      },
      {
        idx: 2,
        name: '일일테스트',
        code: '2',
      },
      {
        idx: 3,
        name: '모의고사',
        code: '3',
      },
      {
        idx: 4,
        name: '내신대비',
        code: '4',
      },
      {
        idx: 5,
        name: '월말테스트',
        code: '5',
      },
    ],
  };
  const [categoryList, setCategoryList] = useState<any[]>(CategoryDummy);
  const [isStartDnD, setIsStartDnd] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(''); //태그

  const whenDragEnd = (newList: any[]) => {
    setCategoryList(newList);
  };
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>학습지 등록/수정(기출{'>'}전국시험)</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <>
              <Label value={'설정'} width="100%" bold fontSize="20px" />
              <PageDescription>
                리스트에 노출되는 필터의 순서를 변경합니다.
              </PageDescription>
              <Label
                value={'그룹'}
                width="100%"
                bold
                fontSize="14px"
                padding="10px 0 10px 5px"
              />
              {SelectDummy && (
                <Select
                  width={'100%'}
                  defaultValue="전국시험"
                  key="전국시험"
                  isnormalizedOptions
                  //options={SelectDummy.tageClassList}
                  setSelectedValue={setSelectedValue}
                />
              )}
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
              {ContentListData.map((item: any) => (
                <ListItem key={item.code} isChecked={false} height={'100'}>
                  <ItemLayout>
                    <span>
                      <strong className="title">기출속성</strong>
                      <span className="width_20">{item.tag}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">학교급</strong>
                      <span className="width_20">{item.school}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">학년</strong>
                      <span className="width_20">{item.grade}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">기출명</strong>
                      <span className="width_20">{item.name}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">주관사</strong>
                      <span className="width_20">{item.host}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">과목</strong>
                      <span className="width_20">{item.subject}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">시험지 타입</strong>
                      <span className="width_20">{item.type}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">기출년도</strong>
                      <span className="width_20">{item.year}</span>
                    </span>
                    <i className="line"></i>
                    <span>
                      <strong className="title">문항수</strong>
                      <span className="width_20">{item.quizCount}</span>
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
  height: 220px;
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
