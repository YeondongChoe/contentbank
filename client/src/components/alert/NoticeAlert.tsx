import React, { useState } from 'react';
import { Styled_Alert } from './Alert.style';
import { useRecoilState } from 'recoil';
import { alertState } from '../../recoil/alert';

type Alert = {
  description?: string;
  title: string;
  onClose?: () => void;
};

const NoticeAlert = (prop: Alert) => {
  const [isAlertOpen, setIsAlertOpen] = useRecoilState(alertState);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  return (
    <div>
      {isAlertOpen && (
        <Styled_Alert.alertOverlay>
          <Styled_Alert.container>
            <Styled_Alert.alertdiv>
              <Styled_Alert.cancelIcon onClick={closeAlert}>
                X
              </Styled_Alert.cancelIcon>
              <Styled_Alert.description>
                <div>{prop.title}</div>
                <div> {prop.description}</div>
              </Styled_Alert.description>
            </Styled_Alert.alertdiv>
            <Styled_Alert.selectDiv>
              <Styled_Alert.confirm onClick={closeAlert}>
                확인
              </Styled_Alert.confirm>
            </Styled_Alert.selectDiv>
          </Styled_Alert.container>
        </Styled_Alert.alertOverlay>
      )}
    </div>
  );
};

export default NoticeAlert;
