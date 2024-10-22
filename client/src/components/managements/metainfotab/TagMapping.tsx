import * as React from 'react';
import { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import { Button, CheckBoxI, Icon, Switch } from '../../../components/atom';
import { Search } from '../../../components/molecules';
import { COLOR } from '../../constants';
import { useDnD } from '../../molecules/dragAndDrop';

export function TagMapping() {
  const [tagList, setTagList] = useState<string[]>([]);
  const [mappingList, setMappingList] = useState<string[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);

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

  const handleTagClick = (item: string) => {
    setActiveItem(activeItem === item ? null : item);
  };

  const moveTag = (dragIndex: number, hoverIndex: number) => {
    const updatedList = [...mappingList];
    const draggedItem = updatedList.splice(dragIndex, 1)[0];
    updatedList.splice(hoverIndex, 0, draggedItem);
    setMappingList(updatedList);
  };

  useEffect(() => {}, [tagList]);
  useEffect(() => {
    console.log('checkList----------', checkList);
  }, [checkList]);
  return (
    <>
      <Container>
        <ListWrapper>
          <strong className="title">태그 선택</strong>
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
          <DndProvider backend={HTML5Backend}>
            <TagsWrappper className="height">
              {mappingList.map((el, idx) => (
                <DraggableItem
                  key={`${el} ${idx}`}
                  item={el}
                  index={idx}
                  activeItem={activeItem}
                  handleTagClick={handleTagClick}
                  moveTag={moveTag}
                />
              ))}
            </TagsWrappper>
          </DndProvider>
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
interface DraggableItemProps {
  item: string;
  index: number;
  activeItem: string | null;
  handleTagClick: (item: string) => void;
  moveTag: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  index,
  activeItem,
  handleTagClick,
  moveTag,
}) => {
  const { ref, isDragging } = useDnD({
    itemIndex: index,
    onMove: moveTag,
    dragSectionName: 'TAG_SECTION',
  });

  return (
    <>
      <Tags
        ref={ref}
        className={`gap ${activeItem === item ? 'on' : ''}`} // item으로 비교
        onClick={() => handleTagClick(item)}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <span>
          <Icon width={`18px`} src={`/images/icon/icon-move.svg`} />
        </span>
        <span className="category_title">{item}</span>
        <span className="category_sub_title">{'교육 과정'}</span>
        <TagsButtonWrapper>
          <span className="switch_title">활성화</span>
          <Switch marginTop={5} $ison={true} onClick={() => {}}></Switch>
          <CheckBoxI className={'side_bar'} id={''} value={undefined} />
        </TagsButtonWrapper>
      </Tags>
      {activeItem === item && (
        <InfoButtonWrapper>
          + ‘태그 선택’에서 매핑할 태그를 선택해주세요.
        </InfoButtonWrapper>
      )}
    </>
  );
};

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
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  position: relative;

  &.gap {
    gap: 15px;
  }
  &.on {
    border-color: ${COLOR.PRIMARY};
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
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  .switch_title {
    font-size: 12px;
    color: ${COLOR.PRIMARY};
  }
  .side_bar {
    margin-left: 10px;
    position: relative;
  }
  .side_bar::after {
    content: '';
    display: block;
    width: 1px;
    height: 12px;
    background-color: #aaa;
    position: absolute;
    top: 8px;
    right: 25px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  justify-content: end;
`;

const InfoButtonWrapper = styled.div`
  border: 1px dotted #aaa;
  border-radius: 5px;
  color: #aaa;
  font-size: 14px;
  padding: 20px;
  margin-left: 20px;
`;
const BottomButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  padding: 20px;
  margin: 20px;
  background-color: #eee;
`;
