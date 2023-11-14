import React from 'react';
import { Styled } from './Alert.style';
import { alertState } from '../../recoil/State';
import { useRecoilState } from 'recoil';

type Alert = {
  title: string;
  description?: string;
  onClick?: () => void;
  action?: string;
};

const SelectAlert = (prop: Alert) => {
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertState);

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      {isAlertOpen && (
        <Styled.alertOverlay>
          <Styled.container>
            <Styled.alertContainer>
              <Styled.cancelIcon onClick={closeAlert}>X</Styled.cancelIcon>
              <Styled.description>{prop.title}</Styled.description>
              <Styled.description>{prop.description}</Styled.description>
            </Styled.alertContainer>
            <Styled.selectDiv>
              <Styled.cancel onClick={closeAlert}>취소</Styled.cancel>
              <Styled.confirm onClick={prop.onClick}>
                {prop.action}
              </Styled.confirm>
            </Styled.selectDiv>
          </Styled.container>
        </Styled.alertOverlay>
      )}
    </>
  );
};

export default SelectAlert;
