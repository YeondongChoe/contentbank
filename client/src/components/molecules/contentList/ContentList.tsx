import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilValue } from 'recoil';
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
} from '../../../components';
import { pageAtom } from '../../../store/utilAtom';
import { QuizListType } from '../../../types';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { COLOR } from '../../constants';

type ContentListProps = {
  list: QuizListType[] | any[]; // TODO
  onClick: () => void;
  deleteBtn?: boolean;
  ondeleteClick?: () => void;
  totalCount?: number;
};

export function ContentList({
  list,
  onClick,
  deleteBtn,
  ondeleteClick,
  totalCount,
}: ContentListProps) {
  const page = useRecoilValue(pageAtom);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropDownList: DropDownItemProps[] = [
    {
      key: 'ListTabl/수정',
      title: '수정',
      onClick: () => {
        openCreateEditWindow();
        setShowDropDown(false);
      },
    },
    {
      key: 'ListTable/DropDownList복제 후 수정',
      title: '복제 후 수정',
      onClick: () => {
        openCreateEditWindow();
        setShowDropDown(false);
      },
    },
  ];

  // 문항 수정 윈도우 열기
  const openCreateEditWindow = () => {
    saveLocalData();
    windowOpenHandler({
      name: 'createcontentmain',
      url: '/createcontentmain',
    });
  };

  // 로컬스토리지에 보낼데이터 저장
  const saveLocalData = () => {
    const sendData = { data: false };
    localStorage.setItem('sendData', JSON.stringify(sendData));

    //새로운 리스트 데이터 조회
    // window.parentCallback = () => {
    //   getContents();
    // };
  };

  // 활성화/비활성화 버튼상태 토글
  const openSubmitAlert = () => {
    setIsAlertOpen(true);
  };
  const closeSubmitAlert = () => {
    setIsAlertOpen(false);
  };
  // 활성화/비활성화 데이터 전송
  const submitDisabled = () => {};

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);
    if (e.target.checked) {
      setCheckList(list.map((item: QuizListType) => item.code));
    } else {
      setCheckList([]);
    }
  };
  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;
    if (!target.checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };

  // 배경 클릭시 체크리스트 초기화
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // console.log('click', e.target);
      // console.log('click', e.target?.toString().includes('Div'));
      if (e.target?.toString().includes('Div')) setCheckList([]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  return (
    <>
      <Total> Total : {totalCount ? totalCount : 0}</Total>
      <ListButtonWrapper>
        <InputWrapper>
          <ButtonWrapper>
            <CheckBoxWrapper>
              <CheckBoxI
                $margin={'0 5px 0 0'}
                onChange={(e) => handleAllCheck(e)}
                checked={checkList.length === list.length ? true : false}
                id={'all check'}
                value={'all check'}
              />
              <span className="title_top">전체선택</span>
            </CheckBoxWrapper>
            <ActionButtonWrapper>
              {deleteBtn && (
                <Button
                  width="100px"
                  height="35px"
                  fontSize="14px"
                  $borderRadius="7px"
                  onClick={ondeleteClick}
                  $filled
                  $warning
                  disabled={isEnabled}
                  cursor
                >
                  삭제
                </Button>
              )}
              <DropDown
                list={dropDownList}
                buttonText={'수정'}
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
                disabled={isEnabled}
              ></DropDown>
              <Button
                width="140px"
                height="35px"
                fontSize="14px"
                $borderRadius="7px"
                onClick={openSubmitAlert}
                $filled
                $success
                disabled={isEnabled}
                cursor
              >
                활성화 / 비활성화
              </Button>
            </ActionButtonWrapper>
          </ButtonWrapper>
        </InputWrapper>
      </ListButtonWrapper>

      <ListWrapper ref={backgroundRef}>
        <List margin={`10px 0`}>
          {list.map((item: QuizListType) => (
            <ListItem
              height="80px"
              key={item.code as string}
              isChecked={checkList.includes(item.code)}
              onClick={(e) => handleButtonCheck(e, item.code)}
            >
              <CheckBoxI
                id={item.code}
                value={item.code}
                $margin={`0 5px 0 0`}
                checked={checkList.includes(item.code)}
                readOnly
              />
              {!item.isUse ? (
                <Icon
                  width={`18px`}
                  $margin={'0 0 0 12px'}
                  src={`/images/icon/favorites_on.svg`}
                  disabled={true}
                />
              ) : (
                <Icon
                  width={`18px`}
                  $margin={'0 0 0 12px'}
                  src={`/images/icon/favorites${checkList.includes(item.code) ? `_off_W` : `_off_B`}.svg`}
                  disabled={true}
                />
              )}
              <ItemLayout>
                {/* //TODO */}
                <span className="width_20px">{item.idx} </span>
                <i className="line"></i>
                <span>{item.code} </span>
                <i className="line"></i>
                <span>{item.type} </span>
                <i className="line"></i>
                <span className="width_10">{item.createdBy} </span>
                <i className="line"></i>
                <span className="width_10">{item.createdAt}</span>
                <i className="line"></i>
                <span className="width_5">
                  {item.isUse ? (
                    <Icon
                      width={`18px`}
                      $margin={'0 0 0 12px'}
                      src={`/images/icon/lock_open_${
                        checkList.length
                          ? checkList.includes(item.code)
                            ? 'on'
                            : 'off'
                          : 'off'
                      }.svg`}
                      disabled={true}
                    />
                  ) : (
                    <Icon
                      width={`18px`}
                      $margin={'0 0 0 12px'}
                      src={`/images/icon/lock_${
                        checkList.length
                          ? checkList.includes(item.code)
                            ? 'on'
                            : 'off'
                          : 'off'
                      }.svg`}
                      disabled={true}
                    />
                  )}
                </span>
              </ItemLayout>
            </ListItem>
          ))}
        </List>
      </ListWrapper>

      <Alert
        isAlertOpen={isAlertOpen}
        description="비활성화 처리시 문항 사용이 불가합니다. 비활성화 처리 하시겠습니까?"
        action="확인"
        isWarning={true}
        onClose={closeSubmitAlert}
        onClick={submitDisabled}
      ></Alert>

      <Modal />
    </>
  );
}

const ListButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Total = styled.span`
  text-align: right;
  font-size: 15px;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 5px;
`;
const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
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
    /* flex: 1 0 0; */
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
  .width_20px {
    width: 20px;
  }
  .width_50 {
    width: 50%;
  }
`;
