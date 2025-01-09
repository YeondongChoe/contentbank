import * as React from 'react';
import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import { postRefreshToken } from '../../../utils/tokenHandler';
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
  classIdx: number;
  name: string;
  code: string;
  depth: number;
  sort: number;
  parentClassIdx: number | null;
  isUse: boolean;
}
interface UpdateItem {
  type: 'CREATE' | 'UPDATE' | 'DELETE'; // 가능한 작업 타입
  idx: number | null; // 아이템의 고유 식별자, 생성 시에는 null
  classIdx: number | null; // 클래스 식별자
  parentClassIdx: number | null; // 부모 클래스 식별자
  isUse: boolean; // 활성화 여부
  sort: number;
}

export function TagMapping() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const queryValue = query.get('state');

  const [showMapHandleBtn, setShowMapHandleBtn] = useState(false);
  const [tagList, setTagList] = useState<
    { idx: number; name: string; code: string }[]
  >([]);
  const [mappingList, setMappingList] = useState<CategoryItem[]>([]);
  const [selectedCheckBox, setSelectedCheckBox] = useState<number[]>([]);

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

  const [checkList, setCheckList] = useState<string[]>([]);
  const [updateItems, setUpdateItems] = useState<UpdateItem[][] | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);
  // 검색
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTags, setFilteredTags] = useState<string[]>(sampleTags);
  const [tagCheckList, setTagCheckList] = useState<string[]>([]);

  // 카테고리
  const [categoryList, setCategoryList] = useState<
    { type: string; name: string; count: string }[]
  >([]);
  const [groupIdx, setGgroupIdx] = useState<number>();
  const [groupName, setGgroupName] = useState<string>();
  //카테고리 그룹 리스트 불러오기 api
  const getCategoryGroup = async () => {
    if (queryValue) {
      const res = await classificationInstance.get(
        `/v1/category/group/${queryValue.split('/')[0]}`,
      );
      console.log(res.data.data);
      return res.data.data;
    }
  };

  const { data: categoryGroupData, isLoading: isCategoryGroupLoading } =
    useQuery({
      queryKey: ['get-categoryGroup'],
      queryFn: getCategoryGroup,
      meta: {
        errorMessage: 'get-categoryGroup 에러 메세지',
      },
    });

  useEffect(() => {
    if (categoryGroupData) {
      console.log('가져온 카테고리 ----', categoryGroupData);
      const item = categoryGroupData;
      const { nameList, typeList, idx, name, countList } = item;
      const names = nameList ? nameList.split(',') : [];
      const types = typeList ? typeList.split(',') : [];
      const counts = countList ? countList.split(',') : [];

      const newCategoryList = names.map(
        (name: any, index: string | number) => ({
          name,
          type: types[index] || '',
          count: counts[index] || '',
        }),
      );

      setCategoryList(newCategoryList);
      setGgroupIdx(idx);
      setGgroupName(name);
    }
  }, [categoryGroupData]);
  useEffect(() => {}, [categoryList, groupIdx, groupName]);

  const [activeMappingItem, setActiveMappingItem] = useState<{
    idx: number;
    classIdx: number;
    name: string;
    code: string;
    depth: number;
    parentClassIdx: number | null;
    isUse: boolean;
    sort: number;
  } | null>(null);

  const handleTagMappingClick = (item: {
    idx: number;
    classIdx: number;
    name: string;
    code: string;
    depth: number;
    parentClassIdx: number | null;
    isUse: boolean;
    sort: number;
  }) => {
    setActiveMappingItem(activeMappingItem === item ? null : item);

    console.log('선택된 카테고리 아이템 click item ----- ', item);
  };

  // 태그 선택
  useEffect(() => {
    if (activeMappingItem && categoryList) {
      console.log(
        '다음 idx 값으로 클래스 조회',
        activeMappingItem,
        categoryList,
      );
      const idxArr = categoryList.map((item) => item.type);
      const index = activeMappingItem.depth;
      const idx = idxArr[index];
      console.log('idx ------------ ', idx);
      // 아이템 선택시 다음 인덱스 로 리스트 불러오기
      const getCategory = async () => {
        try {
          const res = await classificationInstance.get(
            `/v1/category/class/${idx}`,
          );

          console.log(
            '아이템 선택후 태그값 불러오기',
            res.data.data.categoryClassList,
          );
          setTagList(res.data.data.categoryClassList);
          // return res.data.data.categoryClassList;
        } catch (error) {
          console.error('Error fetching category:', error);
          return null;
        }
      };

      getCategory();
    }
  }, [activeMappingItem]);

  useEffect(() => {
    //tagList
    console.log('tagList', tagList);
  }, [tagList]);

  const getCategoryMap = async () => {
    if (queryValue) {
      const groupIdx = queryValue.split('/')[1];
      const res = await classificationInstance.get(
        `/v1/category/map/flat/${groupIdx}`,
      );

      const list = res.data.data.itemList;
      console.log('/v1/category/map/flat/ -----', list);
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

  // 최초 진입시 매핑 리스트
  useEffect(() => {
    const fetchInitialCategory = async () => {
      // 매핑데이터 있을시 데이터 솔팅 후 보여주기
      if (mappingData) {
        if (mappingData.length > 0) {
          // 요소의 parentClassIdx 가 요소의classIdx 와 동일한경우 classIdx의 하단으로 솔팅
          // 1. parentClassIdx 기준으로 객체를 그룹화
          const mappingMap = new Map<number, any[]>();
          mappingData.forEach((item: { parentClassIdx: number }) => {
            if (!mappingMap.has(item.parentClassIdx)) {
              mappingMap.set(item.parentClassIdx, []);
            }
            mappingMap.get(item.parentClassIdx)?.push(item);
          });

          console.log('mappingMap ------- ', mappingMap);

          // 2. 정렬 로직
          const sortedData: any[] = [];
          const visited = new Set(); // 방문한 객체 추적

          const addToSortedList = (item: any) => {
            if (visited.has(item.idx)) return; // 이미 처리된 항목은 무시
            visited.add(item.idx);
            sortedData.push(item);

            // 현재 객체를 부모로 참조하는 객체를 재귀적으로 추가
            const children = mappingMap.get(item.classIdx);
            if (children) {
              children.forEach(addToSortedList);
            }
          };

          // 3. parentClassIdx가 없는 루트 객체부터 시작
          mappingData
            .filter(
              (item: { parentClassIdx: null }) => item.parentClassIdx === null,
            )
            .forEach(addToSortedList);

          setMappingList(sortedData);
        } else if (mappingData.length == 0) {
          // 매핑데이터가 아직 없을시
          const setFirstCategory = async () => {
            if (categoryList[0]) {
              const idx = categoryList[0].type;
              console.log('첫번째 셋팅 인덱스 ---', idx);
              try {
                const res = await classificationInstance.get(
                  `/v1/category/class/${idx}`,
                );

                const firstList = res.data.data.categoryClassList;
                // console.log('firstList -------', firstList);
                const transformedList = firstList.map(
                  (item: any, index: number) => ({
                    type: 'CREATE',
                    idx: null, // 생성된 항목은 idx가 null
                    classIdx: item.idx, // 기존 idx를 classIdx로 매핑
                    parentClassIdx: 0, // 최초 생성시
                    isUse: true, // 기본값으로 true 설정
                    sort: index + 1, // 현재 index + 1로 설정
                  }),
                );
                console.log('transformedList -------', transformedList);

                // 맵 리스트 생성
                updateMapListData(transformedList);
              } catch (error: any) {
                if (error.data?.code == 'GE-002') postRefreshToken();
              }
            }
          };

          setFirstCategory();
        }
      }
    };

    fetchInitialCategory();
  }, [mappingData, selectedList]);

  const moveMappingTag = (dragIndex: number, hoverIndex: number) => {
    const updatedList = [...mappingList];
    const list = [...mappingList];
    const draggedItem = updatedList.splice(dragIndex, 1)[0];
    const hoverItem = list.splice(hoverIndex, 1)[0];
    updatedList.splice(hoverIndex, 0, draggedItem);

    // 같은 parentClassIdx를 가진 요소끼리만 이동 가능하도록 조건 추가
    if (
      // draggedItem.parentClassIdx == hoverItem.parentClassIdx &&
      draggedItem.depth == hoverItem.depth
    ) {
      console.log('이동한 아이템 draggedItem ----', draggedItem);
      console.log('교환된 아이템 hoverItem ----', hoverItem);
      console.log('이동후 업데이트 된 리스트 ----', updatedList);
      setMappingList(updatedList);
      // 이동 후 이동내역 서버 전송
      if (draggedItem.idx !== hoverItem.idx) {
        if (draggedItem.idx == hoverItem.idx) return;
        const swapClassIdx = (
          item1: CategoryItem,
          item2: CategoryItem,
        ): [CategoryItem, CategoryItem] => {
          return [
            {
              ...item1,
              classIdx: item2.classIdx, // item1의 classIdx를 item2의 classIdx로 변경
              parentClassIdx: item2.parentClassIdx,
            },
            {
              ...item2,
              classIdx: item1.classIdx, // item2의 classIdx를 item1의 classIdx로 변경
              parentClassIdx: item1.parentClassIdx,
            },
          ];
        };

        const [updatedItem1, updatedItem2] = swapClassIdx(
          draggedItem,
          hoverItem,
        );
        console.log('Updated Item 1:', updatedItem1);
        console.log('Updated Item 2:', updatedItem2);

        // 서버 데이터 업데이트
        if (updatedItem1 && updatedItem2) {
          updateMapListData([
            {
              type: 'UPDATE',
              idx: updatedItem1.idx,
              classIdx: updatedItem1.classIdx,
              parentClassIdx: updatedItem1.parentClassIdx,
              isUse: updatedItem1.isUse,
              sort: updatedItem1.sort,
            },
            {
              type: 'UPDATE',
              idx: updatedItem2.idx,
              classIdx: updatedItem2.classIdx,
              parentClassIdx: updatedItem2.parentClassIdx,
              isUse: updatedItem2.isUse,
              sort: updatedItem2.sort,
            },
          ]);

          // 변경내역 되돌리기 버튼에 저장
          setUpdateItems([
            ...(updateItems || []), // 기존 값이 null일 경우를 방지,
            [
              {
                type: 'UPDATE',
                idx: updatedItem1.idx,
                classIdx: updatedItem2.classIdx, // 교환 전 데이터
                parentClassIdx: updatedItem2.parentClassIdx, // 교환 전 데이터
                sort: updatedItem2.sort, // 교환 전 데이터
                isUse: updatedItem1.isUse,
              },
              {
                type: 'UPDATE',
                idx: updatedItem2.idx,
                classIdx: updatedItem1.classIdx, // 교환 전 데이터
                sort: updatedItem1.sort, // 교환 전 데이터
                parentClassIdx: updatedItem1.parentClassIdx, // 교환 전 데이터
                isUse: updatedItem2.isUse,
              },
            ],
          ]);
        }
      }
    }
  };

  const addTagsToNextDepth = () => {
    if (!activeMappingItem) return;
    console.log('선택된 요소 activeMappingItem ', activeMappingItem);

    //TODO : 자식요소가아닌 선택된 태그의 다음으로
    // const addTags = (item: CategoryItem, depth: number) => {
    //   // const isActiveItem = document.querySelector(`.on_map_item`);
    //   console.log('순회되는 요소 item ', item);

    //   if (item.idx === activeMappingItem.idx) {
    //     // children이 undefined일 수 있으므로 빈 배열로 초기화

    //     // 코드네임 찾기 / 카테고리 순서에서 다음 순번 이름

    //     checkList.forEach((tagName) => {
    //       (item.children as CategoryItem[]).push({
    //         idx: Math.random(), // 태그에 대한 고유 idx 값을 생성
    //         name: tagName,
    //         code: selectedNextItem?.name as string, // 필요한 코드값 설정
    //         depth: item.depth + 1,
    //         isUse: false,
    //       });
    //     });
    //   }
    // };

    const findAndProcessItem = (list: CategoryItem[], targetIdx: number) => {
      list.forEach((item) => {
        // item의 idx가 targetIdx와 같으면 처리
        // if (item.idx === targetIdx) {
        //   addTags(item, item.depth);
        // }
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
  const postMapListData = async (list: UpdateItem[]) => {
    if (queryValue) {
      const groupIdx = queryValue.split('/')[1];
      const data = {
        modificationList: list,
      };

      const response = await classificationInstance.put(
        `/v1/category/class/map/flat/${groupIdx}`,
        data,
      );
      return response.data;
    }
  };

  const { mutate: updateMapListData, isPending } = useMutation({
    mutationFn: postMapListData,
    onSuccess: () => {
      // openToastifyAlert({
      //   type: 'success',
      //   text: 'Data successfully updated!',
      // });
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

  // 맵리스트 이동 추가 삭제 변경 내역있을시
  // useEffect(() => {
  //   // 되돌리기 용으로 변경내역 리스트업
  // 	console.log('',updateItems)
  // }, [updateItems]);

  const updateData = () => {
    // 이전 단계로 되돌리기 (10회까지 기억)
    const lastList = []; // 수정된 내역 리스트 아이템 10회까지 기억
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

  const goToInit = () => {
    setIsInit(true);
  };
  const addTags = () => {
    setIsInit(false);
  };
  const deleteTag = () => {
    // 태그 삭제
    console.log('선택된 체크 박스의 값', selectedCheckBox);
    console.log('mappingList ---', mappingList);
    // 리스트의 넘버값이 포함 된 맵 리스트 아이템 축출
    const filteredItems = mappingList.filter((item) =>
      selectedCheckBox.includes(item.idx),
    );

    console.log('필터링된 아이템 ---', filteredItems);

    // 변경내역 되돌리기 버튼에 저장
    setUpdateItems([
      ...(updateItems || []), // 기존 값이 null일 경우를 방지
      filteredItems.map((item) => ({
        type: 'CREATE', // 삭제 이전 상태를 복구할 데이터
        idx: null,
        classIdx: item.classIdx,
        parentClassIdx: item.parentClassIdx,
        isUse: true,
        sort: item.sort,
      })),
    ]);
  };

  useEffect(() => {
    console.log('checkList----------', checkList);
  }, [checkList]);
  useEffect(() => {}, [searchValue, isInit]);
  return (
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

          {/* 추가 될 태그 리스트 */}
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
          {/* 카테고리 순서 리스트 */}
          <SetCategoryList
            setSelectedItem={setSelectedItem}
            setSelectedList={setSelectedList}
            mappingDataRefetch={mappingDataRefetch}
            categoryList={categoryList}
            setCategoryList={setCategoryList}
            groupIdx={groupIdx}
            groupName={groupName}
          />
        </ListWrapper>
      )}

      <ListItemWrapper>
        <strong className="title">매핑</strong>
        <ButtonWrapper>
          <button className="revert_btn" onClick={() => updateData()}>
            <span>이전 단계로 되돌리기</span>
            <Icon width={`15px`} src={`/images/icon/reflash.svg`} />
          </button>
          {showMapHandleBtn ? (
            <>
              {/* <Button
                width="200px"
                height="35px"
                onClick={() => {}}
                $margin="0 10px 0 0"
              >
                매핑 복제
              </Button> */}
              <Button width="150px" height="35px" onClick={() => deleteTag()}>
                태그 해제
              </Button>
            </>
          ) : (
            <>
              <Button
                width="200px"
                height="35px"
                onClick={() => goToInit()}
                $margin="0 10px 0 0"
              >
                최상위 태그 추가
              </Button>
              <Button width="150px" height="35px" onClick={() => addTags()}>
                순서변경
              </Button>
            </>
          )}
        </ButtonWrapper>

        {/* 매핑 리스트 */}
        <MappingList
          mappingList={mappingList}
          activeItem={activeMappingItem}
          handleTagClick={handleTagMappingClick}
          moveTag={moveMappingTag}
          setShowMapHandleBtn={setShowMapHandleBtn}
          setSelectedCheckBox={setSelectedCheckBox}
        />
      </ListItemWrapper>
    </Container>
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
  width: 300px;
  height: 500px;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;

  &.height {
    display: flex;
    flex-direction: column;
    height: 700px;
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
  position: relative;

  .revert_btn {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    border: none;
    font-size: 12px;
    padding: 10px;
    background-color: transparent;
    span {
      padding: 0 5px;
    }
  }
`;

const InfoButtonWrapper = styled.div`
  border: 1px dotted #aaa;
  border-radius: 5px;
  color: #aaa;
  font-size: 14px;
  padding: 20px;
  margin-left: 20px;
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
