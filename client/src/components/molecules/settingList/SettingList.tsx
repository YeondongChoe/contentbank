import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { LuFileSearch2 } from 'react-icons/lu';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import {
  Button,
  DropDown,
  DropDownItemProps,
  CheckBox,
  List,
  ListItem,
  CheckBoxI,
  Modal,
  Alert,
  Icon,
  openToastifyAlert,
  PaginationBox,
} from '../..';
import { useModal } from '../../../hooks';
import { WorksheetListType } from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';

type ContentListProps = {
  list: any[]; // TODO
  tabVeiw?: string;
  totalCount?: number;
  itemsCountPerPage?: number;
};

export function SettingList({
  list,
  tabVeiw,
  itemsCountPerPage,
  totalCount,
}: ContentListProps) {
  const queryClient = useQueryClient();
  const { openModal } = useModal();
  const backgroundRef = useRef<HTMLDivElement>(null);

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
    <>
      <Total> Total : {totalCount ? totalCount : 0}</Total>
      <ListWrapper ref={backgroundRef}>
        <List margin={`10px 0`}>
          {list.map((item: any) => (
            <ListItem
              height="80px"
              key={`${item.tag}-${item.name}`}
              isChecked={false}
              onClick={() => {}}
            >
              <ItemLayout>
                <span className="width_5">{item.idx}</span>
                <i className="line"></i>
                <span className="width_10">{item.tag}</span>
                <i className="line"></i>
                <span className="width_40">{item.name}</span>
                <i className="line"></i>
                <span className="width_10">{item.lastModifiedAt}</span>
                <i className="line"></i>
                <span className="width_5">{item.examiner}</span>
                <i className="line"></i>
                <span className="width_5">
                  <SettingButton
                    onClick={(e) => {
                      e.stopPropagation();
                      openSettingWindow(item.path);
                      // 설정창 띄우기
                      console.log('설정창 띄우기');
                    }}
                  >
                    설정
                  </SettingButton>
                </span>
              </ItemLayout>
            </ListItem>
          ))}
        </List>
      </ListWrapper>
      <PaginationBox
        itemsCountPerPage={itemsCountPerPage as number}
        totalItemsCount={totalCount as number}
      />
      <Modal />
    </>
  );
}
const Total = styled.span`
  display: inline-block;
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  margin-top: 10px;
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemLayout = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  > span {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    word-break: break-all;
  }
  .line {
    width: 1px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
  .width_5 {
    width: 5%;
  }
  .width_10 {
    width: 10%;
  }
  .width_40 {
    width: 40%;
  }
  .width_50 {
    width: 50%;
  }
  //설정 버튼 커서
  button {
    cursor: pointer;
  }
`;
const SettingButton = styled.button`
  width: 100px;
  border: none;
  background-color: ${COLOR.PRIMARY};
  color: white;
  border-radius: 5px;
`;
