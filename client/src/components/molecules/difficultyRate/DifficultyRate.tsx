import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

import { Input, Button, Label, openToastifyAlert } from '../../atom';
import { COLOR } from '../../constants';

type DifficultyRateProps = {
  onClose: () => void;
};

export function DifficultyRate({ onClose }: DifficultyRateProps) {
  const [bestValue, setBestValue] = useState([
    { lower: '0' },
    { lowerMiddle: '0' },
    { middle: '30' },
    { upper: '30' },
    { best: '40' },
  ]);
  const bestValuesum = bestValue
    .reduce((acc, curr) => {
      return acc + parseInt(Object.values(curr)[0], 10);
    }, 0)
    .toString();
  const [upperValue, setUpperValue] = useState([
    { lower: '0' },
    { lowerMiddle: '20' },
    { middle: '30' },
    { upper: '30' },
    { best: '20' },
  ]);
  const upperValuesum = upperValue
    .reduce((acc, curr) => {
      return acc + parseInt(Object.values(curr)[0], 10);
    }, 0)
    .toString();
  const [middleValue, setMiddleValue] = useState([
    { lower: '10' },
    { lowerMiddle: '20' },
    { middle: '40' },
    { upper: '20' },
    { best: '10' },
  ]);
  const middleValuesum = middleValue
    .reduce((acc, curr) => {
      return acc + parseInt(Object.values(curr)[0], 10);
    }, 0)
    .toString();
  const [lowerMiddleValue, setLowerMiddleValue] = useState([
    { lower: '20' },
    { lowerMiddle: '40' },
    { middle: '30' },
    { upper: '10' },
    { best: '0' },
  ]);
  const lowerMiddleValuesum = lowerMiddleValue
    .reduce((acc, curr) => {
      return acc + parseInt(Object.values(curr)[0], 10);
    }, 0)
    .toString();
  const [lowerValue, setLowerValue] = useState([
    { lower: '40' },
    { lowerMiddle: '40' },
    { middle: '20' },
    { upper: '0' },
    { best: '0' },
  ]);
  const lowerValuesum = lowerValue
    .reduce((acc, curr) => {
      return acc + parseInt(Object.values(curr)[0], 10);
    }, 0)
    .toString();

  const saveDifficultyRate = () => {
    const bestValuesumNum = parseInt(bestValuesum);
    const upperValuesumNum = parseInt(upperValuesum);
    const middleValuesumNum = parseInt(middleValuesum);
    const lowerMiddleValuesumNum = parseInt(lowerMiddleValuesum);
    const lowerValuesumNum = parseInt(lowerValuesum);

    if (
      bestValuesumNum !== 100 ||
      upperValuesumNum !== 100 ||
      middleValuesumNum !== 100 ||
      lowerMiddleValuesumNum !== 100 ||
      lowerValuesumNum !== 100
    ) {
      openToastifyAlert({
        type: 'error',
        text: '난이도 별로 출제 비율의 총 합은 각각 100이 되어야합니다. 다시 확인해주세요.',
      });
    } else {
      openToastifyAlert({
        type: 'success',
        text: '난이도 별로 출제 비율이 저장되었습니다.',
      });
      onClose();
    }
  };

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Label value="난이도 비율 선택" fontSize="25px" width="210px" />
          <SubTitle>
            난이도 별로 출제 비율의 총합은 각각 100이 되어야 합니다.
          </SubTitle>
        </TitleWrapper>
        <IoMdClose
          onClick={onClose}
          style={{ fontSize: '25px', cursor: 'pointer' }}
        />
      </Wrapper>
      <Category>
        <CategoryOption>하</CategoryOption>
        <CategoryOption>중하</CategoryOption>
        <CategoryOption>중</CategoryOption>
        <CategoryOption>상</CategoryOption>
        <CategoryOption>최상</CategoryOption>
        <CategoryOption>총합</CategoryOption>
      </Category>
      <div>
        <InputWrapper>
          <Label value="최상 선택시" fontSize="16px" width="200px" />
          {bestValue.map((best, i) => (
            <Input
              key={i}
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={Object.values(best)[0]}
              onChange={(e) => {
                const newValue = e.target.value;
                setBestValue((prevState) => {
                  const updatedValue = [...prevState];
                  const parsedValue = parseInt(newValue, 10);
                  const newValueToSet = isNaN(parsedValue)
                    ? 0
                    : Math.min(Math.max(parsedValue, 0), 100);
                  // 상태 업데이트
                  updatedValue[i] = {
                    ...updatedValue[i],
                    [Object.keys(best)[0]]: newValueToSet.toString(),
                  };

                  return updatedValue;
                });
              }}
            />
          ))}
          <Input
            width="80px"
            height="40px"
            padding="10px"
            border="normal"
            fontSize="14px"
            type="text"
            placeholderTextAlign
            value={bestValuesum}
          />
        </InputWrapper>
        <InputWrapper>
          <Label value="상 선택시" fontSize="16px" width="200px" />
          {upperValue.map((upper, i) => (
            <Input
              key={i}
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={Object.values(upper)[0]}
              onChange={(e) => {
                const newValue = e.target.value;
                setUpperValue((prevState) => {
                  const updatedValue = [...prevState];
                  const parsedValue = parseInt(newValue, 10);
                  const newValueToSet = isNaN(parsedValue)
                    ? 0
                    : Math.min(Math.max(parsedValue, 0), 100);
                  // 상태 업데이트
                  updatedValue[i] = {
                    ...updatedValue[i],
                    [Object.keys(upper)[0]]: newValueToSet.toString(),
                  };

                  return updatedValue;
                });
              }}
            />
          ))}
          <Input
            width="80px"
            height="40px"
            padding="10px"
            border="normal"
            fontSize="14px"
            type="text"
            placeholder="0"
            placeholderTextAlign
            value={upperValuesum}
          />
        </InputWrapper>
        <InputWrapper>
          <Label value="중 선택시" fontSize="16px" width="200px" />
          {middleValue.map((middle, i) => (
            <Input
              key={i}
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              placeholderSize="14px"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={Object.values(middle)[0]}
              onChange={(e) => {
                const newValue = e.target.value;
                setMiddleValue((prevState) => {
                  const updatedValue = [...prevState];
                  const parsedValue = parseInt(newValue, 10);
                  const newValueToSet = isNaN(parsedValue)
                    ? 0
                    : Math.min(Math.max(parsedValue, 0), 100);
                  // 상태 업데이트
                  updatedValue[i] = {
                    ...updatedValue[i],
                    [Object.keys(middle)[0]]: newValueToSet.toString(),
                  };

                  return updatedValue;
                });
              }}
            />
          ))}
          <Input
            width="80px"
            height="40px"
            padding="10px"
            border="normal"
            fontSize="14px"
            type="text"
            placeholder="0"
            placeholderTextAlign
            value={middleValuesum}
          />
        </InputWrapper>
        <InputWrapper>
          <Label value="중하 선택시" fontSize="16px" width="200px" />
          {lowerMiddleValue.map((lowerMiddle, i) => (
            <Input
              key={i}
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={Object.values(lowerMiddle)[0]}
              onChange={(e) => {
                const newValue = e.target.value;
                setLowerMiddleValue((prevState) => {
                  const updatedValue = [...prevState];
                  const parsedValue = parseInt(newValue, 10);
                  const newValueToSet = isNaN(parsedValue)
                    ? 0
                    : Math.min(Math.max(parsedValue, 0), 100);
                  // 상태 업데이트
                  updatedValue[i] = {
                    ...updatedValue[i],
                    [Object.keys(lowerMiddle)[0]]: newValueToSet.toString(),
                  };

                  return updatedValue;
                });
              }}
            />
          ))}
          <Input
            width="80px"
            height="40px"
            padding="10px"
            border="normal"
            fontSize="14px"
            type="text"
            placeholder="0"
            placeholderTextAlign
            value={lowerMiddleValuesum}
          />
        </InputWrapper>
        <InputWrapper>
          <Label value="하 선택시" fontSize="16px" width="200px" />
          {lowerValue.map((lower, i) => (
            <Input
              key={i}
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={Object.values(lower)[0]}
              onChange={(e) => {
                const newValue = e.target.value;
                setLowerValue((prevState) => {
                  const updatedValue = [...prevState];
                  const parsedValue = parseInt(newValue, 10);
                  const newValueToSet = isNaN(parsedValue)
                    ? 0
                    : Math.min(Math.max(parsedValue, 0), 100);
                  // 상태 업데이트
                  updatedValue[i] = {
                    ...updatedValue[i],
                    [Object.keys(lower)[0]]: newValueToSet.toString(),
                  };

                  return updatedValue;
                });
              }}
            />
          ))}
          <Input
            width="80px"
            height="40px"
            padding="10px"
            border="normal"
            fontSize="14px"
            type="text"
            placeholder="0"
            placeholderTextAlign
            value={lowerValuesum}
          />
        </InputWrapper>
      </div>
      <ModalButtonWrapper>
        <Button
          buttonType="button"
          onClick={saveDifficultyRate}
          $padding="10px"
          height={'35px'}
          width={'100px'}
          fontSize="13px"
          $filled
          cursor
        >
          <span>저장</span>
        </Button>
      </ModalButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 1000px;
  height: 500px;
  background-color: white;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  padding: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;
const SubTitle = styled.div`
  font-size: 16px;
`;
const Category = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  gap: 88px;
  border-bottom: 2px solid ${COLOR.BORDER_GRAY};
  padding: 10px 40px;
`;
const CategoryOption = styled.div`
  display: flex;
  justify-content: center;
  width: 45px;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  gap: 53px;
`;
const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  padding-right: 10px;
`;
