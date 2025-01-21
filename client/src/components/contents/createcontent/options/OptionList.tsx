import * as React from 'react';
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Alert } from '../../../../components/molecules';
import { IdxNamePair, ItemCategoryType, QuizListType } from '../../../../types';
import { Button, Select } from '../../../atom';
import { COLOR } from '../../../constants/COLOR';

import { Options } from './Options';
import { OtionsSelect } from './OtionsSelect';

type CategoryList = {
  name: string;
  categories: ItemCategoryType[];
};

interface Props {
  categoriesE?: ItemCategoryType[];
  groupsDataMATERIALS: IdxNamePair[];
  groupsDataINTERNAL: IdxNamePair[];
  groupsDataEXAMS: IdxNamePair[];
  groupsDataETC: IdxNamePair[];
  groupsDataSELFPRODUCED: IdxNamePair[];
  setSelectedSource: React.Dispatch<React.SetStateAction<any[]>>;
  quizCategory?: any[];
  onItemClickData?: QuizListType;
  selectedValue?: React.Dispatch<
    React.SetStateAction<
      {
        [key: number]: string;
      }[]
    >
  >;
}

export function OptionList({
  categoriesE,
  groupsDataMATERIALS,
  groupsDataINTERNAL,
  groupsDataEXAMS,
  groupsDataETC,
  groupsDataSELFPRODUCED,
  setSelectedSource,
  quizCategory,
  onItemClickData,
  selectedValue,
}: Props) {
  const [sourceOptions, setSourceOptions] = useState<number[]>([0]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentRemoveIndex, setCurrentRemoveIndex] = useState<number | null>(
    null,
  );
  const [currentTarget, setCurrentTarget] = useState<EventTarget | null>(null);

  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [selectedValues, setSelectedValues] = useState<{
    [key: number]: string;
  }>({});

  const [sourceSortedValue, setSourceSortedValue] = useState<
    {
      [key: number]: string;
    }[]
  >([]);

  const [totalSource, setTotalSource] = useState<
    {
      [x: string]: any;
      [key: number]: any;
    }[]
  >([]);

  const [optionsList, setOptionsList] = useState<CategoryList[]>([
    { name: '', categories: [] },
    { name: '', categories: [] },
    { name: '', categories: [] },
    { name: '', categories: [] },
    { name: '', categories: [] },
  ]);

  const [sourceArr, setSourceArr] = useState<any[]>([]);
  const [sourceValue, setSourceValue] = useState<{
    titleIdx: string;
    name: string;
    value: string | number;
  }>({ titleIdx: '', name: '', value: '' });

  const getCategoryListFromString = (data: IdxNamePair[]) => {
    return data.map((item) => ({
      code: item.idx,
      idx: Number(item.idx),
      name: item.name,
      type: item.inputType, // inputType을 type으로 매핑
      value: item.searchList ? 1 : 0, // searchList가 true면 value를 1로 설정
      isUse: item.viewList, // viewList를 isUse로 매핑
    }));
  };

  const categoriesMATERIALS = getCategoryListFromString(groupsDataMATERIALS);
  const categoriesINTERNAL = getCategoryListFromString(groupsDataINTERNAL);
  const categoriesEXAMS = getCategoryListFromString(groupsDataEXAMS);
  const categoriesETC = getCategoryListFromString(groupsDataETC);
  const categoriesSELFPRODUCED = getCategoryListFromString(
    groupsDataSELFPRODUCED,
  );

  const lists = [
    {
      name: '교재',
      categories: categoriesMATERIALS,
    },
    {
      name: '내신',
      categories: categoriesINTERNAL,
    },
    {
      name: '기출',
      categories: categoriesEXAMS,
    },
    {
      name: '자체제작',
      categories: categoriesSELFPRODUCED,
    },
    {
      name: '기타',
      categories: categoriesETC,
    },
  ];

  // 부모 셀렉트 핸들링
  const selectCategoryOption = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const value = event.currentTarget.value;
    const id =
      event.currentTarget.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement?.parentElement?.parentElement?.id;

    // 셀렉트 선택이후 옵션에 속한 버튼값보여주기
    setSelectedValues((prev) => ({ ...prev, [index]: value }));

    // console.log('v', value, 'id', id);
    // 중복셀렉트 선택못하도록

    //셀렉트 선택시에만 추가 가능하도록
    setDisabled(false);
    if (sourceOptions.length == 5) {
      setDisabled(true);
    }
  };

  const addSourceOptions = () => {
    // console.log('출처 카테고리 추가 API');
    setCount(count + 1);
    if (sourceOptions.length < 5) {
      setSourceOptions([...sourceOptions, count]);
    }
    //셀렉트 선택시에만 추가 가능하도록 초기화
    setDisabled(true);
  };
  useEffect(() => {}, [disabled]);

  //출처 삭제 얼럿
  const openUpdateAlert = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    setCurrentRemoveIndex(index);
    setCurrentTarget(event.currentTarget);
    setIsAlertOpen(true);
  };

  const removeSourceOptions = (target: EventTarget, index: number) => {
    const id = (target as HTMLElement).parentElement?.parentElement?.id;
    const titleValue = (
      target as HTMLElement
    ).parentElement?.parentElement?.innerText
      ?.trim()
      .toLowerCase();
    const arr = sourceOptions.filter((el) => el !== Number(id));

    // console.log('출처 - 버튼눌러 삭제 후 배열', id);

    setSourceOptions(arr);

    const title = titleValue
      ?.replace('기출일시', '')
      .replace(/[^가-힣a-zA-Z0-9]/g, '')
      .trim() as string;

    // console.log('추출된 타이틀 값:', title);
    // selectedValues에서 title 값과 정확히 일치하는 항목을 필터링
    const newSelectedValues = Object.fromEntries(
      Object.entries(selectedValues).filter(([_, value]) => {
        const normalizedValue = value.trim(); // 공백 제거한 값
        const includesTitle = normalizedValue.includes(title); // title이 포함되어 있는지 확인
        // console.log(
        //   `비교 중: value='${normalizedValue}', title='${title}', includesTitle=${includesTitle}`,
        // );
        return !includesTitle;
      }),
    );

    setSelectedValues(newSelectedValues);

    setIsAlertOpen(false);
    setCurrentRemoveIndex(null);
    setCurrentTarget(null);
  };

  const handleConfirm = () => {
    if (currentRemoveIndex !== null && currentTarget !== null) {
      removeSourceOptions(currentTarget, currentRemoveIndex);
    }
  };

  const handleCancel = () => {
    setIsAlertOpen(false);
    setCurrentRemoveIndex(null);
    setCurrentTarget(null);
  };

  const getCategoryList = (value: string): ItemCategoryType[] => {
    const list = lists.find((list) => list.name === value);
    console.log('기존 등록 출처인덱스 리스트의 카테고리값 -----', list);

    return list ? list.categories : [];
  };

  useEffect(() => {
    // console.log('selected', selected);
    if (selected && selectedValue) {
      selectedValue((prevValues) => {
        const isDuplicate = Object.values(prevValues).some((item) =>
          Object.values(item).includes(selected),
        );
        // 중복이 아닐 경우에만 새로운 값을 추가
        if (!isDuplicate) {
          setSourceSortedValue([...prevValues, { [count]: selected }]);
          return [...prevValues, { [count]: selected }];
        }
        return prevValues;
      });
    }
  }, [selected]);

  useEffect(() => {
    // console.log('sourceSortedValue 출처=----------', sourceSortedValue);
  }, [selectedValue]);

  useEffect(() => {
    console.log('sourceValue 변경시 넘어온 출처값----------', sourceValue);

    // sourceValue의 객체 요소 중 하나라도 키값이 빈 문자열이 아닐 때
    if (
      sourceValue.titleIdx !== '' &&
      sourceValue.name !== '' &&
      sourceValue.value !== ''
    ) {
      setSourceArr((prevArr) => {
        const newArr = [...prevArr, sourceValue];

        // 중복 제거
        const uniqueArr = newArr.reduce((acc, curr) => {
          const foundIndex = acc.findIndex(
            (item: { titleIdx: string; name: string }) =>
              item.titleIdx === curr.titleIdx && item.name === curr.name,
          );
          if (foundIndex !== -1) {
            acc[foundIndex] = curr; // 동일한 titleIdx와 name의 객체를 덮어씀
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);

        // console.log('uniqueArr', uniqueArr);
        return uniqueArr;
      });
    }
  }, [sourceValue]);

  useEffect(() => {
    // console.log('sourceArr-----담겨진 출처 배열', sourceArr);
    // 서버로 전송할 데이터 구조로 재구성
    const restructuredData = sourceArr.reduce((acc, curr) => {
      const { titleIdx, name, value } = curr;
      let sourceObject = acc.find(
        (item: { [x: string]: any }) => item['출처'] === titleIdx,
      );

      if (!sourceObject) {
        sourceObject = { 출처: titleIdx };
        acc.push(sourceObject);
      }

      sourceObject[name] = value;

      return acc;
    }, []);
    // console.log('sourceSortedValue------', sourceSortedValue);

    // 출처 1뎁스도 포함시키는 로직
    const addSource = sourceSortedValue
      .map((source) => {
        const key = Object.keys(source)[0];
        const value = source[Number(key)];

        const isDuplicate = restructuredData.some(
          (item: { [s: string]: unknown } | ArrayLike<unknown>) =>
            Object.values(item).includes(value),
        );

        if (!isDuplicate) {
          return { 출처: value };
        }
        return null;
      })
      .filter(Boolean); // null 값 제거;

    // console.log(
    //   '[...restructuredData, ...addSource]출처 1뎁스도 포함시키는 로직------',
    //   [...restructuredData, ...addSource],
    // );

    // restructuredData와 addSource를 합친 후 출처가 undefined인 항목을 필터링
    const finalData = [...restructuredData, ...addSource].filter(
      (item) => item.출처 !== undefined,
    );

    // sourceSortedValue를 기준으로 다시 정렬
    const sortedData = finalData.sort((a, b) => {
      const indexA = sourceSortedValue.findIndex((item) =>
        Object.values(item).includes(a['출처']),
      );
      const indexB = sourceSortedValue.findIndex((item) =>
        Object.values(item).includes(b['출처']),
      );
      return indexA - indexB; // UI 순서에 맞춰 정렬
    });

    // console.log('UI 순서에 맞게 정렬된 데이터 --------', sortedData);

    setTotalSource(sortedData);
  }, [sourceArr, sourceSortedValue]);

  // useEffect(() => {},[sourceSortedValue])
  // console.log(
  // '출처 - 버튼눌러 삭제 후 배열 selectedValues',
  // selectedValues,
  // totalSource,
  // );

  useEffect(() => {
    // 최종적으로 서버에 전송될 출처
    // console.log('전체적으로 변경될때 담긴값 --------', totalSource);
    // console.log('실제 ui에 있는 출처 타이틀값 --------', selectedValues);
    // 실제 ui에 있는 값만 보내지도록
    // 토탈값조정
    // selectedValues에서 값만 추출 (출처 타이틀 목록)
    const selectedTitles = Object.values(selectedValues);
    // console.log('selectedTitles --------', selectedTitles);

    // totalSource에서 출처 값이 selectedTitles에 있는 항목만 필터링
    const filteredTotalSource = totalSource.filter((source) => {
      const sourceTitle = source.출처; // totalSource의 '출처' 값
      // console.log('sourceTitle---', sourceTitle);

      // selectedTitles에 sourceTitle이 포함되어 있는지 확인
      return selectedTitles.some((selectedTitle) =>
        sourceTitle.includes(selectedTitle),
      );
    });

    // console.log('최종적으로 필터링후 보내질값 --------', filteredTotalSource);
    setSelectedSource(filteredTotalSource);
  }, [totalSource, selectedValues]);

  const [titleArr, setTitleArr] = useState<string[]>([]);

  // 수정 페이지에서 기존의 값 출처 배열에 넣기
  useEffect(() => {
    console.log('onItemClickData---기존 출처값 ', onItemClickData);
    console.log('quizCategory---기존 출처값', quizCategory);
    // setSourceOptions([]);
    // 기존 출처 데이터를 초기화
    setSourceOptions([]);
    setTitleArr([]);
    setOptionsList([
      { name: '', categories: [] },
      { name: '', categories: [] },
      { name: '', categories: [] },
      { name: '', categories: [] },
      { name: '', categories: [] },
    ]);
    setSelectedValues({});

    if (quizCategory) {
      // `titleArr`와 `optionsList` 업데이트
      const titleArr = quizCategory.map((el) => el.출처);
      setTitleArr(titleArr);

      const updatedOptionsList = quizCategory.map((el, index) => ({
        name: el.출처,
        categories: el || [],
      }));

      setOptionsList(updatedOptionsList);

      // 기존 값을 유지하면서 새 값 병합
      setSelectedValues((prev) => {
        const newValues = Object.fromEntries(
          quizCategory.map((el, index) => [index, el.출처]),
        );
        return { ...prev, ...newValues };
      });
    }
  }, [onItemClickData]); // 체크된 값이 변할때

  useEffect(() => {
    console.log('들어온 옵션 리스트 값 ----- ', optionsList);

    // optionsList.map((item, index) => {
    //   if (item.name !== '') getCategoryList(item.name);
    // });
  }, [optionsList]);

  console.log('들어온  ------ SelectedValues[index] ----- ', selectedValues);

  useEffect(() => {
    //버튼
    setCount(count + titleArr.length);
    if (sourceOptions.length < 5) {
      const arr = [];
      for (let i = 0; i < titleArr.length; i++) {
        arr.push(i);
      }
      setSourceOptions([...sourceOptions, ...arr]);
    }

    if (titleArr.length > 0) {
      setDisabled(false);
    }

    if (sourceOptions.length >= 5) {
      //셀렉트 선택시에만 추가 가능하도록 초기화
      setDisabled(true);
    }

    //부모 셀렉트 값이 바뀔시
  }, [titleArr]);

  return (
    <Container>
      {sourceOptions.map((index) => (
        <SelectList key={`${index}selectList el`} id={index.toString()}>
          <li>
            {/* {index === 0 && optionsList1.name == '' && (
                <p className="info_hight">
                  <p className="info">출처는 최대 5개까지만 추가 가능</p>
                </p>
              )} */}
            {index === 0 ? (
              <Button
                width={'50px'}
                height={'30px'}
                fontSize={'15px'}
                $padding={'5px'}
                $filled
                cursor
                disabled={disabled}
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
                onClick={(event) => openUpdateAlert(event, index)}
              >
                -
              </Button>
            )}
            <SelectWrapper>
              <SelectMapWrapper id={`${index.toString()}SelectMapWrap`}>
                <OtionsSelect
                  $positionTop
                  width={'110px'}
                  height={'30px'}
                  defaultValue={titleArr.length ? titleArr[index] : '출처'}
                  key={'출처'}
                  options={categoriesE}
                  onSelect={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => selectCategoryOption(event, index)}
                  selected={selected}
                  setSelected={setSelected}
                />
              </SelectMapWrapper>
              {selectedValues[index] &&
                getCategoryList(selectedValues[index]).map((category, idx) => (
                  <Options
                    titleIdx={selectedValues[index]}
                    listItem={category}
                    key={`${category?.name} optionsdepth${idx}`}
                    onOptionChange={setSourceValue}
                    initList={quizCategory && quizCategory[index]}
                  />
                ))}
            </SelectWrapper>
          </li>
        </SelectList>
      ))}

      <Alert
        top="calc(50% - 100px)"
        isAlertOpen={isAlertOpen}
        description={`해당 출처를 삭제하시겠습니까?`}
        action="삭제"
        isWarning={true}
        onClick={() => handleConfirm()}
        onClose={() => handleCancel()}
      />
    </Container>
  );
}

const Container = styled.div`
  /* padding: 20px; */
  /* min-height: 150px; */
`;
const SelectList = styled.ul`
  padding: 5px 10px;

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 5px;
    position: relative;

    .info_hight {
      height: 50px;
    }
    .info {
      position: absolute;
      color: ${COLOR.GRAY};
      left: 0;
      top: 35px;
      width: 240px;
      font-size: 13px;
    }
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
const SelectMapWrapper = styled.div`
  padding-right: 15px;
  position: relative;
  &::after {
    display: block;
    content: '';
    position: absolute;
    top: calc(50% - (15px / 2));
    right: 4px;
    width: 2px;
    height: 15px;
    background-color: ${COLOR.BORDER_GRAY};
  }
`;

const SelectOptionsList = styled.ul<{
  $top?: string;
  $positionTop?: boolean;
  height?: string;
}>`
  padding-top: 5px;
  position: absolute;
  top: ${({ $top }) => ($top ? `${$top};` : '40px')};
  margin-bottom: ${({ height, $positionTop }) =>
    height && $positionTop ? `${height};` : '0px'};
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999999999;
  width: 100%;
  height: 100%;
  ${({ $positionTop }) =>
    $positionTop
      ? `top: auto; bottom: 0; left: 0; right: 0; padding-bottom: 5px;padding-top: 0;height: fit-content;`
      : ''};

  li {
    width: 100%;
    border-left: 1px solid ${COLOR.LIGHT_GRAY};
    border-right: 1px solid ${COLOR.LIGHT_GRAY};
    border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
    background-color: #fff;

    &:hover {
      background-color: ${COLOR.HOVER};
    }
  }

  li > button {
    width: 100%;
    height: 100%;
    font-size: 14px;
    padding: 10px;
    border: none;
    background-color: transparent;

    span {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.2;
      text-align: left;
    }
  }

  li:first-child {
    border-top: 1px solid ${COLOR.LIGHT_GRAY};
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  li:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;
