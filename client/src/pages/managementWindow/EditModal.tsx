import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { classificationInstance } from '../../api/axios';
import {
  ItemSelectProps,
  AlertBar,
  Label,
  Input,
  Button,
} from '../../components/atom';
import { COLOR } from '../../components/constants';
import { Alert } from '../../components/molecules/alert';
import { useModal } from '../../hooks';
import { IdxNamePair, QuizListType } from '../../types';
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
  const [selectedIdx, setSelectedIdx] = useState<string>('');

  const [educationCurriculumList, setEducationCurriculumList] = useState<any[]>(
    [],
  );
  //최초 1뎁스
  const [listDepth1, setListDepth1] = useState<CategoryItem[]>([]);
  //다음 뎁스 아이템들
  const [childItems, setChildItems] = useState<CategoryItem | null>(null);

  const [tagCheckList, setTagCheckList] = useState<number[]>([]);
  const searchEditDivRef = useRef<HTMLDivElement | null>(null);

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  const closeSuccessAlert = () => {
    setIsSuccessAlertOpen(false);
  };

  // 변경 버튼
  const changeEdit = () => {
    const idxList = sortedQuizList.map((el) => el.idx);
    // 변경된값 최종적으로 저장
    // 해당  텍스트 수정의 경우 비필수로
    // 필수인 카테고리 수정이 일어날때 추가로 호출
    const data = {
      idxList: idxList,
      before: beforeText,
      after: changeValue,
    };

    console.log('최종 변경될 값 data -------', data);
    // onSearchList();

    // closeModal();
  };

  // 문항 텍스트 일괄 변경
  // `/v1/quiz/change/text`

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

  //TODO : 가져온 리스트에 해당하는 값은 최초에 체크된 상태로
  // useEffect(() => {
  //   if (sortedQuizList && sortedQuizList.length > 0) {
  //     const extractedData = sortedQuizList
  //       .flatMap((item) => item.quizCategoryList || [])
  //       .filter((quizCategoryItem) => quizCategoryItem.quizCategory?.교육과정)
  //       .flatMap(
  //         (quizCategoryItem) =>
  //           quizCategoryItem.quizCategory.교육과정 as string,
  //       )
  //       .map((curriculum: any) => curriculum.name); // Extract only 'name' field

  //     setEducationCurriculumList(extractedData);
  //   }
  // }, [sortedQuizList]);

  // 셋팅 idx, name 리스트
  useEffect(() => {
    // 그룹 코드 호출
    console.log('셋팅에서 가져온 그룹 idx, name ---- ', idxNamePairs);
  }, [idxNamePairs]);

  // 첫번째 맵핑 리스트 조회
  const getCategoryMapDepth1 = async () => {
    if (idxNamePairs) {
      const res = await classificationInstance.get(
        `/v1/category/map/${idxNamePairs[0].idx}`,
      );
      const list = res.data.data.mapList;
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
    console.log('listDepth1 -----', listDepth1);
    // 첫번째 배열의 길이만큼 체크박스 상태값
    const isCheckedArrArray = listDepth1.map(() => false);
    // isCheckedArr 상태값 설정
    setIsCheckedArr(isCheckedArrArray);
  }, [listDepth1]);

  // 다음 뎁스 맵핑 api 호출
  const getCategoryMap = async () => {
    if (selectedIdx) {
      const res = await classificationInstance.get(
        `/v1/category/map/${selectedIdx}`,
      );
      const list = res.data.data.mapList;
      return list;
    }
  };

  const { data: childItemsData, refetch: fetchChildItems } = useQuery({
    queryKey: ['get-categoryMap', selectedIdx],
    queryFn: getCategoryMap, // 선택된 idx로 API 호출
    enabled: selectedIdx !== '', // 초기에는 비활성화
    meta: {
      errorMessage: `get-categoryMap 에러 메세지-${selectedIdx}`,
    },
  });

  // 클릭시 다음 단계 리스트가 조회된후 하단으로 펼침
  const toggleAccordion = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const id = e.currentTarget.id;
    setSelectedIdx(id);

    const target = e.target as HTMLInputElement;
    const ischeck = target.checked;
    console.log(ischeck);
    const isCheckedArrCopy = [...isCheckedArr];
    // 클릭된 index의 값을 ischeck로 변경
    isCheckedArrCopy[index] = ischeck;

    setIsCheckedArr(isCheckedArrCopy);

    // 자식 데이터 로드
    if (childItemsData) {
      console.log('childItemsData[index] ----- ', childItemsData[index]);
      const items = childItemsData[index];

      setChildItems(items);
    }
  };

  useEffect(() => {
    // console.log('isCheckedArr ---------- ', isCheckedArr);
  }, [isCheckedArr]);

  useEffect(() => {
    console.log('selectedIdx ----- ', selectedIdx);
    if (selectedIdx == '') fetchChildItems();
  }, [selectedIdx]);

  useEffect(() => {}, [childItemsData, childItems]);

  const handleCheckboxChange = (idx: number) => {
    setTagCheckList((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx],
    );
  };

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
                checked={tagCheckList.includes(child.idx)}
                onChange={() => handleCheckboxChange(child.idx)}
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
                  checked={tagCheckList.includes(item.idx)}
                  onChange={() => handleCheckboxChange(item.idx)}
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
