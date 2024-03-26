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
  DepthBlock,
  PaginationBox,
  ResizeLayout,
  ValueNone,
} from '../../components';
import { COLOR } from '../../components/constants';
//TODO: 더미데이터
import {
  questionList,
  metaList,
  depthBlockList,
  metaListChange,
} from '../../components/contents/createcontent/contentCreatingCategory';
import { QuizList } from '../../components/contents/createcontent/list';

export function ContentCategoryChange() {
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
  const [changeVlaue1depth, setChangeVlaue1depth] = useState<string>('');
  const [changeVlaue2depth, setChangeVlaue2depth] = useState<string>('');
  const [changeVlaue3depth, setChangeVlaue3depth] = useState<string>('');
  const [changeVlaue4depth, setChangeVlaue4depth] = useState<string>('');
  const [changeVlaue5depth, setChangeVlaue5depth] = useState<string>('');
  const [changeVlaue6depth, setChangeVlaue6depth] = useState<string>('');
  const [radioChangeCheck, setRadioChangeCheck] = useState<
    { title: string; checkValue: string }[]
  >([]);

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkedDepthList, setCheckedDepthList] = useState<string[]>([]);

  // 라디오 버튼 설정
  const handleRadioCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
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
        title: e.currentTarget.attributes[1].value,
        checkValue: value,
      },
    ]);
  };
  const handleRadioChangeValueCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];

    // console.log(e.currentTarget.attributes[1].value);

    switch (depth) {
      case '1depthChangeValue':
        setChangeVlaue1depth(e.currentTarget.value);
        break;
      case '2depthChangeValue':
        setChangeVlaue2depth(e.currentTarget.value);
        break;
      case '3depthChangeValue':
        setChangeVlaue3depth(e.currentTarget.value);
        break;
      case '4depthChangeValue':
        setChangeVlaue4depth(e.currentTarget.value);
        break;
      case '5depthChangeValue':
        setChangeVlaue5depth(e.currentTarget.value);
        break;
      case '6depthChangeValue':
        setChangeVlaue6depth(e.currentTarget.value);
        break;
    }

    setRadioChangeCheck([
      ...radioChangeCheck,
      {
        title: e.currentTarget.attributes[1].value,
        checkValue: value,
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
    selected1depth,
    selected2depth,
    selected3depth,
    selected4depth,
    selected5depth,
    selected6depth,
    selected7depth,
  ]);

  const changeButtonDisabled = useMemo(() => {
    if (
      changeVlaue1depth.length &&
      changeVlaue2depth.length &&
      changeVlaue3depth.length &&
      changeVlaue4depth.length &&
      changeVlaue5depth.length &&
      changeVlaue6depth.length
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    changeVlaue1depth,
    changeVlaue2depth,
    changeVlaue3depth,
    changeVlaue4depth,
    changeVlaue5depth,
    changeVlaue6depth,
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
                <span className="point_text">STEP1</span> 찾을 분류 선택
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
                        onChange={(e) => handleRadioCheck(e, meta.value)}
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
                        onChange={(e) => handleRadioCheck(e, meta.value)}
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
                        onChange={(e) => handleRadioCheck(e, meta.value)}
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
                        onChange={(e) => handleRadioCheck(e, meta.value)}
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
                        onChange={(e) => handleRadioCheck(e, meta.value)}
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
                        onChange={(e) => handleRadioCheck(e, meta.value)}
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
                        onChange={(e) => handleRadioCheck(e, meta.value)}
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
                          $margin={`0 0 170px 0`}
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
                <ValueNone textOnly info={'STEP1 찾을 분류를 선택해주세요'} />
              </ValueNoneWrapper>
            )}
          </QuizListWrapper>
        }
        item3Width={400}
        item3={
          <PositionWrapper>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP3</span> 바꿀 분류 선택
              </span>
            </Title>
            {checkedList.length ? (
              <ScrollWrapper>
                <PerfectScrollbar>
                  <ChangeInfoWrapper>
                    <p className="info_total">
                      선택한 문항 총 {checkedList.length} 건
                    </p>
                    <div className="meta_radio_select">
                      <div className="1depthChangeValue">
                        {metaListChange[0].data.map((meta, index) => (
                          <ButtonFormatRadio
                            key={`${meta.id}`}
                            titleText={`${meta.label}`}
                            list={meta.options}
                            selected={changeVlaue1depth}
                            onChange={(e) =>
                              handleRadioChangeValueCheck(e, meta.value)
                            }
                            // defaultChecked={}
                            checkedInput={radioChangeCheck}
                            $margin={index === 0 ? `10px 0 0 0` : ''}
                          />
                        ))}
                      </div>
                      <div className="2depthChangeValue">
                        {metaListChange[1].data.map((meta, index) => (
                          <ButtonFormatRadio
                            key={`${meta.id}`}
                            titleText={`${meta.label}`}
                            list={meta.options}
                            selected={changeVlaue2depth}
                            onChange={(e) =>
                              handleRadioChangeValueCheck(e, meta.value)
                            }
                            // defaultChecked={}
                            checkedInput={radioChangeCheck}
                          />
                        ))}
                      </div>
                      <div className="3depthChangeValue">
                        {metaListChange[2].data.map((meta, index) => (
                          <ButtonFormatRadio
                            key={`${meta.id}`}
                            titleText={`${meta.label}`}
                            list={meta.options}
                            selected={changeVlaue3depth}
                            onChange={(e) =>
                              handleRadioChangeValueCheck(e, meta.value)
                            }
                            // defaultChecked={}
                            checkedInput={radioChangeCheck}
                          />
                        ))}
                      </div>
                      <div className="4depthChangeValue">
                        {metaListChange[3].data.map((meta, index) => (
                          <ButtonFormatRadio
                            key={`${meta.id}`}
                            titleText={`${meta.label}`}
                            list={meta.options}
                            selected={changeVlaue4depth}
                            onChange={(e) =>
                              handleRadioChangeValueCheck(e, meta.value)
                            }
                            // defaultChecked={}
                            checkedInput={radioChangeCheck}
                          />
                        ))}
                      </div>
                      <div className="5depthChangeValue">
                        {metaListChange[4].data.map((meta, index) => (
                          <ButtonFormatRadio
                            key={`${meta.id}`}
                            titleText={`${meta.label}`}
                            list={meta.options}
                            selected={changeVlaue5depth}
                            onChange={(e) =>
                              handleRadioChangeValueCheck(e, meta.value)
                            }
                            // defaultChecked={}
                            checkedInput={radioChangeCheck}
                          />
                        ))}
                      </div>
                      <div className="6depthChangeValue">
                        {metaListChange[5].data.map((meta, index) => (
                          <ButtonFormatRadio
                            key={`${meta.id}`}
                            titleText={`${meta.label}`}
                            list={meta.options}
                            selected={changeVlaue6depth}
                            onChange={(e) =>
                              handleRadioChangeValueCheck(e, meta.value)
                            }
                            // defaultChecked={}
                            checkedInput={radioChangeCheck}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="meta_accordion_select">
                      {/* <strong>세부 검색조건</strong> */}
                      {radioChangeCheck[0] && (
                        <Accordion
                          $backgroundColor={`${COLOR.GRAY}`}
                          title={`${radioChangeCheck[0].title}`}
                          id={`세부 검색조건 ${radioChangeCheck[0].title}`}
                          $margin={`0 0 170px 0`}
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
                      )}
                    </div>
                  </ChangeInfoWrapper>
                </PerfectScrollbar>
              </ScrollWrapper>
            ) : (
              <ValueNoneWrapper>
                <ValueNone textOnly info={'STEP2 문항을 선택해주세요'} />
              </ValueNoneWrapper>
            )}
            <ButtonWrapper>
              <Button
                $filled
                cursor
                disabled={changeButtonDisabled}
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
  height: calc(100vh - 70px);
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
  height: calc(110vh);
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
