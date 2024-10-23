import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { resourceServiceInstance } from '../../../../api/axios';
import { Button, ValueNone } from '../../../../components/atom';
import { COLOR } from '../../../../components/constants';
import { useModal } from '../../../../hooks';
import { windowOpenHandler } from '../../../../utils/windowHandler';

type SettingDataProps = {
  companyCode: string;
  createdAt: string;
  createdBy: string;
  idx: number;
  isUse: boolean;
  lastModifiedAt: string;
  lastModifiedBy: string;
  name: string;
  serviceType: string;
  sort: number;
  type: string;
  url: string;
  urlName: string;
};

type PathModalProps = {
  code: string;
};

export function ScreenPathModal({ code }: PathModalProps) {
  const [menuSetting, setMenuSetting] = useState<SettingDataProps[]>([]);
  const { closeModal } = useModal();

  //그룹 화면설정 정보 불러오기 api
  const getMenuSetting = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/group?groupCode=${code}`,
    );
    //console.log(res);
    return res;
  };
  const {
    data: menuSettingData,
    isLoading: isMenuSettingLoading,
    refetch: menuSettingRefetch,
  } = useQuery({
    queryKey: ['get-menuSetting'],
    queryFn: getMenuSetting,
    meta: {
      errorMessage: 'get-menuSetting 에러 메세지',
    },
  });

  useEffect(() => {
    if (code) {
      menuSettingRefetch();
    }
  }, [code]);

  useEffect(() => {
    if (menuSettingData) {
      setMenuSetting(menuSettingData.data.data.menuList);
    }
  }, [menuSettingData]);

  // 설정 윈도우 열기
  const openSettingWindow = (url: string) => {
    windowOpenHandler({
      name: 'step2',
      url: `${url}`,
      options:
        'width=1600,height=965,top=Math.round(window.screen.height / 2 - windowHeight / 2),left=Math.round(window.screen.width / 2 - windowWidth / 2),toolbar=no,titlebar=no,scrollbars=no,status=no,location=no,menubar=no,frame=no',
    });
  };

  return (
    <Container>
      <Title>화면 경로</Title>
      <strong className="sub_title">화면 경로</strong>
      <ScrollWrapper>
        <PerfectScrollbar>
          <ListWrapper>
            {menuSetting.length > 0 ? (
              <>
                {menuSetting.map((path) => (
                  <li key={path.idx} className={`path_list`}>
                    <span className="path_name">{`${path.idx}.${path.name} > ${path.urlName}`}</span>
                    <button
                      className="path_button"
                      onClick={() => openSettingWindow(path.url)}
                    >
                      화면 설정으로 이동
                    </button>
                  </li>
                ))}
              </>
            ) : (
              <ValueNoneWrapper>
                <ValueNone info={`사용중인 화면이 없습니다`} />
              </ValueNoneWrapper>
            )}
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
const ValueNoneWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
