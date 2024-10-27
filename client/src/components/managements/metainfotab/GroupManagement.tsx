import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import { Modal } from '../../../components';
import { COLOR } from '../../../components/constants';
import { useModal } from '../../../hooks';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { windowOpenHandler } from '../../../utils/windowHandler';
import { Button, Icon, openToastifyAlert } from '../../atom';

import { CategoryAddModal, CreateGroupModal, ScreenPathModal } from './modal';

type GroupListProps = {
  code: string;
  idx: number;
  name: string;
  nameList: string;
  typeList: string;
};

type TitleEditProps = {
  [key: number]: boolean;
};

type CategoryListProps = {
  idx: number;
  name: string;
};

export function GroupManagement() {
  const [groupList, setGroupList] = useState<GroupListProps[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryListProps[]>([]);
  const [groupIdx, setGroupIdx] = useState<number | null>(null);
  const [nameList, setNameList] = useState<string>('');
  const [typeList, setTypeList] = useState<string>('');
  //서버로 요청하기 위해서 Idx로 변환
  const [typeIdxList, setTypeIdxList] = useState<number[]>([]);
  const [isTitleEdit, setIsTitleEdit] = useState<TitleEditProps>({});
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const { openModal } = useModal();
  const { closeModal } = useModal();

  //typeList 들어왔을때 서버로 요청할 수 있는  형태로 변환 Number[]
  useEffect(() => {
    if (typeList) {
      const typeListArray = typeList.split(',').map(Number);
      const numberArray = typeListArray.map((item) => Number(item));
      setTypeIdxList(numberArray);
    }
  }, [typeList]);

  const titleEditHandler = (id: number) => {
    updateGroupInfoData(typeIdxList);
    setIsTitleEdit((prevState) => ({
      ...prevState,
      [id]: false, // Turn off edit mode after saving
    }));
  };

  const openToggleEdit = (id: number, typeList: string) => {
    setIsTitleEdit(() => ({
      [id]: true, // 선택된 항목만 true
    }));
    setTagInputValue('');
    setGroupIdx(id);
    setTypeList(typeList);
  };

  const closeToggleEdit = (id: number) => {
    setIsTitleEdit(() => ({
      [id]: false, // 선택된 항목만 false
    }));
    //초기화
    setTagInputValue('');
    setTypeList('');
  };

  /*  모달 열기 */
  const openCategoryAddModal = (
    nameList: string,
    typeList: string,
    name: string,
    idx: number,
  ) => {
    setTypeList(typeList);
    setNameList(name);
    setGroupIdx(idx);
    const process = nameList.split(',').map((el) => el);
    openModal({
      title: '',
      content: (
        <CategoryAddModal
          categoryList={categoryList}
          nameList={process}
          typeList={typeList}
          onSave={(selectedTags) => updateGroupInfoData(selectedTags)}
        />
      ),
    });
  };
  const openScreenPathModal = (code: string) => {
    openModal({
      title: '',
      content: <ScreenPathModal code={code} />,
    });
  };
  const openCreateGroupModal = () => {
    openModal({
      title: '',
      content: (
        <CreateGroupModal
          categoryList={categoryList}
          categoryGroupRefetch={categoryGroupRefetch}
        />
      ),
    });
  };
  const openTagMappingWindow = () => {
    windowOpenHandler({
      name: 'tagmapping',
      url: '/content-manage/tagmapping',
      // queryParams: { state: '' },
    });
  };

  //카테고리 그룹 리스트 불러오기 api
  const getCategory = async () => {
    const res = await classificationInstance.get(`/v1/category/simple`);
    //console.log(res);
    return res;
  };
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    refetch: categoryRefetch,
  } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    meta: {
      errorMessage: 'get-category 에러 메세지',
    },
  });

  useEffect(() => {
    if (categoryData) {
      setCategoryList(categoryData.data.data.categoryItemList);
    }
  }, [categoryData]);

  //카테고리 그룹 리스트 불러오기 api
  const getCategoryGroup = async () => {
    const res = await classificationInstance.get(`/v1/category/group`);
    //console.log(res);
    return res;
  };
  const {
    data: categoryGroupData,
    isLoading: isCategoryGroupLoading,
    refetch: categoryGroupRefetch,
  } = useQuery({
    queryKey: ['get-categoryGroup'],
    queryFn: getCategoryGroup,
    meta: {
      errorMessage: 'get-categoryGroup 에러 메세지',
    },
  });

  useEffect(() => {
    if (categoryGroupData) {
      setGroupList(categoryGroupData.data.data.groupList);
    }
  }, [categoryGroupData]);

  //그룹 정보 업데이트 api
  const updateGroupInfo = async (selectedTags: number[]) => {
    const data = {
      groupIdx: groupIdx,
      name: tagInputValue || nameList,
      types: selectedTags,
    };
    return await classificationInstance.put(`/v1/category/group`, data);
  };
  const { mutate: updateGroupInfoData } = useMutation({
    mutationFn: updateGroupInfo,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: '잠시후 다시 시도해주세요',
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      //저장 알람
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      //그룹 리스트 재호출
      categoryGroupRefetch();
      setTagInputValue('');
      closeModal();
    },
  });

  return (
    <Container>
      <SubTitle>
        <span>그룹 리스트</span>
        <span className="sub">
          카테고리를 그룹화하여 화면 노출 여부를 설정할 수 있습니다.
        </span>
        <Button
          height={'35px'}
          width={'130px'}
          onClick={() => openCreateGroupModal()}
          fontSize="13px"
          $filled
          cursor
        >
          그룹 생성
        </Button>
      </SubTitle>

      <ScrollWrapper>
        <PerfectScrollbar>
          {groupList
            .slice()
            .sort((a, b) => a.idx - b.idx)
            .map((list) => (
              <GroupList key={`${list.idx} - ${list.name}`}>
                <li>
                  <span className="list_top">
                    {isTitleEdit[list.idx] ? (
                      <span className="list_title ">
                        <input
                          value={tagInputValue}
                          onChange={(e) => setTagInputValue(e.target.value)}
                        />
                        <button
                          type="button"
                          className="edit_button"
                          onClick={() => titleEditHandler(list.idx)}
                        >
                          저장
                        </button>
                        <button
                          type="button"
                          className="edit_cancel"
                          onClick={() => {
                            closeToggleEdit(list.idx);
                            setTagInputValue('');
                          }}
                        >
                          취소
                        </button>
                      </span>
                    ) : (
                      <span className="list_title">
                        <strong>{list.name}</strong>
                        <button
                          type="button"
                          onClick={() => {
                            openToggleEdit(list.idx, list.typeList);
                          }}
                        >
                          수정
                        </button>
                      </span>
                    )}

                    <span className="list_link_box">
                      <span className="linktree">화면설정경로</span>
                      <button
                        className="link_button"
                        onClick={() => {
                          openScreenPathModal(list.code);
                        }}
                      >
                        <Icon
                          src={`/images/icon/link_off.svg`}
                          width={'20px'}
                          height={'20px'}
                        />
                      </button>
                    </span>
                  </span>
                  <span className="list_body">
                    <span className="category_title">
                      카테고리
                      <span className="sub">{`(${list.nameList.split(',').length}개)`}</span>
                    </span>
                    <ul className="category_list">
                      {list.nameList.split(',').map((name, i) => (
                        <li key={i}>{name}</li>
                      ))}
                      <li>
                        <button
                          type="button"
                          className="category_add_button"
                          onClick={() => {
                            openCategoryAddModal(
                              list.nameList,
                              list.typeList,
                              list.name,
                              list.idx,
                            );
                          }}
                        >
                          + 카테고리 추가
                        </button>
                      </li>
                    </ul>
                  </span>
                  <span className="list_bottom">
                    <button
                      className="mapping_button"
                      type="button"
                      onClick={() => openTagMappingWindow()}
                    >
                      태그 매핑
                    </button>
                    <span className="list_info">{`${'매핑이란, 연관있는 태그 간의 상하관계를 적용하는 행위를 말합니다. 예) 과일 > 키위 > 그린키위 '}`}</span>
                  </span>
                </li>
              </GroupList>
            ))}
        </PerfectScrollbar>
      </ScrollWrapper>
      <Modal />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const SubTitle = styled.span`
  width: 100%;
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
  padding: 0 20px;
  margin-top: 15px;
  display: flex;
  align-items: center;

  .sub {
    display: flex;
    flex: 1 1 0;
    font-size: 12px;
    font-weight: 400;
    color: #6f6f6f;
    margin-left: 40px;
  }
`;

const ScrollWrapper = styled.div`
  width: calc(100% - 20px);
  height: 580px;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const GroupList = styled.ul`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  > li {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    width: calc(100% - 20px);
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  > li button {
    border: none;
    background-color: transparent;
  }
  > li .list_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list_top .list_title {
    display: flex;
    align-items: center;
  }
  .list_top .list_title input {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 2px 0;
    width: 150px;
    margin-right: 5px;
  }
  .list_top .list_title strong {
    font-size: 16px;
    font-weight: bold;
    padding-right: 15px;
  }
  .list_top .list_title button {
    font-size: 12px;
    font-weight: 400;
    text-decoration: underline;
    color: ${COLOR.PRIMARY};
    padding: 5px;
  }
  .list_top .list_title button.edit_cancel {
    color: #7d7d7d;
  }

  .list_top .list_link_box {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .list_top .list_link_box .linktree {
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 400;
    text-decoration: underline;
  }

  > li .list_body {
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 10px 15px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  > li .list_body .category_title {
    font-size: 13px;
    margin-top: 5px;
    display: flex;
  }
  > li .list_body .category_title .sub {
    color: #aaa;
  }
  > li .list_body .category_list {
    flex: 1 1 0;
    display: flex;
    flex-wrap: wrap;
    margin-left: 15px;
    gap: 5px;
  }
  > li .list_body .category_list li {
    border: 1px solid #ddd;
    background-color: transparent;
    border-radius: 5px;
    font-size: 12px;
    padding: 5px 15px;
  }
  > li .list_body .category_list li:last-of-type {
    padding: 0;
    border: none;
  }
  > li .list_body .category_list li .category_add_button {
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 12px;
    padding: 5px 15px;
    font-weight: bold;
    color: #7d7d7d;
  }

  > li .list_bottom {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 15px;
  }
  > li .list_bottom .list_info {
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 400;
  }
  > li .list_bottom .mapping_button {
    width: 140px;
    border: 1px solid ${COLOR.PRIMARY};
    padding: 6px;
    border-radius: 5px;
    color: ${COLOR.PRIMARY};
    font-size: 14px;
  }
`;
