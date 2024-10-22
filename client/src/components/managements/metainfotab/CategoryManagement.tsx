import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BiSolidTrashAlt } from 'react-icons/bi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { classificationInstance } from '../../../api/axios';
import { Modal, Alert } from '../../../components';
import { COLOR } from '../../../components/constants';
import { useModal } from '../../../hooks';
import { ItemCategoryType } from '../../../types';
import { postRefreshToken } from '../../../utils/tokenHandler';
import {
  Button,
  Loader,
  Switch,
  ValueNone,
  openToastifyAlert,
} from '../../atom';

import { TagsModal } from './modal';

export function CategroyManagement() {
  const { openModal } = useModal();
  const [categoryList, setCategoryList] = useState<ItemCategoryType[]>([]);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
  const [categoryIdx, setCategoryIdx] = useState<number | null>(1);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<number | null>(null);

  const [activeAdd, setActiveAdd] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [switchOn, setSwitchOn] = useState<boolean>(false);
  const [type, setType] = useState<string>('태그 선택');
  const [typeIndex, setTypeIndex] = useState<number>(0);
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [autoTag, setAutoTag] = useState<string>('없음');
  const [autoTageIndex, setAutoTagIndex] = useState<number>(0);
  //선택한 idx값
  const [selectedIdxValue, setSelectedIdxValue] = useState<number | null>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);
  // 배경 클릭시 태그 추가 초기화
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target?.toString().includes('Div')) {
        //console.log('background div');
        setActiveAdd(false);
        setTagInputValue('');
        setIsEdit(null);
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [backgroundRef]);

  //카테고리 불러오기 api
  const getCategory = async () => {
    const res = await classificationInstance.get(`/v1/category`);
    //console.log(res);
    return res;
  };
  const {
    data: categoryListData,
    isLoading: isCategoryLoading,
    refetch: categoryListRefetch,
  } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    meta: {
      errorMessage: 'get-category 에러 메세지',
    },
  });
  useEffect(() => {
    if (categoryListData) {
      setCategoryList(categoryListData.data.data.categoryItemList);
    }
  }, [categoryListData]);

  const clickDeleteCompany = () => {
    setIsDeleteCategory(true);
  };

  //카테고리 삭제
  const deleteCategory = async () => {
    const res = await classificationInstance.delete(
      `/v1/category/${categoryIdx}`,
    );
    // console.log(`기업 삭제 결과값`, res);
    return res.data;
  };

  const { mutate: deleteCategoryMutate } = useMutation({
    mutationFn: deleteCategory,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response: { data: { message: string } }) => {
      setIsDeleteCategory(false);
      openToastifyAlert({
        type: 'success',
        text: '삭제 되었습니다.',
      });
      categoryListRefetch();
      setCategoryIdx(null);
    },
  });

  //  카테고리 상세정보 불러오기 api
  const getCategoryInfo = async () => {
    const res = await classificationInstance.get(`/v1/category/${categoryIdx}`);
    //console.log(res);
    return res;
  };
  const { data: categoryInfoData, refetch: categoryInfoRefetch } = useQuery({
    queryKey: ['get-categoryInfo'],
    queryFn: getCategoryInfo,
    meta: {
      errorMessage: 'get-categoryInfo 에러 메세지',
    },
    enabled: !!categoryIdx && !isAdd,
  });

  useEffect(() => {
    if (categoryIdx) categoryInfoRefetch();
  }, [categoryIdx]);

  useEffect(() => {
    if (categoryInfoData) {
      setCategoryIdx(categoryInfoData.data.data.itemIdx);
      setName(categoryInfoData.data.data.itemName);
      setSwitchOn(categoryInfoData.data.data.isUse);
      setTypeIndex(
        categoryInfoData.data.data.type === 'SELECT'
          ? 0
          : categoryInfoData.data.data.type === 'INPUT'
            ? 1
            : categoryInfoData.data.data.type === 'DATEPICKER'
              ? 2
              : categoryInfoData.data.data.type === 'INPUT_INT'
                ? 3
                : 0,
      );
      setAutoTagIndex(
        categoryInfoData.data.data.autoNum === 'null'
          ? 0
          : categoryInfoData.data.data.type === 'NUMBER'
            ? 1
            : categoryInfoData.data.data.type === 'ROMAN_NUMBER'
              ? 2
              : categoryInfoData.data.data.type === 'LETTER'
                ? 3
                : 0,
      );
      setTagsList(
        categoryInfoData.data.data.classes.map((el: any) => el.className),
      );
    }
  }, [categoryInfoData]);

  const clickCategoryInfo = (idx: number) => {
    //카테고리 idx 추가로 상세 정보 조회
    setCategoryIdx(idx);
    //카테고리 추가 취소로 상세 정보 form 노출
    setIsAdd(false);
  };

  //접근 메뉴 업데이트 api
  const updateCategory = async () => {
    const newTagsList = tagsList.map((tag) => {
      return { name: tag };
    });
    if (isAdd) {
      const data = {
        name: name,
        type:
          type === '태그 선택'
            ? 'SELECT'
            : type === '텍스트 입력'
              ? 'INPUT '
              : type === '날짜 선택'
                ? 'DATEPICKER'
                : type === '숫자 입력'
                  ? 'INPUT_INT'
                  : '',
        autoNum:
          autoTag === '없음'
            ? 'NONE'
            : autoTag === '숫자(1,2,3)'
              ? 'NUMBER'
              : autoTag === '로마숫자(I, II, III)'
                ? 'ROMAN_NUMBER'
                : autoTag === '영문(a,b,c)'
                  ? 'LETTER'
                  : '',
        classList: newTagsList,
        isUse: switchOn,
      };
      return await classificationInstance.post(`/v1/category`, data);
    } else {
      const data = {
        itemIdx: categoryIdx,
        name: name,
        type:
          type === '태그 선택'
            ? 'SELECT'
            : type === '텍스트 입력'
              ? 'INPUT '
              : type === '날짜 선택'
                ? 'DATEPICKER'
                : type === '숫자 입력'
                  ? 'INPUT_INT'
                  : '',
        autoNum:
          autoTag === '없음'
            ? 'NONE'
            : autoTag === '숫자(1,2,3)'
              ? 'NUMBER'
              : autoTag === '로마숫자(I, II, III)'
                ? 'ROMAN_NUMBER'
                : autoTag === '영문(a,b,c)'
                  ? 'LETTER'
                  : '',
        classList: newTagsList,
        isUse: switchOn,
      };
      return await classificationInstance.put(`/v1/category`, data);
    }
    //서버로 생성 요청
  };
  const { mutate: updateCategoryData } = useMutation({
    mutationFn: updateCategory,
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
      //카테고리 리스트 재호출
      categoryListRefetch();
    },
  });

  const openAddCategory = () => {
    setIsAdd(!isAdd);
    setName('');
    setType('태그 선택');
    setTypeIndex(0);
    setAutoTag('없음');
    setAutoTagIndex(0);
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  /*  모달 열기 */
  const openTagsModal = () => {
    console.log('modal open');

    openModal({
      title: '',
      content: <TagsModal tags={tagsList} />,
    });
  };

  const tagInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTagsList([tagInputValue, ...tagsList]);
      // 등록 후 초기화
      setActiveAdd(false);
      setTagInputValue('');
    }
  };

  const tagEditInputHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Enter') {
      const newEditTagsList = [...tagsList];
      newEditTagsList[index] = tagInputValue;
      setTagsList(newEditTagsList);
      // 등록 후 초기화
      setIsEdit(null);
      setTagInputValue('');
    }
  };
  //기존 태그 삭제 함수
  const tagDeleteHandler = (value: string) => {
    const filteredArray = tagsList.filter((tag) => tag !== value);
    setTagsList(filteredArray);
  };
  const tagButtonHandler = (index: number) => {
    setIsEdit(index);
    setTagInputValue(tagsList[index]);
  };

  //취소 버튼 클릭
  const clickCancel = () => {
    //카테고리 상세 정보 1번 노출
    setCategoryIdx(1);
    //상세 정보 form 노출
    setIsAdd(false);
  };

  const inputTypeBtnArr = [
    '태그 선택',
    '텍스트 입력',
    '날짜 선택',
    '숫자 입력',
  ];
  const tagNumberingBtnArr = [
    '없음',
    '숫자(1,2,3)',
    '로마숫자(I, II, III)',
    '영문(a,b,c)',
  ];

  useEffect(() => {
    // 핸들러 상태값 초기화
    setIsEdit(null);
    setActiveAdd(false);
    setTagInputValue('');
    setTagsList([]);
  }, [isAdd]);
  useEffect(() => {}, [tagsList]);
  return (
    <Container>
      {/* 카테고리 리스트 */}
      <CategoryListWrapper>
        <ScrollWrapper>
          <PerfectScrollbar>
            <SubTitle>
              카테고리 리스트
              <span className="sub">
                카테고리를 그룹화하여 화면 노출 여부를 설정할 수 있습니다.
              </span>
            </SubTitle>
            <AuthorityListWrapper>
              {categoryListData && (
                <>
                  {categoryList.length > 0 ? (
                    <>
                      {categoryList.map((el, i) => {
                        const isSelected = selectedIdxValue === i;
                        return (
                          <CategoryList key={`${el} - ${i}`}>
                            <AuthorityWrapper onClick={() => {}}>
                              <AuthorityName
                                $isSelected={isSelected}
                                onClick={() => {
                                  setSelectedIdxValue(i);
                                  clickCategoryInfo(el.idx);
                                }}
                              >
                                <div className="title">{el.name}</div>
                              </AuthorityName>
                            </AuthorityWrapper>
                            <DeleteIconWrapper>
                              <BiSolidTrashAlt
                                onClick={() => {
                                  clickDeleteCompany();
                                  //삭제할 카테고리 idx값 관리
                                  setCategoryIdx(el.idx);
                                  setSelectedIdxValue(i);
                                }}
                              />
                            </DeleteIconWrapper>
                          </CategoryList>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <ValueNone textOnly info="등록된 권한이 없습니다" />
                    </>
                  )}
                </>
              )}
              {isCategoryLoading && <Loader />}
            </AuthorityListWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      </CategoryListWrapper>

      {/* 카테고리 등록 수정 */}
      <CategoryManageWrapper>
        <ButtonWrapper className="subtitle">
          {!isAdd && <SubTitle>카테고리 관리</SubTitle>}
          {isAdd && <SubTitle>카테고리 추가</SubTitle>}
          {!isAdd && (
            <Button
              height={'35px'}
              width={'130px'}
              onClick={openAddCategory}
              $margin="10px 20px"
              fontSize="13px"
              $filled
              cursor
            >
              카테고리 추가
            </Button>
          )}
        </ButtonWrapper>
        {/* 카테고리 추가 */}
        {isAdd && (
          <FormBox>
            <div className="form">
              <div className="input_wrap">
                <span className="input_label">카테고리명</span>
                <input
                  type="text"
                  placeholder="카테고리명을 입력해주세요"
                  value={name}
                  onChange={(e) => changeName(e)}
                />
              </div>
              <div className="input_wrap">
                <span className="input_label">활성화 여부</span>
                <div className="button_wrap">
                  <Switch
                    $ison={switchOn}
                    marginTop={5}
                    onClick={() => {
                      setSwitchOn(!switchOn);
                    }}
                  />
                  <span className="sub_text">
                    카테고리 사용 여부를 설정합니다. 비활성화 시, 화면 노출이
                    제한됩니다.
                  </span>
                </div>
              </div>
              <div className="input_wrap">
                <span className="input_label">입력 타입</span>
                <div className="button_wrap">
                  {inputTypeBtnArr.map((type, index) => (
                    <button
                      key={`입력 타입 : ${type} - ${index}`}
                      type="button"
                      className={`value_button ${typeIndex == index ? 'on' : ''}`}
                      onClick={() => {
                        setTypeIndex(index);
                        setType(type);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="input_wrap">
                <span className="input_label">태그</span>
                <div className="button_wrapper">
                  {activeAdd ? (
                    <span className={`active_add ${''}`}>
                      <input
                        className={`tag_add_input ${''}`}
                        onKeyDown={(e) => tagInputHandler(e)}
                        onChange={(e) => setTagInputValue(e.target.value)}
                        //value={tagInputValue}
                        placeholder="태그명"
                      />
                    </span>
                  ) : (
                    <button
                      type="button"
                      className={`add_button`}
                      onClick={() => setActiveAdd(!activeAdd)}
                    >
                      +추가
                    </button>
                  )}
                  {/* 앞쪽으로 버튼 배열 추가 */}
                  {tagsList.map((tag, index) => (
                    <React.Fragment key={`태그 ${index}: ${tag}`}>
                      {isEdit === index ? (
                        <span className={`active_add ${''}`}>
                          <input
                            className={`tag_add_input ${''}`}
                            onKeyDown={(e) => tagEditInputHandler(e, index)}
                            onChange={(e) => setTagInputValue(e.target.value)}
                            value={tagInputValue}
                            placeholder="태그명"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              setIsEdit(null);
                              tagDeleteHandler(tagInputValue);
                            }}
                          >
                            X
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={`value_button ${tag}`}
                          onClick={() => tagButtonHandler(index)}
                        >
                          {tag}
                        </button>
                      )}
                    </React.Fragment>
                  ))}

                  <p className="sub_text wid_100">
                    카테고리에 속한 속성값으로, 그룹 관리에서 매핑이 가능합니다.
                  </p>
                </div>
              </div>
              <div className="input_wrap">
                <span className="input_label">태그 자동 넘버링</span>
                <div className="button_wrap">
                  {tagNumberingBtnArr.map((numbering, index) => (
                    <button
                      key={`태그 자동 넘버링 : ${numbering} - ${index}`}
                      type="button"
                      className={`value_button ${autoTageIndex == index ? 'on' : ''}`}
                      onClick={() => {
                        setAutoTagIndex(index);
                        setAutoTag(numbering);
                      }}
                    >
                      {numbering}
                    </button>
                  ))}
                  <p className="sub_text wid_100">
                    태그 매핑 시, 태그가 추가될 때마다 화면에서 자동으로 숫자를
                    부여합니다.
                  </p>
                </div>
              </div>
            </div>
          </FormBox>
        )}
        {/* 카테고리 상세 */}
        {!isAdd && (
          <FormBox>
            <div className="form">
              <div className="input_wrap">
                <span className="input_label">카테고리명</span>
                <input
                  type="text"
                  placeholder="카테고리명을 입력해주세요"
                  value={name}
                  onChange={(e) => changeName(e)}
                />
              </div>
              <div className="input_wrap">
                <span className="input_label">활성화 여부</span>
                <div className="button_wrap">
                  <Switch
                    marginTop={5}
                    $ison={switchOn}
                    onClick={() => {
                      setSwitchOn(!switchOn);
                    }}
                  />
                  <span className="sub_text">
                    카테고리 사용 여부를 설정합니다. 비활성화 시, 화면 노출이
                    제한됩니다.
                  </span>
                </div>
              </div>
              <div className="input_wrap">
                <span className="input_label">그룹</span>
                {/* TODO : 그룹 데이터 */}
                <input type="text" readOnly value={'업체정보'} />
              </div>
              <div className="input_wrap">
                <span className="input_label">입력 타입</span>
                <div className="button_wrap">
                  {inputTypeBtnArr.map((type, index) => (
                    <button
                      key={`입력 타입 : ${type} - ${index}`}
                      type="button"
                      className={`value_button ${typeIndex == index ? 'on' : ''}`}
                      onClick={() => {
                        setTypeIndex(index);
                        setType(type);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="input_wrap">
                <span className="input_label">
                  태그
                  <br />({`${tagsList.length}`}개)
                </span>
                <div className="button_wrapper">
                  {/* 추가 눌렀을때 */}
                  {activeAdd ? (
                    <span className={`active_add ${''}`}>
                      <input
                        //className={`tag_add_input ${''}`}
                        onKeyDown={(e) => tagInputHandler(e)}
                        onChange={(e) => setTagInputValue(e.target.value)}
                        //value={tagInputValue}
                        placeholder="태그명"
                      />
                    </span>
                  ) : (
                    // 추가 누르기전
                    <button
                      type="button"
                      className={`add_button`}
                      onClick={() => {
                        setActiveAdd(!activeAdd);
                        setIsEdit(null);
                      }}
                    >
                      +추가
                    </button>
                  )}
                  {/* 앞쪽으로 버튼 배열 추가 */}
                  {tagsList.map((tag, index) => (
                    <React.Fragment key={`태그 ${index}: ${tag}`}>
                      {isEdit === index ? (
                        <span className={`active_add ${''}`}>
                          <input
                            className={`tag_add_input ${''}`}
                            onKeyDown={(e) => tagEditInputHandler(e, index)}
                            onChange={(e) => setTagInputValue(e.target.value)}
                            value={tag}
                            placeholder="태그명"
                          />
                          {
                            // 태그가 사용되고 있을시 삭제불가
                            // 사용되고 있지 않은 태그일시 삭제가능
                            <button
                              type="button"
                              onClick={() => setIsEdit(null)}
                            >
                              X
                            </button>
                          }
                        </span>
                      ) : (
                        <button
                          type="button"
                          className={`value_button ${tag}`}
                          onClick={() => {
                            tagButtonHandler(index);
                            setActiveAdd(false);
                          }}
                        >
                          {tag}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="input_wrap">
                <span className="input_label"></span>
                <div className="button_wrap">
                  <button
                    type="button"
                    className={`value_button`}
                    onClick={() => openTagsModal()}
                  >
                    <span className="transform">⁝</span>
                  </button>
                  <p className="sub_text wid_100">
                    카테고리에 속한 속성값으로, 그룹 관리에서 매핑이 가능합니다.
                  </p>
                </div>
              </div>
              <div className="input_wrap">
                <span className="input_label">태그 자동 넘버링</span>
                <div className="button_wrap">
                  {tagNumberingBtnArr.map((numbering, index) => (
                    <button
                      key={`태그 자동 넘버링 : ${numbering} - ${index}`}
                      type="button"
                      className={`value_button ${autoTageIndex == index ? 'on' : ''}`}
                      onClick={() => {
                        setAutoTagIndex(index);
                        setAutoTag(numbering);
                      }}
                    >
                      {numbering}
                    </button>
                  ))}
                  <p className="sub_text wid_100">
                    태그 매핑 시, 태그가 추가될 때마다 화면에서 자동으로 숫자를
                    부여합니다.
                  </p>
                </div>
              </div>
            </div>
          </FormBox>
        )}
        <ButtonWrapper className="position_right">
          <div className="display gap">
            <Button
              height={'35px'}
              width={'130px'}
              $filled
              onClick={() => {
                updateCategoryData();
              }}
            >
              저장
            </Button>
            {isAdd && (
              <Button
                height={'35px'}
                width={'130px'}
                onClick={() => {
                  clickCancel();
                }}
              >
                취소
              </Button>
            )}
          </div>
        </ButtonWrapper>
      </CategoryManageWrapper>
      {isDeleteCategory && (
        <Alert
          description="카테고리 삭제하시겠습니까?"
          subDescription="카테고리를 삭제하시면, bla bla bra bra."
          isAlertOpen={isDeleteCategory}
          action="삭제"
          onClose={() => setIsDeleteCategory(false)}
          onClick={() => deleteCategoryMutate()}
        ></Alert>
      )}
      <Modal />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const CategoryListWrapper = styled.div`
  display: flex;
  width: calc(40% - 20px);
`;
const CategoryManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .gap {
    gap: 10px;
  }
  .display {
    display: flex;
    margin: 0 20px 20px 20px;
  }
  &.subtitle {
    height: 72px;
  }
  &.position_right {
    width: 100%;
    justify-content: flex-end;
  }
`;

const SubTitle = styled.span`
  font-weight: bold;
  color: ${COLOR.FONT_BLACK};
  font-size: 16px;
  padding: 0 20px;
  margin-top: 15px;
  display: inline-block;

  .sub {
    width: 100%;
    display: block;
    font-size: 12px;
    font-weight: 400;
    color: ${COLOR.FONT_GRAY};
  }
`;

const FormBox = styled.div`
  background-color: #fff;
  margin: 20px;
  //margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 10px;
  width: calc(100% - 40px);
  height: 100%;

  .form {
    padding: 20px 0;
  }
  .input_wrap {
    padding: 5px 20px;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
  }
  .input_wrap input {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 2px 0;
    text-indent: 10px;
  }
  .input_wrap input::placeholder {
    color: #aeaeae;
    font-size: 12px;
    text-indent: 10px;
  }
  .input_label {
    width: 150px;
    text-align: right;
    margin-right: 10px;
    font-weight: 800;
    font-size: 15px;
    display: flex;
    flex-direction: column-reverse;
    padding-top: 4px;
  }
  .sub_text {
    font-size: 12px;
    color: #7d7d7d;
    padding-left: 5px;
    line-height: 1.2;
  }
  .wid_100 {
    width: 100%;
  }
  .button_wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex: 1 1 0;
    gap: 5px;
  }
  .add_button {
    border: 1px dashed ${COLOR.PRIMARY};
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 13px;
    color: ${COLOR.PRIMARY};
    background-color: transparent;
  }

  .active_add {
    border: 1px solid ${COLOR.PRIMARY};
    padding: 2px 10px;
    padding-right: 20px;
    border-radius: 5px;
    position: relative;
  }
  .active_add > button {
    position: absolute;
    right: 5px;
    color: ${COLOR.PRIMARY};
    border: none;
    background-color: transparent;
    top: 50%;
    transform: translateY(-50%);
  }
  .input_wrap .button_wrap .active_add .tag_add_input {
    border: none;
    text-indent: 0;
    padding: 0;
    margin: 0;
    width: 60px;
  }
  .input_wrap .button_wrap .active_add .tag_add_input::placeholder {
    text-indent: 5px;
  }
  .button_wrapper {
    display: flex;
    flex-wrap: wrap;
    max-height: 145px;
    overflow: hidden;
    flex: 1 1 0;
    gap: 5px;
  }
  .value_button {
    border: 1px solid #ddd;
    background-color: transparent;
    border-radius: 5px;
    font-size: 13px;
    padding: 5px 15px;
  }
  .value_button.on {
    border: 1px solid ${COLOR.PRIMARY};
  }
  .transform {
    display: block;
    transform: rotate(90deg);
  }
`;

const ScrollWrapper = styled.div`
  width: calc(100% - 20px);
  height: 630px;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const AuthorityListWrapper = styled.div`
  width: 100%;
  height: fit-content;
  /* border-left: 1px solid ${COLOR.SECONDARY}; */
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;
const CategoryList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AuthorityWrapper = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-right: 8px;
  margin-bottom: 5px;
  background-color: white;
  border-radius: 5px;
`;
const AuthorityName = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  ${({ $isSelected }) =>
    $isSelected
      ? `color: ${COLOR.PRIMARY}; border: 1px solid ${COLOR.PRIMARY};`
      : 'none'};

  .title {
    display: flex;
    justify-content: center;
  }

  &:hover {
    background-color: ${COLOR.SELECT_BLUE};
    color: white;
  }
  /* > span {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  } */
`;

const DeleteIconWrapper = styled.button`
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${COLOR.FONT_BLACK};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  color: #fff;
  /* background-color: transparent; */
  &:hover {
    background: ${COLOR.RED};
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
