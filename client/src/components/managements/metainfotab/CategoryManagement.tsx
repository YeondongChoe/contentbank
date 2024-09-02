import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { Modal } from '../../../components';
import { COLOR } from '../../../components/constants';
import { useModal } from '../../../hooks';
import { Button, Icon, Loader, Switch, ValueNone } from '../../atom';

import { TagsModal } from './modal';

export function CategroyManagement() {
  const [categoryList, setCategoryList] = useState(['교육과정', '교과']);
  const [tagsList, setTagsList] = useState([
    '분류1',
    '분류7777777',
    '분류분류분류분류분류분류분류분류분류분류',
  ]);
  const [newTagsList, setNewTagsList] = useState<string[]>([]);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const [switchOn, setSwitchOn] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeAdd, setActiveAdd] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const { openModal } = useModal();

  const openAddCategory = () => {
    setIsAdd(!isAdd);
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
    if (isAdd && e.key === 'Enter') {
      setNewTagsList([tagInputValue, ...newTagsList]);
      // 등록 후 초기화
      setActiveAdd(false);
      setTagInputValue('');
    }
    if (!isAdd && e.key === 'Enter') {
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
    if (isAdd && e.key === 'Enter') {
      const newEditTagsList = [...newTagsList];
      newEditTagsList[index] = tagInputValue;
      setNewTagsList(newEditTagsList);
      // 등록 후 초기화
      setIsEdit(null);
      setTagInputValue('');
    }
    if (!isAdd && e.key === 'Enter') {
      const newEditTagsList = [...tagsList];
      newEditTagsList[index] = tagInputValue;
      setTagsList(newEditTagsList);
      // 등록 후 초기화
      setIsEdit(null);
      setTagInputValue('');
    }
  };
  const tagButtonHandler = (index: number) => {
    setIsEdit(index);
    if (isAdd) {
      setTagInputValue(newTagsList[index]);
    }
    if (!isAdd) {
      setTagInputValue(tagsList[index]);
    }
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
    setNewTagsList([]);
  }, [isAdd]);
  useEffect(() => {}, [newTagsList, tagsList]);
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
              {/* TODO : 데이터 들어올시 */}
              {/* {categoryListData && ( */}
              <>
                {categoryList.length > 0 ? (
                  <>
                    {categoryList.map((el) => (
                      <AuthorityWrapper key={`${el}`} onClick={() => {}}>
                        <AuthorityName onClick={() => {}}>
                          <span className="ellipsis">{el}</span>
                        </AuthorityName>
                        <DeleteIconWrapper>
                          <BiSolidTrashAlt onClick={() => {}} />
                        </DeleteIconWrapper>
                      </AuthorityWrapper>
                    ))}
                  </>
                ) : (
                  <>
                    <ValueNone textOnly info="등록된 권한이 없습니다" />
                  </>
                )}
              </>
              {/* )} */}
              {/* {changeAuthorityisPending ||
				(createAuthorityIsPending && <Loader />)} */}
            </AuthorityListWrapper>
          </PerfectScrollbar>
        </ScrollWrapper>
      </CategoryListWrapper>

      {/* 카테고리 등록 수정 */}
      <CategoryManageWrapper>
        <ButtonWrapper>
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
                    ison={switchOn}
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
                      key={`입력 타입 : ${type}`}
                      type="button"
                      className={`value_button ${activeIndex == index ? 'on' : ''}`}
                      onClick={() => setActiveIndex(index)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="input_wrap">
                <span className="input_label">태그</span>
                <div className="button_wrap">
                  {activeAdd ? (
                    <span className={`active_add ${''}`}>
                      <input
                        className={`tag_add_input ${''}`}
                        onKeyDown={(e) => tagInputHandler(e)}
                        onChange={(e) => setTagInputValue(e.target.value)}
                        value={tagInputValue}
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
                  {newTagsList.map((tag, index) => (
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

                          <button type="button" onClick={() => setIsEdit(null)}>
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
                      key={`태그 자동 넘버링 : ${numbering}`}
                      type="button"
                      className={`value_button ${activeIndex == index ? 'on' : ''}`}
                      onClick={() => setActiveIndex(index)}
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
                    ison={switchOn}
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
                      key={`입력 타입 : ${type}`}
                      type="button"
                      className={`value_button ${activeIndex == index ? 'on' : ''}`}
                      onClick={() => setActiveIndex(index)}
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
                <div className="button_wrap">
                  {activeAdd ? (
                    <span className={`active_add ${''}`}>
                      <input
                        className={`tag_add_input ${''}`}
                        onKeyDown={(e) => tagInputHandler(e)}
                        onChange={(e) => setTagInputValue(e.target.value)}
                        value={tagInputValue}
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
                          {
                            // 태그가 사용되고 있을시 삭제불가
                            // 사용되고 있지 않은 태그일시 삭제가능
                            // <button type="button" onClick={() => setIsEdit(null)}>
                            //   X
                            // </button>
                          }
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
                      key={`태그 자동 넘버링 : ${numbering}`}
                      type="button"
                      className={`value_button ${activeIndex == index ? 'on' : ''}`}
                      onClick={() => setActiveIndex(index)}
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
            <Button height={'35px'} width={'130px'} $filled onClick={() => {}}>
              저장
            </Button>
            {isAdd && (
              <Button
                height={'35px'}
                width={'130px'}
                onClick={() => {
                  setIsAdd(false);
                }}
              >
                취소
              </Button>
            )}
          </div>
        </ButtonWrapper>
      </CategoryManageWrapper>
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
  &.position_right {
    width: 100%;
    justify-content: flex-end;
  }
  .display {
    display: flex;
    margin: 0 20px 20px 20px;
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
    color: #6f6f6f;
  }
`;

const FormBox = styled.div`
  background-color: #fff;
  margin: 20px;
  margin-top: 10px;
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
  height: 580px;
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

const AuthorityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 0 10px;
`;
const AuthorityName = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  padding-right: 50px;
  border-radius: 5px;
  background-color: white;
  border: none;
  margin-right: 8px;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  font-size: 14px;
  &::after {
    content: '| 수정';
    display: flex;
    font-size: 12px;
    position: absolute;
    right: 10px;
    color: ${COLOR.SELECT_BLUE};
  }

  &:hover {
    background-color: ${COLOR.SELECT_BLUE};
    color: white;
    &::after {
      content: '| 수정';
      color: ${COLOR.LIGHT_GRAY};
    }
  }
  > span {
    display: flex;
    text-align: left;
    width: 100%;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
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
