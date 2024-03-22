import * as React from 'react';
import { useEffect, useState } from 'react';

// eslint-disable-next-line import/order, import/default
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import { Button, Select } from '../../../atom';
import { COLOR } from '../../../constants/COLOR';
import { selectCategory2 } from '../contentCreatingCategory';

import { Options } from './Options';
import { OtionsSelect, OptionsItemProps } from './OtionsSelect';

export function OptionList() {
  const [sourceOptions, setSourceOptions] = useState<number[]>([0]);
  const [count, setCount] = useState(1);
  const [selectValue, setSelectValue] = useState({
    idx: 0,
    value: '',
  });
  const [optionList, setOptionList] = useState<
    { idx: number; label: string; options: OptionsItemProps[] }[]
  >([]);
  const [selected, setSelected] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(true);

  // 부모 셀렉트 핸들링
  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    const id =
      event.currentTarget.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement?.parentElement?.parentElement?.id;
    // const targetSelectId =
    //   event.currentTarget.parentElement?.parentElement?.parentElement
    //     ?.parentElement?.id;

    // console.log(targetSelectId);
    // setContent((prevContent) => [...prevContent, value]);

    // 셀렉트 선택이후 옵션에 속한 버튼값보여주기
    setSelectValue({ idx: Number(id), value: value });

    // 중복셀렉트 선택못하도록
    const arr = [];
    arr.push(selected);
    console.log('셀렉트 선택시 라벨값 담아놓기', arr);
    //셀렉트 선택시에만 추가 가능하도록
    setDisabled(false);
  };

  // 셀렉트 선택이후 셀렉트에 속한 자식 배열값 보여주기
  const showOptionList = () => {
    const arr = selectCategory2[0]?.options.filter(
      (el) => el.label === selectValue.value,
    );
    //선택한 셀렉트 라벨값과 같은 라벨을 가진 배열값 동적으로 붙여주기
    arr[0] && console.log(arr[0], arr[0].optionsdepth);

    if (arr[0] && arr[0].optionsdepth) {
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
            options: arr[0].optionsdepth,
            idx: selectValue.idx,
          },
        ]);
      }
    }

    // const target = document.getElementById(`${selectValue.idx}SelectMapWrap`);
    // setOptionList(arr[0]);
    // console.log(' selectValue', selectValue.idx, selectValue.value);
    // console.log(' target', target);
    // const element = document.createElement('div').appendChild();
    // target?.nextSibling?.appendChild(element);
  };
  // console.log('optionList', optionList);
  // console.log(' selectValue.idx', selectValue.idx);

  useEffect(() => {
    showOptionList();
  }, [selectValue]);

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

  const removeSourceOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const id = target.parentElement?.parentElement?.id;
    const arr = sourceOptions.filter((el) => el !== Number(id));
    setSourceOptions(arr);

    // console.log('부모 배열wldnjwlq el', arr);
    // console.log('부모 셀렉트selectValue el', id);
    // 부모 셀렉트 삭제시 옵션셀렉트도 배열에서 삭제
    const resetArr = optionList.filter((el) => el.idx !== Number(id));
    console.log('자식 셀렉트 삭제시resetArr el', resetArr);
    setOptionList(resetArr);
  };

  // console.log('전체optionList', optionList);
  return (
    <Container>
      {sourceOptions.map((index) => (
        <SelectList key={`${index}selectList el`} id={index.toString()}>
          <li>
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
                onClick={(event) => removeSourceOptions(event)}
              >
                -
              </Button>
            )}
            <SelectWrapper>
              {selectCategory2.map((el) => (
                <SelectMapWrap
                  key={`${el.label} SelectMapWrap`}
                  id={`${index.toString()}SelectMapWrap`}
                >
                  <OtionsSelect
                    $positionTop
                    width={'110px'}
                    height={'30px'}
                    defaultValue={el.label}
                    key={el.label}
                    options={el.options}
                    onSelect={(event) => selectCategoryOption(event)}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SelectMapWrap>
              ))}

              {optionList &&
                optionList[index] &&
                optionList[index].options.map((el) => (
                  <Options listItem={el} key={`${el.label} optionsdepth`} />
                ))}
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
const SelectMapWrap = styled.div`
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
