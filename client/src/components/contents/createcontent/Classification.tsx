import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { ResizeLayout, ValueNone } from '../..';
import {
  Accordion,
  ButtonFormatRadio,
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
} from './contentCreatingCategory'; // TODO : 더미데이터
import { QuizList } from './list';

export function Classification() {
  // const ContentList = dummy.ContentInfo;
  const [checkList, setCheckList] = useState<string[]>([]);

  const [radioCheck, setRadioCheck] = useState<
    { title: string; checkValue: string }[]
  >([]);
  // const [targetValue, setTargetValue] = useState('');
  const [selected1des, setSelected1des] = useState<string>('');
  const [selected2des, setSelected2des] = useState<string>('');
  const [selected3des, setSelected3des] = useState<string>('');
  const [selected4des, setSelected4des] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  // 라디오 버튼 설정
  const handleRadioCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    titleValue: string,
  ) => {
    // console.log(
    //   e.target.parentElement?.parentElement?.parentElement?.parentElement
    //     ?.parentElement?.classList[0],
    // );
    const deps =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    switch (deps) {
      case '1deps':
        setSelected1des(e.currentTarget.value);
        break;
      case '2deps':
        setSelected2des(e.currentTarget.value);
        break;
      case '3deps':
        setSelected3des(e.currentTarget.value);
        break;
      case '4deps':
        setSelected4des(e.currentTarget.value);
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

  useEffect(() => {
    console.log('radioCheck', radioCheck);
    // 탭 또는 버튼 이동시 이전 단계 저장된 리스트 불러오기
  }, []);

  return (
    <Container>
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
          <ScrollWrap>
            <PerfectScrollbar>
              <ViewerWrap>
                <Title>
                  <span className="title_top">문항뷰어</span>
                </Title>
              </ViewerWrap>
            </PerfectScrollbar>
          </ScrollWrap>
        }
        item3Width={600}
        item3={
          <ScrollWrap>
            <PerfectScrollbar>
              <Title>
                <span className="title_top">문항단원분류</span>
              </Title>
              {/* TODO: 메타데이터 변경 */}
              <div className="1deps">
                {selectCategory0.map((meta, index) => (
                  <ButtonFormatRadio
                    key={`${meta.id}`}
                    titleText={`${meta.label}`}
                    list={meta.options}
                    selected={selected1des}
                    onChange={(e) => handleRadioCheck(e, meta.label)}
                    // defaultChecked={} //저장된 값 디폴트체크로
                    checkedInput={radioCheck}
                    $margin={index === 0 ? `10px 0 0 0` : ''}
                  />
                ))}
              </div>
              <div className="2deps">
                {selected1des.length === 0 ? (
                  <></>
                ) : (
                  selectCategory2.map((meta) => (
                    <ButtonFormatRadio
                      key={`${meta.id}`}
                      titleText={`${meta.label}`}
                      list={meta.options}
                      selected={selected2des}
                      onChange={(e) => handleRadioCheck(e, meta.label)}
                      // defaultChecked={} //저장된 값 디폴트체크로
                      checkedInput={radioCheck}
                    />
                  ))
                )}
              </div>
              <div className="3deps">
                {selected2des.length === 0 ? (
                  <></>
                ) : (
                  selectCategory3.map((meta) => (
                    <ButtonFormatRadio
                      key={`${meta.id}`}
                      titleText={`${meta.label}`}
                      list={meta.options}
                      selected={selected3des}
                      onChange={(e) => handleRadioCheck(e, meta.label)}
                      // defaultChecked={} //저장된 값 디폴트체크로
                      checkedInput={radioCheck}
                    />
                  ))
                )}
              </div>
              <div className="4deps">
                {selected3des.length === 0 ? (
                  <></>
                ) : (
                  selectCategory4.map((meta) => (
                    <ButtonFormatRadio
                      key={`${meta.id}`}
                      titleText={`${meta.label}`}
                      list={meta.options}
                      selected={selected4des}
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
                <AccordionWrap>
                  <Accordion
                    title={`${radioCheck[0].checkValue}/${radioCheck[1].checkValue}/${radioCheck[2].checkValue}/${radioCheck[3].checkValue}`}
                    id={`${radioCheck[0].checkValue}/${radioCheck[1].checkValue}/${radioCheck[2].checkValue}/${radioCheck[3].checkValue}`}
                  >
                    <RowListWrap>
                      <Search
                        value={''}
                        height={'30px'}
                        onClick={() => {}}
                        onChange={() => {}}
                        onKeyDown={() => {}}
                      />
                      {/* TODO : 분류 데이터 리스트   */}
                      <ul>
                        <li></li>
                      </ul>
                    </RowListWrap>
                  </Accordion>

                  <Accordion
                    title={'추가정보'}
                    id={'추가정보'}
                    $margin={'4px 0 0 0 '}
                  >
                    <RowListWrap>
                      <ul>
                        <li></li>
                      </ul>
                    </RowListWrap>
                  </Accordion>
                </AccordionWrap>
              ) : (
                <ValueNoneWrap>
                  <ValueNone
                    textOnly
                    info="교육과정, 학교급, 학년, 학기를 선택해주세요"
                  />
                </ValueNoneWrap>
              )}
            </PerfectScrollbar>
          </ScrollWrap>
        }
      />
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
const ScrollWrap = styled.div`
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;
  }
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
const AccordionWrap = styled.div`
  margin: 10px;
`;
const RowListWrap = styled.div`
  padding: 10px;
`;
const ValueNoneWrap = styled.div`
  display: flex;
`;
const ViewerWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
