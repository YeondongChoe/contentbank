import * as React from 'react';
import { useState } from 'react';

import { BiToggleRight } from 'react-icons/bi';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { TabMenu, Label, Button, Select } from '..';
import Image from '../../assets/images/EditerImg.png';
import { pageAtom } from '../../store/utilAtom';
import { COLOR } from '../constants';

type Option = {
  idx: number;
  title: string;
  isNecessary: boolean;
  isDisplay: boolean;
  tag: string;
};

type TagClass = {
  idx: number;
  name: string;
  code: string;
  option?: Option[];
};

type CategoryDummyType = {
  tageClassList: TagClass[];
  additionalInformationList: TagClass[];
};

export function ContentDtEditingSetting() {
  const menuList = [
    {
      label: '출처',
      value: '출처',
    },
    {
      label: '추가정보',
      value: '추가정보',
    },
  ];
  const CategoryDummy: CategoryDummyType[] = [
    {
      tageClassList: [
        {
          idx: 1,
          name: '교재',
          code: '1',
          option: [
            {
              idx: 1,
              title: '교재속성',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 2,
              title: '출판사',
              isNecessary: true,
              isDisplay: true,
              tag: '텍스트 입력',
            },
            {
              idx: 3,
              title: '시리즈',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 4,
              title: '교재명',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 5,
              title: '교재페이지',
              isNecessary: false,
              isDisplay: true,
              tag: '숫자 입력',
            },
            {
              idx: 6,
              title: '교재번호',
              isNecessary: false,
              isDisplay: true,
              tag: '숫자 입력',
            },
            {
              idx: 7,
              title: '출판년도',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
          ],
        },
        {
          idx: 2,
          name: '내신',
          code: '2',
          option: [
            {
              idx: 1,
              title: '내신형식',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 2,
              title: '학교명',
              isNecessary: true,
              isDisplay: true,
              tag: '텍스트 입력',
            },
            {
              idx: 3,
              title: '학사일정',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 4,
              title: '내신페이지',
              isNecessary: true,
              isDisplay: true,
              tag: '숫자 입력',
            },
            {
              idx: 5,
              title: '문항번호',
              isNecessary: false,
              isDisplay: true,
              tag: '숫자 입력',
            },
            {
              idx: 6,
              title: '내신배점',
              isNecessary: false,
              isDisplay: true,
              tag: '숫자 입력',
            },
            {
              idx: 7,
              title: '기출일시',
              isNecessary: false,
              isDisplay: true,
              tag: '숫자 입력',
            },
          ],
        },
        {
          idx: 3,
          name: '기출',
          code: '3',
          option: [
            {
              idx: 1,
              title: '내신배점',
              isNecessary: false,
              isDisplay: true,
              tag: '텍스트 입력',
            },
            {
              idx: 2,
              title: '기출속성',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 3,
              title: '주관사',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 4,
              title: '기출명',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 5,
              title: '시행학제',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 6,
              title: '시행학년',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 7,
              title: '시험지타입',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 8,
              title: '문항번호',
              isNecessary: false,
              isDisplay: true,
              tag: '숫자 입력',
            },
            {
              idx: 9,
              title: '기출배점',
              isNecessary: false,
              isDisplay: true,
              tag: '숫자 입력',
            },
            {
              idx: 10,
              title: '기출일시',
              isNecessary: false,
              isDisplay: true,
              tag: '숫자 입력',
            },
          ],
        },
        {
          idx: 4,
          name: '자체제작',
          code: '4',
        },
        {
          idx: 5,
          name: '기타',
          code: '5',
        },
      ],
      additionalInformationList: [
        {
          idx: 1,
          name: '교재',
          code: '1',
          option: [
            {
              idx: 1,
              title: '문항타입',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 2,
              title: '난이도',
              isNecessary: true,
              isDisplay: true,
              tag: '텍스트 입력',
            },
          ],
        },
        {
          idx: 2,
          name: '내신',
          code: '2',
          option: [
            {
              idx: 1,
              title: '문항타입',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 2,
              title: '난이도',
              isNecessary: true,
              isDisplay: true,
              tag: '텍스트 입력',
            },
          ],
        },
        {
          idx: 3,
          name: '기출',
          code: '3',
          option: [
            {
              idx: 1,
              title: '문항타입',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 2,
              title: '난이도',
              isNecessary: true,
              isDisplay: true,
              tag: '텍스트 입력',
            },
          ],
        },
        {
          idx: 4,
          name: '자체제작',
          code: '4',
          option: [
            {
              idx: 1,
              title: '문항타입',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 2,
              title: '난이도',
              isNecessary: true,
              isDisplay: true,
              tag: '텍스트 입력',
            },
          ],
        },
        {
          idx: 5,
          name: '기타',
          code: '5',
          option: [
            {
              idx: 1,
              title: '문항타입',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 2,
              title: '난이도',
              isNecessary: true,
              isDisplay: true,
              tag: '텍스트 입력',
            },
          ],
        },
      ],
    },
  ];
  const [categoryList, setCategoryList] =
    useState<CategoryDummyType[]>(CategoryDummy);
  const [selectedValue, setSelectedValue] = useState<string>('교재'); //태그
  const [tabVeiw, setTabVeiw] = useState<string>('출처');
  const [page, setPage] = useRecoilState(pageAtom);

  const changeTab = () => {
    setPage(1);
  };

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>문항 등록/수정(DT&Editing)</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <>
              <TabWrapper>
                <TabMenu
                  length={2}
                  menu={menuList}
                  width={'400px'}
                  lineStyle
                  selected={tabVeiw}
                  setTabVeiw={setTabVeiw}
                  onClickTab={changeTab}
                />
              </TabWrapper>
              <Label value={'설정'} width="100%" bold fontSize="20px" />
              <PageDescription>
                리스트에 노출되는 필터의 순서를 변경합니다.
              </PageDescription>
              <Label
                value={'출처'}
                width="100%"
                bold
                fontSize="17px"
                padding="10px 0 0px 5px"
              />
              <Label
                value={'태그'}
                width="100%"
                bold
                fontSize="14px"
                padding="10px 0 10px 5px"
              />
              {categoryList && (
                <Select
                  isnormalizedOptions
                  width={'100%'}
                  defaultValue="교재"
                  key="교재"
                  options={categoryList[0].tageClassList}
                  setSelectedValue={setSelectedValue}
                />
              )}
              <Label
                value={'그룹'}
                width="100%"
                bold
                fontSize="14px"
                padding="10px 0 10px 5px"
              />
              <Select
                width={'100%'}
                defaultValue="출처교재"
                key="출처교재"
                isnormalizedOptions
              />
              {tabVeiw === '출처' && (
                <>
                  <CategoryWrapper>
                    <Label
                      value={'카테고리'}
                      width="100%"
                      bold
                      fontSize="14px"
                      padding="10px 0 10px 5px"
                    />
                    <IconWrapper>
                      <BiToggleRight
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          fill: `${COLOR.PRIMARY}`,
                        }}
                      ></BiToggleRight>
                      <PageDescription>필수값설정</PageDescription>
                      <BsEye
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          fill: `${COLOR.PRIMARY}`,
                        }}
                      ></BsEye>
                      <PageDescription>노출여부</PageDescription>
                    </IconWrapper>
                  </CategoryWrapper>
                  <ContentListWrapper>
                    {categoryList && (
                      <>
                        {/* selectedValue와 일치하는 필터된 카테고리 찾기 */}
                        {(() => {
                          const filteredCategory =
                            categoryList[0].tageClassList.find(
                              (item: TagClass) => item.name === selectedValue,
                            );

                          // 필터링된 카테고리가 존재할 때만 option을 렌더링
                          if (filteredCategory) {
                            return filteredCategory.option?.map(
                              (category: Option, i: number) => (
                                <ContentList key={i}>
                                  <Content>
                                    <div
                                      className={`title-${category.isDisplay}`}
                                    >
                                      {category.title}
                                      <div className="tag">{category.tag}</div>
                                    </div>
                                    {category.isNecessary ? (
                                      <div className="icon">
                                        <BiToggleRight
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.PRIMARY}`,
                                          }}
                                          onClick={() => {
                                            setCategoryList((prevState) =>
                                              prevState.map((catListItem) => {
                                                // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                                const updatedTageClassList =
                                                  catListItem.tageClassList?.map(
                                                    (tagClass) => {
                                                      const updatedOptions =
                                                        tagClass.option?.map(
                                                          (optionItem) => {
                                                            if (
                                                              optionItem.title ===
                                                              category.title
                                                            ) {
                                                              return {
                                                                ...optionItem,
                                                                isNecessary:
                                                                  !optionItem.isNecessary, // 해당 옵션의 isFilter만 토글
                                                              };
                                                            }
                                                            return optionItem; // 나머지 옵션은 그대로 유지
                                                          },
                                                        );

                                                      return {
                                                        ...tagClass,
                                                        option: updatedOptions, // 변경된 옵션 배열로 업데이트
                                                      };
                                                    },
                                                  );

                                                return {
                                                  ...catListItem,
                                                  tageClassList:
                                                    updatedTageClassList, // 업데이트된 tageClassList로 교체
                                                };
                                              }),
                                            );
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div className="icon">
                                        <BiToggleRight
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.FONT_GRAY}`,
                                          }}
                                          onClick={() => {
                                            setCategoryList((prevState) =>
                                              prevState.map((catListItem) => {
                                                // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                                const updatedTageClassList =
                                                  catListItem.tageClassList.map(
                                                    (tagClass) => {
                                                      const updatedOptions =
                                                        tagClass.option?.map(
                                                          (optionItem) => {
                                                            if (
                                                              optionItem.title ===
                                                              category.title
                                                            ) {
                                                              return {
                                                                ...optionItem,
                                                                isNecessary:
                                                                  !optionItem.isNecessary, // 해당 옵션의 isFilter만 토글
                                                              };
                                                            }
                                                            return optionItem; // 나머지 옵션은 그대로 유지
                                                          },
                                                        );

                                                      return {
                                                        ...tagClass,
                                                        option: updatedOptions, // 변경된 옵션 배열로 업데이트
                                                      };
                                                    },
                                                  );

                                                return {
                                                  ...catListItem,
                                                  tageClassList:
                                                    updatedTageClassList, // 업데이트된 tageClassList로 교체
                                                };
                                              }),
                                            );
                                          }}
                                        />
                                      </div>
                                    )}
                                    {category.isDisplay ? (
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
                                              prevState.map((catListItem) => {
                                                // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isDisplay 상태를 변경
                                                const updatedTageClassList =
                                                  catListItem.tageClassList.map(
                                                    (tagClass) => {
                                                      const updatedOptions =
                                                        tagClass.option?.map(
                                                          (optionItem) => {
                                                            if (
                                                              optionItem.title ===
                                                              category.title
                                                            ) {
                                                              return {
                                                                ...optionItem,
                                                                isDisplay:
                                                                  !optionItem.isDisplay, // 해당 옵션의 isDisplay만 토글
                                                              };
                                                            }
                                                            return optionItem; // 나머지 옵션은 그대로 유지
                                                          },
                                                        );

                                                      return {
                                                        ...tagClass,
                                                        option: updatedOptions, // 변경된 옵션 배열로 업데이트
                                                      };
                                                    },
                                                  );

                                                return {
                                                  ...catListItem,
                                                  tageClassList:
                                                    updatedTageClassList, // 업데이트된 tageClassList로 교체
                                                };
                                              }),
                                            );
                                          }}
                                        />
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
                                              prevState.map((catListItem) => {
                                                // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isDisplay 상태를 변경
                                                const updatedTageClassList =
                                                  catListItem.tageClassList.map(
                                                    (tagClass) => {
                                                      const updatedOptions =
                                                        tagClass.option?.map(
                                                          (optionItem) => {
                                                            if (
                                                              optionItem.title ===
                                                              category.title
                                                            ) {
                                                              return {
                                                                ...optionItem,
                                                                isDisplay:
                                                                  !optionItem.isDisplay, // 해당 옵션의 isDisplay만 토글
                                                              };
                                                            }
                                                            return optionItem; // 나머지 옵션은 그대로 유지
                                                          },
                                                        );

                                                      return {
                                                        ...tagClass,
                                                        option: updatedOptions, // 변경된 옵션 배열로 업데이트
                                                      };
                                                    },
                                                  );

                                                return {
                                                  ...catListItem,
                                                  tageClassList:
                                                    updatedTageClassList, // 업데이트된 tageClassList로 교체
                                                };
                                              }),
                                            );
                                          }}
                                        />
                                      </div>
                                    )}
                                  </Content>
                                </ContentList>
                              ),
                            );
                          }
                        })()}
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
                    )}
                  </ContentListWrapper>
                </>
              )}
              {tabVeiw === '추가정보' && (
                <>
                  <CategoryWrapper>
                    <Label
                      value={'카테고리'}
                      width="100%"
                      bold
                      fontSize="14px"
                      padding="10px 0 10px 5px"
                    />
                    <IconWrapper>
                      <BiToggleRight
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          fill: `${COLOR.PRIMARY}`,
                        }}
                      ></BiToggleRight>
                      <PageDescription>필수값설정</PageDescription>
                    </IconWrapper>
                  </CategoryWrapper>
                  <ContentListWrapper>
                    {categoryList && (
                      <>
                        {/* selectedValue와 일치하는 필터된 카테고리 찾기 */}
                        {(() => {
                          const filteredCategory =
                            categoryList[0].additionalInformationList.find(
                              (item: TagClass) => item.name === selectedValue,
                            );

                          // 필터링된 카테고리가 존재할 때만 option을 렌더링
                          if (filteredCategory) {
                            return filteredCategory.option?.map(
                              (category: Option, i: number) => (
                                <ContentList key={i}>
                                  <Content>
                                    <div
                                      className={`title-${category.isDisplay}`}
                                    >
                                      {category.title}
                                      <div className="tag">{category.tag}</div>
                                    </div>
                                    {category.isNecessary ? (
                                      <div className="icon">
                                        <BiToggleRight
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.PRIMARY}`,
                                          }}
                                          onClick={() => {
                                            setCategoryList((prevState) =>
                                              prevState.map((catListItem) => {
                                                // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                                const updatedTageClassList =
                                                  catListItem.additionalInformationList?.map(
                                                    (tagClass) => {
                                                      const updatedOptions =
                                                        tagClass.option?.map(
                                                          (optionItem) => {
                                                            if (
                                                              optionItem.title ===
                                                              category.title
                                                            ) {
                                                              return {
                                                                ...optionItem,
                                                                isNecessary:
                                                                  !optionItem.isNecessary, // 해당 옵션의 isFilter만 토글
                                                              };
                                                            }
                                                            return optionItem; // 나머지 옵션은 그대로 유지
                                                          },
                                                        );

                                                      return {
                                                        ...tagClass,
                                                        option: updatedOptions, // 변경된 옵션 배열로 업데이트
                                                      };
                                                    },
                                                  );

                                                return {
                                                  ...catListItem,
                                                  additionalInformationList:
                                                    updatedTageClassList, // 업데이트된 tageClassList로 교체
                                                };
                                              }),
                                            );
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      <div className="icon">
                                        <BiToggleRight
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            fill: `${COLOR.FONT_GRAY}`,
                                          }}
                                          onClick={() => {
                                            setCategoryList((prevState) =>
                                              prevState.map((catListItem) => {
                                                // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                                const updatedTageClassList =
                                                  catListItem.additionalInformationList?.map(
                                                    (tagClass) => {
                                                      const updatedOptions =
                                                        tagClass.option?.map(
                                                          (optionItem) => {
                                                            if (
                                                              optionItem.title ===
                                                              category.title
                                                            ) {
                                                              return {
                                                                ...optionItem,
                                                                isNecessary:
                                                                  !optionItem.isNecessary, // 해당 옵션의 isFilter만 토글
                                                              };
                                                            }
                                                            return optionItem; // 나머지 옵션은 그대로 유지
                                                          },
                                                        );

                                                      return {
                                                        ...tagClass,
                                                        option: updatedOptions, // 변경된 옵션 배열로 업데이트
                                                      };
                                                    },
                                                  );

                                                return {
                                                  ...catListItem,
                                                  additionalInformationList:
                                                    updatedTageClassList, // 업데이트된 tageClassList로 교체
                                                };
                                              }),
                                            );
                                          }}
                                        />
                                      </div>
                                    )}
                                  </Content>
                                </ContentList>
                              ),
                            );
                          }
                        })()}
                      </>
                    )}
                  </ContentListWrapper>
                  <AdditionalButtonWrapper>
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
                  </AdditionalButtonWrapper>
                </>
              )}
            </>
          </SettingWrapper>
          <ListWrapper>
            <img
              src={Image}
              alt="editer"
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
              }}
            />
            <SelectWrapper>
              <Label value={'출처'} width="100%" bold fontSize="17px" />
              {/* selectedValue와 일치하는 필터된 카테고리 찾기 */}
              {(() => {
                const filteredCategory = categoryList[0].tageClassList.find(
                  (item: TagClass) => item.name === selectedValue,
                );
                // 필터링된 카테고리가 존재할 때만 option을 렌더링
                if (filteredCategory) {
                  return filteredCategory.option?.map((optionItem) => {
                    if (optionItem.isDisplay) {
                      return (
                        <Select
                          width={'130px'}
                          isnormalizedOptions
                          defaultValue={
                            optionItem.isNecessary
                              ? `${optionItem.title}*`
                              : optionItem.title
                          }
                          key={optionItem.idx}
                        />
                      );
                    }
                    return null; // isDisplay가 false인 항목은 렌더링하지 않음
                  });
                }
                return null; // filteredCategory가 없는 경우 null 반환
              })()}
              <Label value={'추가정보'} width="100%" bold fontSize="17px" />
              {(() => {
                const filteredCategory =
                  categoryList[0].additionalInformationList.find(
                    (item: TagClass) => item.name === selectedValue,
                  );
                // 필터링된 카테고리가 존재할 때만 option을 렌더링
                if (filteredCategory) {
                  return filteredCategory.option?.map((optionItem) => {
                    return (
                      <Select
                        width={'130px'}
                        isnormalizedOptions
                        defaultValue={
                          optionItem.isNecessary
                            ? `${optionItem.title}*`
                            : optionItem.title
                        }
                        key={optionItem.idx}
                      />
                    );
                  });
                }
                return null; // filteredCategory가 없는 경우 null 반환
              })()}
            </SelectWrapper>
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
`;
const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;
const SettingWrapper = styled.div`
  width: 30%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 15px;
  padding: 10px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  justify-content: center;
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
  padding: 0 20px;
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  border-left: 1px solid ${COLOR.BORDER_GRAY};
  border-right: 1px solid ${COLOR.BORDER_GRAY};
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
  height: 210px;
  align-items: flex-end;
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-top: 1px solid ${COLOR.BORDER_POPUP};
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 15px;
  border: 1px solid ${COLOR.BORDER_POPUP};
`;
const ListDescription = styled.p`
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: ${COLOR.PRIMARY};
  font-weight: bold;
`;
const AdditionalButtonWrapper = styled.div`
  display: flex;
  height: 419px;
  align-items: flex-end;
`;
