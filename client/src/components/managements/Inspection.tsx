import * as React from 'react';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  InspectionList,
  Loader,
  Modal,
  PaginationBox,
  Select,
  ValueNone,
} from '..';
import {
  classificationInstance,
  quizService,
  resourceServiceInstance,
} from '../../api/axios';
import { pageAtom } from '../../store/utilAtom';
import { ItemCategoryType, QuestionTableType } from '../../types';
import { selectedListType } from '../../types/WorkbookType';
import { postRefreshToken } from '../../utils/tokenHandler';

export function Inspection() {
  const page = useRecoilValue(pageAtom);
  const [categoryList, setCategoryList] = useState<ItemCategoryType[][]>([]);
  const [questionList, setQuestionList] = useState<QuestionTableType[]>([]);
  // 셀렉트
  const [selectedList, setSelectedList] = useState<selectedListType[]>([]);
  const [groupCode, setGroupCode] = useState<string | null>(null);

  //리스트 갱신
  const callServerAPI = () => {
    quizDataRefetch();
  };

  //step3 학습지 생성 후 postMessage로 리스트 갱신
  useEffect(() => {
    // 메시지 이벤트 리스너 설정
    const handleMessage = (event: any) => {
      if (event.data === 'popupClosed') {
        callServerAPI();
      }
    };
    window.addEventListener('message', handleMessage);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  //그룹 화면설정 정보 불러오기 api
  const getMenu = async () => {
    const res = await resourceServiceInstance.get(
      `/v1/menu/path?url=inspectionManagementSetting`,
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
    menuRefetch();
  }, []);

  useEffect(() => {
    if (menuData) {
      const filterList = menuData.data.data.menuDetailList;
      const nameListArray = filterList[0]?.nameList?.split(',') || [];
      const categoryIdxArray = filterList[0]?.idxList?.split(',') || [];
      const typeListArray = filterList[0]?.inputList?.split(',') || [];
      const viewListArray = (filterList[0]?.viewList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const searchListArray = (filterList[0]?.searchList?.split(',') || []).map(
        (item: string) => item === 'true',
      );
      const newArray = nameListArray.map((name: string, index: number) => ({
        name,
        idx: categoryIdxArray[index] || '',
        type: typeListArray[index] || '',
        view: viewListArray[index] || false,
        search: searchListArray[index] || false,
      }));
      setSelectedList(newArray);
      setGroupCode(filterList[0]?.groupCode);
    }
  }, [menuData]);

  ///쿼리스트링 만드는 함수
  const createQueryString = (params: Record<string, string>) => {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
  };

  // 문항리스트 불러오기 api
  const getQuiz = async () => {
    const depthChecks = selectedList.map((el) => el.selectedName);

    //서버로 부터 받은 nameList에 맞게 서버에 요청
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

    const res = await quizService.get(
      `/v1/process?pageIndex=${page}&pageUnit=${8}&${queryString}`,
    );

    return res.data.data;
  };
  const {
    data: quizData,
    isLoading,
    error: quizDataError,
    refetch: quizDataRefetch,
    isPending,
  } = useQuery({
    queryKey: ['get-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-quizList 에러 메세지',
    },
  });

  useEffect(() => {
    if (quizData) {
      setQuestionList(quizData.quizList);
    }
  }, [quizData]);

  // 카테고리의 유형 조회
  const getCategory = async () => {
    const response = await classificationInstance.get(
      `/v1/category/group/${groupCode}`,
    );
    return response.data.data.typeList;
  };
  const { data: groupsData, refetch: groupsDataRefetch } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    meta: {
      errorMessage: 'get-category 에러 메세지',
    },
    enabled: !!groupCode,
  });
  useEffect(() => {
    if (groupsData) {
      fetchCategoryItems(groupsData, setCategoryList);
    }
  }, [groupsData]);

  // 카테고리의 그룹 아이템 조회
  const fetchCategoryItems = async (
    typeList: string,
    setCategory: React.Dispatch<React.SetStateAction<ItemCategoryType[][]>>,
  ) => {
    const typeIds = typeList.split(',').map((id) => id.trim());
    const filteredIds = selectedList
      .filter((item) => item.search) // `search`가 true인 항목 필터링
      .map((item) => item.idx.toString()) // `idx`를 문자열로 변환
      .filter((id) => typeIds.includes(id)); // `typeIds`와 일치하는 항목만 필터링

    try {
      const requests = filteredIds.map((id) =>
        classificationInstance.get(`/v1/category/class/${id}`),
      );
      const responses = await Promise.all(requests);
      const itemsList = responses.map(
        (res) => res?.data?.data?.categoryClassList,
      );
      setCategory(itemsList);
    } catch (error: any) {
      if (error.data?.code == 'GE-002') postRefreshToken();
    }
  };

  //선택값 업데이트 함수
  const selectCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    const selectedValue = event.currentTarget.value;
    console.log(selectedValue);

    setSelectedList((prevList) =>
      prevList.map((item) => {
        if (item.idx === idx) {
          // 선택된 값이 item.name과 같으면 `selectedName` 제거
          if (item.name === selectedValue) {
            const { selectedName, ...rest } = item; // `selectedName` 키 제거
            return rest;
          }

          // 선택된 값이 다르면 `selectedName` 업데이트
          return { ...item, selectedName: selectedValue };
        }
        return item; // 나머지 항목은 변경 없이 유지
      }),
    );
  };

  // 검색용 셀렉트 선택시
  useEffect(() => {
    quizDataRefetch();
  }, [selectedList]);

  // 데이터 변경시 리랜더링
  useEffect(() => {
    quizDataRefetch();
  }, [page]);

  return (
    <Container>
      <TitleWrapper>
        <Title>검수 관리</Title>
      </TitleWrapper>

      {isLoading && (
        <LoaderWrapper>
          <Loader width="50px" />
        </LoaderWrapper>
      )}

      {!isLoading && quizData && (
        <>
          {/* 리스트 셀렉트 */}
          <SelectWrapper>
            {selectedList.map((list, i) => {
              if (list.type === 'SELECT' && list.search) {
                console.log(selectedList.filter((selected) => selected.name));
                return (
                  <Select
                    key={`${list.idx}-${list.selectedName}`}
                    width={'130px'}
                    defaultValue={list.selectedName || list.name}
                    options={categoryList[i]}
                    onSelect={(event) => selectCategoryOption(event, list.idx)}
                    heightScroll={'300px'}
                    isnormalizedOptions
                  />
                );
              }
            })}
          </SelectWrapper>

          {quizData && questionList?.length > 0 ? (
            <>
              <InspectionList
                list={questionList}
                selectedList={selectedList}
                quizDataRefetch={quizDataRefetch}
                totalCount={quizData.pagination.totalCount}
              />
              <PaginationBox
                itemsCountPerPage={quizData.pagination.pageUnit}
                totalItemsCount={quizData.pagination.totalCount}
              />
            </>
          ) : (
            <ValueNoneWrapper>
              <ValueNone />
            </ValueNoneWrapper>
          )}
        </>
      )}
      <Modal />
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
  width: 100%;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: flex-end;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
  padding-top: 15px;
  .btn_title {
    padding-right: 5px;
  }
`;

const ValueNoneWrapper = styled.div`
  padding: 100px 0;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
