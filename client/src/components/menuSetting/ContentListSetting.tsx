import * as React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';

import { BsArrowsMove, BsEyeSlash, BsEye } from 'react-icons/bs';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import styled from 'styled-components';

import {
  List,
  ListItem,
  Icon,
  CheckBoxI,
  Label,
  Button,
  Select,
} from '../../components';
import { SettingDnDWrapper } from '../../components/molecules';
import { ItemCategoryType, QuizListType } from '../../types';
import { COLOR } from '../constants';

export function ContentListSetting() {
  const ContentListData: QuizListType[] = [
    {
      code: '1',
      createdAt: '2024.08.29',
      createdBy: '김드림',
      idx: 1,
      isDelete: false,
      isUse: true,
      isFavorite: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '',
        idx: 1,
        originalName: '',
        storedPath: '',
        type: '',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      type: '',
      userKey: '',
      quizCategoryList: [
        {
          quizCategory: {
            교육과정: '6차, 8차',
            교과: '수학',
            과목: '교과수학',
            학년: 3,
            학기: 1,
            난이도: '',
            학교급: '중둥',
            문항타입: '객관식',
            대단원: '소인수분해',
            소단원: '',
            중단원: '',
            sources: [{ 출처: '내신' }],
            categories: [],
          },
        },
      ],
      quizItemList: [],
      quizList: [],
    },
    {
      code: '2',
      createdAt: '2024.08.29',
      createdBy: '김드림',
      idx: 2,
      isDelete: false,
      isUse: true,
      isFavorite: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '',
        idx: 2,
        originalName: '',
        storedPath: '',
        type: '',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      type: '',
      userKey: '',
      quizCategoryList: [
        {
          quizCategory: {
            교육과정: '6차, 8차',
            교과: '수학',
            과목: '교과수학',
            학년: 3,
            학기: 1,
            난이도: '',
            학교급: '고등',
            문항타입: '객관식',
            대단원: '소인수분해',
            소단원: '',
            중단원: '',
            sources: [{ 출처: '교재' }],
            categories: [],
          },
        },
      ],
      quizItemList: [],
      quizList: [],
    },
    {
      code: '3',
      createdAt: '2024.08.29',
      createdBy: '김드림',
      idx: 3,
      isDelete: false,
      isUse: true,
      isFavorite: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '',
        idx: 3,
        originalName: '',
        storedPath: '',
        type: '',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      type: '',
      userKey: '',
      quizCategoryList: [
        {
          quizCategory: {
            교육과정: '6차, 8차',
            교과: '수학',
            과목: '교과수학',
            학년: 3,
            학기: 1,
            난이도: '',
            학교급: '중등',
            문항타입: '객관식',
            대단원: '소인수분해',
            소단원: '',
            중단원: '',
            sources: [{ 출처: '자체제작, 기출' }],
            categories: [],
          },
        },
      ],
      quizItemList: [],
      quizList: [],
    },
    {
      code: '4',
      createdAt: '2024.08.29',
      createdBy: '김드림',
      idx: 4,
      isDelete: false,
      isUse: true,
      isFavorite: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '',
        idx: 4,
        originalName: '',
        storedPath: '',
        type: '',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      type: '',
      userKey: '',
      quizCategoryList: [
        {
          quizCategory: {
            교육과정: '6차, 8차',
            교과: '수학',
            과목: '교과수학',
            학년: 3,
            학기: 1,
            난이도: '',
            학교급: '중등',
            문항타입: '객관식',
            대단원: '소인수분해',
            소단원: '',
            중단원: '',
            sources: [{ 출처: '내신, 기타' }],
            categories: [],
          },
        },
      ],
      quizItemList: [],
      quizList: [],
    },
    {
      code: '5',
      createdAt: '2024.08.29',
      createdBy: '김드림',
      idx: 5,
      isDelete: false,
      isUse: true,
      isFavorite: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '',
        idx: 5,
        originalName: '',
        storedPath: '',
        type: '',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      type: '',
      userKey: '',
      quizCategoryList: [
        {
          quizCategory: {
            교육과정: '6차, 8차',
            교과: '수학',
            과목: '교과수학',
            학년: 3,
            학기: 1,
            난이도: '',
            학교급: '고등',
            문항타입: '객관식',
            대단원: '소인수분해',
            소단원: '',
            중단원: '',
            sources: [{ 출처: '교재' }],
            categories: [],
          },
        },
      ],
      quizItemList: [],
      quizList: [],
    },
    {
      code: '6',
      createdAt: '2024.08.29',
      createdBy: '김드림',
      idx: 6,
      isDelete: false,
      isUse: true,
      isFavorite: false,
      lastArticle: {
        createdAt: '',
        createdBy: '',
        extension: '',
        idx: 6,
        originalName: '',
        storedPath: '',
        type: '',
      },
      lastModifiedAt: '',
      lastModifiedBy: '',
      type: '',
      userKey: '',
      quizCategoryList: [
        {
          quizCategory: {
            교육과정: '6차, 8차',
            교과: '수학',
            과목: '교과수학',
            학년: 3,
            학기: 1,
            난이도: '',
            학교급: '중등',
            문항타입: '객관식',
            대단원: '소인수분해',
            소단원: '',
            중단원: '',
            sources: [{ 출처: '교재' }],
            categories: [],
          },
        },
      ],
      quizItemList: [],
      quizList: [],
    },
  ];
  const CategoryDummy = [
    {
      idx: 1,
      title: '출처',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
      option: [
        {
          idx: 2,
          name: '내신',
        },
        {
          idx: 3,
          name: '교재',
        },
        {
          idx: 4,
          name: '자체제작',
        },
      ],
    },
    {
      idx: 2,
      title: '교육과정',
      isFilter: true,
      isDisplay: true,
      tag: '텍스트 입력',
      option: [
        {
          idx: 1,
          name: '6차',
        },
        {
          idx: 2,
          name: '8차',
        },
        {
          idx: 3,
          name: '11차',
        },
      ],
    },
    {
      idx: 3,
      title: '학교급',
      isFilter: true,
      isDisplay: true,
      tag: '태그 선택',
      option: [
        {
          idx: 1,
          name: '초등',
        },
        {
          idx: 2,
          name: '중등',
        },
        {
          idx: 3,
          name: '고등',
        },
      ],
    },
    {
      idx: 4,
      title: '학년',
      isFilter: true,
      isDisplay: true,
      tag: '태그 선택',
      option: [
        {
          idx: 1,
          name: '1학년',
        },
        {
          idx: 2,
          name: '2학년',
        },
        {
          idx: 3,
          name: '3학년',
        },
      ],
    },
    {
      idx: 5,
      title: '학기',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
      option: [
        {
          idx: 1,
          name: '1학기',
        },
        {
          idx: 2,
          name: '2학기',
        },
      ],
    },
    {
      idx: 6,
      title: '교과',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
      option: [
        {
          idx: 1,
          name: '수학',
        },
        {
          idx: 2,
          name: '영어',
        },
        {
          idx: 3,
          name: '국어',
        },
      ],
    },
    {
      idx: 7,
      title: '과목',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
      option: [
        {
          idx: 1,
          name: '교과수학',
        },
        {
          idx: 2,
          name: '교과영어',
        },
        {
          idx: 3,
          name: '교과국어',
        },
      ],
    },
    {
      idx: 8,
      title: '대단원',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 9,
      title: '중단원',
      isFilter: false,
      isDisplay: false,
      tag: '태그 선택',
    },
    {
      idx: 10,
      title: '소단원',
      isFilter: false,
      isDisplay: false,
      tag: '태그 선택',
    },
    {
      idx: 11,
      title: '문항타입',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 12,
      title: '담당자',
      isFilter: false,
      isDisplay: true,
      tag: '태그 선택',
    },
    {
      idx: 13,
      title: '등록일자',
      isFilter: false,
      isDisplay: true,
      tag: '날짜 선택',
    },
    {
      idx: 14,
      title: '오픈여부',
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
          <Title>문항 리스트</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <div>
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
                  defaultValue="문항리스트"
                  key="문항리스트"
                  options={SelectDummy.tageClassList}
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
                                  setCategoryList((prevState) => ({
                                    ...prevState,
                                    isFilter: !dragItem.isFilter,
                                  }));
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
                              ></BsEyeSlash>
                            </div>
                          )}
                        </Content>
                      </ContentList>
                    );
                  }}
                </SettingDnDWrapper>
              </ContentListWrapper>
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
            </div>
          </SettingWrapper>
          <ListWrapper>
            <SelectWrapper>
              {CategoryDummy.map((category) => {
                if (category.isFilter) {
                  return (
                    <Select
                      //onDefaultSelect={() => handleDefaultSelect('태그')}
                      width={'130px'}
                      defaultValue={category.title}
                      key={category.title}
                      options={category.option}
                      //onSelect={(event) => selectCategoryOption(event)}
                      //setSelectedValue={setSelectedTag}
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
                    <span className="width_80px tooltip_wrapper ">
                      <strong className="title">출처</strong>
                      {item.quizCategoryList ? (
                        <span className="tag ellipsis">
                          {item.quizCategoryList.length !== 0 ? (
                            item.quizCategoryList.map(
                              (
                                el: { quizCategory: { sources: any[] } },
                                idx: any,
                              ) => (
                                <span
                                  key={`quizCategoryList quizCategory: ${idx}`}
                                >
                                  {el.quizCategory.sources
                                    ? el.quizCategory.sources.map(
                                        (el) =>
                                          `${el.출처 ? `${el.출처}` : ''} ${el.문항번호 ? `${el.문항번호}` : ''} ${el.출제년도 ? `${el.출제년도}` : ''} ${el.교재속성 ? `${el.교재속성}` : ''} ${el.출판사 ? `${el.출판사}` : ''} ${el.시리즈 ? `${el.시리즈}` : ''} ${el.교재명 ? `${el.교재명}` : ''} ${el.교재페이지 ? `${el.교재페이지}` : ''} ${el.교재번호 ? `${el.교재번호}` : ''} ${el.출판년도 ? `${el.출판년도}` : ''} ${el.내신형식 ? `${el.내신형식}` : ''} ${el.학교명 ? `${el.학교명}` : ''} ${el.학사일정 ? `${el.학사일정}` : ''} ${el.내신페이지 ? `${el.내신페이지}` : ''} ${el.내신배점 ? `${el.내신배점}` : ''} ${el.기출속성 ? `${el.기출속성}` : ''} ${el.주관사 ? `${el.주관사}` : ''} ${el.기출명 ? `${el.기출명}` : ''} ${el.시행학제 ? `${el.시행학제}` : ''} ${el.시행학년 ? `${el.시행학년} 학년` : ''} ${el.시험지타입 ? `${el.시험지타입}` : ''} ${el.기출배점 ? `${el.기출배점}` : ''} ${el.기출일시 ? `${el.기출일시}` : ''} `,
                                      )
                                    : ''}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_80px tooltip_wrapper ">
                      <strong className="title">교육과정</strong>

                      {item.quizCategoryList ? (
                        <span className="tag ellipsis">
                          {item.quizCategoryList.length !== 0 ? (
                            item.quizCategoryList.map(
                              (
                                el: { quizCategory: { 교육과정: any } },
                                idx: number,
                              ) => (
                                <span
                                  key={`quizCategoryList quizCategory:교육과정 ${idx}`}
                                >
                                  {el.quizCategory.교육과정
                                    ? `${idx != 0 ? ',' : ''} ${el.quizCategory.교육과정}`
                                    : ''}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_60px tooltip_wrapper ">
                      <strong className="title">학교급</strong>

                      {item.quizCategoryList ? (
                        <span className=" tag ellipsis">
                          {item.quizCategoryList.length !== 0 ? (
                            item.quizCategoryList.map(
                              (
                                el: { quizCategory: { 학교급: any } },
                                idx: number,
                              ) => (
                                <span
                                  key={`quizCategoryList quizCategory:학교급 ${idx}`}
                                >
                                  {el.quizCategory.학교급
                                    ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학교급}`
                                    : ''}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_50px tooltip_wrapper ">
                      <strong className="title">학년</strong>

                      {item.quizCategoryList ? (
                        <span className="tag ellipsis">
                          {item.quizCategoryList.length !== 0 ? (
                            item.quizCategoryList.map(
                              (
                                el: { quizCategory: { 학년: any } },
                                idx: number,
                              ) => (
                                <span
                                  key={`quizCategoryList quizCategory:학년 ${idx}`}
                                >
                                  {el.quizCategory.학년
                                    ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학년}`
                                    : ''}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_60px tooltip_wrapper ">
                      <strong className="title">학기</strong>

                      {item.quizCategoryList ? (
                        <span className="tag ellipsis">
                          {item.quizCategoryList.length !== 0 ? (
                            item.quizCategoryList.map(
                              (
                                el: { quizCategory: { 학기: any } },
                                idx: number,
                              ) => (
                                <span
                                  key={`quizCategoryList quizCategory:학기 ${idx}`}
                                >
                                  {el.quizCategory.학기
                                    ? `${idx != 0 ? ',' : ''} ${el.quizCategory.학기}`
                                    : ''}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_60px tooltip_wrapper ">
                      <strong className="title">교과</strong>

                      {item.quizCategoryList ? (
                        <span className="tag ellipsis">
                          {item.quizCategoryList.length !== 0 ? (
                            item.quizCategoryList.map(
                              (
                                el: { quizCategory: { 교과: any } },
                                idx: number,
                              ) => (
                                <span
                                  key={`quizCategoryList quizCategory:교과 ${idx}`}
                                >
                                  {el.quizCategory.교과
                                    ? `${idx != 0 ? ',' : ''} ${el.quizCategory.교과}`
                                    : ''}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_80px tooltip_wrapper ">
                      <strong className="title">과목</strong>

                      {item.quizCategoryList ? (
                        <span className="tag ellipsis">
                          {item.quizCategoryList.length !== 0 ? (
                            item.quizCategoryList.map(
                              (
                                el: { quizCategory: { 과목: any } },
                                idx: number,
                              ) => (
                                <span
                                  key={`quizCategoryList quizCategory:과목 ${idx}`}
                                >
                                  {el.quizCategory.과목
                                    ? `${idx != 0 ? ',' : ''} ${el.quizCategory.과목}`
                                    : ''}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_150px tooltip_wrapper ">
                      <strong className="title">대단원</strong>

                      {item.quizCategoryList ? (
                        <span className="tag ellipsis">
                          {item.quizCategoryList.length !== 0 ? (
                            item.quizCategoryList.map(
                              (
                                el: { quizCategory: { 대단원: any } },
                                idx: number,
                              ) => (
                                <span
                                  key={`quizCategoryList quizCategory:대단원 ${idx}`}
                                >
                                  {el.quizCategory.대단원
                                    ? `${idx != 0 ? ',' : ''} ${el.quizCategory.대단원.split('^^^')[0]}`
                                    : ''}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_60px tag_s tooltip_wrapper ">
                      <span></span>
                      {item.quizCategoryList ? (
                        <span className="tag ellipsis">
                          {item.quizCategoryList.length > 0 ? (
                            item.quizCategoryList.map(
                              (
                                item: {
                                  quizCategory: { 문항타입: string | any[] };
                                },
                                idx: any,
                              ) => (
                                <span key={`문항타입 ${idx}`}>
                                  {item.quizCategory.문항타입 &&
                                  item.quizCategory.문항타입.length > 1
                                    ? `${item.quizCategory.문항타입}`
                                    : ``}
                                </span>
                              ),
                            )
                          ) : (
                            <span></span>
                          )}
                        </span>
                      ) : (
                        <span className="tag"></span>
                      )}
                    </span>
                    <i className="line"></i>
                    <span className="width_10">{item.createdBy} </span>
                    <i className="line"></i>
                    <span className="width_10">{item.createdAt}</span>
                    <i className="line"></i>
                    <span className="width_5">
                      <Icon
                        width={`18px`}
                        $margin={'0 0 0 12px'}
                        src={`/images/icon/lock_open_off.svg`}
                        disabled={true}
                      />
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

  .tooltip_wrapper {
    position: relative;
  }
  > span {
    display: flex;
    /* flex: 1 0 0; */
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
    min-width: 30px;
    max-width: 150px;
    font-weight: normal;
  }

  /* 두줄 이상 ellipsis 처리  */
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .title {
    width: 100%;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .tag {
    margin: 0 5px;
    padding: 3px 5px;
    border-radius: 5px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  .tag_s {
    font-weight: bold;
    font-size: 12px;
    padding: 2px;
    border-radius: 5px;
    background-color: ${COLOR.BORDER_GRAY};
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
  .width_50px {
    width: 50px;
  }
  .width_60px {
    width: 60px;
  }
  .width_80px {
    width: 80px;
  }
`;
const ListDescription = styled.p`
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: ${COLOR.PRIMARY};
  font-weight: bold;
`;
