import * as React from 'react';
import { useEffect, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import { postRefreshToken } from '../../../utils/tokenHandler';
import {
  Button,
  CheckBoxI,
  Icon,
  openToastifyAlert,
  Switch,
  ValueNone,
} from '../../atom';
import { COLOR } from '../../constants';
import { ListItem, Search } from '../../molecules';
import { useDnD } from '../../molecules/dragAndDrop';

import { MappingList } from './MappingList';
import { SetCategoryList } from './SetCategoryList';

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
  idx: number | null;
  classIdx: number | null;
  parentClassIdx: number | null;
  isUse: boolean;
  sort: number | null;
}

export function TagMapping() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const queryValue = query.get('state');

  const [showMapHandleBtn, setShowMapHandleBtn] = useState(false);

  const [tagList, setTagList] = useState<
    { idx: number; name: string; code: string }[]
  >([]);
  const [tagTitle, setTagTitle] = useState<string[]>([]);
  const [tagIndex, setTagIndex] = useState<number>(0);

  const [mappingList, setMappingList] = useState<CategoryItem[]>([]);
  const [tagAddCheckList, setTagAddCheckList] = useState<UpdateItem[]>([]);
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
  // 되돌리기 버튼 리스트
  const [updateItems, setUpdateItems] = useState<UpdateItem[][] | null>(null);
  const [isInit, setIsInit] = useState<boolean>(false);
  // 검색
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredTags, setFilteredTags] = useState<
    { idx: number; name: string; code: string }[]
  >([]);
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

      setTagTitle(names);

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
  useEffect(() => {
    console.log(
      'categoryList, groupIdx, groupName,tagTitle',
      categoryList,
      groupIdx,
      groupName,
      tagTitle,
    );
  }, [categoryList, groupIdx, groupName, tagTitle]);

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

  // 태그 선택시
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

          // 선택된 activeMappingItem 다음으로 오는 mappingList아이템 리스트
          const sortList = findChildItems(activeMappingItem.classIdx);
          const sortItems = sortList.map((item) => item.code);
          console.log('sortItems Items:', sortItems);

          const filteredList = res.data.data.categoryClassList.filter(
            // code 값이 sortItems에 없는 항목만 유지
            (item: { code: string }) => !sortItems.includes(item.code),
          );

          console.log('Filtered List:', filteredList);

          // 필터링된 리스트를 상태에 저장
          setTagList(filteredList);
          // return res.data.data.categoryClassList;
        } catch (error) {
          console.error('Error fetching category:', error);
          return null;
        }
      };

      if (idx) getCategory();
      if (!idx) setTagList([]);

      // 타이틀 값 변경
      setTagIndex(index);
    }
  }, [activeMappingItem]);

  const findChildItems = (selectedClassIdx: number) => {
    return mappingList.filter(
      (item) => item.parentClassIdx === selectedClassIdx,
    );
  };

  useEffect(() => {
    //tagList
    console.log('tagList', tagList);
    console.log('tagIndex', tagIndex);
  }, [tagList, tagIndex]);

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
                console.log('firstList -------', firstList);
                setTagList(firstList);

                // const transformedList = firstList.map(
                //   (item: any, index: number) => ({
                //     type: 'CREATE',
                //     idx: null, // 생성된 항목은 idx가 null
                //     classIdx: item.idx, // 기존 idx를 classIdx로 매핑
                //     parentClassIdx: 0, // 최초 생성시
                //     isUse: true, // 기본값으로 true 설정
                //     sort: index + 1, // 현재 index + 1로 설정
                //   }),
                // );
                // console.log('transformedList -------', transformedList);

                // 맵 리스트 생성
                // updateMapListData(transformedList);
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

  useEffect(() => {
    if (tagCheckList.length) {
      console.log('tagCheckList ----------', tagCheckList);
      const uniqueMerge = (array1: string[], array2: string[]): string[] => {
        const uniqueFromArray1 = array1.filter(
          (item) => !array2.includes(item),
        );
        const uniqueFromArray2 = array2.filter(
          (item) => !array1.includes(item),
        );
        return [...uniqueFromArray1, ...uniqueFromArray2];
      };

      const mergedList = uniqueMerge(tagCheckList, checkList);
      console.log('최종적으로 선택된 태그들의 idx ----------', mergedList);
      setCheckList(mergedList);
    }
  }, [tagCheckList]);

  useEffect(() => {
    console.log('checkList----------', checkList);
    // 체크리스트에 해당하는 idx 값을 가진 태그값을 축출
    const filterTagListByCheckList = (
      tagList: { idx: number; name: string; code: string }[],
      checkList: string[],
    ) => {
      return tagList.filter((tag) => checkList.includes(String(tag.idx)));
    };
    const filteredTags = filterTagListByCheckList(tagList, checkList);
    // 맵리스트에 등록 형태로 변경 후 등록
    console.log('Filtered Tags:', filteredTags);
    // 부모 값 구하기
    const parentClassIdx = activeMappingItem
      ? (activeMappingItem.classIdx as number)
      : 0; // 첫 번째 맵 아이템일 경우
    console.log('parentClassIdx:', parentClassIdx);

    // 솔팅 순서 구하기
    const currentIndex = mappingList.findIndex(
      (item) => item === activeMappingItem,
    );
    let startingSort;
    if (currentIndex !== -1 && activeMappingItem) {
      // 다음으로 오는 배열의 아이템 중 같은 parentClassIdx를 가진 아이템 필터링
      const filteredItems = mappingList
        .slice(currentIndex + 1)
        .filter(
          (item) => item.parentClassIdx === activeMappingItem.parentClassIdx,
        );

      startingSort = filteredItems.length + 1; // 배열 길이 + 1
    } else {
      startingSort = 0; // 기본값
    }
    console.log('startingSort:', startingSort);

    const transformToServerFormat = (
      filteredTags: { idx: number; name: string; code: string }[],
      parentClassIdx: number | null, // 부모 클래스 ID
      startingSort: number, // 초기 sort 값
    ): UpdateItem[] => {
      return filteredTags.map((tag, index) => ({
        type: 'CREATE', // 고정값
        idx: null, // 새로 생성하는 항목이므로 null
        classIdx: tag.idx, // 기존 idx를 classIdx로 사용
        parentClassIdx: parentClassIdx, // 부모 클래스 ID
        isUse: true, // 기본값 true
        sort: startingSort + index, // 초기 sort 값부터 순서대로 증가
      }));
    };
    const serverData = transformToServerFormat(
      filteredTags,
      parentClassIdx,
      startingSort,
    );
    console.log('serverData:', serverData);
    setTagAddCheckList(serverData);

    if (checkList.length == 0) {
      // 초기화
      setShowMapHandleBtn(false);
    }
  }, [checkList]);

  const addTagsToNextDepth = () => {
    console.log('선택된 요소 activeMappingItem ', activeMappingItem);
    console.log('최종적으로 추가될 tagAddCheckListt ', tagAddCheckList);
    // if (mappingData) {
    //   if (activeMappingItem) updateMapListData(tagAddCheckList);
    //   if (!activeMappingItem)
    //     openToastifyAlert({
    //       type: 'error',
    //       text: '매핑 태그를 선택해 주세요',
    //     });
    // } else {
    updateMapListData(tagAddCheckList);
    // }
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
    onSuccess: (data) => {
      // openToastifyAlert({
      //   type: 'success',
      //   text: 'Data successfully updated!',
      // });
      // 성공후 업데이트
      mappingDataRefetch();

      // 초기화
      setCheckList([]);
      setActiveMappingItem(null);

      // 생성일시 되돌리기 버튼 리스트에 생성된 아이템 삭제로 추가
      console.log('데이터 응답 값', data.data.modifiedItemList);
      // 'CREATE' 타입만 필터링
      const filteredItems = data.data.modifiedItemList.filter(
        (item: { type: string }) => item.type === 'CREATE',
      );
      const list: UpdateItem[] = filteredItems.map((item: { idx: number }) => ({
        type: 'DELETE',
        idx: item.idx,
        classIdx: null,
        parentClassIdx: null,
        isUse: false,
        sort: null,
      }));
      // 변경 내역 되돌리기 버튼에 저장
      setUpdateItems([...(updateItems || []), list]);
    },
    onError: (error) => {
      openToastifyAlert({
        type: 'error',
        text: 'Error while saving data.',
      });
    },
  });

  // 맵리스트 이동 추가 삭제 변경 내역있을시
  const removeEmptyArrays = (nestedArray: UpdateItem[][]): UpdateItem[][] => {
    return nestedArray.filter((innerArray) => innerArray.length > 0);
  };
  useEffect(() => {
    // 빈 배열 일시 제거
    if (updateItems) {
      // 빈 배열 제거 로직
      const cleanedItems = removeEmptyArrays(updateItems);
      console.log('빈배열을 없앤 리스트 -----', cleanedItems);
      // updateItems가 변경된 경우에만 업데이트 실행
      if (JSON.stringify(cleanedItems) !== JSON.stringify(updateItems)) {
        setUpdateItems(cleanedItems);
      }
    }
  }, [updateItems]);
  const updateRevertData = () => {
    // 이전 단계로 되돌리기
    console.log('맵리스트 이동 추가 삭제 변경 내역 ---', updateItems);
    if (updateItems && updateItems.length > 0) {
      const lastArr = updateItems[updateItems.length - 1];
      if (lastArr) {
        console.log('마지막 배열 아이템 ---', lastArr);
        // 서버로 업데이트 실행
        updateMapListData(lastArr);
        // 로컬의 변경내역 리스트도 동기화
        const updateList = updateItems.slice(0, -1);
        console.log('사용된 되돌리기 아이템 제거후 리스트 ---', updateList);
        setUpdateItems(updateList);
      }
    } else {
      // 변경 내역이 없는 경우
      openToastifyAlert({
        type: 'error',
        text: '변경 내역이 없습니다',
      });
    }
  };

  // const handleAddTag = () => {
  //   if (searchValue && !tagList.includes(searchValue)) {
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
      setFilteredTags(tagList.filter((tag) => tag.name.includes(value)));
    } else {
      setFilteredTags(tagList);
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
    // 초기화
    setCheckList([]);
    setActiveMappingItem(null);
  };
  const addTags = () => {
    setIsInit(false);
    // 초기화
    setCheckList([]);

    setActiveMappingItem(null);
  };
  const deleteTag = () => {
    // 태그 삭제
    console.log('선택된 체크 박스의 값', selectedCheckBox);
    console.log('mappingList ---', mappingList);
    // 리스트의 넘버값이 포함 된 맵 리스트 아이템 축출
    const filteredItems = mappingList.filter((item) =>
      selectedCheckBox.includes(item.idx),
    );

    // console.log('필터링된 아이템 ---', filteredItems);
    const list: UpdateItem[] = filteredItems.map((item) => ({
      type: 'DELETE',
      idx: item.idx,
      classIdx: null,
      parentClassIdx: null,
      isUse: false,
      sort: null,
    }));
    // console.log('서버로 전송될 삭제될 리스트 ---', list);
    if (list) updateMapListData(list);

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

  useEffect(() => {}, [searchValue, isInit]);
  useEffect(() => {}, [tagAddCheckList]);
  useEffect(() => {}, [showMapHandleBtn]);

  return (
    <Container>
      {isInit ? (
        <ListWrapper>
          <strong className="title">태그 선택</strong>
          <span className="sub_title">매핑할 태그를 선택해주세요.</span>
          <span className="border_tag">{`${tagTitle[tagIndex - 1] ? tagTitle[tagIndex - 1] : tagTitle[tagIndex]}`}</span>
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
                    {filteredTags.map((tag, index) => (
                      <ListItem
                        key={index}
                        $padding={'5px'}
                        $margin={'0'}
                        isChecked={tagCheckList.includes(tag.name)}
                        onClick={(e) =>
                          handleTagButtonCheck(e, tag.idx.toString())
                        }
                      >
                        <CheckBoxI
                          id={tag.idx.toString()}
                          value={tag}
                          $margin={`0 5px 0 0`}
                          checked={tagCheckList.includes(tag.idx.toString())}
                          readOnly
                        />
                        <span>{tag.name}</span>
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
                onClick={(e) => handleButtonCheck(e, el.idx.toString())}
              >
                <span className="icon_wwrap">
                  <CheckBoxI
                    id={el.idx.toString()}
                    value={el.idx.toString()}
                    checked={checkList.includes(el.idx.toString())}
                    readOnly
                  />
                </span>
                <span>{`${el.name}`}</span>
              </Tags>
            ))}
            {tagList.length == 0 && (
              <ValueNone textOnly info="설정 된 태그가 없습니다" />
            )}
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
          <button className="revert_btn" onClick={() => updateRevertData()}>
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
          tagTitle={tagTitle}
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
// interface DraggableItemProps {
//   item: string;
//   index: number;
//   activeItem: string | null;
//   handleTagClick: (item: string) => void;
//   moveTag: (dragIndex: number, hoverIndex: number) => void;
// }

// const DraggableItem: React.FC<DraggableItemProps> = ({
//   item,
//   index,
//   activeItem,
//   handleTagClick,
//   moveTag,
// }) => {
//   const { ref, isDragging } = useDnD({
//     itemIndex: index,
//     onMove: moveTag,
//     dragSectionName: 'TAG_SECTION',
//   });

//   return (
//     <>
//       <Tags
//         ref={ref}
//         className={`gap ${activeItem === item ? 'on' : ''}`}
//         onClick={() => handleTagClick(item)}
//         style={{ opacity: isDragging ? 0.5 : 1 }}
//       >
//         <span>
//           <Icon width={`18px`} src={`/images/icon/icon-move.svg`} />
//         </span>
//         <span className="category_title">{item}</span>
//         <span className="category_sub_title">{'교육 과정'}</span>
//         <TagsButtonWrapper>
//           <span className="switch_title">활성화</span>
//           <Switch marginTop={5} $ison={true} onClick={() => {}}></Switch>
//           <CheckBoxI className={'side_bar'} id={''} value={undefined} />
//         </TagsButtonWrapper>
//       </Tags>
//       {activeItem === item && (
//         <InfoButtonWrapper>
//           + ‘태그 선택’에서 매핑할 태그를 선택해주세요.
//         </InfoButtonWrapper>
//       )}
//     </>
//   );
// };

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
