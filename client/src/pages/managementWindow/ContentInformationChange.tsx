import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { IoSearch } from 'react-icons/io5';
import { MdPublishedWithChanges } from 'react-icons/md';
import { PiArrowCounterClockwise } from 'react-icons/pi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Accordion,
  Button,
  ButtonFormatRadio,
  CheckBoxI,
  DepthBlock,
  Input,
  MathViewer,
  PaginationBox,
  ResizeLayout,
  Search,
  ValueNone,
} from '../../components';
import { COLOR } from '../../components/constants';
//TODO: 더미데이터
import {
  questionList,
  metaList,
  depthBlockList,
} from '../../components/contents/createcontent/contentCreatingCategory';
import { QuizList } from '../../components/contents/createcontent/list';
import { QuestionTableType } from '../../types';

export function ContentInformationChange() {
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [selected5depth, setSelected5depth] = useState<string>('');
  const [selected6depth, setSelected6depth] = useState<string>('');
  const [selected7depth, setSelected7depth] = useState<string>('');
  const [radioCheck, setRadioCheck] = useState<
    { title: string; checkValue: string }[]
  >([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [changeValue, setChangeValue] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkedDepthList, setCheckedDepthList] = useState<string[]>([]);

  // 라디오 버튼 설정
  const handleRadioCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    titleValue: string,
  ) => {
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];

    switch (depth) {
      case '1depth':
        setSelected1depth(e.currentTarget.value);
        break;
      case '2depth':
        setSelected2depth(e.currentTarget.value);
        break;
      case '3depth':
        setSelected3depth(e.currentTarget.value);
        break;
      case '4depth':
        setSelected4depth(e.currentTarget.value);
        break;
      case '5depth':
        setSelected5depth(e.currentTarget.value);
        break;
      case '6depth':
        setSelected6depth(e.currentTarget.value);
        break;
      case '7depth':
        setSelected7depth(e.currentTarget.value);
        break;
    }

    setRadioCheck([
      ...radioCheck,
      {
        title: titleValue,
        checkValue: e.currentTarget.value,
      },
    ]);
  };

  // 깊이가 있는 리스트 체크박스
  const handleSingleCheck = (checked: boolean, id: string) => {
    // console.log('click');

    if (checked) {
      setCheckedDepthList((prev) => [...prev, id]);
    } else {
      setCheckedDepthList(checkedDepthList.filter((el) => el !== id));
    }
  };

  const buttonDisabled = useMemo(() => {
    if (
      searchValue.length > 1 && //2글자 이상
      selected1depth.length &&
      selected2depth.length &&
      selected3depth.length &&
      selected4depth.length &&
      selected5depth.length &&
      selected6depth.length &&
      selected7depth.length
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    searchValue,
    selected1depth,
    selected2depth,
    selected3depth,
    selected4depth,
    selected5depth,
    selected6depth,
    selected7depth,
  ]);

  return (
    <Container>
      <ResizeLayout
        height={'calc(100vh - 100px)'}
        column={'3rd'}
        item1Width={400}
        minWidth={330}
        maxWidth={1000}
        item1={
          <PositionWrapper>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP1</span> 찾을 내용 입력
              </span>
            </Title>
            <ScrollWrapper>
              <PerfectScrollbar>
                <div className="meta_radio_select">
                  <div className="1depth">
                    {metaList[0].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected1depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                        $margin={index === 0 ? `10px 0 0 0` : ''}
                      />
                    ))}
                  </div>
                  <div className="2depth">
                    {metaList[1].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected2depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="3depth">
                    {metaList[2].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected3depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="4depth">
                    {metaList[3].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected4depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="5depth">
                    {metaList[4].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected5depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="6depth">
                    {metaList[5].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected6depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="7depth">
                    {metaList[6].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected7depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                </div>
                <div className="meta_accordion_select">
                  {selected1depth &&
                    selected2depth &&
                    selected3depth &&
                    selected4depth &&
                    selected5depth &&
                    selected6depth &&
                    selected7depth && (
                      <>
                        <strong>세부 검색조건</strong>
                        <Accordion
                          $backgroundColor={`${COLOR.GRAY}`}
                          title={`${selected1depth}`}
                          id={`세부 검색조건 ${selected1depth}`}
                          $margin={`0`}
                        >
                          <>
                            {depthBlockList.map((item) => (
                              <DepthBlock
                                key={`depthList${item.id}`}
                                classNameList={`depth-${item.depth}`}
                                id={item.id}
                                name={item.name}
                                value={item.value}
                                onChange={(e) =>
                                  handleSingleCheck(e.target.checked, item.id)
                                }
                                checked={
                                  checkedDepthList.includes(item.id as string)
                                    ? true
                                    : false
                                }
                              >
                                <span>{item.label}</span>
                              </DepthBlock>
                            ))}
                          </>
                        </Accordion>
                      </>
                    )}
                </div>
              </PerfectScrollbar>
            </ScrollWrapper>
            <ButtonWrapper>
              <InputWrapper>
                <input
                  type="text"
                  minLength={2}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="찾을값을 입력해주세요(두글자 이상)"
                />
                <Button
                  width={'80px'}
                  height={'35px'}
                  fontSize={'14px'}
                  $margin={'0 0 0 5px'}
                  cursor
                  $filled
                  $success
                  onClick={() => {}}
                >
                  수식
                </Button>
              </InputWrapper>
              <Button
                $filled
                cursor
                disabled={buttonDisabled}
                onClick={() => {}}
              >
                <span>
                  찾기 <IoSearch />
                </span>
              </Button>
            </ButtonWrapper>
          </PositionWrapper>
        }
        item2={
          <QuizListWrapper>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP2</span> 문항 선택
              </span>
            </Title>
            {questionList.length ? (
              <>
                <QuizList
                  questionList={questionList}
                  $height={`calc(100vh - 220px)`}
                  showTitle
                  showCheckBox
                  showViewAllButton
                  setCheckedList={setCheckedList}
                />
                <ButtonWrapper className="pagination">
                  <PaginationBox itemsCountPerPage={7} totalItemsCount={100} />
                </ButtonWrapper>
              </>
            ) : (
              <ValueNoneWrapper>
                <ValueNone textOnly info={'STEP1 찾을 내용을 입력해주세요'} />
              </ValueNoneWrapper>
            )}
          </QuizListWrapper>
        }
        item3Width={400}
        item3={
          <PositionWrapper>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP3</span> 바꿀 내용 입력
              </span>
            </Title>
            {checkedList.length ? (
              <>
                <ScrollWrapper>
                  <PerfectScrollbar>
                    {/* TODO: 메타데이터 변경 */}

                    <ChangeInfoWrapper>
                      <p className="info_total">
                        선택한 문항 총 {checkedList.length} 건
                      </p>
                      <div className="info_box">
                        {checkedList.length && (
                          <p>
                            총
                            <span className="strong">{checkedList.length}</span>
                            건
                          </p>
                        )}
                        {searchValue && (
                          <p>
                            <span className="strong">{searchValue}</span>
                            를(을)
                          </p>
                        )}
                        {changeValue && (
                          <p>
                            <span className="strong">{changeValue}</span>로 변경
                            하시겠습니까?
                          </p>
                        )}
                      </div>
                    </ChangeInfoWrapper>
                  </PerfectScrollbar>
                </ScrollWrapper>
              </>
            ) : (
              <ValueNoneWrapper>
                <ValueNone textOnly info={'STEP2 문항을 선택해주세요'} />
              </ValueNoneWrapper>
            )}
            <ButtonWrapper>
              <InputWrapper>
                <input
                  type="text"
                  minLength={2}
                  value={changeValue}
                  onChange={(e) => setChangeValue(e.target.value)}
                  placeholder="변경값을 입력해주세요"
                />
                <Button
                  width={'80px'}
                  height={'35px'}
                  fontSize={'14px'}
                  $margin={'0 0 0 5px'}
                  cursor
                  $filled
                  $success
                  onClick={() => {}}
                >
                  수식
                </Button>
              </InputWrapper>
              <Button
                $filled
                cursor
                disabled={changeValue.length < 2}
                onClick={() => {}}
              >
                <span>
                  바꾸기 <MdPublishedWithChanges />
                </span>
              </Button>
            </ButtonWrapper>
          </PositionWrapper>
        }
      />
    </Container>
  );
}
const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
const PositionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 280px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;
  }

  .meta_accordion_select {
    padding: 20px;
  }
  .meta_accordion_select {
    strong {
      display: flex;
      font-size: 15px;
      margin-bottom: 5px;
    }
  }
`;
const QuizListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 38px);
  background-color: ${COLOR.LIGHT_GRAY};
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
  height: fit-content;
  .title_top {
    display: flex;
    align-items: center;
    font-size: 15px;
    /* font-weight: bold; */
  }
  .point_text {
    font-size: 25px;
    color: #1976d2;
    padding-right: 15px;
    font-weight: bold;
  }
`;
// const Span = styled.span`
//   color: #1976d2;
// `;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  width: 100%;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 5px;

  > input {
    width: calc(100% - 85px);
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  box-shadow:
    rgba(0, 17, 255, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;

  .pagination {
    padding-bottom: 12px;
  }
`;
const ValueNoneWrapper = styled.div`
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
  height: 100%;
`;
const ChangeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  .info_total {
    color: #fff;
    font-weight: bold;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: ${COLOR.FONT_NAVI};
  }
  .info_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: ${COLOR.SECONDARY};
    /* font-weight: bold; */
    position: absolute;
    top: calc(50% - 60px);
    padding: 20px;

    p {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 2px;
    }
  }

  .strong {
    background-color: ${COLOR.FONT_NAVI};
    color: #fff;
    padding: 2px;
  }
`;
