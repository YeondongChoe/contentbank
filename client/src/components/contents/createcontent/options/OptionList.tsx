import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

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
}

export function OptionList({
  categoryTitles,
  categoriesE,
  groupsDataF,
  groupsDataG,
  groupsDataH,
  setSelectedSource,
}: Props) {
  const [sourceOptions, setSourceOptions] = useState<number[]>([0]);
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

  const removeSourceOptions = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const target = event.currentTarget;
    const id = target.parentElement?.parentElement?.id;
    const arr = sourceOptions.filter((el) => el !== Number(id));
    setSourceOptions(arr);

    const newSelectedValues = { ...selectedValues };
    delete newSelectedValues[index];
    setSelectedValues(newSelectedValues);
  };

  const getCategoryList = (value: string): ItemCategoryType[] => {
    const list = lists.find((list) => list.name === value);
    return list ? list.categories : [];
  };

  useEffect(() => {
    console.log('selected', selected);
  }, [selected]);

  useEffect(() => {
    // 최종적으로 전체 셀렉트값 부모 요소로 넘김
    // TODO : 데이터 형식 맞추기
    setSelectedSource([{ code: selected, idx: selected, name: selected }]);
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
                  onClick={(event) => removeSourceOptions(event, index)}
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
                        listItem={category}
                        key={`${category?.name} optionsdepth${idx}`}
                      />
                    ),
                  )}
              </SelectWrapper>
            </li>
          </SelectList>
        ))}
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
