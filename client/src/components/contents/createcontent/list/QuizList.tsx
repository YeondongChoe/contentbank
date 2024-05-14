import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { CheckBoxI, DnDWrapper, Icon, Tooltip, ValueNone } from '../../..';
import { QuizListType } from '../../../../types';
import { windowOpenHandler } from '../../../../utils/windowHandler';
import { COLOR } from '../../../constants/COLOR';

export function QuizList({
  questionList,
  showTitle,
  $height,
  showCheckBox,
  showViewAllButton,
  fontBold,
  setCheckedList,
  isDataColor,
}: {
  questionList: QuizListType[] | [];
  showTitle?: boolean;
  showCheckBox?: boolean;
  showViewAllButton?: boolean;
  $height?: string;
  fontBold?: boolean;
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
  isDataColor?: boolean;
}) {
  // const ContentList = dummy.ContentInfo;
  const [checkList, setCheckList] = useState<string[]>([]);

  const [radioCheck, setRadioCheck] = useState<
    { title: string; checkValue: string }[]
  >([]);

  const whenDragEnd = (newList: QuizListType[]) => {
    console.log('@드래그끝났을떄', newList);
  };

  const submitSave = async () => {
    //TODO :  체크박스 체크후 분류 항목체크시 전송
  };

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);

    if (e.target.checked) {
      setCheckList(questionList.map((item) => item.code as string)); //
    } else {
      setCheckList([]);
    }
  };
  const handleSingleCheck = (checked: boolean, id: string) => {
    if (checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };
  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;

    if (!target.checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };

  const showTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.currentTarget.children[1];
    // console.log(target.classList);
    target.classList.add('on');
  };
  const hideTooltip = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.currentTarget.children[1];
    // console.log(target.classList);
    target.classList.remove('on');
  };

  useEffect(() => {
    setCheckedList(checkList);
  }, [checkList]);

  useEffect(() => {
    setCheckList([]);
  }, [questionList]);

  useEffect(() => {
    // 탭 또는 버튼 이동시 이전 단계 저장된 리스트 불러오기
  }, []);

  return (
    <Container>
      {questionList.length == 0 && (
        <ValueNone info="문항을 추가 해주세요" textOnly></ValueNone>
      )}
      {questionList.length > 0 && (
        <ScrollWrapper $height={$height}>
          <PerfectScrollbar>
            {showTitle && (
              <Title>
                {showCheckBox && (
                  <CheckBoxI
                    $margin={'0 5px 0 0'}
                    onChange={(e) => handleAllCheck(e)}
                    checked={
                      checkList.length === questionList.length ? true : false
                    }
                    // checked={true}
                    id={'all check'}
                    value={'all check'}
                  />
                )}
                <span className={`${fontBold ? `bold` : ''} title_top`}>
                  전체선택
                </span>
              </Title>
            )}
            <ListWrapper>
              <DnDWrapper
                dragList={questionList}
                onDragging={() => {}}
                onDragEnd={whenDragEnd}
                dragSectionName={'abc'}
              >
                {(dragItem, ref, isDragging) => (
                  <ListItem
                    ref={ref}
                    className={`${isDataColor && dragItem.classificationData?.length && `on`} ${isDragging ? 'opacity' : ''}`}
                  >
                    {showCheckBox ? (
                      <button
                        type="button"
                        className="title"
                        onClick={(e) => {
                          handleButtonCheck(e, dragItem.code);
                        }}
                      >
                        <CheckBoxI
                          $margin={'0 5px 0 0'}
                          onChange={(e) =>
                            handleSingleCheck(e.target.checked, dragItem.code)
                          }
                          checked={
                            checkList.includes(dragItem.code as string)
                              ? true
                              : false
                          }
                          id={dragItem.code}
                          value={dragItem.code}
                        />
                        <span className="title_id">{dragItem.code}</span>
                        <span className="title_tag">{`객관식`}</span>
                      </button>
                    ) : (
                      <span className="title">
                        <span className="title_id">{dragItem.code}</span>
                        <span className="title_tag">{`객관식`}</span>
                      </span>
                    )}
                    <MetaGroup
                      onMouseOver={(e) => showTooltip(e)}
                      onMouseLeave={(e) => hideTooltip(e)}
                    >
                      <span className="sub_title ellipsis">
                        {dragItem.code}
                      </span>

                      <Tooltip>
                        <span>{dragItem.code}</span>
                      </Tooltip>
                    </MetaGroup>
                    {showViewAllButton && (
                      <ViewAllButton>
                        <button
                          type="button"
                          onClick={() => {
                            windowOpenHandler({
                              name: 'quizpreview',
                              url: '/quizpreview',
                              $width: 500,
                              $height: 500,
                            });
                          }}
                        >
                          전체보기
                          <Icon
                            $margin={'0 0 0 2px'}
                            width={`10px`}
                            src={`/images/icon/view_arrow.svg`}
                            disabled={true}
                          />
                        </button>
                      </ViewAllButton>
                    )}
                  </ListItem>
                )}
              </DnDWrapper>
            </ListWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      )}
    </Container>
  );
}

const Container = styled.div<{ $height?: string }>`
  /* border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none; */
  width: 100%;
  height: fit-content;
`;
const ScrollWrapper = styled.div<{ $height?: string }>`
  /* overflow-y: auto; */
  width: 100%;
  height: ${({ $height }) => ($height ? ` ${$height}` : `calc(100vh - 100px)`)};
  background-color: ${COLOR.LIGHT_GRAY};
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  .title_top {
    font-size: 15px;
  }
  .bold {
    font-weight: bold;
  }
`;
const ListWrapper = styled.ul`
  padding: 10px 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
`;

const ListItem = styled.li`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  padding: 10px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  background-color: #fff;
  border-radius: 5px;
  min-height: 50px;
  margin-bottom: 10px;

  &.on {
    background-color: ${COLOR.IS_HAVE_DATA};
    button.title {
      background-color: ${COLOR.IS_HAVE_DATA};
    }
  }
  button.title {
    font-size: 15px;
    width: 100%;
    padding-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    border: none;
    background-color: #fff;
    cursor: pointer;

    .title_id {
      flex: 1 0 0;
      text-overflow: ellipsis;
      word-break: break-all;
      text-align: left;
      color: ${COLOR.PRIMARY};
      /* padding-top: 1px; */
    }
    .title_tag {
      width: 40px;
      text-align: left;
      font-size: 13px;
      font-weight: bold;
      color: ${COLOR.ALERTBAR_SUCCESS};
    }
  }
  span.title {
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    padding-bottom: 5px;
    width: 100%;

    span.title_id {
      text-overflow: ellipsis;
      word-break: break-all;
      color: ${COLOR.PRIMARY};
      width: calc(100% - 40px);
    }
    .title_tag {
      width: 40px;
      text-align: right;
      font-size: 13px;
      font-weight: bold;
      color: ${COLOR.ALERTBAR_ERROR};
    }
  }

  &.opacity {
    opacity: 0.8;
  }
`;

const MetaGroup = styled.span`
  border: none;
  background-color: transparent;
  position: relative;
  display: flex;
  width: 100%;

  .sub_title {
    padding-top: 5px;
    width: 100%;
    font-size: 13px;
    border-top: 1px solid ${COLOR.BORDER_BLUE};
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
const ViewAllButton = styled.p`
  width: 100%;
  text-align: right;
  > button {
    font-size: 13px;
    font-weight: bold;
    height: 15px;
    margin-top: 0;
    display: inline-block;
    border: none;
    background-color: #fff;
    color: ${COLOR.ALERTBAR_SUCCESS};
    cursor: pointer;

    > button {
      transform: translateY(1px);
    }
  }
`;
