import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Button, CheckBoxI, Icon, Switch } from '../../../components/atom';
import { Search } from '../../../components/molecules';
export function TagMapping() {
  const [tagList, setTagList] = useState<string[]>([]);
  const [mappingList, setMappingList] = useState<string[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);

  useEffect(() => {
    setTagList(['전체', '수학', '영어']);
    setMappingList(['11차', '10차', '9차', '8차']); //카테고리 순서
  }, []);

  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string,
  ) => {
    const target = e.currentTarget.childNodes[0].childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;

    if (!target.checked) {
      setCheckList((prev) => [...prev, value]);
    } else {
      setCheckList(checkList.filter((el) => el !== value));
    }
  };

  useEffect(() => {}, [tagList]);
  useEffect(() => {
    console.log('checkList----------', checkList);
  }, [checkList]);
  return (
    <>
      <Container>
        <ListWrapper>
          <strong className="title">카테고리 순서</strong>
          <span className="sub_title">매핑할 태그를 선택해주세요.</span>
          <span className="border_tag">{`${'교과'}`}</span>
          <Search
            placeholder="태그를 검색해주세요."
            value={''}
            onChange={() => {}}
            onKeyDown={() => {}}
            margin="0 0 5px 0"
          />
          <TagsWrappper>
            {tagList.map((el, idx) => (
              <Tags
                key={`${el} ${idx}`}
                onClick={(e) => handleButtonCheck(e, el)}
              >
                <span className="icon_wwrap">
                  <CheckBoxI
                    id={el}
                    value={el}
                    checked={checkList.includes(el)}
                    readOnly
                  />
                </span>
                <span>{`${el}`}</span>
              </Tags>
            ))}
          </TagsWrappper>

          <Button $filled onClick={() => {}} $margin="15px 0 0 0">
            <span>{`${checkList.length}`}개의 태그 하위로 추가</span>
          </Button>
        </ListWrapper>
        <ListItemWrapper>
          <strong className="title">매핑</strong>
          <ButtonWrapper>
            <Button
              width="200px"
              height="35px"
              onClick={() => {}}
              $margin="0 10px 0 0"
            >
              최상위 태그 추가
            </Button>
            <Button width="150px" height="35px" onClick={() => {}}>
              순서변경
            </Button>
          </ButtonWrapper>
          <TagsWrappper className="height">
            {mappingList.map((el, idx) => (
              <Tags key={`${el} ${idx}`} className="gap">
                <span>
                  <Icon width={`18px`} src={`/images/icon/icon-move.svg`} />
                </span>
                <span className="category_title">{`${el}`}</span>
                <span className="category_sub_title">{`${'교육 과정'}`}</span>
                <TagsButtonWrapper>
                  <span>활성화</span>
                  <Switch $ison={true} onClick={() => {}}></Switch>
                  <CheckBoxI id={''} value={undefined} />
                </TagsButtonWrapper>
              </Tags>
            ))}
          </TagsWrappper>
        </ListItemWrapper>
      </Container>
      <BottomButtonWrapper>
        <Button width="300px" $filled onClick={() => {}}>
          저장
        </Button>
      </BottomButtonWrapper>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .title {
    font-size: 20px;
    padding-bottom: 10px;
  }
  .sub_title {
    color: #7d7d7d;
    padding-bottom: 10px;
  }
  .border_tag {
    border: 1px solid #aaa;
    padding: 10px 20px;
    display: inline-flex;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 13px;
    align-self: flex-start;
    width: auto;
  }
`;

const ListWrapper = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const ListItemWrapper = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  margin-left: 20px;
  padding: 20px;
`;

const TagsWrappper = styled.div`
  border: 1px solid #eaeaea;
  background-color: #fff;
  min-width: 300px;
  height: 400px;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;

  &.height {
    display: flex;
    flex-direction: column;
    height: 550px;
    padding: 15px;
    gap: 10px;
  }
`;
const Tags = styled.button`
  border: none;
  width: 100%;
  background-color: #fff;
  border: 1px solid #eaeaea;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  position: relative;

  &.gap {
    gap: 15px;
  }
  .icon_wwrap {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }

  .category_title {
  }
  .category_sub_title {
    color: #b3b3b3;
    font-size: 14px;
    line-height: 1.4;
    display: inline-block;
  }
`;
const TagsButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  justify-content: end;
`;
const BottomButtonWrapper = styled.div`
  background-color: #eee;
  display: flex;
  justify-content: end;
  padding: 20px;
  margin: 20px;
`;
