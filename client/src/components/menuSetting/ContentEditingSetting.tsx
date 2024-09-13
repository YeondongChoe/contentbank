import * as React from 'react';
import { useState } from 'react';

import { BsEyeSlash, BsEye } from 'react-icons/bs';
import styled from 'styled-components';

import { Label, Button, Select } from '..';
import Image from '../../assets/images/ContentEditing.png';
import Image2 from '../../assets/images/ContentEditingSearch.png';
import { COLOR } from '../constants';

type Option = {
  idx: number;
  name: string;
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
};

export function ContentEditingSetting() {
  const CategoryDummy: CategoryDummyType[] = [
    {
      tageClassList: [
        {
          idx: 1,
          name: '단원분류',
          code: '1',
          option: [
            {
              idx: 1,
              name: '교육과정',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 2,
              name: '교과',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 3,
              name: '과목',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 4,
              name: '학교급',
              isNecessary: true,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 5,
              name: '학년',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 6,
              name: '학기',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 7,
              name: '대단원',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 8,
              name: '중단원',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 9,
              name: '소단원',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 10,
              name: '유형',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 11,
              name: '세분류',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
            {
              idx: 12,
              name: '미세분류',
              isNecessary: false,
              isDisplay: true,
              tag: '태그 선택',
            },
          ],
        },
      ],
    },
  ];
  const [categoryList, setCategoryList] =
    useState<CategoryDummyType[]>(CategoryDummy);
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>문항 일괄 편집</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
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
            <Select
              width={'100%'}
              defaultValue="문항분류1"
              key="문항분류1"
              isnormalizedOptions
            />
            <CategoryDescription>
              검색조건에는 태그 매핑 정보가 적용되지 않습니다.
            </CategoryDescription>
            <CategoryDescription>
              문항 수정에 사용되는 매핑 정보는 해당 그룹의 태그 매핑 정보를
              기본으로 합니다.
            </CategoryDescription>
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
                {categoryList && (
                  <>
                    {/* selectedValue와 일치하는 필터된 카테고리 찾기 */}
                    {(() => {
                      const filteredCategory =
                        categoryList[0].tageClassList.find(
                          (item: TagClass) => item.name === '단원분류',
                        );

                      // 필터링된 카테고리가 존재할 때만 option을 렌더링
                      if (filteredCategory) {
                        return filteredCategory.option?.map(
                          (category: Option, i: number) => (
                            <ContentList key={i}>
                              <Content>
                                <div className={`title-${category.isDisplay}`}>
                                  {category.name}
                                  <div className="tag">{category.tag}</div>
                                </div>
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
                                            // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                            const updatedTageClassList =
                                              catListItem.tageClassList?.map(
                                                (tagClass) => {
                                                  const updatedOptions =
                                                    tagClass.option?.map(
                                                      (optionItem) => {
                                                        if (
                                                          optionItem.name ===
                                                          category.name
                                                        ) {
                                                          return {
                                                            ...optionItem,
                                                            isDisplay:
                                                              !optionItem.isDisplay, // 해당 옵션의 isFilter만 토글
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
                                            // 현재 tageClassList를 순회하며 title에 맞는 option을 찾아 isFilter 상태를 변경
                                            const updatedTageClassList =
                                              catListItem.tageClassList.map(
                                                (tagClass) => {
                                                  const updatedOptions =
                                                    tagClass.option?.map(
                                                      (optionItem) => {
                                                        if (
                                                          optionItem.name ===
                                                          category.name
                                                        ) {
                                                          return {
                                                            ...optionItem,
                                                            isDisplay:
                                                              !optionItem.isDisplay, // 해당 옵션의 isFilter만 토글
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
                  </>
                )}
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
            </>
          </SettingWrapper>
          <ListWrapper>
            <ClassificationWrapper>
              <SelectWrapper>
                <SubtitleWrapper>
                  <Label
                    value={'검색조건'}
                    width="100%"
                    padding="0"
                    bold
                    fontSize="16px"
                  />
                  <Button width="80px" height="25px" fontSize="14px" $filled>
                    <span>설정</span>
                  </Button>
                </SubtitleWrapper>
                <SelectBox>
                  <Select
                    width="140px"
                    defaultValue="교육과정"
                    key="교육과정"
                    options={
                      categoryList[0].tageClassList[0].option &&
                      categoryList[0].tageClassList[0].option.filter(
                        (optionItem) => optionItem.isDisplay,
                      )
                    }
                    isnormalizedOptions
                  />
                  <And>이(가)</And>
                  <Select
                    width="200px"
                    defaultValue="11차, 12차"
                    key="11차, 12차"
                    isnormalizedOptions
                  />
                </SelectBox>
                <ButtonWrapper>
                  <Button width="150px" height="32px" fontSize="14px" $normal>
                    <span>하나 이상 포함</span>
                  </Button>
                  <Button width="150px" height="32px" fontSize="14px" $filled>
                    <span>모두 포함</span>
                  </Button>
                </ButtonWrapper>
                <Img2Wrapper>
                  <img src={Image2} alt="search" style={{ width: '100%' }} />
                </Img2Wrapper>
              </SelectWrapper>
              <ImgWrapper>
                <img
                  src={Image}
                  alt="editer"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                  }}
                />
              </ImgWrapper>
            </ClassificationWrapper>
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
const PageDescription = styled.p`
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  font-weight: bold;
`;
const CategoryDescription = styled.p`
  font-size: 10px;
  padding-left: 5px;
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
  max-height: 500px; /* 컨테이너의 최대 높이 설정 */
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

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 15px;
  border: 1px solid ${COLOR.BORDER_POPUP};
`;
const ClassificationWrapper = styled.div`
  display: flex;
  height: 750px;
  border-bottom: 1px solid ${COLOR.BORDER_POPUP};
`;

const SelectWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${COLOR.BORDER_POPUP};
`;
const SubtitleWrapper = styled.div`
  padding: 10px;
  display: flex;
`;
const SelectBox = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const And = styled.span`
  font-size: 12px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  gap: 5px;
`;
const Img2Wrapper = styled.div`
  height: 100%;
  padding-top: 133px;
`;
const ImgWrapper = styled.div`
  width: 60%;
`;
const ListDescription = styled.p`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${COLOR.PRIMARY};
  font-weight: bold;
`;
