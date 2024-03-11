import * as React from 'react';

import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { styled } from 'styled-components';

import { IconButton } from '../../../../components/atom';
import { QuestionTableType } from '../../../../types';
import { COLOR } from '../../../constants';

type TbodyProps = {
  list: QuestionTableType[];
  handleSingleCheck: (checked: boolean, seq: number) => void;
  checkList: number[];
};

export function QuestionTbody({
  list,
  handleSingleCheck,
  checkList,
}: TbodyProps) {
  return (
    <TbodyWrap>
      {list.map((content) => (
        <tr key={content?.questionCode}>
          <td>
            <input
              type="checkbox"
              onChange={(e) =>
                handleSingleCheck(
                  e.target.checked,
                  content.contentSeq as number,
                )
              }
              // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
              checked={
                checkList.includes(content.contentSeq as number) ? true : false
              }
            />
          </td>
          <td>
            <span className="ellipsis">
              <IconButton
                onClick={() => {
                  // addFavoriteQuestion(content.questionSeq)
                }}
                $iconOlny
                $borderNone
                $padding={'0'}
                $margin={'-2px'}
                width={'20px'}
                height={'20px'}
              >
                {content.favorited ? (
                  <FaBookmark color="orange" />
                ) : (
                  <FaRegBookmark />
                )}
              </IconButton>
            </span>
          </td>
          <td className="textAlignLeft">
            <span className="ellipsis">{content.questionCode}</span>
          </td>
          <td>
            <span className="ellipsis">{content.curriculum}</span>
          </td>
          <td>
            <span className="ellipsis">{content.schoolLevel}</span>
          </td>
          <td>
            <span className="ellipsis">{content.schoolYear}</span>
          </td>
          <td>
            <span className="ellipsis">{content.semester}</span>
          </td>
          <td>
            <span className="ellipsis">{content.unitMajor}</span>
          </td>
          <td>
            <span className="ellipsis">{content.unitMiddle}</span>
          </td>
          <td>
            <span className="ellipsis">{content.questionType}</span>
          </td>
          <td>
            <span className="ellipsis">{content.questionCreatedByName}</span>
          </td>
          <td>
            <span className="hide">{content.questionCreatedDate}</span>
          </td>
          <td>
            <span className="ellipsis">{content.serviced ? 'Y' : 'N'}</span>
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
