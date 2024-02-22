import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';

import {
  Button,
  Modal,
  OptionsDepsProps,
  OptionsItemProps,
  Select,
} from '../..';
import { useModal } from '../../../hooks';
import { COLOR } from '../../constants/COLOR';

import {
  selectCategory1,
  selectCategory2,
  selectCategory3,
} from './contentCreatingCategory';
import { SchoolInputModal } from './SchoolInputModal';

export function ContentCreating() {
  const { openModal } = useModal();
  // const [content, setContent] = useState<string[]>([]);
  const [sourceOptions, setSourceOptions] = useState<number[]>([0]);
  const [count, setCount] = useState(1);
  const [selectValue, setSelectValue] = useState({
    idx: 0,
    value: '',
  });
  const [optionList, setOptionList] = useState<
    { idx: number; label: string; options: OptionsItemProps[] }[]
  >([]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    const id =
      event.currentTarget.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement?.parentElement?.id;

    // setContent((prevContent) => [...prevContent, value]);

    // 셀렉트 선택이후 옵션에 속한 버튼값보여주기
    setSelectValue({ idx: Number(id), value: value });

    // 셀렉트 선택이후 셀렉트에 속한 자식 배열값 보여주기
  };

  const showOptionList = () => {
    const arr = selectCategory2[0]?.options.filter(
      (el) => el.label === selectValue.value,
    );
    // arr[0] && console.log(arr[0], arr[0].optionsDeps, selectValue.idx);
    // console.log(selectValue.value);

    if (arr[0] && arr[0].optionsDeps) {
      // 이미 선택된 셀렉트 값일 경우 중복선택 불가
      const value = optionList.filter((el) => el.label === selectValue.value);

      // 인덱스가 같은 셀렉트에서 재선택시 덮어씌우기
      const arrUnique = optionList.filter(
        (arr, index, callback) =>
          index === callback.findIndex((t) => t.idx === arr.idx),
      );

      // console.log('arrUnique', arrUnique);

      if (value.length === 0) {
        setOptionList([
          ...arrUnique,
          {
            label: arr[0].label,
            options: arr[0].optionsDeps,
            idx: selectValue.idx,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    showOptionList();
  }, [selectValue]);

  const addSourceOptions = () => {
    console.log('출처 카테고리 추가 API');
    // openCreateModal();
    setCount(count + 1);
    if (sourceOptions.length < 5) {
      setSourceOptions([...sourceOptions, count]);
    }
  };

  const removeSourceOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const id = target.parentElement?.parentElement?.id;
    const arr = sourceOptions.filter((el) => el !== Number(id));
    setSourceOptions(arr);

    // console.log('부모 배열wldnjwlq el', arr);
    console.log('부모 셀렉트selectValue el', id);
    // 부모 셀렉트 삭제시 옵션셀렉트도 배열에서 삭제
    const resetArr = optionList.filter((el) => el.idx !== Number(id));
    // console.log('자식 셀렉트 삭제시resetArr el', resetArr);
    setOptionList(resetArr);
  };

  console.log('전체optionList', optionList);

  const modalData = {
    title: '',
    content: <SchoolInputModal />,
    callback: () => {},
  };

  // 모달 연뒤
  const openCreateModal = () => {
    openModal(modalData);
  };

  const submitSave = () => {
    console.log('등록하려는 신규 문항에 대한 데이터 post 요청');
    console.log('신규 등록된 문항 리스트 get 요청 API');
  };

  const loadData = () => {
    // 기본 필수 셀렉트값 불러오기
    // 과목 / 출처 / 문항타입 셀렉트 데이터
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      {/* <iframe
        width="100%"
        height="672"
        //src="http://43.201.205.140:40031"
        name="아이텍솔루션"
        frameBorder={0}
        //allow="fullscreen"
        //sandbox="allow-forms allow-modals allow-same-origin"
        //referrerPolicy="no-referrer"
      ></iframe> */}

      <EditContainerWrap>
        <EditWrap>EditWrap</EditWrap>

        <ScrollWrap>
          <SelectListWrap>
            <strong>
              과목<span>*</span>
            </strong>
            <SelectList>
              <li>
                <SelectWrapper>
                  {selectCategory1.map((el) => (
                    <Select
                      width={'110px'}
                      height={'30px'}
                      defaultValue={el.label}
                      key={el.label}
                      options={el.options}
                      onSelect={(event) => selectCategoryOption(event)}
                    />
                  ))}
                </SelectWrapper>
              </li>
            </SelectList>
          </SelectListWrap>
          <SelectListWrap>
            <strong>
              출처<span>*</span>
            </strong>
            <SourceOptionWrap>
              {sourceOptions.map((index) => (
                <SelectList key={`${index} select`} id={index.toString()}>
                  <li>
                    {index === 0 ? (
                      <Button
                        width={'50px'}
                        height={'30px'}
                        fontSize={'15px'}
                        $padding={'5px'}
                        $filled
                        cursor
                        onClick={() => addSourceOptions()}
                      >
                        +
                      </Button>
                    ) : (
                      <Button
                        width={'50px'}
                        height={'30px'}
                        fontSize={'15px'}
                        $padding={'5px'}
                        $filled
                        cursor
                        onClick={(event) => removeSourceOptions(event)}
                      >
                        -
                      </Button>
                    )}
                    <SelectWrapper>
                      {selectCategory2.map((el) => (
                        <>
                          <Select
                            width={'110px'}
                            height={'30px'}
                            defaultValue={el.label}
                            key={el.label}
                            options={el.options}
                            onSelect={(event) => selectCategoryOption(event)}
                          />
                          <span>|</span>
                        </>
                      ))}

                      {optionList &&
                        optionList[index] &&
                        optionList[index].options.map((el) => (
                          <OptionWrap key={`${el.label} optionsDeps`}>
                            <li>
                              {el.type === 'input' && (
                                <input placeholder={`${el.label}`} />
                              )}
                            </li>
                            <li>
                              {el.type === 'datepickup' && (
                                <Button
                                  width="90px"
                                  height="30px"
                                  fontSize="13px"
                                  $normal
                                  onClick={() => {}}
                                  cursor
                                >
                                  기출일시
                                </Button>
                              )}
                            </li>
                            <li>
                              {el.type === 'modal' && (
                                <Button
                                  width="90px"
                                  height="30px"
                                  fontSize="13px"
                                  $normal
                                  onClick={() => openCreateModal()}
                                  cursor
                                >
                                  {el.label}
                                </Button>
                              )}
                            </li>
                            <li>
                              {el.type === 'select' && (
                                <Select
                                  width={'110px'}
                                  height={'30px'}
                                  defaultValue={el.label}
                                  key={el.label}
                                  options={el.options as OptionsDepsProps[]}
                                  onSelect={(event) =>
                                    selectCategoryOption(event)
                                  }
                                />
                              )}
                            </li>
                          </OptionWrap>
                        ))}
                    </SelectWrapper>
                  </li>
                </SelectList>
              ))}
            </SourceOptionWrap>
          </SelectListWrap>
          <SelectListWrap>
            <strong>
              문항타입<span>*</span>
            </strong>
            <SelectList>
              <li>
                <SelectWrapper>
                  {selectCategory3.map((el) => (
                    <Select
                      width={'110px'}
                      height={'30px'}
                      defaultValue={el.label}
                      key={el.label}
                      options={el.options}
                      onSelect={(event) => selectCategoryOption(event)}
                    />
                  ))}
                </SelectWrapper>
              </li>
            </SelectList>
          </SelectListWrap>
        </ScrollWrap>
      </EditContainerWrap>

      <ContentListWrap>
        <ContentList>
          <ul>map</ul>
        </ContentList>
        <Button
          buttonType="button"
          onClick={submitSave}
          height={'40px'}
          $margin="0px"
          fontSize="12px"
        >
          <span>저장</span>
        </Button>
      </ContentListWrap>

      <Modal />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const EditContainerWrap = styled.div`
  flex: 1 1 0;
  margin-bottom: 20px;
`;

const EditWrap = styled.div`
  min-height: calc(100vh - 60px - 100px); // 탭 네비 높이, 하단 셀렉트 높이 제외
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
  margin-bottom: 10px;
`;
const ScrollWrap = styled.div`
  overflow: auto;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const SelectListWrap = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 0 10px;

  strong {
    min-width: 40px;
    padding-top: 10px;
    /* line-height: 1.2; */
    font-size: 15px;
    padding-right: 10px;
    position: relative;
    span {
      position: absolute;
      top: 10px;
      right: 0px;
      color: ${COLOR.RED};
      font-size: 14px;
    }
  }

  &:last-child {
    padding-bottom: 10px;
  }
  &:nth-child(1) {
    padding-top: 10px;
  }
`;

const SourceOptionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const SelectList = styled.ul`
  padding: 5px 10px;

  li {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  color: ${COLOR.GRAY};
`;
const OptionWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;

  input {
    height: 30px;
    padding: 10px;
    width: 120px;
    border: 1px solid ${COLOR.BORDER_GRAY};
    border-radius: 5px;
  }
`;

const ContentListWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 25%;
  padding: 10px;

  button {
    // 저장 버튼
    margin: 10px;
  }
`;
const ContentList = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px - 100px);
  border: 1px solid ${COLOR.BORDER_BLUE};
`;
