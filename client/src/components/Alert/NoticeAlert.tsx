import React, { useState } from 'react';
import { Styled_Alert } from './Alert.style';

type Alert = {
  description: string;
  title: string;
};

const NoticeAlert = (prop: Alert) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
    console.log('open');
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
    console.log('close');
  };

  return (
    <>
      <button onClick={openAlert}>Notice Alert</button>
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
    </>
  );
};

export default NoticeAlert;
