import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { questionInstance } from '../../api/axios';
import { getQuestionList } from '../../api/getAxios';
import {
  Button,
  DropDown,
  DropDownItemProps,
  IndexInfo,
  PaginationBox,
  Search,
  Select,
  TabMenu,
  Table,
} from '../../components';
import {
  COLOR,
  contentColWidth,
  contentTheadList,
} from '../../components/constants';
import { CreateIconPopup } from '../../pages/createPopup/CreateIconPopup';
import {
  createContentPopupBoolAtom,
  creatingNewContentBoolAtom,
  uploadBoolAtom,
  uploadFileBoolAtom,
} from '../../state/creatingContentAtom';
import { pageAtom, totalPageAtom, updateBoolAtom } from '../../state/utilAtom';
import {
  createListCodeValueAtom,
  servicedValueBoolAtom,
} from '../../state/valueAtom';
import { TableItemType } from '../../types';

export function ContentsList() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const [isChangedServiced, setIsChangedServiced] = useRecoilState(
    servicedValueBoolAtom,
  );
  const [didMount, setDidMount] = useState(false);

  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);
  const size = 10;
  const MenuCode = useRecoilValue(createListCodeValueAtom);
  // const [pageNumber, setPageNumber] = useState(1);
  // 페이지네이션 index에 맞는 전체 데이터 불러오기
  const [questionList, setQuestionList] = useState<TableItemType[]>([]);

  const setIsUpdate = useSetRecoilState(updateBoolAtom);

  const [tabVeiw, setTabVeiw] = useState<string>('문항 리스트');

  const [content, setContent] = useState<string[]>([]);

  const filterSearchValue = () => {
    // console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
    setSearchValue(value);
  };

  const openCreatePopup = () => {
    setIsCreate(true);
    setIsUpdate(false);
  };

  const menuList = [
    {
      label: '문항 리스트',
      value: '문항 리스트',
    },
    {
      label: '즐겨찾는 문항',
      value: '즐겨찾는 문항',
    },
  ];

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.value);
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };
  const selectCategory = [
    {
      id: '1',
      label: '개정과정',
      value: '1',
      options: [
        { id: '0', label: '개정과정', value: '0' },
        { id: '1', label: '2015학년', value: '1' },
        { id: '2', label: '2018학년', value: '2' },
        { id: '3', label: '2020학년', value: '3' },
      ],
    },
    {
      id: '2',
      label: '학교',
      value: '2',
      options: [
        { id: '0', label: '학교', value: '0' },
        { id: '1', label: '초등', value: '1' },
        { id: '2', label: '중등', value: '2' },
        { id: '3', label: '고등', value: '3' },
      ],
    },
    {
      id: '3',
      label: '학년',
      value: '3',
      options: [
        { id: '0', label: '학년', value: '0' },
        { id: '1', label: '초등1', value: '1' },
        { id: '2', label: '초등2', value: '2' },
        { id: '3', label: '중등1', value: '3' },
        { id: '4', label: '중등2', value: '4' },
        { id: '5', label: '고등1', value: '5' },
        { id: '6', label: '고등2', value: '6' },
      ],
    },
    {
      id: '4',
      label: '학기',
      value: '4',
      options: [
        { id: '0', label: '학기', value: '0' },
        { id: '1', label: '1학기', value: '1' },
        { id: '2', label: '2학기', value: '2' },
      ],
    },
    {
      id: '5',
      label: '대분류',
      value: '5',
      options: [
        { id: '0', label: '대분류', value: '0' },
        {
          id: '1',
          label: '일차부등식 소분류를 연습해봅시다 초등학교 친구들',
          value: '1',
        },
        { id: '2', label: '일차부등식 중분류', value: '2' },
        { id: '3', label: '일차부등식 대분류', value: '3' },
      ],
    },
    {
      id: '6',
      label: '문항타입',
      value: '6',
      options: [
        { id: '0', label: '문항타입', value: '0' },
        { id: '1', label: '객관식', value: '1' },
        { id: '2', label: '주관식', value: '2' },
        { id: '3', label: '서술형', value: '3' },
      ],
    },
    {
      id: '7',
      label: '오픈여부',
      value: '7',
      options: [
        { id: '0', label: '오픈여부', value: '0' },
        { id: '1', label: '활성화', value: '1' },
        { id: '2', label: '비활성화', value: '2' },
      ],
    },
  ];

  /**문항 업로드 팝업 관련 코드 */
  const [isCreate, setIsCreate] = useRecoilState(createContentPopupBoolAtom);
  const [isUpload, setIsUpload] = useRecoilState(uploadBoolAtom);
  const setIsCreateNewContent = useSetRecoilState(creatingNewContentBoolAtom);
  const setIsUploadFile = useSetRecoilState(uploadFileBoolAtom);

  const setIsEdit = useSetRecoilState(updateBoolAtom);

  /**문항 업로드 수정 팝업 함수 */
  const openCreateEditFilePopup = () => {
    setIsCreate(true);
    setIsUpload(true);
    setIsUploadFile(true);
    setIsCreateNewContent(false);
    setIsEdit(true);
  };

  // 드롭다운 버튼 기본 값설정
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropDownList: DropDownItemProps[] = [
    {
      key: 'ListTabl/d수정',
      title: '수정',
      onClick: () => {
        openCreateEditFilePopup();
        setShowDropDown(false);
      },
    },
    {
      key: 'ListTable/DropDownList복제 후 수정',
      title: '복제 후 수정',
      onClick: () => {
        openCreateEditFilePopup();
        setShowDropDown(false);
      },
    },
  ];

  // const firstData = async () => {
  //   const list = await questionInstance.get(
  //     `/questions?keyword=${''}&page=${1}&size=${10}&menuCode=${'CNC_Q'}`,
  //   );
  //   setQuestionList(list.data.data.content);
  // };

  // useEffect(() => {
  //   firstData();
  // }, []);

  const loadData = useCallback(() => {
    getQuestionList({
      setQuestionList,
      setIsChangedServiced,
      settotalPage,
      searchValue,
      MenuCode,
      page,
      size,
    });
  }, [
    page,
    MenuCode,
    searchValue,
    setQuestionList,
    settotalPage,
    setIsChangedServiced,
  ]);

  // 검색이나 셀렉트로 특정지어진 데이터 담은 후 보여주기 변경값이 있을때 마다 랜더링
  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      loadData();
    }
  }, [didMount, page]);

  return (
    <Container>
      <IndexInfo list={['콘텐츠 제작', '문항', `${tabVeiw}`]} />
      <HeadWrapper>
        <TabMenu
          length={2}
          menu={menuList}
          initialValue={'문항 리스트'}
          width={'250px'}
          setTabVeiw={setTabVeiw}
        />
        <Button
          height={'35px'}
          width={'150px'}
          $margin={'0 0 0 10px'}
          onClick={openCreatePopup}
        >
          문항 업로드
        </Button>
      </HeadWrapper>

      {/* 셀렉트 + 테이블 + 수정 비활성화 버튼 */}
      <TableWrapper>
        {/* 테이블 셀렉트 */}
        <SelectWrapper>
          {selectCategory.map((el) => (
            <Select
              width={'130px'}
              defaultValue={el.label}
              key={el.label}
              options={el.options}
              onSelect={(event) => selectCategoryOption(event)}
            />
          ))}
        </SelectWrapper>
        {/* 테이블 수정 + 활성화 버튼 */}
        <InputWrapper>
          <Search
            value={value}
            onClick={() => filterSearchValue()}
            onChange={(e) => setValue(e.target.value)}
            placeholder="이름, 권한 검색"
            margin={'0 20px 0 0'}
            width={'50%'}
          />
          <ButtonWrapper>
            <DropDown
              list={dropDownList}
              buttonText={'수정'}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
            ></DropDown>
            <Button
              width="150px"
              height="35px"
              fontSize="14px"
              $border
              onClick={() => {
                // submitChangingService();
              }}
              disabled={false}
            >
              활성화 / 비활성화
            </Button>
          </ButtonWrapper>
        </InputWrapper>

        <Table
          list={questionList}
          colWidth={contentColWidth}
          theadList={contentTheadList}
        />
      </TableWrapper>

      <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
      {isCreate && <CreateIconPopup />}
      {/* {isDeleteAuthority && (
        <SelectAlert
          title="권한을 삭제할 경우, "
          description="해당 권한의 아이디는 접속이 불가합니다."
          action="삭제"
          onClick={() => submitDelete()}
        />
      )} */}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const HeadWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  padding-top: 0;
`;

const TableWrapper = styled.div`
  min-height: 580px;
  border-top: 1px solid ${COLOR.SECONDARY};
`;
