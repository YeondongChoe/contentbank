import * as React from 'react';

import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { LuFileSearch2 } from 'react-icons/lu';
import { SlOptionsVertical } from 'react-icons/sl';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import {
  createWorksheetStep1BoolAtom,
  createWorksheetStep2BoolAtom,
  editWorksheetBoolAtom,
  previewWorksheetBoolAtom,
} from '../../../../store/creatingWorksheetAtom';
import { WorksheetTableType } from '../../../../types';
import { COLOR } from '../../../constants';

type TbodyProps = {
  list: WorksheetTableType[];
};

export function WorksheetTbody({ list }: TbodyProps) {
  //학습지 팝업
  const [isStep1, setIsStep1] = useRecoilState(createWorksheetStep1BoolAtom);
  const [isStep2, setIsStep2] = useRecoilState(createWorksheetStep2BoolAtom);
  const setIsPreview = useSetRecoilState(previewWorksheetBoolAtom);
  const setIsEditWorksheet = useSetRecoilState(editWorksheetBoolAtom);

  const openEditFilePopup = () => {
    setIsStep1(false);
    setIsStep2(true);
    setIsEditWorksheet(true);
  };
  // 학습지 설정 버튼
  const openSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    console.log(event.currentTarget.children[1].classList);
    event.currentTarget.children[1].classList.add('show');
  };
  const closeSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.remove('show');
  };

  return (
    <TbodyWrap>
      {list.map((content) => (
        <tr key={content?.id}>
          <td>
            <button
              onClick={() => {
                // addFavoriteQuestion(content.questionSeq);
              }}
            >
              {content.favorited ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </td>
          <td>
            <span className="ellipsis">{content.schoolLevel}</span>
          </td>
          <td>
            <span className="ellipsis">{content.tag}</span>
          </td>
          <td className="textAlignLeft">
            <span className="ellipsis">{content.worksheetName}</span>
          </td>
          <td>
            <span className="ellipsis">{content.createdAt}</span>
          </td>
          <td>
            <span className="ellipsis">{content.creater}</span>
          </td>
          <td>
            <button onClick={() => {}}>
              <LuFileSearch2
                style={{ fontSize: '22px' }}
                onClick={() => {
                  setIsPreview(true);
                }}
              />
            </button>
          </td>
          <td>
            <SettingButton
              type="button"
              onClick={(event) => openSettingList(event)}
              onMouseLeave={(event) => closeSettingList(event)}
            >
              <SlOptionsVertical style={{ fontSize: '16px' }} />
              <SettingList>
                <li>
                  <button
                    type="button"
                    onClick={(event) => {
                      openEditFilePopup();
                    }}
                  >
                    수정
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(event) => {
                      openEditFilePopup();
                    }}
                  >
                    복제 후 수정
                  </button>
                </li>
                <li>
                  <button type="button" onClick={(event) => {}}>
                    삭제
                  </button>
                </li>
              </SettingList>
            </SettingButton>
          </td>
        </tr>
      ))}
    </TbodyWrap>
  );
}

const TbodyWrap = styled.tbody`
  font-size: small;

  th {
    border: 1px solid ${COLOR.SECONDARY};
    color: ${COLOR.SECONDARY};
    font-size: 14px;
    font-weight: bold;

    &.padding {
      padding: 10px;
    }
  }
  td {
    border: 1px solid ${COLOR.SECONDARY};
    padding: 10px;
    text-align: center;
    font-size: 13px;
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
    font-size: 12px;
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
