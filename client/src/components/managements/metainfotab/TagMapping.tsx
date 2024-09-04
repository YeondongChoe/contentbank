import * as React from 'react';
import { useEffect, useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { Search } from '../../../components/molecules';
import { Button, CheckBoxI } from '../../atom';

type TagType = {
  idx: number;
  name: string;
};

export function TagMapping() {
  const [tagsList, setTagsList] = useState<TagType[]>([
    { idx: 0, name: 'tags1 tags1 tags1 tags1 tags1' },
    { idx: 1, name: 'tags2' },
    { idx: 2, name: 'tags23' },
    { idx: 3, name: 'tags24' },
    { idx: 4, name: 'tags2 tags2 tags2 tags2 vtags2 vvtags2' },
    { idx: 5, name: 'tags25' },
    { idx: 6, name: 'tags26' },
    { idx: 7, name: 'tags27' },
    { idx: 8, name: 'tags28' },
    { idx: 9, name: 'tags29' },
    { idx: 10, name: 'tags21' },
    { idx: 11, name: 'tags22' },
    { idx: 12, name: 'tags23' },
  ]);
  const [checkList, setCheckList] = useState<TagType[]>([]);

  const handleButtonCheck = (checked: boolean, tag: TagType) => {
    if (checked) {
      setCheckList((prev) => [...prev, tag]);
    } else {
      setCheckList(checkList.filter((el) => el !== tag));
    }
  };

  return (
    <Container>
      <strong className="popup_title">태그 매핑</strong>
      <ListWrapper>
        <strong>태그 선택</strong>
        <span className="sub">매핑할 태그를 선택해주세요.</span>
        <Button
          onClick={() => {}}
          width="100px"
          height="30px"
          fontSize="13px"
          $margin="10px 0"
        >
          교과
        </Button>
        <Search
          value={''}
          onChange={() => {}}
          onKeyDown={() => {}}
          placeholder="태그를 검색해주세요."
        />
        <ScrollWrapper>
          <PerfectScrollbar>
            <ul className="tag_list_wrap">
              {tagsList.map((tag) => (
                <li key={`${tag.idx}`}>
                  <CheckBoxWrapper>
                    <CheckBoxI
                      $margin={'0 5px 0 0'}
                      onChange={(e) => handleButtonCheck(e.target.checked, tag)}
                      checked={
                        checkList.includes(tag as TagType) ? true : false
                      }
                      id={tag.name}
                      value={tag.name}
                    />
                    <span className="title_top">{tag.name}</span>
                  </CheckBoxWrapper>
                </li>
              ))}
            </ul>
          </PerfectScrollbar>
        </ScrollWrapper>
        <Button onClick={() => {}} $filled fontSize="15px">
          {`${checkList.length}개의 태그 하위로 추가`}
        </Button>
      </ListWrapper>
      <ListItemWrapper>
        <strong>매핑</strong>
        <div className="button_wrap">
          <Button
            onClick={() => {}}
            width="100px"
            height="30px"
            fontSize="13px"
            $margin="0 0 0 10px"
          >
            순서변경
          </Button>
          <Button
            onClick={() => {}}
            width="150px"
            height="30px"
            fontSize="13px"
          >
            최상위 태그 추가
          </Button>
        </div>
        <ScrollWrapper className="h_530">
          <PerfectScrollbar>
            <ul className="tag_list_wrap">
              <li></li>
            </ul>
          </PerfectScrollbar>
        </ScrollWrapper>
        <div className="button_wrap">
          <Button onClick={() => {}} $filled width="150px">
            저장
          </Button>
        </div>
      </ListItemWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .popup_title {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 25px;
  }
`;
const ScrollWrapper = styled.div`
  height: 460px;
  background-color: #fff;
  border: 1px solid #eee;
  padding: 20px;
  margin: 5px 0;

  &.h_530 {
    height: 530px;
  }
`;
const ListWrapper = styled.div`
  background-color: #eee;
  height: calc(100vh - 100px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 300px;

  > strong {
    font-size: 18px;
  }
  .sub {
    font-size: 12px;
    color: #7d7d7d;
  }
  .tag_list_wrap {
    border-radius: 5px;
    gap: 5px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .tag_list_wrap li > div {
    display: flex;
    align-items: flex-start;
  }
  .tag_list_wrap li .title_top {
    padding-top: 2px;
    padding-left: 4px;
  }
`;
const ListItemWrapper = styled.div`
  background-color: #eee;
  flex: 1 1 0;
  margin-left: 20px;
  padding: 20px;

  > strong {
    font-size: 18px;
  }

  .button_wrap {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
  }
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;
