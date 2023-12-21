import * as React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { Button } from '../../components/atom';
import { managementTreePopupBoolAtom } from '../../state/managementContentAtom';

export function ManagemantTreePopup() {
  const [isCreate, setIsCreate] = useRecoilState(managementTreePopupBoolAtom);

  const closePopup = () => {
    setIsCreate(false);
  };
  return (
    <Overlay>
      <Container>
        <TapWrapper>
          <TitleWrapper>
            <Title> 문항 정보 트리트리</Title>
            <ButtonGroup>
              <Button
                buttonType="button"
                $padding="10px"
                height={'30px'}
                width={'100px'}
                fontSize="12px"
              >
                <span>+ 신규 추가</span>
              </Button>
              <Button
                buttonType="button"
                $padding="10px"
                height={'30px'}
                width={'100px'}
                fontSize="12px"
              >
                <span>+ 폴더 복제</span>
              </Button>
            </ButtonGroup>
          </TitleWrapper>
          <CloseIcon onClick={closePopup} sx={{ cursor: 'pointer' }} />
        </TapWrapper>
        <ContentBox>
          {/* <StyledSaveBtn variant="contained">저장</StyledSaveBtn> */}
          <Button
            buttonType="submit"
            $padding="10px"
            height={'30px'}
            width={'100px'}
            fontSize="12px"
          >
            <span>저장</span>
          </Button>
        </ContentBox>
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const Container = styled.div`
  max-width: 80%;
  min-width: 800px;
  padding: 20px;
  border: 1px solid #a3aed0;
  background-color: white;
`;
const TapWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
`;
const Title = styled.div`
  font-size: 16px;
`;
const ContentBox = styled.div`
  height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
