import * as React from 'react';

import { styled } from 'styled-components';

import { List, ListItem, Modal, PaginationBox } from '../..';
import { MenuDataType } from '../../../types';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';

type ContentListProps = {
  list: MenuDataType[];
  totalCount?: number;
  itemsCountPerPage?: number;
};

export function SettingList({
  list,
  itemsCountPerPage,
  totalCount,
}: ContentListProps) {
  // 설정 윈도우 열기
  const openSettingWindow = (url: string) => {
    windowOpenHandler({
      name: 'contentSetting',
      url: `${url}`,
      options:
        'width=1600,height=965,top=Math.round(window.screen.height / 2 - windowHeight / 2),left=Math.round(window.screen.width / 2 - windowWidth / 2),toolbar=no,titlebar=no,scrollbars=no,status=no,location=no,menubar=no,frame=no',
    });
  };

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = (idx: number) => {
    const sendData = { idx: idx };
    localStorage.setItem('sendMenuIdx', JSON.stringify(sendData));
  };

  return (
    <>
      <Total> Total : {totalCount ? totalCount : 0}</Total>
      <ListWrapper>
        <List margin={`10px 0`}>
          {list
            ?.slice()
            .sort((a, b) => a.idx - b.idx)
            .map((item: any) => {
              const formattedDate = item.lastModifiedAt
                .split(' ')[0]
                .replace(/-/g, '.');
              return (
                <ListItem
                  height="80px"
                  key={`${item.tag}-${item.name}`}
                  isChecked={false}
                >
                  <ItemLayout>
                    <span className="width_5">{item.idx}</span>
                    <i className="line"></i>
                    <span className="width_10">{item.name}</span>
                    <i className="line"></i>
                    <span className="width_40">{item.urlName}</span>
                    <i className="line"></i>
                    <span className="width_10">{formattedDate}</span>
                    <i className="line"></i>
                    <span className="width_5">{item.lastModifiedBy}</span>
                    <i className="line"></i>
                    <span className="width_5">
                      <SettingButton
                        onClick={(e) => {
                          e.stopPropagation();
                          openSettingWindow(item.url);
                          saveLocalData(item.idx);
                        }}
                      >
                        설정
                      </SettingButton>
                    </span>
                  </ItemLayout>
                </ListItem>
              );
            })}
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
