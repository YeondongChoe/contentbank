import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

import { CheckBoxI, DnDWrapper, ResizeLayout } from '../..';
import { ButtonFormatRadio } from '../../../components/molecules';
import { COLOR } from '../../constants/COLOR';

import {
  questionList,
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

  // 라디오 버튼 설정
  const handleRadioCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    titleValue: string,
  ) => {
    // console.log(e.currentTarget.value);
    // console.log(
    //   e.currentTarget.parentElement?.parentElement?.parentElement
    //     ?.parentElement,
    // );
    setSelected1des(e.currentTarget.value);

    setRadioCheck([
      ...radioCheck,
      {
        title: titleValue,
        checkValue: e.currentTarget.value,
      },
    ]);
  };

  useEffect(() => {
    console.log(radioCheck);
    // 탭 또는 버튼 이동시 이전 단계 저장된 리스트 불러오기
  }, []);

  return (
    <Container>
      <ResizeLayout
        height={'calc(100vh - 100px)'}
        column={'3rd'}
        item1Width={300}
        item1={<QuizList questionList={questionList} showTitle showCheckBox />}
        item2={
          <ScrollWrap>
            <Title>
              <span className="title_top">문항뷰어</span>
            </Title>
          </ScrollWrap>
        }
        item3Width={600}
        item3={
          <ScrollWrap>
            <Title>
              <span className="title_top">문항단원분류</span>
            </Title>

            {selectCategory4.map((meta, index) => (
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
            {selected1des.length === 0 ? (
              <></>
            ) : (
              selectCategory3.map((meta) => (
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
