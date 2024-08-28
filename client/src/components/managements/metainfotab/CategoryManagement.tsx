import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { BiSolidTrashAlt } from 'react-icons/bi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { COLOR } from '../../../components/constants';
import { Button, Loader, ValueNone } from '../../atom';

export function CategroyManagement() {
  const [categoryList, setCategoryList] = useState(['교육과정', '교과']);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const openAddCategory = () => {
    setIsAdd(!isAdd);
  };

  return (
    <Container>
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
        <FormBox>
          <div className="form">
            <div className="input_wrap">
              <span className="input_label">카테고리명</span>
              <input type="text" />
            </div>
            <div className="input_wrap">
              <span className="input_label">활성화 여부</span>
              <input type="text" />
            </div>
            <div className="input_wrap">
              <span className="input_label">입력 타입</span>
              <input type="text" />
            </div>
            <div className="input_wrap">
              <span className="input_label">태그</span>
              <input type="text" />
            </div>
            <div className="input_wrap">
              <span className="input_label">태그 자동 넘버링</span>
              <input type="text" />
            </div>
          </div>
        </FormBox>
      </CategoryManageWrapper>
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
  margin-top: 0;
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
    align-items: center;
  }
  .input_label {
    width: 150px;
    text-align: right;
    margin-right: 10px;
    font-size: bold;
    font-size: 15px;
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
