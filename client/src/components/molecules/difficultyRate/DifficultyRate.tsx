import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

import { quizService } from '../../../api/axios';
import { DifficultyDataType } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { Input, Button, Label, openToastifyAlert } from '../../atom';
import { COLOR } from '../../constants';

type DifficultyRateProps = {
  onClose: () => void;
  difficultyData: DifficultyDataType[];
  setDifficultyData: React.Dispatch<React.SetStateAction<DifficultyDataType[]>>;
};

export function DifficultyRate({
  onClose,
  difficultyData,
  setDifficultyData,
}: DifficultyRateProps) {
  const [processDifficultyData, setProcessDifficultyData] = useState<
    DifficultyDataType[]
  >([]);
  //최초 값이 들어왔을때 총점 가공 데이타
  useEffect(() => {
    if (difficultyData && difficultyData.length > 0) {
      const updatedData = difficultyData.map((data) => ({
        ...data,
        title: `${data.type === 'LOWER' ? '하' : data.type === 'INTERMEDIATE' ? '중하' : data.type === 'MEDIUM' ? '중' : data.type === 'UPPER' ? '상' : data.type === 'BEST' ? '최상' : 0} 선택시`,
        total:
          data.best + data.upper + data.medium + data.intermediate + data.lower,
      }));
      setProcessDifficultyData(updatedData);
    }
  }, [difficultyData]);

  //인풋의 값을 바꿜을 때 갱신하며 총점도 갱신
  const handleInputChange = (
    index: number,
    field: keyof DifficultyDataType,
    value: string,
  ) => {
    const newValue = parseInt(value, 10);
    const boundedValue = isNaN(newValue)
      ? 0
      : Math.min(Math.max(newValue, 0), 100);

    setProcessDifficultyData((prevState) => {
      const updatedData = [...prevState];
      updatedData[index] = {
        ...updatedData[index],
        [field]: boundedValue,
        total:
          updatedData[index].best +
          updatedData[index].upper +
          updatedData[index].medium +
          updatedData[index].intermediate +
          updatedData[index].lower +
          (field === 'best'
            ? boundedValue - updatedData[index].best
            : field === 'upper'
              ? boundedValue - updatedData[index].upper
              : field === 'medium'
                ? boundedValue - updatedData[index].medium
                : field === 'intermediate'
                  ? boundedValue - updatedData[index].intermediate
                  : field === 'lower'
                    ? boundedValue - updatedData[index].lower
                    : 0),
      };

      return updatedData;
    });
  };

  const saveDifficultyRate = () => {
    const allTotalsAreHundred = processDifficultyData.every(
      (el) => el.total === 100,
    );
    const data = prepareDataForServer(processDifficultyData);

    if (!allTotalsAreHundred) {
      openToastifyAlert({
        type: 'error',
        text: '난이도 별로 출제 비율의 총 합은 각각 100이 되어야합니다. 다시 확인해주세요.',
      });
    } else {
      setDifficultyData(data);
      putDifficultyData({ difficultyList: data });
    }
  };

  //서버로 요청보낼 데이터 추출
  const prepareDataForServer = (data: DifficultyDataType[]) => {
    return data.map(({ total, title, ...rest }) => rest);
  };

  // 난이도 비율 수정 api
  const putDifficulty = async (data: any) => {
    return await quizService.put(`/v1/difficulty`, data);
  };

  const { mutate: putDifficultyData } = useMutation({
    mutationFn: putDifficulty,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      openToastifyAlert({
        type: 'success',
        text: '난이도 별로 출제 비율이 저장되었습니다.',
      });
      onClose();
    },
  });

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
      <InputContainer>
        {processDifficultyData.map((item, i) => (
          <InputWrapper key={i}>
            <Label value={item.title as string} fontSize="16px" width="200px" />
            <Input
              className="하"
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={item.lower.toString()}
              onChange={(e) => handleInputChange(i, 'lower', e.target.value)}
            ></Input>
            <Input
              className="중하"
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={item.intermediate.toString()}
              onChange={(e) =>
                handleInputChange(i, 'intermediate', e.target.value)
              }
            ></Input>
            <Input
              className="중"
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={item.medium.toString()}
              onChange={(e) => handleInputChange(i, 'medium', e.target.value)}
            ></Input>
            <Input
              className="상"
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={item.upper.toString()}
              onChange={(e) => handleInputChange(i, 'upper', e.target.value)}
            ></Input>
            <Input
              className="최상"
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              value={item.best.toString()}
              onChange={(e) => handleInputChange(i, 'best', e.target.value)}
            ></Input>
            <Input
              className="총합"
              width="80px"
              height="40px"
              padding="10px"
              border="normal"
              fontSize="14px"
              type="text"
              placeholderTextAlign
              error={item.total !== 100}
              value={item.total?.toString()}
            ></Input>
          </InputWrapper>
        ))}
      </InputContainer>
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
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
