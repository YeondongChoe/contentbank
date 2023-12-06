import React from 'react';
import { Styled } from './Alert.style';
import { useRecoilState } from 'recoil';
import { alertBoolAtom } from '../../recoil/utilAtom';

type alertProps = {
  description?: string;
  title: string;
  onClose?: () => void;
};

const NoticeAlert = (prop: alertProps) => {
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertBoolAtom);

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div>
      {isAlertOpen && (
        <Styled.alertOverlay>
          <Styled.container>
            <Styled.alertContainer>
              <Styled.cancelIcon onClick={closeAlert}>X</Styled.cancelIcon>
              <Styled.description>
                <div>{prop.title}</div>
                <div> {prop.description}</div>
              </Styled.description>
            </Styled.alertContainer>
            <Styled.selectDiv>
              <Styled.confirm onClick={closeAlert}>확인</Styled.confirm>
            </Styled.selectDiv>
          </Styled.container>
        </Styled.alertOverlay>
      )}
    </div>
  );
};

export { NoticeAlert };
