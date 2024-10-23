import * as React from 'react';
import { useState, useEffect } from 'react';

import { Default } from 'react-toastify/dist/utils';
import styled from 'styled-components';

import { Alert } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';
import { Button, Select } from '../../../atom';
import { COLOR } from '../../../constants';

type ProcessListProps = {
  title: string;
  type: string;
  card: { name: string; id: string; authority: string }[];
};

type EditModalProps = {
  processListData: ProcessListProps[];
};

export function ProcessEditModal({ processListData }: EditModalProps) {
  const selectList = [
    {
      name: '검수',
    },
    {
      name: '편집',
    },
  ];
  const { closeModal } = useModal();
  // 기존에 설정되어 있는 단계 값을 저장
  const [processList, setProcessList] =
    useState<ProcessListProps[]>(processListData);
  //프로세스 저장
  const [isProcessSave, setIsProcessSave] = useState(false);
  const clickProcessSave = () => {
    setIsProcessSave(true);
  };

  const increaseButtonHandler = () => {
    const data = {
      title: '검수',
      type: '조회',
      card: [],
    };
    setProcessList((prev) => [...prev, data]);
  };

  const decreaseButtonHandler = () => {
    setProcessList((prev) => prev.slice(0, -1));
  };

  return (
    <Container>
      <Title>단계 수정</Title>
      <ListWrapper>
        <DefaultSelect>제작</DefaultSelect>
        <Arrow>&gt;</Arrow>
        {processList.slice(1).map((process, i) => (
          <React.Fragment key={i}>
            <Select
              width="120px"
              height="35px"
              defaultValue={process.title}
              isnormalizedOptions
              options={selectList}
            />
            {/* 마지막에는 > 추가 안함 */}
            {i < processList.slice(1).length - 1 && <Arrow>&gt;</Arrow>}
          </React.Fragment>
        ))}
        <ButtonBox>
          <IncreaseButton onClick={increaseButtonHandler}>+</IncreaseButton>
          <DecreaseButton onClick={decreaseButtonHandler}>-</DecreaseButton>
        </ButtonBox>
      </ListWrapper>
      <Subscription>
        *&apos;제작&apos;은 문항에 대한 등록/수정/조회, &apos;검수&apos;는 조회,
        &apos;편집&apos;은 수정/조회의 권한을 한명에게만 부여합니다.
      </Subscription>
      <Subscription>
        *최초 단계인 &apos;제작&apos;은 변경할 수 없습니다.
      </Subscription>
      <ButtonWrapper>
        <Button width="100px" height="40px" onClick={() => closeModal()}>
          취소
        </Button>
        <Button width="100px" height="40px" onClick={clickProcessSave} $filled>
          확인
        </Button>
      </ButtonWrapper>
      {isProcessSave && (
        <Alert
          description="진행 중인 제작 프로세스가 초기화될 수 있습니다. 그래도 변경하시겠습니까?"
          isAlertOpen={isProcessSave}
          action="확인"
          onClose={() => setIsProcessSave(false)}
          //onClick={() => deleteItemMutate()}
        ></Alert>
      )}
    </Container>
  );
}
const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  overflow: hidden;
  border-radius: 20px;
`;
const Title = styled.strong`
  font-size: 20px;
  width: 100%;
  display: block;
  font-weight: bold;
  text-align: left;
  padding: 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  //height: 100px;
  gap: 5px;
  padding: 15px 20px;
  background-color: #f1f1f1;
  margin: 0 20px 10px 20px;
  //align-items: center;
`;
const DefaultSelect = styled.div`
  width: 120px;
  height: 35px;
  font-size: 14px;
  background-color: ${COLOR.FONT_GRAY};
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;
const Arrow = styled.span`
  display: flex;
  align-items: center;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 5px;
`;
const IncreaseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 35px;
  border: 1px solid ${COLOR.PRIMARY};
  color: ${COLOR.PRIMARY};
  cursor: pointer;
`;
const DecreaseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 35px;
  border: 1px solid ${COLOR.ERROR};
  color: ${COLOR.ERROR};
  cursor: pointer;
`;
const Subscription = styled.p`
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  padding: 0 20px;
`;
const ButtonWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;
