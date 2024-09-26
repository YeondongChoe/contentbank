import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BiToggleRight } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  List,
  ListItem,
  TabMenu,
  Label,
  Button,
  Select,
  Search,
  Input,
  openToastifyAlert,
  Alert,
  Modal,
  PaginationBox,
} from '..';
import { userInstance } from '../../api/axios';
import { useModal } from '../../hooks';
import { pageAtom } from '../../store/utilAtom';
import { postRefreshToken } from '../../utils/tokenHandler';
import { COLOR } from '../constants';

import { RegisterModal } from './member/RegisterModal';

type companyAccountListProps = {
  authorityName: string;
  companyIdx: number;
  createdAt: string;
  createdBy: string;
  id: string;
  idx: number;
  isUse: boolean;
  lastModifiedAt: string;
  lastModifiedBy: string;
  name: string;
  userKey: string;
};

type accessMenuListProps = {
  isLock: boolean;
  isUse: boolean;
  menuCode: string;
  menuName: string;
};

export function Company() {
  const { openModal } = useModal();
  //페이지네이션
  const [page, setPage] = useRecoilState(pageAtom);
  //기업리스트 값
  const [companyList, setCompanyList] = useState<any[]>([]);
  //기업리스트 검색값
  const [searchValue, setSearchValue] = useState<string>('');
  const [onSearch, setOnSearch] = useState<boolean>(false);
  //기업리스트 idx값
  const [idxValue, setIdxValue] = useState<string | null>(null);
  //선택한 idx값
  const [selectedIdxValue, setSelectedIdxValue] = useState<string | null>(null);
  //탭
  const [tabVeiw, setTabVeiw] = useState<string>('기업 관리');
  //기업 정보 설정 값
  //기업명
  const [nameValue, setNameValue] = useState('');
  //기업코드
  const [codeValue, setCodeValue] = useState('');
  //언어코드
  const [languageValue, setLanguageValue] = useState('한국어(KO)');
  //기업 식별자
  const [corporateIdentifierValue, setCorporateIdentifierValue] = useState('');
  //대표자명
  const [representativeNameValue, setRepresentativeNameValue] = useState('');
  //대표자 연락처
  const [representativePhoneNumberValue, setRepresentativePhoneNumberValue] =
    useState('');
  //사업자번호
  const [businessRegistrationNumberValue, setBusinessRegistrationNumberValue] =
    useState('');
  //담당자 연락처
  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  //주소1
  const [address1Value, setAddress1Value] = useState('');
  //주소2 상세주소
  const [address2Value, setAddress2Value] = useState('');
  //이메일
  const [emailValue, setEmailValue] = useState('');
  //업종업태(대분류)
  const [largeItemValue, setLargeItemValue] = useState('');
  //업종업태(대분류) code값
  const [largeItemCodeValue, setLargeItemCodeValue] = useState('');
  //업종종목(소분류)
  const [detailItemValue, setDetailItemValue] = useState('');
  //업종종목(소분류) code값
  const [detailItemCodeValue, setDetailItemCodeValue] = useState('');
  //표준 산업 대분류 리스트
  const [industryList, setIndustryList] = useState([]);
  //표준 산업 소분류 리스트
  const [industryDetailList, setIndustryDetailList] = useState([]);
  //계정 리스트
  const [companyAccountList, setCompanyAccountList] = useState<
    companyAccountListProps[]
  >([]);
  const [accessMenuList, setAccessMenuList] = useState<accessMenuListProps[]>(
    [],
  );
  console.log(accessMenuList);
  //계정 활성화 여부
  const [isActivate, setIsActivate] = useState(false);
  //탭
  const changeTab = () => {
    setPage(1);
  };
  const menuList = [
    {
      label: '기업 관리',
      value: '기업 관리',
    },
    {
      label: '계정 관리',
      value: '계정 관리',
    },
  ];
  //언어코드 하드코딩
  const SelectDummy = {
    languageList: [
      {
        name: '한국어(KO)',
        code: '1',
      },
      {
        name: '영어(EN)',
        code: '2',
      },
    ],
  };

  // 기업 리스트 불러오기 api
  const getCompanyList = async () => {
    const res = await userInstance.get(
      !onSearch ? `/v1/company` : `/v1/company?searchKeyword=${searchValue}`,
    );
    // console.log(`getCompanyList 결과값`, res);
    return res;
  };

  const {
    isLoading,
    data: companyListData,
    refetch: companyListRefetch,
  } = useQuery({
    queryKey: ['get-companyList'],
    queryFn: getCompanyList,
    meta: {
      errorMessage: 'get-companyList 에러 메세지',
    },
  });

  useEffect(() => {
    if (companyListData) {
      setCompanyList(companyListData.data.data.list);
    }
  }, [companyListData]);

  // 검색 기능 함수
  const filterSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Backspace') {
      setSearchValue('');
      companyListRefetch();
      //공란일때 선택된 리스트, 상세정보 초기화
      setIdxValue('1');
      setSelectedIdxValue('1');
    }
  };

  // 검색값에 따른 리스트 불러오기
  useEffect(() => {
    companyListRefetch();
    setOnSearch(true);
  }, [searchValue]);

  // 기업 상세 정보 불러오기 api
  const getCompanyInfo = async () => {
    if (idxValue === null) {
      return null;
    } else {
      const res = await userInstance.get(`/v1/company/${idxValue}`);
      // console.log(`getWorkbook 결과값`, res);
      return res;
    }
  };

  const {
    //isLoading,
    data: companyInfoData,
    refetch: companyInfoRefetch,
  } = useQuery({
    queryKey: ['get-companyInfo'],
    queryFn: getCompanyInfo,
    meta: {
      errorMessage: 'get-companyInfo 에러 메세지',
    },
  });
  //다른 기업 클릭했을때 정보 불러오기
  useEffect(() => {
    companyInfoRefetch();
  }, [idxValue]);

  // 주소 검색 기능 함수
  const filterAddressSearchValue = () => {
    companyListRefetch();
  };

  const filterAddressSearchValueEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // if (event.key === 'Enter') {
    //   companyListRefetch();
    // }
    if (event.key === 'Backspace') {
      setSearchValue('');
      companyListRefetch();
    }
  };

  //기업 상세 정보 받아 온 후 상태관리 저장
  useEffect(() => {
    if (companyInfoData) {
      setNameValue(companyInfoData?.data.data.companyRecord.name);
      setCodeValue(companyInfoData?.data.data.companyRecord.companyCode);
      setLanguageValue(companyInfoData?.data.data.companyRecord.languageCode);
      setCorporateIdentifierValue(
        companyInfoData?.data.data.companyRecord.corporateIdentifier,
      );
      setRepresentativeNameValue(
        companyInfoData?.data.data.companyRecord.representativeName,
      );
      setRepresentativePhoneNumberValue(
        companyInfoData?.data.data.companyRecord.representativePhoneNumber,
      );
      setBusinessRegistrationNumberValue(
        companyInfoData?.data.data.companyRecord.businessRegistrationNumber,
      );
      setPhoneNumberValue(companyInfoData?.data.data.companyRecord.phoneNumber);
      setAddress1Value(companyInfoData?.data.data.companyRecord.address1);
      setAddress2Value(companyInfoData?.data.data.companyRecord.address2);
      setEmailValue(companyInfoData?.data.data.companyRecord.email);
      setLargeItemValue(companyInfoData?.data.data.companyRecord.largeItem);
      setDetailItemValue(companyInfoData?.data.data.companyRecord.detailItem);
    }
  }, [companyInfoData]);

  // 기업 표준 산업 대분류 목록 불러오기 api
  const getCompanyIndustry = async () => {
    const res = await userInstance.get('/v1/company/industry');
    //console.log(`getIndustry 결과값`, res);
    return res;
  };

  const {
    //isLoading,
    data: companyIndustryData,
    refetch: companyIndustryRefetch,
  } = useQuery({
    queryKey: ['get-companyIndustry'],
    queryFn: getCompanyIndustry,
    meta: {
      errorMessage: 'get-companyIndustry 에러 메세지',
    },
  });

  useEffect(() => {
    setIndustryList(companyIndustryData?.data.data.largeItemList);
  }, [companyIndustryData]);

  // 기업 표준 산업 소분류 목록 불러오기 api
  const getCompanyIndustryCode = async () => {
    if (largeItemCodeValue === '') {
      return null;
    } else {
      const res = await userInstance.get(
        `/v1/company/industry/${largeItemCodeValue}`,
      );
      //console.log(`getIndustryCode 결과값`, res);
      return res;
    }
  };

  const {
    //isLoading,
    data: companyIndustryCodeData,
    refetch: companyIndustryCodeRefetch,
  } = useQuery({
    queryKey: ['get-companyIndustryCode'],
    queryFn: getCompanyIndustryCode,
    meta: {
      errorMessage: 'get-companyIndustryCode 에러 메세지',
    },
  });

  useEffect(() => {
    companyIndustryCodeRefetch();
  }, [largeItemCodeValue]);

  useEffect(() => {
    setIndustryDetailList(companyIndustryCodeData?.data.data.detailedInfoList);
  }, [companyIndustryCodeData]);

  //계정 리스트 불러오기 api
  const getCompanyAccount = async () => {
    const res = await userInstance.get(
      `/v1/account?pageIndex=${page}&pageUnit=${6}&searchCondition=${idxValue}`,
    );
    //console.log(`getAccount 결과값`, res);
    return res;
  };

  const {
    //isLoading,
    data: companyAccountData,
    refetch: companyAccountRefetch,
  } = useQuery({
    queryKey: ['get-companyAccount'],
    queryFn: getCompanyAccount,
    meta: {
      errorMessage: 'get-companyAccount 에러 메세지',
    },
    enabled: !idxValue && idxValue !== null,
  });

  useEffect(() => {
    if (idxValue) {
      companyAccountRefetch();
    }
  }, [idxValue, page]);
  useEffect(() => {
    if (companyAccountData) {
      setCompanyAccountList(companyAccountData?.data.data.list);
    }
  }, [companyAccountData]);

  /* 아이디 만들기 모달 열기 */
  const openCreateModal = () => {
    //모달 열릴시 체크리스트 초기화
    openModal({
      title: '',
      content: (
        <RegisterModal
          // memberList={totalMemberList}
          refetch={companyListRefetch}
        />
      ),
    });
  };

  //접근 메뉴 리스트 불러오기 api
  const getAccessMenu = async () => {
    const res = await userInstance.get(`/v1/company/access`);
    //console.log(`getAccessMenu 결과값`, res);
    return res;
  };

  const {
    //isLoading,
    data: companyAccessMenuData,
    refetch: companyAccessMenuRefetch,
  } = useQuery({
    queryKey: ['get-companyAccessMenu'],
    queryFn: getAccessMenu,
    meta: {
      errorMessage: 'get-companyAccessMenu 에러 메세지',
    },
    //enabled: !idxValue,
  });

  useEffect(() => {
    if (companyAccessMenuData)
      setAccessMenuList(companyAccessMenuData?.data.data.accessMenuList);
  }, [companyAccessMenuData]);

  //초기화
  useEffect(() => {
    if (idxValue === null) {
      setNameValue('');
      setLanguageValue('');
      setCorporateIdentifierValue('');
      setRepresentativeNameValue('');
      setRepresentativePhoneNumberValue('');
      setBusinessRegistrationNumberValue('');
      setPhoneNumberValue('');
      setAddress1Value('');
      setAddress2Value('');
      setEmailValue('');
      setLargeItemValue('');
      setDetailItemValue('');
    }
  }, [idxValue]);

  //기업 생성/ 수정 api
  const postNewCompany = async () => {
    //생성일 때
    if (idxValue === null) {
      const data: any = {
        name: nameValue,
        languageCode: 'KO',
        corporateIdentifier: corporateIdentifierValue,
        representativeName: representativeNameValue,
        representativePhoneNumber: representativePhoneNumberValue,
        businessRegistrationNumber: businessRegistrationNumberValue,
        address1: address1Value,
        address2: address2Value,
        phoneNumber: phoneNumberValue,
        email: emailValue,
        largeItemCode: largeItemCodeValue,
        detailItemCode: detailItemCodeValue,
      };
      //서버로 생성 요청
      return await userInstance.post(`/v1/company`, data);
    } else {
      //수정일 때
      const data: any = {
        idx: idxValue,
        name: nameValue,
        representativeName: representativeNameValue,
        representativePhoneNumber: representativePhoneNumberValue,
        businessRegistrationNumber: businessRegistrationNumberValue,
        address1: address1Value,
        address2: address2Value,
        phoneNumber: phoneNumberValue,
        email: emailValue,
        largeItemCode: largeItemCodeValue,
        detailItemCode: detailItemCodeValue,
      };
      //서버로 생성 요청
      return await userInstance.put(`/v1/company`, data);
    }
  };

  const { mutate: postNewCompanyData } = useMutation({
    mutationFn: postNewCompany,
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
      //성공 시 리스트 리패치
      companyListRefetch();
      //저장 알람
      openToastifyAlert({
        type: 'success',
        text: '저장되었습니다.',
      });
      //내용초기화
      setNameValue('');
      setLanguageValue('');
      setCorporateIdentifierValue('');
      setRepresentativeNameValue('');
      setRepresentativePhoneNumberValue('');
      setBusinessRegistrationNumberValue('');
      setPhoneNumberValue('');
      setAddress1Value('');
      setAddress2Value('');
      setEmailValue('');
      setLargeItemCodeValue('');
      setLargeItemValue('');
      setDetailItemCodeValue('');
      setDetailItemValue('');
      setIdxValue('1'); //응답받은 기업 idx값
      setSelectedIdxValue('1'); //리스트 idx값
    },
  });

  //기업 생성
  const submitCreateCompany = () => {
    //기업명, 기업 식별자, 대표자명
    // !languageValue || 언어코드 빠진상황
    if (!nameValue || !corporateIdentifierValue || !representativeNameValue) {
      openToastifyAlert({
        type: 'error',
        text: '필수 항목을 선택해 주세요.',
      });
    } else {
      postNewCompanyData();
    }
  };

  //기업 수정
  const submitEditCompany = () => {
    //기업명, 대표자명
    if (!nameValue || !representativeNameValue) {
      openToastifyAlert({
        type: 'error',
        text: '필수 항목을 선택해 주세요.',
      });
    } else {
      postNewCompanyData();
    }
  };

  //기업 삭제
  const [isDeleteCompany, setIsDeleteCompany] = useState(false);
  const clickDeleteCompany = () => {
    setIsDeleteCompany(true);
  };

  const deleteCompany = async () => {
    const res = await userInstance.delete(`/v1/company/${idxValue}`);
    // console.log(`기업 삭제 결과값`, res);
    return res.data;
  };

  const { mutate: deleteItemMutate } = useMutation({
    mutationFn: deleteCompany,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
    },
    onSuccess: (response: { data: { message: string } }) => {
      setIsDeleteCompany(false);
      openToastifyAlert({
        type: 'success',
        text: '삭제 되었습니다.',
      });
      companyListRefetch();
    },
  });

  const activateToggle = () => {
    setIsActivate(!isActivate);
  };

  const renderCompanyInputFields = () => {
    return (
      <InputContainer>
        <InputWrapper>
          <Label
            value={'기업명*'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Input
            width="500px"
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="기업명을 입력해주세요"
            borderradius="5px"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            maxLength={20}
          />
        </InputWrapper>
        {idxValue !== null && (
          <InputWrapper>
            <Label
              value={'기업코드'}
              width="110px"
              bold
              fontSize="14px"
              padding="10px 10px 10px 0"
              flexEnd
            />
            <Input
              width="500px"
              height="35px"
              padding="10px"
              border="normal"
              placeholderSize="14px"
              fontSize="14px"
              type="text"
              borderradius="5px"
              value={codeValue}
              disabled
            />
          </InputWrapper>
        )}

        <InputWrapper>
          <Label
            value={idxValue !== null ? '언어코드' : '언어코드*'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Select
            width="240px"
            height="35px"
            defaultValue={languageValue || '한국어(KO)'}
            key="한국어(KO)"
            isnormalizedOptions
            //options={SelectDummy.languageList}
            setSelectedValue={setLanguageValue}
            disabled={idxValue !== null}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value={idxValue !== null ? '기업 식별자' : '기업 식별자*'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Input
            width="500px"
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="계정을 구분할 수 있는 식별자를 입력해주세요"
            borderradius="5px"
            value={corporateIdentifierValue}
            onChange={(e) => setCorporateIdentifierValue(e.target.value)}
            maxLength={20}
            disabled={idxValue !== null}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value={'대표자명*'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Input
            width="500px"
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="대표자명을 입력해주세요"
            borderradius="5px"
            value={representativeNameValue}
            onChange={(e) => setRepresentativeNameValue(e.target.value)}
            maxLength={20}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value={'대표자 연락처'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Input
            width="500px"
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="010-0000-0000"
            borderradius="5px"
            value={representativePhoneNumberValue}
            onChange={(e) => setRepresentativePhoneNumberValue(e.target.value)}
            maxLength={20}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value={'사업자번호'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Input
            width="500px"
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="123-45-67890"
            borderradius="5px"
            value={businessRegistrationNumberValue}
            onChange={(e) => setBusinessRegistrationNumberValue(e.target.value)}
            maxLength={20}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value={'담당자 연락처'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Input
            width="500px"
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="010-0000-0000"
            borderradius="5px"
            value={phoneNumberValue}
            onChange={(e) => setPhoneNumberValue(e.target.value)}
            maxLength={20}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value={'주소'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />

          <Search
            value={searchValue} // 수정해야함
            width="240px"
            height="35px"
            onClick={() => filterAddressSearchValue()}
            onKeyDown={(e) => {
              filterAddressSearchValueEnter(e);
            }}
            onChange={(e) => {
              setAddress1Value(e.target.value);
            }}
            placeholder="주소 검색"
          />
          <Input
            width="240px"
            height="35px"
            padding="10px"
            margin="0 0 0 10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="상세 주소"
            borderradius="5px"
            value={address2Value}
            onChange={(e) => setAddress2Value(e.target.value)}
            maxLength={20}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value={'이메일'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Input
            width="500px"
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="user@email.com"
            borderradius="5px"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            maxLength={20}
          />
        </InputWrapper>
        <InputWrapper>
          <Label
            value={'업종'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Select
            width="240px"
            height="35px"
            defaultValue={largeItemValue || '업태'}
            key="업태"
            isnormalizedOptions
            options={industryList}
            setSelectedCode={setLargeItemCodeValue}
            setSelectedValue={setLargeItemValue}
            heightScroll={'200px'}
            $positionTop
          />
          <Select
            width="240px"
            height="35px"
            margin="0 0 0 10px"
            defaultValue={detailItemValue || '종목'}
            key="종목"
            isnormalizedOptions
            options={industryDetailList}
            setSelectedCode={setDetailItemCodeValue}
            setSelectedValue={setDetailItemValue}
            heightScroll={'200px'}
            $positionTop
          />
        </InputWrapper>
      </InputContainer>
    );
  };

  const renderAccountInputFields = () => {
    return (
      <>
        <List margin={`10px 0`}>
          {companyAccountList.map((account) => (
            <ListItem
              isChecked={false}
              height="80px"
              $padding="10px"
              key={`${account.name} - ${account.id}`}
            >
              <ItemLayout>
                <div>
                  <span className="title">
                    {account.name}({account.id})
                    <span className="tag">{account.authorityName}</span>
                  </span>
                  {isActivate ? (
                    <span className="iconWrapper">
                      <span className="title">활성화</span>
                      <BiToggleRight
                        style={{
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fill: `${COLOR.PRIMARY}`,
                        }}
                        onClick={activateToggle}
                      ></BiToggleRight>
                    </span>
                  ) : (
                    <span className="iconWrapperDeactivated">
                      <span className="title">비활성화</span>
                      <BiToggleRight
                        style={{
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fill: `${COLOR.FONT_GRAY}`,
                        }}
                        onClick={activateToggle}
                      ></BiToggleRight>
                    </span>
                  )}
                </div>
              </ItemLayout>
            </ListItem>
          ))}
        </List>
        <PaginationBox
          itemsCountPerPage={companyAccountData?.data.data.pagination.pageUnit}
          totalItemsCount={companyAccountData?.data.data.pagination.totalCount}
        />
      </>
    );
  };

  const accessMenuSettingModal = () => {
    return (
      <ModalOverlay>
        <ModalContainer>
          <ModalTitleWrapper>
            <div>접근 메뉴 설정</div>
            <div>x</div>
          </ModalTitleWrapper>
          <ModalBodyWrapper>
            <ModalBody>
              <ModalCheckboxWrapper>
                <input type="checkbox"></input>
                <Label value={'콘텐츠 제작'} />
              </ModalCheckboxWrapper>
              {accessMenuList.slice(0, 2).map((menu) => (
                <ModalCheckboxWrapper
                  className="padding"
                  key={`${menu.menuCode} - ${menu.menuName}`}
                >
                  <input type="checkbox" checked={menu.isUse}></input>
                  <Label value={menu.menuName} />
                </ModalCheckboxWrapper>
              ))}
              <ModalCheckboxWrapper>
                <input type="checkbox"></input>
                <Label value={'콘텐츠 관리'} />
              </ModalCheckboxWrapper>
              {accessMenuList.slice(2, 5).map((menu) => (
                <ModalCheckboxWrapper
                  className="padding"
                  key={`${menu.menuCode} - ${menu.menuName}`}
                >
                  <input type="checkbox"></input>
                  <Label value={menu.menuName} />
                </ModalCheckboxWrapper>
              ))}
              <ModalCheckboxWrapper>
                <input type="checkbox"></input>
                <Label value={'운영 관리'} />
              </ModalCheckboxWrapper>
              {accessMenuList.slice(5, 12).map((menu) => (
                <ModalCheckboxWrapper
                  className="padding"
                  key={`${menu.menuCode} - ${menu.menuName}`}
                >
                  <input type="checkbox"></input>
                  <Label value={menu.menuName} />
                </ModalCheckboxWrapper>
              ))}
              <ModalCheckboxWrapper>
                <input type="checkbox"></input>
                <Label value={'메뉴 관리'} />
              </ModalCheckboxWrapper>
              {accessMenuList.slice(12, 14).map((menu) => (
                <ModalCheckboxWrapper
                  className="padding"
                  key={`${menu.menuCode} - ${menu.menuName}`}
                >
                  <input type="checkbox"></input>
                  <Label value={menu.menuName} />
                </ModalCheckboxWrapper>
              ))}
            </ModalBody>
          </ModalBodyWrapper>
        </ModalContainer>
      </ModalOverlay>
    );
  };

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>기업 관리</Title>
        </TitleWrapper>
        <MainWrapper>
          <SettingWrapper>
            <div>
              <Label value={'기업 리스트'} width="100%" bold fontSize="20px" />
              <PageDescription>
                그룹을 선택하여 기업을 관리할 수 있습니다.
              </PageDescription>
              <Search
                value={searchValue}
                width={'100%'}
                height="40px"
                onKeyDown={(e) => {
                  filterSearchValueEnter(e);
                }}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setOnSearch(true);
                }}
                placeholder="검색어를 입력해주세요."
              />
              <ContentListWrapper>
                {companyList?.map((company, i) => {
                  const isSelected = selectedIdxValue === (1 + i).toString();
                  return (
                    <ContentList key={`${company.idx} -${company.name}`}>
                      <Content
                        onClick={() => {
                          setSelectedIdxValue((1 + i).toString());
                          setIdxValue(company.idx);
                        }}
                        $isSelected={isSelected}
                      >
                        <div className={'title'}>
                          {company.name}({company.accountCount})
                        </div>
                      </Content>
                    </ContentList>
                  );
                })}
                {idxValue === null && (
                  <Content $isSelected={true}>
                    <div className={'title'}>
                      {nameValue || '기업명을 입력해주세요'}
                    </div>
                  </Content>
                )}
              </ContentListWrapper>
            </div>
          </SettingWrapper>
          <ListWrapper>
            <TabWrapper>
              <TabMenu
                length={2}
                menu={menuList}
                width={'450px'}
                lineStyle
                selected={tabVeiw}
                setTabVeiw={setTabVeiw}
                onClickTab={changeTab}
              />
              {idxValue !== null && tabVeiw === '기업 관리' && (
                <Button
                  buttonType="button"
                  onClick={() => {
                    setIdxValue(null);
                  }}
                  $padding="10px"
                  height={'34px'}
                  width={'100px'}
                  fontSize="14px"
                  $filled
                  cursor
                >
                  <span>+기업 추가</span>
                </Button>
              )}
              {tabVeiw === '계정 관리' && (
                <TabButtonWrapper>
                  <Button
                    buttonType="button"
                    onClick={() => {}}
                    $padding="10px"
                    height={'34px'}
                    width={'140px'}
                    fontSize="14px"
                    $normal
                    cursor
                  >
                    <span>접근 메뉴 설정</span>
                  </Button>
                  <Button
                    buttonType="button"
                    onClick={openCreateModal}
                    $padding="10px"
                    height={'34px'}
                    width={'140px'}
                    fontSize="14px"
                    $filled
                    cursor
                  >
                    <span>아이디 만들기</span>
                  </Button>
                </TabButtonWrapper>
              )}
            </TabWrapper>
            {tabVeiw === '기업 관리' && <>{renderCompanyInputFields()}</>}
            {tabVeiw === '기업 관리' && (
              <ButtonWrapper>
                <Button
                  buttonType="button"
                  onClick={() => {
                    if (idxValue !== null) {
                      submitEditCompany();
                    } else {
                      submitCreateCompany();
                    }
                  }}
                  $padding="10px"
                  height={'35px'}
                  width={'120px'}
                  fontSize="13px"
                  $filled
                  cursor
                >
                  <span>저장</span>
                </Button>
                {idxValue === null ? (
                  <Button
                    buttonType="button"
                    onClick={() => {
                      setIdxValue('1');
                    }}
                    $padding="10px"
                    height={'35px'}
                    width={'120px'}
                    fontSize="13px"
                    $normal
                    cursor
                  >
                    <span>취소</span>
                  </Button>
                ) : (
                  <Button
                    buttonType="button"
                    onClick={() => {
                      clickDeleteCompany();
                    }}
                    $padding="10px"
                    height={'35px'}
                    width={'120px'}
                    fontSize="13px"
                    $normal
                    cursor
                  >
                    <span>삭제</span>
                  </Button>
                )}
              </ButtonWrapper>
            )}
            {tabVeiw === '계정 관리' && <>{renderAccountInputFields()}</>}
            {tabVeiw === '계정 관리' && <>{accessMenuSettingModal()}</>}
          </ListWrapper>
          {isDeleteCompany && (
            <Alert
              description="기업 삭제하시겠습니까?"
              subDescription="기업을 삭제하시면, 소속된 계정의 시스템 접근이 제한될 수 있습니다."
              isAlertOpen={isDeleteCompany}
              action="삭제"
              onClose={() => setIsDeleteCompany(false)}
              onClick={() => deleteItemMutate()}
            ></Alert>
          )}
        </MainWrapper>
      </Wrapper>
      <Modal />
    </Container>
  );
}

const ModalContainer = styled.div`
  width: 400px;
  height: 800px;
  background-color: white;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;
const ModalTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 18px;
  font-weight: 800;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
`;
const ModalBodyWrapper = styled.div`
  width: 370px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  margin-top: 20px;
  margin-left: 15px;
`;
const ModalBody = styled.div`
  width: 340px;
  height: 570px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding-left: 100px;

  .padding {
    padding-left: 25px;
  }
`;
const ModalCheckboxWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const ModalButtonWrapper = styled.div``;

const Container = styled.div`
  padding: 40px;
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
const MainWrapper = styled.div`
  width: 100%;
  min-height: 700px;
  display: flex;
  gap: 10px;
`;
const SettingWrapper = styled.div`
  width: 40%;
  border: 1px solid ${COLOR.BORDER_POPUP};
  border-radius: 15px;
  padding: 10px;
`;
const PageDescription = styled.p`
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  font-weight: bold;
  padding-bottom: 10px;
`;
const ContentListWrapper = styled.div`
  max-height: 530px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤바 표시 */
`;
const ContentList = styled.li`
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  border-left: 1px solid ${COLOR.BORDER_GRAY};
  border-right: 1px solid ${COLOR.BORDER_GRAY};
  &:first-child {
    margin-top: 10px;
  }
  &:last-child {
    border-bottom: 1px solid ${COLOR.BORDER_GRAY};
  }
`;
const Content = styled.div<{ $isSelected: boolean }>`
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  //gap: 10px;
  padding: 10px 0;
  ${({ $isSelected }) =>
    $isSelected
      ? `color: ${COLOR.PRIMARY}; border: 1px solid ${COLOR.PRIMARY};`
      : 'none'};

  .title {
    display: flex;
    justify-content: center;
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
  .btn_title {
    padding-right: 5px;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  border-radius: 15px;
  padding: 10px;
  border: 1px solid ${COLOR.BORDER_POPUP};
`;
const TabWrapper = styled.div`
  width: 100%;
  padding: 10px 0px 20px 0;
  display: flex;
  justify-content: space-between;
`;
const TabButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  gap: 10px;
`;
const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ItemLayout = styled.span`
  width: 100%;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-weight: 600;
    margin-bottom: 2px;
    font-size: 16px;
  }
  .tag {
    padding: 0 10px;
    font-weight: 600;
    color: ${COLOR.FONT_GRAY};
    font-size: 16px;
  }
  .iconWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: ${COLOR.PRIMARY};
  }
  .iconWrapperDeactivated {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: ${COLOR.FONT_GRAY};
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  gap: 10px;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
