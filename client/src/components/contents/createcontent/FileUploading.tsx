import * as React from 'react';
import { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { Button, Modal, ResizeLayout, Select } from '../..';
import { COLOR } from '../../../components/constants';
import { QuizListType } from '../../../types';

import { selectCategory1, selectCategory3 } from './contentCreatingCategory';
import { QuizList } from './list';
import { OptionList } from './options/OptionList';

export function FileUploading({
  setTabVeiw,
}: {
  setTabVeiw: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;

    // setContent((prevContent) => [...prevContent, value]);
  };

  const submitSave = () => {
    console.log('등록하려는 신규 문항에 대한 데이터 post 요청 API');
    console.log('신규 등록된 문항 리스트 get 요청 API');
  };

  return (
    <Container>
      {/* <ContentsWrapper> */}
      <ResizeLayoutWrapper>
        <ResizeLayout
          height={'calc(100vh - 100px)'}
          column={'2nd'}
          item1Width={600}
          item1={
            <EditContainerWrapper>
              <PerfectScrollbar>
                <FlexWrapper>
                  <div>
                    <p>FileUploadBtnWrap</p>
                  </div>
                  <div>
                    <EditWrapper>EditWrap</EditWrapper>

                    <BackgroundWrapper>
                      <SelectListWrapper>
                        <strong>
                          과목<span>*</span>
                        </strong>
                        <SelectList>
                          <li>
                            <SelectWrapper>
                              {selectCategory1.map((el) => (
                                <Select
                                  $positionTop
                                  width={'110px'}
                                  height={'30px'}
                                  defaultValue={el.label}
                                  key={el.label}
                                  options={el.options}
                                  onSelect={(event) =>
                                    selectCategoryOption(event)
                                  }
                                />
                              ))}
                            </SelectWrapper>
                          </li>
                        </SelectList>
                      </SelectListWrapper>
                      <SelectListWrapper>
                        <strong>
                          출처<span>*</span>
                        </strong>
                        <SourceOptionWrapper>
                          {/* 옵션 리스트 셀렉트 컴포넌트 */}
                          <OptionList />
                        </SourceOptionWrapper>
                      </SelectListWrapper>
                      <SelectListWrapper>
                        <strong>
                          문항타입<span>*</span>
                        </strong>
                        <SelectList>
                          <li>
                            <SelectWrapper>
                              {selectCategory3.map((el) => (
                                <Select
                                  $positionTop
                                  width={'110px'}
                                  height={'30px'}
                                  defaultValue={el.label}
                                  key={el.label}
                                  options={el.options}
                                  onSelect={(event) =>
                                    selectCategoryOption(event)
                                  }
                                />
                              ))}
                            </SelectWrapper>
                          </li>
                        </SelectList>
                      </SelectListWrapper>
                      <SelectListWrapper>
                        <strong>난이도</strong>
                        <SelectList>
                          <li>
                            <SelectWrapper>
                              {selectCategory3.map((el) => (
                                <Select
                                  $positionTop
                                  width={'110px'}
                                  height={'30px'}
                                  defaultValue={el.label}
                                  key={el.label}
                                  options={el.options}
                                  onSelect={(event) =>
                                    selectCategoryOption(event)
                                  }
                                />
                              ))}
                            </SelectWrapper>
                          </li>
                        </SelectList>
                      </SelectListWrapper>
                    </BackgroundWrapper>
                  </div>
                </FlexWrapper>
              </PerfectScrollbar>
            </EditContainerWrapper>
          }
          item2={
            <QuizListWrapper>
              <QuizList
                questionList={questionList}
                $height={`calc(100vh - 130px)`}
                showViewAllButton
                setCheckedList={setCheckedList}
              />
            </QuizListWrapper>
          }
        />
      </ResizeLayoutWrapper>
      {/* </ContentsWrapper> */}
      {/* 하단 버튼 영역 */}
      <BorderWrapper>
        <SubmitButtonWrapper>
          <Button
            buttonType="button"
            onClick={submitSave}
            width={'calc(50% - 5px)'}
            $margin={'0 10px 0 0'}
            $filled
            cursor
          >
            <span>등록</span>
          </Button>
          <Button
            buttonType="button"
            onClick={() => setTabVeiw('문항 분류')}
            width={'calc(50% - 5px)'}
            cursor
          >
            <span>추가 정보 등록</span>
          </Button>
        </SubmitButtonWrapper>
      </BorderWrapper>
      <Modal />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const ResizeLayoutWrapper = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;

const EditContainerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 20px);
  .scrollbar-container {
    width: 100%;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const EditWrapper = styled.div`
  height: calc(100vh - 300px); // 탭 네비 높이, 하단 셀렉트 높이 제외
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
const BackgroundWrapper = styled.div`
  background-color: ${COLOR.BUTTON_LIGHT_NORMAL};
  padding-bottom: 100px;
  max-width: 500px;
`;
const QuizListWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  height: calc(100vh - 20px);

  &:has('.shrink-0 ') {
    align-items: flex-start;
  }
`;
const SelectListWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 0 15px;

  strong {
    min-width: 40px;
    padding-top: 10px;
    /* line-height: 1.2; */
    font-size: 15px;
    padding-right: 10px;
    position: relative;
    span {
      position: absolute;
      top: 10px;
      right: 0px;
      color: ${COLOR.RED};
      font-size: 14px;
    }
  }

  &:last-child {
    padding-bottom: 20px;
  }
  &:nth-child(1) {
    padding-top: 20px;
  }
`;

const SourceOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SelectList = styled.ul`
  padding: 5px 10px;

  li {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  color: ${COLOR.GRAY};
`;

const BorderWrapper = styled.div`
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  position: fixed;
  bottom: 0px;
  right: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #fff;
`;
const SubmitButtonWrapper = styled.div`
  position: absolute;
  right: 30px;
  left: auto;
  top: 10px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  width: 50%;
`;
