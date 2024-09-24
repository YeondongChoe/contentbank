import * as React from 'react';
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { Alert } from '../../../../components/molecules';
import { ItemCategoryType } from '../../../../types';
import { Button, Select } from '../../../atom';
import { COLOR } from '../../../constants/COLOR';

import { Options } from './Options';
import { OtionsSelect } from './OtionsSelect';

type CategoryList = {
  name: string;
  categories: ItemCategoryType[];
};

interface Props {
  categoryTitles: ItemCategoryType[];
  categoriesE: ItemCategoryType[];
  groupsDataF: string;
  groupsDataG: string;
  groupsDataH: string;
  setSelectedSource: React.Dispatch<React.SetStateAction<any[]>>;
  quizCategory?: any[];
}

export function OptionList({
  categoryTitles,
  categoriesE,
  groupsDataF,
  groupsDataG,
  groupsDataH,
  setSelectedSource,
  quizCategory,
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

  const [optionsList1, setOptionsList1] = useState<CategoryList>({
    name: '',
    categories: [],
  });
  const [optionsList2, setOptionsList2] = useState<CategoryList>({
    name: '',
    categories: [],
  });
  const [optionsList3, setOptionsList3] = useState<CategoryList>({
    name: '',
    categories: [],
  });
  const [optionsList4, setOptionsList4] = useState<CategoryList>({
    name: '',
    categories: [],
  });
  const [optionsList5, setOptionsList5] = useState<CategoryList>({
    name: '',
    categories: [],
  });

  const [sourceArr, setSourceArr] = useState<any[]>([]);
  const [sourceValue, setSourceValue] = useState<{
    titleIdx: string;
    name: string;
    value: string;
  }>({ titleIdx: '', name: '', value: '' });

  const getCategoryListFromString = (data: string) => {
    const groupsArray = data.split(',').map(Number);
    return categoryTitles.filter((el) => groupsArray.includes(el.idx));
  };

  const categoriesF = getCategoryListFromString(groupsDataF);
  const categoriesG = getCategoryListFromString(groupsDataG);
  const categoriesH = getCategoryListFromString(groupsDataH);

  const lists = [
    {
      name: '교재',
      categories: categoriesF,
    },
    {
      name: '내신',
      categories: categoriesG,
    },
    {
      name: '기출',
      categories: categoriesH,
    },
    {
      name: '자체제작',
      categories: [], // 자체제작은 예시로 빈 배열
    },
    {
      name: '기타',
      categories: [], // 기타는 예시로 빈 배열
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

  // 셀렉트 선택이후 셀렉트에 속한 자식 배열값 보여주기
  const listSwitch = (value: string, index: number) => {
    const list = lists.find((list) => list.name === value);
    if (list) {
      switch (index) {
        case 0:
          setOptionsList1(list);
          break;
        case 1:
          setOptionsList2(list);
          break;
        case 2:
          setOptionsList3(list);
          break;
        case 3:
          setOptionsList4(list);
          break;
        case 4:
          setOptionsList5(list);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    Object.keys(selectedValues).forEach((key) => {
      listSwitch(selectedValues[Number(key)], Number(key));
    });
  }, [selectedValues]);

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

  //얼럿
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
    const arr = sourceOptions.filter((el) => el !== Number(id));
    setSourceOptions(arr);

    const newSelectedValues = { ...selectedValues };
    delete newSelectedValues[index];
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
    return list ? list.categories : [];
  };

  useEffect(() => {
    console.log('selected', selected);
  }, [selected]);

  useEffect(() => {
    console.log('sourceValue', sourceValue);

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

        console.log('uniqueArr', uniqueArr);
        return uniqueArr;
      });
    }
  }, [sourceValue]);

  useEffect(() => {
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

    // console.log('restructuredData', restructuredData);
    setSelectedSource(restructuredData);
  }, [sourceArr]);

  useEffect(() => {
    console.log('quizCategory---', quizCategory);
    if (quizCategory) setSourceArr(quizCategory);
  }, []);

  return (
    <Container>
      {categoryTitles &&
        sourceOptions.map((index) => (
          <SelectList key={`${index}selectList el`} id={index.toString()}>
            <li>
              {index === 0 && optionsList1.name == '' && (
                <p className="info_hight">
                  <p className="info">출처는 최대 5개까지만 추가 가능</p>
                </p>
              )}
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
                    defaultValue={categoryTitles[16]?.name}
                    key={categoryTitles[16]?.name}
                    options={categoriesE}
                    onSelect={(
                      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                    ) => selectCategoryOption(event, index)}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SelectMapWrapper>

                {selectedValues[index] &&
                  getCategoryList(selectedValues[index]).map(
                    (category, idx) => (
                      <Options
                        titleIdx={selectedValues[index]}
                        listItem={category}
                        key={`${category?.name} optionsdepth${idx}`}
                        onOptionChange={setSourceValue}
                      />
                    ),
                  )}
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
  z-index: 1;
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
