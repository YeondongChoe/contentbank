import * as React from 'react';
import { useEffect, useState } from 'react';

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
  const [optionsList1, setOptionsList1] = useState<
    OptionsItemProps | undefined
  >();
  const [optionsList2, setOptionsList2] = useState<
    OptionsItemProps | undefined
  >();
  const [optionsList3, setOptionsList3] = useState<
    OptionsItemProps | undefined
  >();
  const [optionsList4, setOptionsList4] = useState<
    OptionsItemProps | undefined
  >();
  const [optionsList5, setOptionsList5] = useState<
    OptionsItemProps | undefined
  >();

  const [selected, setSelected] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  // 부모 셀렉트 핸들링
  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    const id =
      event.currentTarget.parentElement?.parentElement?.parentElement
        ?.parentElement?.parentElement?.parentElement?.parentElement?.id;

    // 셀렉트 선택이후 옵션에 속한 버튼값보여주기
    setSelectValue({ idx: Number(id), value: value });
    console.log(value, id);
    // 중복셀렉트 선택못하도록

    //셀렉트 선택시에만 추가 가능하도록
    setDisabled(false);
    if (sourceOptions.length == 5) {
      setDisabled(true);
    }
  };

  // 셀렉트 선택이후 셀렉트에 속한 자식 배열값 보여주기
  const listSwitch = () => {
    const listIdx = selectValue.idx;

    switch (true) {
      case listIdx == 0:
        setOptionsList1(
          selectCategory2[0].options.filter(
            (el: { label: string }) => el.label == selectValue.value,
          )[0],
        );
        break;
      case listIdx == 1:
        setOptionsList2(
          selectCategory2[0].options.filter(
            (el: { label: string }) => el.label == selectValue.value,
          )[0],
        );
        break;
      case listIdx == 2:
        setOptionsList3(
          selectCategory2[0].options.filter(
            (el: { label: string }) => el.label == selectValue.value,
          )[0],
        );
        break;
      case listIdx == 3:
        setOptionsList4(
          selectCategory2[0].options.filter(
            (el: { label: string }) => el.label == selectValue.value,
          )[0],
        );
        break;
      case listIdx == 4:
        setOptionsList5(
          selectCategory2[0].options.filter(
            (el: { label: string }) => el.label == selectValue.value,
          )[0],
        );
        break;
    }
  };

  useEffect(() => {
    listSwitch();
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
  };

  return (
    <Container>
      {sourceOptions.map((index) => (
        <SelectList key={`${index}selectList el`} id={index.toString()}>
          <li>
            {index === 0 && optionsList1 == undefined && (
              <p className="info">출처는 최대 5개까지만 추가 가능</p>
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
                onClick={(event) => removeSourceOptions(event)}
              >
                -
              </Button>
            )}
            <SelectWrapper>
              {selectCategory2.map((el) => (
                <>
                  <SelectMapWrapper
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
                  </SelectMapWrapper>
                  {index === 0 &&
                    optionsList1 &&
                    optionsList1.optionsdepth.map((el: OptionsItemProps) => (
                      <Options listItem={el} key={`${el.label} optionsdepth`} />
                    ))}
                  {index === 1 &&
                    optionsList2 &&
                    optionsList2.optionsdepth.map((el: OptionsItemProps) => (
                      <Options listItem={el} key={`${el.label} optionsdepth`} />
                    ))}
                  {index === 2 &&
                    optionsList3 &&
                    optionsList3.optionsdepth.map((el: OptionsItemProps) => (
                      <Options listItem={el} key={`${el.label} optionsdepth`} />
                    ))}
                  {index === 3 &&
                    optionsList4 &&
                    optionsList4.optionsdepth.map((el: OptionsItemProps) => (
                      <Options listItem={el} key={`${el.label} optionsdepth`} />
                    ))}
                  {index === 4 &&
                    optionsList5 &&
                    optionsList5.optionsdepth.map((el: OptionsItemProps) => (
                      <Options listItem={el} key={`${el.label} optionsdepth`} />
                    ))}
                </>
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
    position: relative;

    .info {
      position: absolute;
      color: ${COLOR.GRAY};
      left: 180px;
      top: 6px;
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
