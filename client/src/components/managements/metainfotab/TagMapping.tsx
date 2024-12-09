import * as React from 'react';
import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import { Button, CheckBoxI, Icon, openToastifyAlert, Switch } from '../../atom';
import { COLOR } from '../../constants';
import { ListItem, Search } from '../../molecules';
import { useDnD } from '../../molecules/dragAndDrop';

import { MappingList } from './MappingList';
import { SetCategoryList } from './SetCategoryList';

// Sample tags to search
const sampleTags = ['교과', '수학', '과학', '영어', '역사', '물리', '화학'];

interface CategoryItem {
  idx: number;
  name: string;
  code: string;
  depth: number;
  isUse: boolean;
  children?: CategoryItem[];
}

export function TagMapping() {
  const [tagList, setTagList] = useState<
    { idx: number; name: string; code: string }[]
  >([]);
  const [mappingList, setMappingList] = useState<CategoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<{
    type: string;
    name: string;
    count: string;
  }>();
  const [selectedList, setSelectedList] = useState<
    {
      type: string;
      name: string;
      count: string;
    }[]
  >([]);
  const [selectedNextItem, setSelectedNextItem] = useState<{
    type: string;
    name: string;
    count: string;
  } | null>(null);

  const [checkList, setCheckList] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);
  // 검색
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTags, setFilteredTags] = useState<string[]>(sampleTags);
  const [tagCheckList, setTagCheckList] = useState<string[]>([]);

  const [activeMappingItem, setActiveMappingItem] = useState<{
    idx: number;
    name: string;
    code: string;
    depth: number;
    isUse: boolean;
    children?: any[];
  } | null>(null);

  const handleTagMappingClick = (item: {
    idx: number;
    name: string;
    code: string;
    depth: number;
    isUse: boolean;
    children?: any[];
  }) => {
    setActiveMappingItem(activeMappingItem === item ? null : item);

    console.log('선택된 카테고리 아이템 click item ----- ', item);
  };
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const queryValue = query.get('state');

  // useEffect(() => {
  //   if (queryValue) {
  //     console.log('query', queryValue.split('/')[1]);

  //     // 최초 집입시 그룹아이템의 idx 값으로 조회
  //     const groupIdx = queryValue.split('/')[1];
  //     const getCategoryMap = async () => {
  //       const res = await classificationInstance.get(
  //         `/v1/category/map/${groupIdx}`,
  //       );
  //       console.log(
  //         '선택된 idx에 따른 항목 조회 ----- ',
  //         res.data.data?.mapList,
  //       );
  //       setMappingList(res.data.data?.mapList);
  //     };

  //     getCategoryMap();
  //   }
  // }, []);

  const getCategoryMap = async () => {
    if (queryValue) {
      const groupIdx = queryValue.split('/')[1];
      const res = await classificationInstance.get(
        `/v1/category/map/${groupIdx}`,
      );

      const list = res.data.data.mapList;
      console.log(',list-----', list);
      return list;
    }
  };

  const { data: mappingData, refetch: mappingDataRefetch } = useQuery({
    queryKey: ['get-categoryMap'], // 쿼리 키를 unique하게 설정
    queryFn: getCategoryMap, // groupIdx 추출
    enabled: !!queryValue, // queryValue가 있을 때만 실행
    meta: {
      errorMessage: 'get-categoryMap 에러 메세지',
    },
  });

  const moveMappingTag = (dragIndex: number, hoverIndex: number) => {
    const updatedList = [...mappingList];
    const draggedItem = updatedList.splice(dragIndex, 1)[0];
    updatedList.splice(hoverIndex, 0, draggedItem);
    setMappingList(updatedList);
  };

  const addTagsToNextDepth = () => {
    if (!activeMappingItem) return;
    console.log('선택된 요소 activeMappingItem ', activeMappingItem);

    const addTags = (item: CategoryItem, depth: number) => {
      // const isActiveItem = document.querySelector(`.on_map_item`);
      console.log('순회되는 요소 item ', item);

      if (item.idx === activeMappingItem.idx) {
        // children이 undefined일 수 있으므로 빈 배열로 초기화

        // 코드네임 찾기 / 카테고리 순서에서 다음 순번 이름

        checkList.forEach((tagName) => {
          (item.children as CategoryItem[]).push({
            idx: Math.random(), // 태그에 대한 고유 idx 값을 생성
            name: tagName,
            code: selectedNextItem?.name as string, // 필요한 코드값 설정
            depth: item.depth + 1,
            isUse: false,
          });
        });
      }
    };

    const findAndProcessItem = (list: CategoryItem[], targetIdx: number) => {
      list.forEach((item) => {
        // item의 idx가 targetIdx와 같으면 처리
        if (item.idx === targetIdx) {
          addTags(item, item.depth);
        }

        // 자식 항목이 있다면 자식 항목도 순회
        if (item.children) {
          findAndProcessItem(item.children, targetIdx); // 자식 항목에 대해 재귀적으로 처리
        }
      });
    };

    const updatedMappingList = [...mappingList];
    findAndProcessItem(updatedMappingList, activeMappingItem.idx);

    setMappingList(updatedMappingList);
  };

  useEffect(() => {
    console.log('MappingList ------------- ', mappingList);
  }, [mappingList]);

  // 변경 매핑 데이터 전송 api
  const postCategoryMapData = async (data: {
    itemGroupIdx: number;
    categoryClass: any[];
  }) => {
    const response = await classificationInstance.post(
      '/v1/category/class/map',
      data,
    );
    return response.data;
  };

  const { mutate: sendCategoryData, isPending } = useMutation({
    mutationFn: postCategoryMapData,
    onSuccess: () => {
      openToastifyAlert({
        type: 'success',
        text: 'Data successfully updated!',
      });
      // 성공후 업데이트
      mappingDataRefetch();
    },
    onError: (error) => {
      openToastifyAlert({
        type: 'error',
        text: 'Error while saving data.',
      });
    },
  });

  const updateData = () => {
    // 필터링된 데이터로 변환하는 함수
    const filterActiveItems = (list: CategoryItem[]) => {
      return list.reduce((acc: any[], item) => {
        // 자식 항목들 필터링
        const filteredChildren = item.children
          ? filterActiveItems(item.children)
          : [];

        // 활성화된 항목만 포함
        if (item.isUse) {
          acc.push({
            idx: item.idx,
            name: item.name,
            code: item.code,
            depth: item.depth,
            isUse: item.isUse,
            children: filteredChildren, // 자식 항목들도 동일하게 필터링
          });
        }

        return acc;
      }, []);
    };

    const requestData = {
      itemGroupIdx: 2, // TODO: 확인 필요
      categoryClass: filterActiveItems(mappingList), // 활성화된 아이템만 필터링
    };

    console.log('활성화된 데이터만 업데이트 --- ', requestData);
    if (!isPending) sendCategoryData(requestData);
  };

  // const handleAddTag = () => {
  //   if (searchValue && !sampleTags.includes(searchValue)) {
  //     // Add the new tag logic here
  //     alert(`"${searchValue}" 태그가 추가되었습니다!`);
  //     setSearchValue('');
  //   }
  // };

  // const handleToggleTag = (tag: string) => {
  //   setSelectedTags((prev) =>
  //     prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
  //   );
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value) {
      setFilteredTags(sampleTags.filter((tag) => tag.includes(value)));
    } else {
      setFilteredTags(sampleTags);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
  };

  useEffect(() => {
    // console.log(
    //   '선택된 아이템d idx, 선택된 아이템의 다음 idx----- ',
    //   activeMappingItem?.code,
    //   selectedList,
    // );
    const foundItem = selectedList.find(
      (item) => item.name === activeMappingItem?.code,
    );
    if (foundItem) {
      const currentIndex = selectedList.indexOf(foundItem);
      const nextItem = selectedList[currentIndex + 1];

      if (nextItem) setSelectedNextItem(nextItem);
    }

    //activeMappingItem 변경시 체크박스 초기화
    setCheckList([]);
  }, [selectedItem, activeMappingItem]);
  // useEffect(() => {
  // 	//
  //  console.log('',)
  //  setTagList()
  // }, [tagList]);

  useEffect(() => {
    console.log('다음 idx 값으로 클래스 조회', selectedNextItem);
    // 아이템 선택시 다음 인덱스 로 리스트 불러오기
    const getCategory = async () => {
      if (!selectedNextItem?.type) {
        return null;
      }
      try {
        const response = await classificationInstance.get(
          `/v1/category/class/${selectedNextItem?.type}`,
        );

        console.log(
          '아이템 선택후 태그값 불러오기',
          response.data.data.categoryClassList,
        );
        setTagList(response.data.data.categoryClassList);
        // return response.data.data.categoryClassList;
      } catch (error) {
        console.error('Error fetching category:', error);
        return null;
      }
    };

    getCategory();
  }, [selectedNextItem]);

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

  const handleTagButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string,
  ) => {
    const target = e.currentTarget.childNodes[0].childNodes[0]
      .childNodes[0] as HTMLInputElement;
    // console.log('target-------------', target);
    if (!target.checked) {
      setTagCheckList((prev) => [...prev, value]);
    } else {
      setTagCheckList(tagCheckList.filter((el) => el !== value));
    }
  };

  // const handleTagClick = (item: string) => {
  //   setActiveItem(activeItem === item ? null : item);
  // };

  // const moveTag = (dragIndex: number, hoverIndex: number) => {
  //   const updatedList = [...mappingList];
  //   const draggedItem = updatedList.splice(dragIndex, 1)[0];
  //   updatedList.splice(hoverIndex, 0, draggedItem);
  //   setMappingList(updatedList);
  // };

  // 매핑에서 선택된 태그 기준으로 태그선택 데이터 넣기
  useEffect(() => {
    const fetchInitialCategory = async () => {
      if (mappingData) {
        console.log(',mappingData-----', mappingData);
        if (mappingData.length > 0) {
          setMappingList(mappingData);
        } else if (mappingData.length === 0 && selectedList.length > 0) {
          const idx = selectedList[0].type;

          const res = await classificationInstance.get(
            `/v1/category/class/${idx}`,
          );
          // console.log(
          //   '저장 된 리스트가 없을경우 최초 첫번째 카테고리 리스트 데이터 복제 ----- ',
          //   idx,
          //   res.data.data.categoryClassList,
          // );
          const categoryClassList = res.data.data.categoryClassList;
          // categoryClassList 데이터를 CategoryItem 구조로 변환
          const list: CategoryItem[] = categoryClassList.map(
            (item: { idx: any; name: any; code: any }) => ({
              idx: item.idx,
              name: item.name,
              code: item.code,
              depth: 0, // 기본 depth 설정
              isUse: true, // 기본 isUse 설정
              children: [], // 기본 빈 배열
            }),
          );

          setMappingList([...list]);
        }
      }
    };

    fetchInitialCategory();
  }, [mappingData, selectedList]);

  const goToInit = () => {
    setIsInit(true);
  };
  const addTags = () => {
    setIsInit(false);
  };

  useEffect(() => {
    console.log('checkList----------', checkList);
  }, [checkList]);
  useEffect(() => {}, [searchValue, isInit]);
  return (
    <>
      <Container>
        {isInit ? (
          <ListWrapper>
            <strong className="title">태그 선택</strong>
            <span className="sub_title">매핑할 태그를 선택해주세요.</span>
            <span className="border_tag">{`${activeMappingItem && activeMappingItem.code}`}</span>
            <DropdownWrapper>
              <Search
                placeholder="태그를 검색해주세요."
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                margin="0 0 5px 0"
              />
              {/* 검색 후 드롭다운 리스트 */}
              {searchValue ? (
                filteredTags.length > 0 ? (
                  <Dropdown>
                    <DropdownTagList>
                      {/* TODO: 필터링될 전체 리스트값 가져오기 */}
                      {filteredTags.map((tag, index) => (
                        <ListItem
                          key={index}
                          $padding={'5px'}
                          $margin={'0'}
                          isChecked={tagCheckList.includes(tag)}
                          onClick={(e) => handleTagButtonCheck(e, tag)}
                        >
                          <CheckBoxI
                            id={tag}
                            value={tag}
                            $margin={`0 5px 0 0`}
                            checked={tagCheckList.includes(tag)}
                            readOnly
                          />
                          <span>{tag}</span>
                        </ListItem>
                      ))}
                    </DropdownTagList>
                  </Dropdown>
                ) : (
                  <Dropdown>
                    <span className="info">없는 태그 입니다.</span>

                    {/* TODO: api 추가되야함 */}
                    {/* <Button
                      $border
                      fontSize="13px"
                      onClick={handleAddTag}
                      $margin="0 10px 10px 10px"
                      width="clac(100% - 10px)"
                    >
                      <span>{`"${searchValue}"`} 태그를 신규태그로 추가</span>
                    </Button> */}
                  </Dropdown>
                )
              ) : null}
            </DropdownWrapper>

            <TagsWrappper>
              {tagList.map((el, idx) => (
                <Tags
                  key={`${el} ${idx}`}
                  onClick={(e) => handleButtonCheck(e, el.name)}
                >
                  <span className="icon_wwrap">
                    <CheckBoxI
                      id={el.name}
                      value={el.idx}
                      checked={checkList.includes(el.name)}
                      readOnly
                    />
                  </span>
                  <span>{`${el.name}`}</span>
                </Tags>
              ))}
            </TagsWrappper>

            <Button
              $filled
              onClick={() => addTagsToNextDepth()}
              $margin="15px 0 0 0"
            >
              <span>{`${checkList.length}`}개의 태그 하위로 추가</span>
            </Button>
          </ListWrapper>
        ) : (
          <ListWrapper>
            <SetCategoryList
              setSelectedItem={setSelectedItem}
              setSelectedList={setSelectedList}
            />
          </ListWrapper>
        )}

        <ListItemWrapper>
          <strong className="title">매핑</strong>
          <ButtonWrapper>
            <Button
              width="200px"
              height="35px"
              onClick={() => addTags()}
              $margin="0 10px 0 0"
            >
              최상위 태그 추가
            </Button>
            <Button width="150px" height="35px" onClick={() => goToInit()}>
              순서변경
            </Button>
          </ButtonWrapper>

          {/* 매핑 리스트 */}
          <MappingList
            mappingList={mappingList}
            activeItem={activeMappingItem}
            handleTagClick={handleTagMappingClick}
            moveTag={moveMappingTag}
          />
        </ListItemWrapper>
      </Container>
      <BottomButtonWrapper>
        <Button width="300px" $filled onClick={() => updateData()}>
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
        className={`gap ${activeItem === item ? 'on' : ''}`}
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

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  background: white;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 0 0 5px 5px;
  z-index: 1;
  max-height: 150px;
  overflow-y: auto;
  width: 300px;

  .info {
    padding: 10px 20px;
    display: flex;
    font-size: 13px;
    color: ${COLOR.FONT_GRAY};
    padding-bottom: 10px;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownTagList = styled.div`
  padding: 10px;

  cursor: pointer;
`;
