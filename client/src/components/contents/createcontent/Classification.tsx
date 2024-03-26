import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { Button, ResizeLayout, ValueNone } from '../..';
import {
  Accordion,
  ButtonFormatRadio,
  DepthBlock,
  Search,
} from '../../../components/molecules';
import { COLOR } from '../../constants/COLOR';

import {
  questionList,
  selectCategory0,
  selectCategory1,
  selectCategory2,
  selectCategory3,
  selectCategory4,
  depthBlockList,
  selectCategoryEtc1,
  selectCategoryEtc2,
} from './contentCreatingCategory'; // TODO : 더미데이터
import { QuizList } from './list';

export function Classification() {
  // const ContentList = dummy.ContentInfo;
  const [checkList, setCheckList] = useState<string[]>([]);

  const [radioCheck, setRadioCheck] = useState<
    { title: string; checkValue: string }[]
  >([]);
  // const [targetValue, setTargetValue] = useState('');
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [selectedCategoryEtc1, setSelectedCategoryEtc1] = useState<string>('');
  const [selectedCategoryEtc2, setSelectedCategoryEtc2] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkedDepthList, setCheckedDepthList] = useState<string[]>([]);
  // 라디오 버튼 설정
  const handleRadioCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    titleValue: string,
  ) => {
    // console.log(
    //   e.target.parentElement?.parentElement?.parentElement?.parentElement
    //     ?.parentElement?.classList[0],
    // );
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
      case 'etc1':
        setSelectedCategoryEtc1(e.currentTarget.value);
        break;
      case 'etc2':
        setSelectedCategoryEtc2(e.currentTarget.value);
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

  useEffect(() => {
    console.log('radioCheck', radioCheck);
    // 탭 또는 버튼 이동시 이전 단계 저장된 리스트 불러오기
  }, []);

  return (
    <Container>
      <ResizeLayoutWrapper>
        <ResizeLayout
          height={'calc(100vh - 100px)'}
          column={'3rd'}
          item1Width={300}
          item1={
            <QuizList
              questionList={questionList}
              showTitle
              showCheckBox
              fontBold
              setCheckedList={setCheckedList}
            />
          }
          item2={
            <ScrollWrapper>
              <PerfectScrollbar>
                <ViewerWrapper>
                  <Title>
                    <span className="title_top">문항뷰어</span>
                  </Title>
                </ViewerWrapper>
              </PerfectScrollbar>
            </ScrollWrapper>
          }
          item3Width={600}
          item3={
            <ScrollWrapper>
              <PerfectScrollbar>
                <Title>
                  <span className="title_top">문항단원분류</span>
                </Title>
                {/* 추가된 단원분류 리스트 최대5개 저장 */}
                <p>교과 리스트 블록</p>
                {/* TODO: 메타데이터 변경 */}
                <div className="1depth">
                  {selectCategory0.map((meta, index) => (
                    <ButtonFormatRadio
                      key={`${meta.id}`}
                      titleText={`${meta.label}`}
                      list={meta.options}
                      selected={selected1depth}
                      onChange={(e) => handleRadioCheck(e, meta.label)}
                      // defaultChecked={} //저장된 값 디폴트체크로
                      checkedInput={radioCheck}
                      $margin={index === 0 ? `10px 0 0 0` : ''}
                    />
                  ))}
                </div>
                <div className="2depth">
                  {selected1depth.length === 0 ? (
                    <></>
                  ) : (
                    selectCategory2.map((meta) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected2depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={} //저장된 값 디폴트체크로
                        checkedInput={radioCheck}
                      />
                    ))
                  )}
                </div>
                <div className="3depth">
                  {selected2depth.length === 0 ? (
                    <></>
                  ) : (
                    selectCategory3.map((meta) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected3depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={} //저장된 값 디폴트체크로
                        checkedInput={radioCheck}
                      />
                    ))
                  )}
                </div>
                <div className="4depth">
                  {selected3depth.length === 0 ? (
                    <></>
                  ) : (
                    selectCategory4.map((meta) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected4depth}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={} //저장된 값 디폴트체크로
                        checkedInput={radioCheck}
                      />
                    ))
                  )}
                </div>
                <p className="line"></p>

                {/* 아코디언 리스트  */}
                {radioCheck.length > 3 ? (
                  <AccordionWrapper>
                    <Accordion
                      title={`${radioCheck[0].checkValue}/${radioCheck[1].checkValue}/${radioCheck[2].checkValue}/${radioCheck[3].checkValue}`}
                      id={`${radioCheck[0].checkValue}/${radioCheck[1].checkValue}/${radioCheck[2].checkValue}/${radioCheck[3].checkValue}`}
                    >
                      <RowListWrapper>
                        <Search
                          value={''}
                          height={'30px'}
                          onClick={() => {}}
                          onChange={() => {}}
                          onKeyDown={() => {}}
                        />
                        <p className="line bottom_text">Total : {`${0}`}</p>
                        <DepthBlockScrollWrapper>
                          <PerfectScrollbar>
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
                          </PerfectScrollbar>
                        </DepthBlockScrollWrapper>
                      </RowListWrapper>
                    </Accordion>

                    <Accordion
                      title={'추가정보'}
                      id={'추가정보'}
                      $margin={'4px 0 0 0 '}
                    >
                      <RowListWrapper>
                        <div className="etc1">
                          {selectCategoryEtc1.map((meta) => (
                            <ButtonFormatRadio
                              key={`${meta.id}`}
                              titleText={`${meta.label}`}
                              list={meta.options}
                              selected={selectedCategoryEtc1}
                              onChange={(e) => handleRadioCheck(e, meta.label)}
                              // defaultChecked={} //저장된 값 디폴트체크로
                              checkedInput={radioCheck}
                            />
                          ))}
                        </div>
                        <div className="etc2">
                          {selectCategoryEtc2.map((meta) => (
                            <ButtonFormatRadio
                              key={`${meta.id}`}
                              titleText={`${meta.label}`}
                              list={meta.options}
                              selected={selectedCategoryEtc2}
                              onChange={(e) => handleRadioCheck(e, meta.label)}
                              // defaultChecked={} //저장된 값 디폴트체크로
                              checkedInput={radioCheck}
                            />
                          ))}
                        </div>
                      </RowListWrapper>
                    </Accordion>
                  </AccordionWrapper>
                ) : (
                  <ValueNoneWrapper>
                    <ValueNone
                      textOnly
                      info="교육과정, 학교급, 학년, 학기를 선택해주세요"
                    />
                  </ValueNoneWrapper>
                )}
              </PerfectScrollbar>
            </ScrollWrapper>
          }
        />
      </ResizeLayoutWrapper>
      <BorderWrapper>
        <SubmitButtonWrapper>
          <Button
            $filled
            disabled={false}
            cursor
            width={'calc(50% - 5px)'}
            $margin={'0 10px 0 0'}
            onClick={() => {}}
          >
            교과정보 추가
          </Button>
          <Button
            $filled
            disabled={true}
            cursor
            width={'calc(50% - 5px)'}
            onClick={() => {}}
          >
            저장
          </Button>
        </SubmitButtonWrapper>
      </BorderWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
const ResizeLayoutWrapper = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  height: calc(100vh - 100px);
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
`;
const DepthBlockScrollWrapper = styled.div`
  overflow-y: auto;
  /* height: 300px; */
  width: 100%;
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  .title_top {
    font-size: 15px;
    font-weight: bold;
  }
`;
const AccordionWrapper = styled.div`
  margin: 10px;
`;
const RowListWrapper = styled.div`
  padding: 10px;
`;
const ValueNoneWrapper = styled.div`
  display: flex;
`;
const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const BorderWrapper = styled.div`
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  position: sticky;
  bottom: 0px;
  width: 100%;
  height: 70px;
  background-color: #fff;
`;
const SubmitButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  left: auto;
  top: 10px;
  bottom: 0;
  display: flex;
  flex-direction: row;
  width: 50%;
`;
