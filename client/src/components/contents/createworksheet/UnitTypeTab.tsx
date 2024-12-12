import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import styled from 'styled-components';

import {
  openToastifyAlert,
  Button,
  TabMenu,
  Search,
  ButtonFormatRadio,
  Accordion,
  DepthBlock,
  ValueNone,
  Loader,
  Icon,
  IconButton,
} from '../..';
import {
  classificationInstance,
  resourceServiceInstance,
} from '../../../api/axios';
import {
  ItemCategoryType,
  ItemTreeListType,
  ItemTreeType,
} from '../../../types';
import { selectedListType } from '../../../types/WorkbookType';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { COLOR } from '../../constants';

interface RadioStateType {
  title: string;
  checkValue: number;
  code: string;
  key: string;
}

interface ItemTreeIdxListType {
  itemTreeIdxList: number[];
}

type UnitClassificationType =
  | RadioStateType
  | ItemTreeIdxListType
  | RadioStateType[];

type UnitTypeTabProps = {
  menuList: {
    label: string;
    value: string;
  }[];
  tabVeiw: string;
  setTabVeiw: React.Dispatch<React.SetStateAction<string>>;
  unitClassificationList: UnitClassificationType[][];
  setUnitClassificationList: React.Dispatch<
    React.SetStateAction<UnitClassificationType[][]>
  >;
};

export function UnitTypeTab({
  menuList,
  tabVeiw,
  setTabVeiw,
  unitClassificationList,
  setUnitClassificationList,
}: UnitTypeTabProps) {
  const [categoryTypeList, setCategoryTypeList] = useState<string>('');
  const [selectedList, setSelectedList] = useState<selectedListType[]>([]);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([
    [{ code: '', idx: 0, name: '' }],
  ]);
  const [itemTree, setItemTree] = useState<ItemTreeListType[]>([]);
  const [checkedDepthList, setCheckedDepthList] = useState<number[]>([]);
  //검색
  const [searchValue, setSearchValue] = useState<string>('');
  //하이라이트
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const contentRef = useRef<HTMLDivElement>(null);

  //그룹 화면설정 정보 불러오기 api
  const getMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=workbookClassificationSetting`,
    );
    //console.log(res);
    return res;
  };
  const {
    data: menuData,
    isLoading: isMenuLoading,
    refetch: menuRefetch,
  } = useQuery({
    queryKey: ['get-menu'],
    queryFn: getMenu,
    meta: {
      errorMessage: 'get-menu 에러 메세지',
    },
  });

  useEffect(() => {
    if (menuData) {
      const filterList = menuData.data.data.menuDetailList;
      const nameListArray = filterList[0]?.nameList?.split(',') || [];
      const typeListArray = filterList[0]?.idxList.split(',') || [];
      const typeList = filterList[0]?.idxList;

      const viewListArray = (filterList[0]?.viewList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const searchListArray = (filterList[0]?.searchList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const newArray = nameListArray
        .map((name: string, index: number) => ({
          name,
          idx: typeListArray[index],
          view: viewListArray[index] || false,
          search: searchListArray[index] || false,
        }))
        .filter((item: string) => item.search);
      setSelectedList(newArray);
      setCategoryTypeList(typeList);
    }
  }, [menuData]);

  useEffect(() => {
    if (tabVeiw === '단원·유형별' && categoryTypeList) {
      fetchCategoryItems(categoryTypeList, setCategoryList);
    }
  }, [categoryTypeList, tabVeiw]);

  // 카테고리의 첫번째 유형 조회
  const fetchCategoryItems = async (
    typeList: string,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[][]>>,
  ) => {
    const typeIds = typeList.split(',');
    try {
      if (typeIds.length > 0) {
        const response = await classificationInstance.get(
          `/v1/category/class/${typeIds[0]}`,
        );
        const itemsList = response?.data?.data?.categoryClassList || [];

        setCategory([itemsList]); // 2D 배열로 설정
      }
    } finally {
      //console.log('finally');
    }
  };

  //버튼 클릭 함수
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const radioValue = e.currentTarget.value; // 선택된 값
    const radioName = e.currentTarget.name; // radio 버튼의 name 값
    const radioClass = e.currentTarget.className; // radio 버튼의 class

    // selectedList에서 해당 name에 맞는 항목을 찾아서 selected 값을 업데이트
    const updatedSelectedList = selectedList.map((item) => {
      if (item.name === radioClass) {
        return {
          ...item,
          selected: radioValue, // 선택된 값을 selected로 업데이트
          selectedName: radioName,
        };
      }
      return item;
    });

    // 현재 선택된 항목의 인덱스
    const updateIndex = updatedSelectedList.findIndex(
      (item) => item.name === radioClass,
    );

    // 선택된 항목 이후의 값 초기화
    const finalizedSelectedList = updatedSelectedList.map((item, index) => {
      if (index > updateIndex) {
        const { selected, selectedName, ...rest } = item; // selected와 selectedName 제거
        return rest;
      }
      return item;
    });

    // selectedList를 업데이트합니다.
    setSelectedList(finalizedSelectedList);

    // pidxList를 업데이트 (radioValue를 pidx로 설정)
    const updatedPidxList: number[] = [];
    const indexToUpdate = selectedList.findIndex(
      (item) => item.name === radioClass,
    );

    if (indexToUpdate !== -1) {
      updatedPidxList[indexToUpdate] = Number(radioValue);
    }

    // 선택된 리스트를 순회하며 필요한 데이터 가져오기
    updatedSelectedList.forEach((list, index) => {
      if (list.search) {
        const nextItem = updatedSelectedList[index + 1]; // 다음 항목
        const itemIdx = nextItem ? nextItem.idx : null; // 다음 항목의 idx
        const pidx = updatedPidxList[index]; // 현재 선택된 pidx

        if (itemIdx !== null && pidx !== undefined) {
          fetchCategoryList(itemIdx, pidx, index);
        }
      }
    });

    // 마지막 항목인지 확인하고 `categoryItemTreeDataMutate` 실행
    const isLastItem =
      updatedSelectedList.findIndex((item) => item.name === radioClass) ===
      updatedSelectedList.length - 1;

    if (isLastItem) {
      categoryItemTreeDataMutate();
    }
  };

  /* 선택된 유형에따라 항목 조회 */
  const fetchCategoryList = async (
    itemIdx: number, //구하고자 하는 유형의 idx
    pidx: number, //클릭한 유형의 idx
    index: number,
  ) => {
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      const newCategoryLists = [...categoryList];
      newCategoryLists.splice(index + 1);
      newCategoryLists[index + 1] = res?.data?.data?.categoryClassList || [];
      setCategoryList(newCategoryLists);
    } catch (error) {
      console.error(`Error fetching category list for index ${index}:`, error);
    }
  };

  ///쿼리스트링 만드는 함수
  const createQueryString = (params: Record<string, string>) => {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
  };

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const postCategoryItemTree = async () => {
    const depthChecks = selectedList.map((el) => el.selectedName);

    //서버로 부터 받은 nameList에 맞게 서버에 요청
    //const groupsArray = categoryNameList.split(',');
    const groupsArray = selectedList.map((el) => el.name);
    const keyValuePairs = groupsArray.reduce<Record<string, string>>(
      (acc, item, index) => {
        const depthCheck = depthChecks[index];
        if (depthCheck) {
          acc[item] = depthCheck; // title 속성을 사용하여 acc 객체에 추가
        }
        return acc;
      },
      {},
    );

    const queryString = createQueryString(keyValuePairs);

    const res = await classificationInstance.get(`/v2/item?${queryString}`);
    return res;
  };

  const {
    data: categoryItemTreeData,
    mutate: categoryItemTreeDataMutate,
    isPending,
  } = useMutation({
    mutationFn: postCategoryItemTree,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data?.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { data: ItemTreeListType[] } }) => {
      setItemTree(response.data.data);
    },
  });

  const saveCheckItems = () => {
    const newClassification: UnitClassificationType[] = selectedList.map(
      (item) => ({
        title: item.selectedName || '',
        checkValue: item.selected ? Number(item.selected) : 0,
        code: item.name || '',
        key: item.idx?.toString() || '',
      }),
    );

    if (checkedDepthList.length > 0) {
      newClassification.splice(6, 0, { itemTreeIdxList: checkedDepthList });
    }

    if (unitClassificationList.length < 6) {
      setUnitClassificationList((prevList) => [...prevList, newClassification]);
    } else {
      openToastifyAlert({
        type: 'error',
        text: '교과정보는 최대 5개 까지 저장 가능합니다',
      });
    }

    //저장 성공 후
    onResetList();
  };
  //삭제
  const deleteUnitClassification = (idx: number) => {
    setUnitClassificationList((prevList) => [
      ...prevList.slice(0, idx),
      ...prevList.slice(idx + 1),
    ]);
  };

  //분류 리스트 리셋
  const onResetList = () => {
    // categoryList의 첫 번째 항목을 제외한 나머지 항목을 지웁니다
    const resetCategoryList = [categoryList[0]];

    // selectedList의 항목들의 selected와 selectedName을 지웁니다
    const resetSelectedList = selectedList.map((item) => {
      // `selected`와 `selectedName` 키를 삭제
      const newItem = { ...item }; // item을 복사하여 원본을 보호
      delete newItem.selected; // selected 키 삭제
      delete newItem.selectedName; // selectedName 키 삭제
      return newItem;
    });

    // categoryList와 selectedList를 업데이트합니다.
    setCategoryList(resetCategoryList);
    setSelectedList(resetSelectedList);
  };

  // 수정
  const changeUnitClassification = async (idx: number) => {
    onResetList();
    console.log('unitClassificationList[idx]', unitClassificationList[idx]);
    const transformedList = unitClassificationList[idx]
      .map((item) => {
        // RadioStateType일 경우
        if (
          'key' in item &&
          'code' in item &&
          'checkValue' in item &&
          'title' in item
        ) {
          return {
            idx: Number(item.key), // key -> idx
            name: item.code, // code -> name
            search: true, // search는 true로 설정
            selected: item.checkValue.toString(), // checkValue -> selected
            selectedName: item.title, // title -> selectedName
            view: false, // view는 false로 설정
          };
        }

        // 만약 다른 타입이 있을 경우에는 처리하지 않음 (필요시 추가 처리)
        return null;
      })
      // null을 제거하고 selectedListType[]으로 강제 변환
      .filter((item) => item !== null) as selectedListType[];

    setSelectedList(transformedList);

    // categoryList를 업데이트할 배열을 미리 준비
    const updatedCategoryList = [...categoryList];

    // fetchCategoryLists 호출 후, 그 결과를 updatedCategoryList에 반영
    const fetchPromises = transformedList.map(async (item, index) => {
      const itemIdx = item.idx;
      const pidx = Number(transformedList[index - 1]?.selected); // pidx는 현재 항목의 selected 값

      if (itemIdx && pidx) {
        try {
          const res = await classificationInstance.get(
            `/v1/category/${itemIdx}/${pidx}`,
          );
          // 서버 응답을 받아서 해당 위치에 값 반영
          updatedCategoryList[index] = res?.data?.data?.categoryClassList || [];
        } catch (error) {
          console.error(
            `Error fetching category list for index ${index}:`,
            error,
          );
        }
      }
    });

    // 모든 fetchCategoryLists 호출이 완료된 후, 한 번에 setCategoryList 호출
    await Promise.all(fetchPromises);

    // 최종적으로 updatedCategoryList를 setCategoryList에 넣어줌
    setCategoryList(updatedCategoryList);
    categoryItemTreeDataMutate();
  };

  // 교과정보 추가버튼 disable 처리
  const addButtonBool = useMemo(() => {
    if (unitClassificationList.length < 5 && checkedDepthList.length > 0) {
      return false;
    } else {
      return true;
    }
  }, [unitClassificationList, checkedDepthList]);

  // 검색 기능
  const filterSearchValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // 쿼리 스트링 변경 로직
    setSearchValue(e.currentTarget.value);
  };
  const filterSearchValueEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchValue(e.currentTarget.value);
    }
  };

  // 깊이가 있는 리스트 DepthBlock 체크박스
  const handleSingleCheck = (checked: boolean, idx: number, level: number) => {
    setCheckedDepthList((prev) => {
      let updatedList = checked
        ? [...prev, idx]
        : prev.filter((item) => item !== idx);

      if (checked) {
        // 상위 요소를 체크
        let currentItem = findItemByIdx(idx);
        while (currentItem && currentItem.parentIdx !== 0) {
          const parentItem = findItemByIdx(currentItem.parentIdx as number);
          if (parentItem) {
            if (!updatedList.includes(parentItem.idx)) {
              updatedList.push(parentItem.idx);
            }
            currentItem = parentItem;
          } else {
            break;
          }
        }
      } else {
        // 하위 요소를 모두 체크 해제
        const removeDescendants = (currentIdx: number) => {
          const childItems = findChildItems(currentIdx);
          childItems.forEach((child) => {
            updatedList = updatedList.filter(
              (itemIdx) => itemIdx !== child.idx,
            );
            removeDescendants(child.idx);
          });
        };
        removeDescendants(idx);
      }

      return updatedList;
    });
  };
  const findItemByIdx = (idx: number): ItemTreeType | undefined => {
    for (const tree of itemTree) {
      for (const item of tree.itemTreeList) {
        if (item.idx === idx) {
          return item;
        }
      }
    }
    return undefined;
  };
  const findChildItems = (parentIdx: number): ItemTreeType[] => {
    const children: ItemTreeType[] = [];
    for (const tree of itemTree) {
      children.push(
        ...tree.itemTreeList.filter((item) => item.parentIdx === parentIdx),
      );
    }
    return children;
  };

  // 검색 단어 하이라이트 && 하이라이트간 이동 처리
  const highlightText = (text: string, searchValue: string) => {
    if (searchValue.length < 2) return text;
    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));
    return (
      <span className="text">
        {parts.map((part, index) => {
          const className =
            part.toLowerCase() === searchValue.toLowerCase() ? 'highlight' : '';
          return (
            <span key={index} className={className}>
              {part}
            </span>
          );
        })}
      </span>
    );
  };

  const prevHighlight = () => {
    setHighlightIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const nextHighlight = () => {
    setHighlightIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const highlightedElements = document.querySelectorAll('.highlight');
    if (highlightedElements.length > 0 && highlightIndex !== -1) {
      highlightedElements.forEach((el) => el.classList.remove('current'));
      const currentElement =
        highlightedElements[highlightIndex % highlightedElements.length];
      if (currentElement) {
        currentElement.classList.add('current');
        currentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [highlightIndex]);

  useEffect(() => {
    setHighlightIndex(-1);
  }, [itemTree, searchValue]);

  //단원.유형별 랜더링
  const renderCategoryFields = () => {
    return (
      <>
        <UnitClassifications>
          {unitClassificationList.length > 0 ? (
            <>
              <p className="info">교과정보는 최대 5개 까지 저장 가능합니다</p>
              {unitClassificationList.map((el, idx) => (
                <IconButtonWrapper key={`${el} ${idx} `}>
                  <IconButton
                    width={`calc(100% - 25px)`}
                    fontSize="14px"
                    height="35px"
                    textAlign="left"
                    $padding="0 50px 0 10px"
                    onClick={() => changeUnitClassification(idx)}
                  >
                    <span>
                      {el
                        .filter(
                          (item): item is RadioStateType => 'title' in item,
                        )
                        .map((item) => `${item.title} / `)}
                    </span>
                  </IconButton>

                  <Icon
                    onClick={() => deleteUnitClassification(idx)}
                    $margin={'0 0 0 2px'}
                    width={`15px`}
                    src={`/images/icon/icoclose.svg`}
                  />
                </IconButtonWrapper>
              ))}
            </>
          ) : (
            <p className="info">교과정보는 최대 5개 까지 저장 가능합니다</p>
          )}
        </UnitClassifications>
        {/* 교육과정 라디오 버튼 부분 */}
        {selectedList.map((list, index) => {
          if (list.search) {
            return (
              <div
                className={`${list.idx + 1}depth`}
                id={list.name}
                key={`selected${list.idx + 1}depth ${list.name}`}
              >
                <ButtonFormatRadio
                  branchValue={list.name}
                  titleText={list.name}
                  list={categoryList[index] || []}
                  selected={
                    selectedList.find((item) => item.name === list.name)
                      ?.selected || ''
                  }
                  onChange={(e) => handleRadioCheck(e)}
                  $margin={`5px 0 0 0`}
                />
              </div>
            );
          }
          return null;
        })}
        <p className="line"></p>
        <>
          {/* 교과정보 아코디언 리스트  */}
          {categoryList.length === selectedList.length &&
          selectedList[selectedList.length - 1].selectedName ? (
            <AccordionWrapper>
              <Accordion
                title={`${selectedList.flatMap((el) => el.selectedName).join('/')}`}
                id={`${selectedList.flatMap((el) => el.selectedName).join('/')}`}
              >
                <RowListWrapper>
                  <Search
                    height={'30px'}
                    value={searchValue}
                    onClick={(e) => filterSearchValue(e)}
                    onKeyDown={(e) => filterSearchValueEnter(e)}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    placeholder="검색어를 입력해주세요.(두글자 이상)"
                    maxLength={20}
                  />
                  {searchValue.length > 1 && (
                    <p className="line bottom_text">
                      {`총 
															${
                                categoryItemTreeData && itemTree.length
                                  ? itemTree.reduce(
                                      (total, el) =>
                                        total +
                                        el.itemTreeList.filter((item) =>
                                          item.name.includes(searchValue),
                                        ).length,
                                      0,
                                    )
                                  : 0
                              } 
															건`}
                      <ArrowButtonWrapper>
                        <button onClick={() => prevHighlight()}>
                          <IoMdArrowDropup />
                        </button>
                        <button onClick={() => nextHighlight()}>
                          <IoMdArrowDropdown />
                        </button>
                      </ArrowButtonWrapper>
                    </p>
                  )}
                  {isPending && (
                    <LoaderWrapper>
                      <Loader width="50px" />
                    </LoaderWrapper>
                  )}
                  {categoryItemTreeData ? (
                    <AccordionItemWrapper>
                      {itemTree.length ? (
                        <div ref={contentRef} className="content">
                          {searchValue.length > 0 ? (
                            <>
                              {itemTree.map((el) => (
                                <div key={`${el.itemTreeKey}`}>
                                  {el.itemTreeList.map((item) => (
                                    <DepthBlock
                                      branchValue={`${item.name}`}
                                      highlightText={highlightText}
                                      defaultChecked
                                      key={`depthList${item?.idx} ${item.name}`}
                                      classNameList={`depth-${item.level}`}
                                      id={item?.idx}
                                      name={item.name}
                                      value={item?.idx}
                                      level={item?.level}
                                      onChange={(e) =>
                                        handleSingleCheck(
                                          e.target.checked,
                                          item?.idx,
                                          item?.level,
                                        )
                                      }
                                      checked={
                                        checkedDepthList.includes(item?.idx)
                                          ? true
                                          : false
                                      }
                                      searchValue={searchValue}
                                    >
                                      <span>
                                        {highlightText(item.name, searchValue)}
                                      </span>
                                    </DepthBlock>
                                  ))}
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              {itemTree.map((el) => (
                                <div key={`${el.itemTreeKey}`}>
                                  {el.itemTreeList.map((item) => (
                                    <DepthBlock
                                      branchValue={`${item.name}`}
                                      defaultChecked
                                      key={`depthList${item?.idx} ${item.name}`}
                                      classNameList={`depth-${item.level}`}
                                      id={item?.idx}
                                      name={item.name}
                                      value={item?.idx}
                                      level={item?.level}
                                      onChange={(e) =>
                                        handleSingleCheck(
                                          e.target.checked,
                                          item?.idx,
                                          item?.level,
                                        )
                                      }
                                      checked={
                                        checkedDepthList.includes(item?.idx)
                                          ? true
                                          : false
                                      }
                                      searchValue={searchValue}
                                    >
                                      <span>{item.name}</span>
                                    </DepthBlock>
                                  ))}
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      ) : (
                        <ValueNone textOnly info="등록된 데이터가 없습니다" />
                      )}
                    </AccordionItemWrapper>
                  ) : (
                    <Loader />
                  )}
                </RowListWrapper>
              </Accordion>
            </AccordionWrapper>
          ) : (
            <ValueNoneWrapper>
              <ValueNone
                textOnly
                info="교육과정, 학교급, 학년, 학기를 선택해주세요"
              />
            </ValueNoneWrapper>
          )}
          <SubmitButtonWrapper>
            <Button
              $filled
              disabled={addButtonBool}
              cursor
              width={'150px'}
              $margin={'0 10px 0 0'}
              onClick={() => saveCheckItems()}
            >
              교과정보 추가
            </Button>
          </SubmitButtonWrapper>
        </>
      </>
    );
  };

  return (
    <Container>
      <CategorySection>
        <TabWrapper>
          <TabMenu
            length={4}
            menu={menuList}
            width={'450px'}
            lineStyle
            selected={tabVeiw}
            setTabVeiw={setTabVeiw}
          />
        </TabWrapper>
        <CategoryWrapper>{renderCategoryFields()}</CategoryWrapper>
      </CategorySection>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const CategorySection = styled.div`
  min-width: 956px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 25px;
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px;
`;
const CategoryWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${COLOR.BORDER_BLUE};
  padding: 10px;
  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;

    &.bottom_text {
      font-size: 13px;
      padding-top: 2px;
    }
  }
`;
const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  img {
    opacity: 0.5;
    cursor: pointer;
  }
`;
const UnitClassifications = styled.div`
  padding: 10px 20px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.IS_HAVE_DATA};
  .info {
    color: ${COLOR.SECONDARY};
    font-size: 14px;
  }
`;
const AccordionWrapper = styled.div`
  margin: 10px;
`;
const RowListWrapper = styled.div`
  padding: 10px;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 50px;
  padding-left: calc(50% - 35px);
`;
const ArrowButtonWrapper = styled.span`
  padding: 0 10px;
  > button {
    cursor: pointer;
    padding: 4px;
    background-color: transparent;
    border: none;
  }
`;
const AccordionItemWrapper = styled.div`
  overflow-y: auto;
  max-height: 200px;
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ValueNoneWrapper = styled.div`
  display: flex;
`;
