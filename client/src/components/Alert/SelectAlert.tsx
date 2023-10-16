import React, { useState } from 'react';
import { Styled_Alert } from './Alert.style';

type Alert = {
  description: string;
};

const SelectAlert = (prop: Alert) => {
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
      <button onClick={openAlert}>Select Alert</button>
      {isAlertOpen && (
        <Styled_Alert.container>
          <Styled_Alert.alertdiv>
            <Styled_Alert.cancelIcon onClick={closeAlert}>
              X
            </Styled_Alert.cancelIcon>
            <Styled_Alert.description>
              {prop.description}
            </Styled_Alert.description>
          </Styled_Alert.alertdiv>
          <Styled_Alert.selectDiv>
            <Styled_Alert.cancel onClick={closeAlert}>취소</Styled_Alert.cancel>
            <Styled_Alert.confirm>선택</Styled_Alert.confirm>
          </Styled_Alert.selectDiv>
        </Styled_Alert.container>
      )}
    </>
  );
};

export default SelectAlert;
