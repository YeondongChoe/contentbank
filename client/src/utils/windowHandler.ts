import * as React from 'react';

export const NO_FRAME_WINDOW_OPTIONS = `scrollbars=no,status=no,location=no,menubar=no,fullscreen=no,toolbar=no,titlebar=no,frame=no`;
export const WINDOW_OPTIONS = `toolbar=no,titlebar=no,scrollbars=no,status=no,location=no,menubar=no`;

export const windowOpenHandler = ({
  name = '_blank',
  url,
  options = '',
}: {
  name?: string;
  url: string;
  options?: string;
}) => {
  const windowWidth = 1200;
  const windowHeight = 800;
  const left = Math.round(window.screen.width / 2 - windowWidth / 2);
  const top = Math.round(window.screen.height / 2 - windowHeight / 2);

  const target = `${name}`;
  const defaultOption = `width=${windowWidth},height=${windowHeight},top=${top},left=${left},toolbar=no,titlebar=no,scrollbars=no,status=no,location=no,menubar=no`;
  //TODO : url 에 BASEURL 추가
  window.open(url, target, options ? options : `${defaultOption}`);
};

//TODO: 함수 분기 추가 커스텀 필요
export const parentsWindowHandler = ({
  $id,
  fn,
  value,
}: {
  $id: string;
  fn: string;
  value: string;
}) => {
  opener.document.getElementById(`${$id}`).value; // 부모창에서 id가 $id인 개체의 값 가져오기
  window.opener.href = `${fn}`; // 부모창에 있는 fn 함수 호출
  window.self.close(); //팝업창 닫기
  window.opener.document.reload(); //팝업창에서 부모창 새로고침
  window.opener.document.getElementById(`${$id}`).value = `${value}`; //부모창에서 id가 $id인 개체의 값 value로 변경
};
