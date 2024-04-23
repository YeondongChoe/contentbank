import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoSearch } from 'react-icons/io5';
import { MdPublishedWithChanges } from 'react-icons/md';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { classificationInstance } from '../../api/axios';
import {
  Accordion,
  Button,
  ButtonFormatRadio,
  DepthBlock,
  Loader,
  PaginationBox,
  ResizeLayout,
  ValueNone,
  openToastifyAlert,
} from '../../components';
import { COLOR } from '../../components/constants';
//TODO: 더미데이터
import { questionList } from '../../components/contents/createcontent/contentCreatingCategory';
import { QuizList } from '../../components/contents/createcontent/list';
import { ItemCategoryType, ItemTreeListType, ItemTreeType } from '../../types';

export function ContentInformationChange() {
  const [radio1depthCheck, setRadio1depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio2depthCheck, setRadio2depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio3depthCheck, setRadio3depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio4depthCheck, setRadio4depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio5depthCheck, setRadio5depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio6depthCheck, setRadio6depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [radio7depthCheck, setRadio7depthCheck] = useState<{
    title: string;
    checkValue: number;
    code: string;
  }>({ title: '', checkValue: 0, code: '' });
  const [selected1depth, setSelected1depth] = useState<string>('');
  const [selected2depth, setSelected2depth] = useState<string>('');
  const [selected3depth, setSelected3depth] = useState<string>('');
  const [selected4depth, setSelected4depth] = useState<string>('');
  const [selected5depth, setSelected5depth] = useState<string>('');
  const [selected6depth, setSelected6depth] = useState<string>('');
  const [selected7depth, setSelected7depth] = useState<string>('');
  const [nextList1depth, setNextList1depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList2depth, setNextList2depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);
  const [nextList3depth, setNextList3depth] = useState([
    { code: '', idx: 0, name: '' },
  ]);

  const [radioCheck, setRadioCheck] = useState<
    { title: string; checkValue: number }[]
  >([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [changeValue, setChangeValue] = useState<string>('');
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [checkedDepthList, setCheckedDepthList] = useState<string[]>([]);

  const [categoryItems, setCategoryItems] = useState<ItemCategoryType[]>([]); // 카테고리 항목을 저장할 상태
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]); // 각 카테고리의 상세 리스트를 저장할 상태
  const [itemTree, setItemTree] = useState<ItemTreeListType[]>([]);
  const [itemTreeList, setItemTreeList] = useState<ItemTreeType[]>([]);
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  //  카테고리 불러오기 api
  const getCategory = async () => {
    const res = await classificationInstance.get(`/v1/category`);
    // console.log(`getCategory 결과값`, res);
    return res;
  };
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    error: categoryDataError,
    refetch: categoryDataRefetch,
    isSuccess,
  } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    meta: {
      errorMessage: 'get-category 에러 메세지',
    },
  });
  // 카테고리 데이터가 변경될 때 카테고리 항목 상태 업데이트
  useEffect(() => {
    // console.log(categoryData && categoryData);
    if (categoryData) {
      setCategoryItems(categoryData.data.data.categoryItemList);
    } else if (categoryDataError) {
      categoryDataRefetch();
    }
  }, [categoryData, categoryDataError, categoryDataRefetch]);

  useEffect(() => {
    console.log('0--------------------------', isSuccess);
    if (isSuccess) {
      setIsCategoryLoaded(true);
    }
  }, [isSuccess]);

  const getCategoryGroups = async () => {
    const response = await classificationInstance.get('/v1/category/group/A'); //TODO: /group/${``} 하드코딩된 유형 나중에 해당 변수로 변경
    return response.data.data.typeList;
  };
  const { data: groupsData } = useQuery({
    queryKey: ['get-category-groups'],
    queryFn: getCategoryGroups,
    enabled: !!categoryData,
    meta: {
      errorMessage: 'get-category-groups 에러 메세지',
    },
  });
  useEffect(() => {
    if (groupsData) {
      fetchCategoryItems(groupsData);
    }
  }, [groupsData]);
  // 카테고리의 그룹 유형 조회
  const fetchCategoryItems = async (typeList: string) => {
    const typeIds = typeList.split(',');
    const requests = typeIds.map((id) =>
      classificationInstance.get(`/v1/category/${id}`),
    );
    const responses = await Promise.all(requests);
    const itemsList = responses.map((res) => res.data.data.categoryClassList);
    setCategoryList(itemsList);
  };

  // 라디오 버튼 설정
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.className);
    const depth =
      e.target.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement?.classList[0];
    switch (depth) {
      case '1depth':
        setSelected1depth(e.currentTarget.id);
        setRadio1depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '2depth':
        setSelected2depth(e.currentTarget.value);
        setRadio2depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '3depth':
        setSelected3depth(e.currentTarget.value);
        setRadio3depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '4depth':
        setSelected4depth(e.currentTarget.value);
        setRadio4depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '5depth':
        setSelected5depth(e.currentTarget.value);
        setRadio5depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '6depth':
        setSelected6depth(e.currentTarget.value);
        setRadio6depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
      case '7depth':
        setSelected7depth(e.currentTarget.value);
        setRadio7depthCheck({
          title: e.currentTarget.name,
          checkValue: Number(e.currentTarget.value),
          code: e.currentTarget.className,
        });
        break;
    }
  };

  /* 선택된 유형에따라 항목 조회 */
  //1뎁스 선택시 2뎁스 설정되게
  const getNextList1 = async () => {
    const itemIdx = categoryItems[1].idx; //다음으로 선택할 배열의 idx
    const pidx = radio1depthCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList1depth(res.data.data.categoryClassList);
      return res.data;
    } catch (error) {
      console.error('Error fetching next list: ', error);
      return undefined;
    }
  };
  const { data: nextListData1, refetch: nextListData1Refetch } = useQuery({
    queryKey: ['get-nextList1'],
    queryFn: getNextList1,
    meta: {
      errorMessage: 'get-nextList1 에러 메세지',
    },
    // 체크된 값이 있을때 조회
    enabled: radio1depthCheck.code !== '',
  });

  //2뎁스 선택시 3뎁스 설정되게
  const getNextList2 = async () => {
    const itemIdx = categoryItems[2].idx; //다음으로 선택할 배열의 idx
    const pidx = radio2depthCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList2depth(res.data.data.categoryClassList);
      return res.data;
    } catch (error) {
      console.error('Error fetching next list: ', error);
      return undefined;
    }
  };
  const { data: nextListData2, refetch: nextListData2Refetch } = useQuery({
    queryKey: ['get-nextList2'],
    queryFn: getNextList2,
    meta: {
      errorMessage: 'get-nextList2 에러 메세지',
    },
    // 체크된 값이 있을때 조회
    enabled: radio2depthCheck.code !== '',
  });

  //3뎁스 선택시 4뎁스 설정되게
  const getNextList3 = async () => {
    const itemIdx = categoryItems[3].idx; //다음으로 선택할 배열의 idx
    const pidx = radio3depthCheck.checkValue; // 선택된 체크 박스의 idx
    try {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${pidx}`,
      );
      setNextList3depth(res.data.data.categoryClassList);
      return res.data;
    } catch (error) {
      console.error('Error fetching next list: ', error);
      return undefined;
    }
  };
  const { data: nextListData3, refetch: nextListData3Refetch } = useQuery({
    queryKey: ['get-nextList3'],
    queryFn: getNextList3,
    meta: {
      errorMessage: 'get-nextList3 에러 메세지',
    },
    // 체크된 값이 있을때 조회
    enabled: radio3depthCheck.code !== '',
  });

  useEffect(() => {
    if (radio1depthCheck.code !== '') nextListData1Refetch();
    if (radio2depthCheck.code !== '') nextListData2Refetch();
    if (radio3depthCheck.code !== '') nextListData3Refetch();
  }, [radio1depthCheck, radio2depthCheck, radio3depthCheck]);

  // 체크값 변경시 초기화
  useEffect(() => {
    setSelected2depth('');
  }, [selected1depth]);
  useEffect(() => {
    setSelected3depth('');
  }, [selected2depth]);
  useEffect(() => {
    setSelected4depth('');
    setRadio4depthCheck({ title: '', checkValue: 0, code: '' });
  }, [selected3depth]);

  // 카테고리 선택후 아이템트리
  // 아이템 트리 불러오기 api
  const getCategoryItemTree = async () => {
    const keyValuePairs = categoryItems.reduce<Record<string, string>>(
      (acc, item, index) => {
        const radioDepthCheck = [
          selected1depth,
          selected2depth,
          selected3depth,
          selected4depth,
        ][index];
        if (radioDepthCheck !== undefined) {
          // undefined가 아닐 때만 추가
          acc[item.code] = radioDepthCheck;
        }
        return acc;
      },
      {},
    );

    const jsonList = { jsonList: [keyValuePairs] };
    console.log('jsonList :', jsonList);

    const res = await classificationInstance.post('/v1/item', jsonList);
    console.log('classificationInstance 응답:', res);
    return res;
  };

  const { data: categoryItemTreeData, mutate: categoryItemTreeDataMutate } =
    useMutation({
      mutationFn: getCategoryItemTree,
      onError: (context: { response: { data: { message: string } } }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
      },
      onSuccess: (response: { data: { data: ItemTreeListType[] } }) => {
        // setItemTreeList(res.data.data[0].itemTreeList);
        setItemTree(response.data.data);
      },
    });

  useEffect(() => {
    console.log(radio4depthCheck);
    if (selected4depth == '') return;
    categoryItemTreeDataMutate();
  }, [selected4depth]);

  useEffect(() => {
    // console.log(error);
  }, [itemTree]);

  // 깊이가 있는 리스트 체크박스
  const handleSingleCheck = (checked: boolean, id: string) => {
    // console.log('click');

    if (checked) {
      setCheckedDepthList((prev) => [...prev, id]);
    } else {
      setCheckedDepthList(checkedDepthList.filter((el) => el !== id));
    }
  };

  const buttonDisabled = useMemo(() => {
    if (
      searchValue.length > 1 && //2글자 이상
      selected1depth.length &&
      selected2depth.length &&
      selected3depth.length &&
      selected4depth.length &&
      selected5depth.length &&
      selected6depth.length &&
      selected7depth.length
    ) {
      return false;
    } else {
      return true;
    }
  }, [
    searchValue,
    selected1depth,
    selected2depth,
    selected3depth,
    selected4depth,
    selected5depth,
    selected6depth,
    selected7depth,
  ]);

  return (
    <Container>
      <ResizeLayout
        height={'calc(100vh - 100px)'}
        column={'3rd'}
        item1Width={400}
        minWidth={330}
        maxWidth={1000}
        item1={
          <PositionWrapper>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP1</span> 찾을 내용 입력
              </span>
            </Title>
            <ScrollWrapper>
              <PerfectScrollbar>
                <div className="meta_radio_select">
                  {/* 교육과정 라디오 버튼 부분 */}
                  {isCategoryLoaded && categoryItems[0] && categoryList && (
                    <>
                      {[categoryItems[0]].map((item) => (
                        <div
                          className={`1depth`}
                          key={`selected1depth ${item.idx}`}
                        >
                          <ButtonFormatRadio
                            titleText={`${item.name}`}
                            list={categoryList[0]}
                            selected={selected1depth}
                            onChange={(e) => handleRadioCheck(e)}
                            // defaultChecked={}
                            checkedInput={radio1depthCheck}
                            $margin={`10px 0 0 0`}
                          />
                        </div>
                      ))}

                      {radio1depthCheck.code !== '' &&
                        selected1depth !== '' &&
                        [categoryItems[1]].map((item) => (
                          <div
                            className={`2depth`}
                            key={`selected2depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              titleText={`${item.name}`}
                              list={nextList1depth}
                              selected={selected2depth}
                              onChange={(e) => handleRadioCheck(e)}
                              // defaultChecked={}
                              checkedInput={radio2depthCheck}
                            />
                          </div>
                        ))}

                      {radio2depthCheck.code !== '' &&
                        selected2depth !== '' &&
                        [categoryItems[2]].map((item) => (
                          <div
                            className={`3depth`}
                            key={`selected3depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              titleText={`${item.name}`}
                              list={nextList2depth}
                              selected={selected3depth}
                              onChange={(e) => handleRadioCheck(e)}
                              // defaultChecked={}
                              checkedInput={radio3depthCheck}
                            />
                          </div>
                        ))}
                      {radio3depthCheck.code !== '' &&
                        selected3depth !== '' &&
                        [categoryItems[3]].map((item) => (
                          <div
                            className={`4depth`}
                            key={`selected4depth ${item.idx}`}
                          >
                            <ButtonFormatRadio
                              titleText={`${item.name}`}
                              list={nextList3depth}
                              selected={selected4depth}
                              onChange={(e) => handleRadioCheck(e)}
                              // defaultChecked={}
                              checkedInput={radio4depthCheck}
                            />
                          </div>
                        ))}
                    </>
                  )}
                </div>
                <div className="meta_accordion_select">
                  {radio1depthCheck.code !== '' &&
                    radio2depthCheck.code !== '' &&
                    radio3depthCheck.code !== '' &&
                    radio4depthCheck.code !== '' &&
                    selected1depth !== '' &&
                    selected2depth !== '' &&
                    selected3depth !== '' && (
                      <>
                        <strong>세부 검색조건</strong>
                        <Accordion
                          $backgroundColor={`${COLOR.GRAY}`}
                          title={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}`}
                          id={`${radio1depthCheck.title}/${radio2depthCheck.title}/${radio3depthCheck.title}학년/${radio4depthCheck.title}`}
                          $margin={`0`}
                        >
                          <>
                            {categoryItemTreeData ? (
                              <>
                                {itemTree.length ? (
                                  <>
                                    {itemTree.map((el, idx) => (
                                      <div key={`${el.itemTreeKey}`}>
                                        {el.itemTreeList.map((item) => (
                                          <DepthBlock
                                            key={`depthList${item.code} ${item.name}`}
                                            classNameList={`depth-${item.level}`}
                                            id={item.code}
                                            name={item.name}
                                            value={item.code}
                                            onChange={(e) =>
                                              handleSingleCheck(
                                                e.target.checked,
                                                item.code,
                                              )
                                            }
                                            checked={
                                              checkedDepthList.includes(
                                                item.code,
                                              )
                                                ? true
                                                : false
                                            }
                                          >
                                            <span>{item.name}</span>
                                          </DepthBlock>
                                        ))}
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <ValueNone
                                    textOnly
                                    info="등록된 데이터가 없습니다"
                                  />
                                )}
                              </>
                            ) : (
                              <Loader />
                            )}
                          </>
                        </Accordion>
                      </>
                    )}
                </div>
              </PerfectScrollbar>
            </ScrollWrapper>
            <ButtonWrapper>
              <InputWrapper>
                <input
                  type="text"
                  minLength={2}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="찾을값을 입력해주세요(두글자 이상)"
                />
                <Button
                  width={'80px'}
                  height={'35px'}
                  fontSize={'14px'}
                  $margin={'0 0 0 5px'}
                  cursor
                  $filled
                  $success
                  onClick={() => {}}
                >
                  수식
                </Button>
              </InputWrapper>
              <Button
                $filled
                cursor
                disabled={buttonDisabled}
                onClick={() => {}}
              >
                <span>
                  찾기 <IoSearch />
                </span>
              </Button>
            </ButtonWrapper>
          </PositionWrapper>
        }
        item2={
          <QuizListWrapper>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP2</span> 문항 선택
              </span>
            </Title>
            {questionList.length ? (
              <>
                <QuizList
                  questionList={questionList}
                  $height={`calc(100vh - 220px)`}
                  showTitle
                  showCheckBox
                  showViewAllButton
                  setCheckedList={setCheckedList}
                />
                <ButtonWrapper className="pagination">
                  <PaginationBox itemsCountPerPage={7} totalItemsCount={100} />
                </ButtonWrapper>
              </>
            ) : (
              <ValueNoneWrapper>
                <ValueNone textOnly info={'STEP1 찾을 내용을 입력해주세요'} />
              </ValueNoneWrapper>
            )}
          </QuizListWrapper>
        }
        item3Width={400}
        item3={
          <PositionWrapper>
            <Title>
              <span className="title_top">
                <span className="point_text">STEP3</span> 바꿀 내용 입력
              </span>
            </Title>
            {checkedList.length ? (
              <>
                <ScrollWrapper>
                  <PerfectScrollbar>
                    {/* TODO: 메타데이터 변경 */}

                    <ChangeInfoWrapper>
                      <p className="info_total">
                        선택한 문항 총 {checkedList.length} 건
                      </p>
                      <div className="info_box">
                        {checkedList.length && (
                          <p>
                            총
                            <span className="strong">{checkedList.length}</span>
                            건
                          </p>
                        )}
                        {searchValue && (
                          <p>
                            <span className="strong">{searchValue}</span>
                            를(을)
                          </p>
                        )}
                        {changeValue && (
                          <p>
                            <span className="strong">{changeValue}</span>로 변경
                            하시겠습니까?
                          </p>
                        )}
                      </div>
                    </ChangeInfoWrapper>
                  </PerfectScrollbar>
                </ScrollWrapper>
              </>
            ) : (
              <ValueNoneWrapper>
                <ValueNone textOnly info={'STEP2 문항을 선택해주세요'} />
              </ValueNoneWrapper>
            )}
            <ButtonWrapper>
              <InputWrapper>
                <input
                  type="text"
                  minLength={2}
                  value={changeValue}
                  onChange={(e) => setChangeValue(e.target.value)}
                  placeholder="변경값을 입력해주세요"
                />
                <Button
                  width={'80px'}
                  height={'35px'}
                  fontSize={'14px'}
                  $margin={'0 0 0 5px'}
                  cursor
                  $filled
                  $success
                  onClick={() => {}}
                >
                  수식
                </Button>
              </InputWrapper>
              <Button
                $filled
                cursor
                disabled={changeValue.length < 2}
                onClick={() => {}}
              >
                <span>
                  바꾸기 <MdPublishedWithChanges />
                </span>
              </Button>
            </ButtonWrapper>
          </PositionWrapper>
        }
      />
    </Container>
  );
}
const Container = styled.div`
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
const PositionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 280px);
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  .line {
    border-top: 1px solid ${COLOR.BORDER_GRAY};
    margin: 10px 0;
  }

  .meta_accordion_select {
    padding: 20px;
  }
  .meta_accordion_select {
    strong {
      display: flex;
      font-size: 15px;
      margin-bottom: 5px;
    }
  }
`;
const QuizListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 38px);
  background-color: ${COLOR.LIGHT_GRAY};
`;
const Title = styled.div`
  padding: 15px;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
  height: fit-content;
  .title_top {
    display: flex;
    align-items: center;
    font-size: 15px;
    /* font-weight: bold; */
  }
  .point_text {
    font-size: 25px;
    color: #1976d2;
    padding-right: 15px;
    font-weight: bold;
  }
`;
// const Span = styled.span`
//   color: #1976d2;
// `;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  width: 100%;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 5px;

  > input {
    width: calc(100% - 85px);
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  box-shadow:
    rgba(0, 17, 255, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;

  .pagination {
    padding-bottom: 12px;
  }
`;
const ValueNoneWrapper = styled.div`
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
  height: 100%;
`;
const ChangeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  .info_total {
    color: #fff;
    font-weight: bold;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    background-color: ${COLOR.FONT_NAVI};
  }
  .info_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: ${COLOR.SECONDARY};
    /* font-weight: bold; */
    position: absolute;
    top: calc(50% - 60px);
    padding: 20px;

    p {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 2px;
    }
  }

  .strong {
    background-color: ${COLOR.FONT_NAVI};
    color: #fff;
    padding: 2px;
  }
`;
