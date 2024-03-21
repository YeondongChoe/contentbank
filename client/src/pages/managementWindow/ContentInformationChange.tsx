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
} from '../../components/contents/createcontent/contentCreatingCategory';
import { QuizList } from '../../components/contents/createcontent/list';
import { QuestionTableType } from '../../types';

export function ContentInformationChange() {
  const [selected1des, setSelected1des] = useState<string>('');
  const [selected2des, setSelected2des] = useState<string>('');
  const [selected3des, setSelected3des] = useState<string>('');
  const [selected4des, setSelected4des] = useState<string>('');
  const [selected5des, setSelected5des] = useState<string>('');
  const [selected6des, setSelected6des] = useState<string>('');
  const [selected7des, setSelected7des] = useState<string>('');

  const [radioCheck, setRadioCheck] = useState<
    { title: string; checkValue: string }[]
  >([]);

  const [searchValue, setSearchValue] = useState<string>('');

  // 라디오 버튼 설정
  const handleRadioCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    titleValue: string,
  ) => {
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
      case '5deps':
        setSelected5des(e.currentTarget.value);
        break;
      case '6deps':
        setSelected6des(e.currentTarget.value);
        break;
      case '7deps':
        setSelected7des(e.currentTarget.value);
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

  const buttonDisabled = useMemo(() => {
    if (
      searchValue.length > 1 && //2글자 이상
      selected1des.length &&
      selected2des.length &&
      selected3des.length &&
      selected4des.length &&
      selected5des.length &&
      selected6des.length &&
      selected7des.length
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    searchValue,
    selected1des,
    selected2des,
    selected3des,
    selected4des,
    selected5des,
    selected6des,
    selected7des,
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
          <PositionWrap>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP1</span> 찾을 내용 입력
              </span>
            </Title>
            <ScrollWrap>
              <PerfectScrollbar>
                <div className="meta_radio_select">
                  <div className="1deps">
                    {metaList[0].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected1des}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                        $margin={index === 0 ? `10px 0 0 0` : ''}
                      />
                    ))}
                  </div>
                  <div className="2deps">
                    {metaList[1].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected2des}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="3deps">
                    {metaList[2].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected3des}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="4deps">
                    {metaList[3].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected4des}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="5deps">
                    {metaList[4].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected5des}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="6deps">
                    {metaList[5].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected6des}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                  <div className="7deps">
                    {metaList[6].data.map((meta, index) => (
                      <ButtonFormatRadio
                        key={`${meta.id}`}
                        titleText={`${meta.label}`}
                        list={meta.options}
                        selected={selected7des}
                        onChange={(e) => handleRadioCheck(e, meta.label)}
                        // defaultChecked={}
                        checkedInput={radioCheck}
                      />
                    ))}
                  </div>
                </div>
                <div className="meta_accordion_select">
                  {selected1des &&
                    selected2des &&
                    selected3des &&
                    selected4des &&
                    selected5des &&
                    selected6des &&
                    selected7des && (
                      <>
                        <strong>세부 검색조건</strong>
                        <Accordion
                          $backgroundColor={`${COLOR.GRAY}`}
                          title={`${selected1des}`}
                          id={`세부 검색조건 ${selected1des}`}
                          $margin={`0`}
                        >
                          <>
                            <p>ㅇdsada</p>
                            <p>ㅇdsada</p>
                            <p>ㅇdsada</p>
                            <p>ㅇdsada</p>
                            <p>ㅇdsada</p>
                            <p>ㅇdsada</p>
                            <p>ㅇdsada</p>
                          </>
                        </Accordion>
                      </>
                    )}
                </div>
              </PerfectScrollbar>
            </ScrollWrap>
            <ButtonWrap>
              <InputWrap>
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
              </InputWrap>
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
            </ButtonWrap>
          </PositionWrap>
        }
        item2={
          <QuizListWrap>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP2</span> 문항 선택
              </span>
            </Title>
            <QuizList
              questionList={questionList}
              $height={`calc(100vh - 220px)`}
              showTitle
              showCheckBox
              showViewAllButton
            />
            <ButtonWrap className="pagination">
              <PaginationBox itemsCountPerPage={7} totalItemsCount={100} />
            </ButtonWrap>
          </QuizListWrap>
        }
        item3Width={400}
        item3={
          <PositionWrap>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP3</span> 바꿀 내용 입력
              </span>
            </Title>
            <ScrollWrap>
              <PerfectScrollbar>
                {/* TODO: 메타데이터 변경 */}

                <p className="line"></p>
              </PerfectScrollbar>
            </ScrollWrap>
            <ButtonWrap>
              <InputWrap>
                <input
                  type="text"
                  value={''}
                  onChange={() => {}}
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
              </InputWrap>
              <Button $filled cursor disabled={true} onClick={() => {}}>
                <span>
                  바꾸기 <MdPublishedWithChanges />
                </span>
              </Button>
            </ButtonWrap>
          </PositionWrap>
        }
      />
    </Container>
  );
}
const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
const PositionWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ScrollWrap = styled.div`
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
const QuizListWrap = styled.div`
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
const InputWrap = styled.div`
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
const ButtonWrap = styled.div`
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
