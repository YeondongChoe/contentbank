import * as React from 'react';
import { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { Button } from '../../../../components/atom';
import { COLOR } from '../../../../components/constants';
import { Search } from '../../../../components/molecules';
import { useModal } from '../../../../hooks';

export function ScreenPathModal({ paths }: { paths: string[] }) {
  const { closeModal } = useModal();
  const [pathList, setTagsList] = useState([
    '분류1 분류1 분류1 분류1 분류1분류1분류1',
    '분류777777dsadsad dsadsaddsd dsa7',
    '분류777777dsadsad dsadsadd dsa7',
    '분류777777dsadsad dsadsadssd dsa7',
    '분류분류분류분류분류분류분류분류분류분류',
  ]);

  return (
    <Container>
      <Title>화면 경로</Title>
      <strong className="sub_title">화면 경로</strong>
      <ScrollWrapper>
        <PerfectScrollbar>
          <ListWrapper>
            {pathList.map((path, index) => (
              <li key={path} className={`path_list`} onClick={() => {}}>
                <span className="path_name">{`${index + 1}.${path}`}</span>
                <button className="path_button" onClick={() => {}}>
                  화면 설정으로 이동
                </button>
              </li>
            ))}
          </ListWrapper>
        </PerfectScrollbar>
      </ScrollWrapper>
      <ButtonWrapper>
        <Button onClick={() => closeModal()}>취소</Button>
      </ButtonWrapper>
    </Container>
  );
}
const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  overflow: hidden;
  border-radius: 20px;
  .sub_title {
    display: flex;
    padding: 10px 20px 0 20px;
    font-size: 14px;
  }
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

const ListWrapper = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 15px 20px;

  .path_list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .path_name {
    font-size: 15px;
    font-weight: 500;
  }
  .path_button {
    border: none;
    background-color: transparent;
    font-size: 13px;
    font-weight: 400;
    text-decoration: underline;
    color: ${COLOR.PRIMARY};
    padding: 5px;
  }
`;

const ButtonWrapper = styled.div`
  background-color: #f1f1f1;
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  button {
    margin-left: 10px;
    width: 100px;
    height: 40px;
  }
`;
const ScrollWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
`;
