import * as React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { classificationInstance, quizService } from '../../api/axios';
import {
  ItemSelectProps,
  AlertBar,
  Label,
  Input,
  Button,
  openToastifyAlert,
} from '../../components/atom';
import { COLOR } from '../../components/constants';
import { Alert } from '../../components/molecules/alert';
import { useModal } from '../../hooks';
import { IdxNamePair, QuizClassificationData, QuizListType } from '../../types';
import { postRefreshToken } from '../../utils/tokenHandler';

interface CategoryItem {
  idx: number;
  name: string;
  code: string;
  depth: number;
  isUse: boolean;
  children?: CategoryItem[];
}

export function EditModal({
  sortedQuizList,
  openFormula,
  change,
  idxNamePairs,
  beforeText,
  state,
}: {
  sortedQuizList: QuizListType[];
  openFormula: (state: unknown) => void;
  change: React.Dispatch<any>;
  idxNamePairs: IdxNamePair[];
  beforeText: string;
  state: '수정' | '복제' | null;
}) {
  const { closeModal } = useModal();

  const [isCheckedArr, setIsCheckedArr] = useState<boolean[]>([]);
  const [changeValue, setChangeValue] = useState<string>('');
  const [selectedIdx, setSelectedIdx] = useState<string | null>(null);
  const [itemIdx, setItemIdx] = useState<string | null>(null);
  const [clickIndex, setClickIndex] = useState<number | null>(null);
  const [educationCurriculumList, setEducationCurriculumList] = useState<any[]>(
    [],
  );
  //최초 1뎁스
  const [listDepth1, setListDepth1] = useState<CategoryItem[]>([]);
  //다음 뎁스 아이템들
  const [childItems, setChildItems] = useState<CategoryItem | null>(null);

  const [tagCheckList, setTagCheckList] = useState<string[]>([]);
  const [tagDataList, setTagDataList] = useState<CategoryItem[]>([]);
  const searchEditDivRef = useRef<HTMLDivElement | null>(null);

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  // 변경 버튼
  const changeEdit = () => {
    console.log('체크 된 문항 데이터 sortedQuizList -------', sortedQuizList);
    const codeList = sortedQuizList.map((el) => el.code);
    console.log('체크 된 문항 데이터 codeList -------', codeList);
    console.log('최종 변경될 값 tagDataList -------', tagDataList);
    // tagDataList를 카테고리별로 그룹화
    const categoryMap: Record<string, { code: string; name: string }[]> = {};

    tagDataList.forEach((item) => {
      if (!categoryMap[item.code]) {
        categoryMap[item.code] = [];
      }
      categoryMap[item.code].push({ code: item.code, name: item.name });
    });

    // categoryList를 동적으로 생성
    const categoryList = [
      Object.keys(categoryMap).reduce(
        (acc, key) => {
          acc[key] = categoryMap[key];
          return acc;
        },
        {} as Record<string, { code: string; name: string }[]>,
      ),
    ];
    console.log('최종 변경될 값 categoryList -------', categoryList);

    const dataClassification = {
      commandCode: state == '복제' ? 0 : 1,
      quizCodeList: codeList,
      categoryList: categoryList,
    };

    mutateChangeClassification(dataClassification);

    if (beforeText !== '' && changeValue !== '' && tagDataList.length) {
      const idxList = sortedQuizList.map((el) => el.idx);
      // 변경된값 최종적으로 저장
      // 해당 텍스트 수정의 경우 비필수로
      // 필수인 카테고리 수정이 일어날때 추가로 호출
      const data = {
        idxList: idxList,
        before: beforeText,
        after: changeValue,
      };
      // 문항 텍스트 일괄 변경
      console.log('최종 변경될 문항 텍스트 일괄 변경값 data -------', data);
      patchChangeAcconut(data);
    }

    onSearchList();
  };

  // 분류 바꾸기 api
  const putClassification = async (data: QuizClassificationData) => {
    const res = await quizService.put(`/v1/item`, data);
    console.log('데이터 분류 바꾸기 api 리턴값', res);
    return res;
  };

  const { data: changeClassificationData, mutate: mutateChangeClassification } =
    useMutation({
      mutationFn: putClassification,
      onError: (context: {
        response: { data: { message: string; code: string } };
      }) => {
        openToastifyAlert({
          type: 'error',
          text: context.response.data.message,
        });
        if (context.response.data.code == 'GE-002') {
          postRefreshToken();
        }
      },
      onSuccess: (response: { data: { message: string } }) => {
        openToastifyAlert({
          type: 'success',
          text: response.data.message,
        });
        //초기화
        // onResetList();
        closeModal();
      },
    });

  useEffect(() => {
    if (changeClassificationData) {
      console.log('changeClassificationData ------ ', changeClassificationData);
    }
  }, [changeClassificationData]);

  // 텍스트 일괄 변경 api
  //
  const patchChangeAccount = async (data: {
    idxList: number[];
    before: string;
    after: string;
  }) => {
    return await quizService.patch(`/v1/quiz/change/text`, data);
  };

  const { mutate: patchChangeAcconut } = useMutation({
    mutationFn: (data: { idxList: number[]; before: string; after: string }) =>
      patchChangeAccount(data),
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      openToastifyAlert({
        type: 'success',
        text: '변경 되었습니다.',
      });
    },
  });

  const onSearchList = () => {
    if (searchEditDivRef.current) {
      const divContent = searchEditDivRef.current.innerHTML;
      setChangeValue(divContent);
      console.log('수식버튼 변경된 값:', divContent);
    }
  };

  const handleChangeValueChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerHTML;
    if (newValue !== changeValue) {
      setChangeValue(newValue);
    }
  };

  // 가져온 리스트에 해당하는 값은 최초에 체크된 상태로
  useEffect(() => {
    if (sortedQuizList && sortedQuizList.length > 0) {
      // 최초 랜더링시 선택된 아이템의
      console.log(
        '선택된 아이템의 데이터 리스트 sortedQuizList---',
        sortedQuizList,
      );

      // 카테고리 데이터 축출 후
      const list = sortedQuizList
        .flatMap((item) => item.quizCategoryList || []) // quizCategoryList 추출
        .filter((categoryItem) => categoryItem.type === 'CATEGORY') // type이 'CATEGORY'인 객체 필터링
        .flatMap((categoryItem) =>
          Object.values(categoryItem.quizCategory || {}),
        ) // quizCategory 내의 모든 배열 추출
        .flat(); // 중첩된 배열 평탄화
      console.log('list --------', list);

      const categoryList: CategoryItem[] = list.map((quizCategory: any) => ({
        idx: quizCategory.idx,
        name: quizCategory.name as string,
        code: quizCategory.code as string,
        depth: 0, // 임의의 depth 설정, 필요에 따라 조정 가능
        isUse: true, // 기본적으로 활성 상태
      }));
      console.log('categoryList --------', categoryList);
      // 체크 상태에 동기화
      setTagDataList(categoryList);
      setTagCheckList(
        categoryList.map((item) => `${item.code}${item.name}-items`),
      );
    }
  }, []);

  useEffect(() => {
    console.log(
      'tagDataList, tagCheckList --------',
      tagDataList,
      tagCheckList,
    );
  }, [tagDataList, tagCheckList]);

  // 셋팅 idx, name 리스트
  useEffect(() => {
    // 그룹 코드 호출
    // console.log('셋팅에서 가져온 그룹 idx, name ---- ', idxNamePairs);
  }, [idxNamePairs]);

  // 첫번째 맵핑 리스트 조회
  const getCategoryMapDepth1 = async () => {
    if (idxNamePairs) {
      const res = await classificationInstance.get(
        `/v1/category/${idxNamePairs[0].idx}`,
      );
      const list = res.data.classes;
      console.log('셋팅에서 가져온 idx로 맵핑리스트 조회 -----', list);
      return list;
    }
  };

  const { data: mappingData, refetch: mappingDataRefetch } = useQuery({
    queryKey: ['get-categoryMap'], // 쿼리 키를 unique하게 설정
    queryFn: getCategoryMapDepth1, // groupIdx 추출
    enabled: !!idxNamePairs,
    meta: {
      errorMessage: 'get-categoryMap 에러 메세지',
    },
  });

  // 1차적으로 리스트 체크박스로 뿌려준 뒤
  useEffect(() => {
    if (mappingData) {
      // children 속성을 제외한 새로운 배열 생성
      // TODO : api 변경시 내부 구조도 변경
      const processedData = (mappingData as CategoryItem[]).map(
        ({ children, ...rest }) => rest,
      );

      // listDepth1에 첫줄 체크박스
      setListDepth1(processedData);
    }
  }, [mappingData]);
  useEffect(() => {
    // console.log('listDepth1 -----', listDepth1);
    // 첫번째 배열의 길이만큼 체크박스 상태값
    const isCheckedArrArray = listDepth1.map(() => false);
    // isCheckedArr 상태값 설정
    setIsCheckedArr(isCheckedArrArray);
  }, [listDepth1]);

  // 다음 뎁스 맵핑 api 호출
  const getCategoryMap = async () => {
    if (selectedIdx) {
      const res = await classificationInstance.get(
        `/v1/category/${itemIdx}/${selectedIdx}`,
      );
      const list = res.data.categoryClassList;
      return list;
    }
  };

  const { data: childItemsData, refetch: fetchChildItems } = useQuery({
    queryKey: ['get-categoryMap', selectedIdx],
    queryFn: getCategoryMap, // 선택된 idx로 API 호출
    enabled: selectedIdx !== null,
    meta: {
      errorMessage: `get-categoryMap 에러 메세지-${selectedIdx}`,
    },
  });

  // 클릭시 다음 단계
  const toggleAccordion = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const id = e.currentTarget.id;
    // console.log('id ----- ', id);
    setSelectedIdx(id);
    setItemIdx(id);
    // 리스트가 조회된후
    const target = e.target as HTMLInputElement;
    const ischeck = target.checked;
    console.log(target);
    console.log(ischeck);
    const isCheckedArrCopy = [...isCheckedArr];
    // 클릭된 index의 값을 ischeck로 변경
    isCheckedArrCopy[index] = ischeck;

    setIsCheckedArr(isCheckedArrCopy);
    setClickIndex(index + 1);
  };

  useEffect(() => {
    // console.log('isCheckedArr ---------- ', isCheckedArr);
  }, [isCheckedArr, clickIndex]);

  useEffect(() => {
    // console.log('clickIndex ----- ', clickIndex);
    // console.log('selectedIdx ----- ', selectedIdx);
    if (selectedIdx) fetchChildItems();
  }, [selectedIdx]);

  //선탣된 데이터 로드 후 하단으로 펼침
  const addChildDom = () => {
    // 자식 데이터 로드
    if (childItemsData && clickIndex) {
      // console.log('childItemsData[index] ----- ', childItemsData[clickIndex]);
      const items = childItemsData[clickIndex];
      setChildItems(items);
    }
  };
  useEffect(() => {
    addChildDom();
  }, [childItemsData]);

  useEffect(() => {}, [childItems]);

  // 보이는 ui 체크 핸들러
  const handleCheckboxChange = (code: string) => {
    setTagCheckList((prev) =>
      prev.includes(code)
        ? prev.filter((item) => item !== code)
        : [...prev, code],
    );
  };
  // 보내질 데이터 핸들러
  const handleCheckData = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    name: string,
    code: string,
    depth: number,
  ) => {
    // 클릭시 체크상태를 확인 후
    // console.log(e.currentTarget.checked, idx, name, code, depth);
    const isChecked = e.currentTarget.checked;
    setTagDataList((prevTagDataList) => {
      // 체크된 경우, 리스트에 아이템 추가
      if (isChecked) {
        // 이미 리스트에 아이템이 있는지 확인하여 중복 방지
        const exists = prevTagDataList.some((item) => item.idx === idx);
        if (!exists) {
          return [...prevTagDataList, { idx, name, code, depth, isUse: true }];
        }
        return prevTagDataList; // 이미 존재하면 기존 리스트 반환
      } else {
        // 체크가 해제된 경우, 리스트에서 해당 아이템 제거
        return prevTagDataList.filter((item) => item.idx !== idx);
      }
    });

    // 디버깅용으로 현재 상태를 콘솔에 출력
    console.log(`체크박스 ${isChecked ? '선택됨' : '선택 해제됨'}:`, {
      idx,
      name,
      code,
      depth,
    });
  };

  useEffect(() => {
    console.log('tagDataList ------- ', tagDataList);
  }, [tagDataList]);

  useEffect(() => {
    change({
      tag: tagCheckList,
      changeValue: changeValue,
    });
  }, [changeValue, tagCheckList]);

  const renderChildren = (children: CategoryItem[] | undefined) => {
    if (!children || children.length === 0) return null;

    return (
      <div className="child-items">
        {children.map((child) => (
          <div
            key={child.idx}
            className="child-item"
            style={{ paddingLeft: `${child.depth * 10}px` }}
          >
            <label>
              <input
                type="checkbox"
                checked={tagCheckList.includes(
                  `${child.code}${child.name}-items`,
                )}
                onChange={(e) => {
                  handleCheckboxChange(`${child.code}${child.name}-items`);
                  handleCheckData(
                    e,
                    child.idx,
                    child.name,
                    child.code,
                    child.depth,
                  );
                }}
              />
              {child.name}
            </label>
            {/* 재귀적으로 하위 children 렌더링 */}
            {renderChildren(child.children)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Container>
      <AlertBar
        type="success"
        isAlertOpen={isSuccessAlertOpen}
        closeAlert={closeSuccessAlert}
        message={'정상 처리되었습니다.'}
      />

      <Title>문항 수정{state == '복제' && ' 후 복제'}</Title>
      <p className="sub_title">총 {sortedQuizList.length}문항에 대해</p>
      <p>변경할 분류</p>
      <TagMappingList>
        {listDepth1.map((item, index) => (
          <div key={`${item.idx}`}>
            <button
              type="button"
              id={`${item.idx}`}
              className="tag_item"
              onClick={(e) => toggleAccordion(e, index)}
            >
              <label>
                <input
                  type="checkbox"
                  checked={tagCheckList.includes(
                    `${item.code}${item.name}-items`,
                  )}
                  onChange={(e) => {
                    handleCheckboxChange(`${item.code}${item.name}-items`);
                    handleCheckData(
                      e,
                      item.idx,
                      item.name,
                      item.code,
                      item.depth,
                    );
                  }}
                />
                {item.name}
              </label>
            </button>
            {isCheckedArr[index] &&
              childItems &&
              renderChildren(childItems.children)}
          </div>
        ))}
      </TagMappingList>
      <p>
        변경할 내용 (현재 검색어 :
        {beforeText.length ? (
          <span dangerouslySetInnerHTML={{ __html: beforeText }}></span>
        ) : (
          '없음'
        )}
        )
      </p>
      <InputWrapper>
        <div
          ref={(el) => {
            if (el && el.innerHTML !== changeValue) {
              el.innerHTML = changeValue;
            }
            searchEditDivRef.current = el;
          }}
          className="second_area_test"
          contentEditable
          onInput={handleChangeValueChange}
          style={{
            minHeight: '35px',
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
            width: 'calc(100% - 85px)',
            overflowWrap: 'break-word',
          }}
        />
        {changeValue === '' && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '15px',
              color: '#999',
              pointerEvents: 'none',
              width: 'calc(100% - 125px)',
              height: '20px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <span>찾을값을 입력해주세요(두글자 이상)</span>
          </span>
        )}

        <Button
          width={'80px'}
          height={'35px'}
          fontSize={'14px'}
          $margin={'0 0 0 5px'}
          cursor
          $filled
          $success
          onClick={() => {
            openFormula('second_area_test');
          }}
        >
          수식
        </Button>
      </InputWrapper>
      <ButtonWrapper>
        <Button
          onClick={() => {
            closeModal();
            setChangeValue('');
          }}
        >
          취소
        </Button>
        <Button $filled onClick={() => changeEdit()}>
          확인{state == '복제' && '(복제)'}
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 700px;
  min-width: 600px;
  padding: 30px;
  padding-top: 0;

  .sub_title {
    font-size: 16px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    padding: 5px 0;
  }

  .child-items {
    max-height: 300px;
    overflow-y: auto;
  }
`;

const Title = styled.strong`
  font-size: 20px;
  width: 100%;
  display: block;
  font-weight: bold;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
`;

const TagMappingList = styled.div`
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow-y: auto;

  .tag_item {
    padding: 5px;
    display: flex;
    width: fit-content;
    border: none;
    background-color: transparent;

    > input {
      display: inline-block;
      padding: 5px;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 5px;
  position: relative;

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
  justify-content: center;
  padding: 10px 0;
  gap: 10px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 50px;
  padding-left: calc(50% - 35px);
`;
