import * as React from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { MemberTableType } from '../../../../types';
import { COLOR } from '../../../constants';

type TbodyProps = {
  list: MemberTableType[];
  handleSingleCheck: (checked: boolean, seq: number) => void;
  checkList: number[];
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>;
  btnOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function MemberTbody({
  list,
  handleSingleCheck,
  checkList,
  setCheckList,
  btnOnClick,
}: TbodyProps) {
  const clickTr = (seq: number) => {
    // 배열에 seq가 포함되어 있지 않으면 추가하고, 포함되어 있다면 제거한다.
    setCheckList((prevList: number[]) => {
      if (prevList.includes(seq)) {
        return prevList.filter((item: number) => item !== seq);
      } else {
        return [...prevList, seq];
      }
    });
  };
  //tr클릭했을 때 해당 tr의 member.seq 가져오기
  //member.seq 와 일치하는 tr은 setCheckList에 넣기

  return (
    <TbodyWrap>
      {list.map((member) => (
        <tr key={member.seq} onClick={() => clickTr(member.seq)}>
          <td>
            <input
              type="checkbox"
              style={{ width: '15px', height: '15px' }}
              // onChange={(e) =>
              //   handleSingleCheck(e.target.checked, member.seq as number)
              // }
              // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
              checked={checkList.includes(member.seq as number) ? true : false}
            />
          </td>
          <td>
            <span className="ellipsis">{member.name}</span>
          </td>
          <td>
            <span className="ellipsis">{member.id}</span>
          </td>
          <td>
            <span className="ellipsis">{member.authority?.name}</span>
          </td>
          <td>
            <span className="ellipsis">{member.createdDate}</span>
          </td>
          <td>
            <span className="ellipsis">
              {member.enabled === true ? '활성' : '비활성'}
            </span>
          </td>
          <td>
            <span className="center">
              <button
                type="button"
                className="lineBtn"
                value={member.key}
                onClick={(event) => btnOnClick?.(event)}
              >
                보기
              </button>
            </span>
          </td>
        </tr>
      ))}
    </TbodyWrap>
  );
}

const TbodyWrap = styled.tbody`
  font-size: small;
  /* tr {
    cursor: pointer;
  } */

  /* th {
    border: 1px solid ${COLOR.SECONDARY};
    color: ${COLOR.SECONDARY};
    font-size: 15px;
    font-weight: bold;

    &.padding {
      padding: 10px;
    }
  } */
  td {
    border-bottom: 1px solid ${COLOR.BORDER_GRAY};
    padding: 10px;
    text-align: center;
    font-size: 15px;
    > button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
  .lineBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 0;
    width: 60px;
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 5px;
    background-color: #fff;
    color: #1565c0;
    border: 1px solid #1565c0;
    cursor: pointer;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .textAlignLeft {
    text-align: left;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .hide {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const SettingButton = styled.button`
  position: relative;
  padding: 5px;
  margin: -5px;
`;

const SettingList = styled.ul`
  display: none;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid ${COLOR.SECONDARY};
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;

  &.show {
    display: block;
  }

  li {
    width: 140px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      font-size: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: ${COLOR.GRAY};
      transition: all 0.1s;
      z-index: 2;
      border: none;

      &:hover {
        background-color: ${COLOR.HOVER};
        color: ${COLOR.PRIMARY};
      }
    }
  }
`;
