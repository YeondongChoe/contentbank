import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { BiToggleRight, BiSolidTrashAlt } from 'react-icons/bi';
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
import { getUserListTotal } from '../../api/user';
import { DoubleSelect } from '../../components/molecules/doubleSelect';
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
  const [idxValue, setIdxValue] = useState<string>('1');
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
  //기업 식별자 중복확인 통과
  const [isDuplicateCorporateIdentifier, setIsDuplicateCorporateIdentifier] =
    useState(false);
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
  const [daumaddressValue, setDaumAddressValue] = useState('');
  //주소2 상세주소
  const [detailaddressValue, setDetailAddressValue] = useState('');
  //이메일
  const [emailValue, setEmailValue] = useState('');
  //업종업태(대분류)
  const [largeItemValue, setLargeItemValue] = useState('');
  //업종업태(대분류) code값
  const [largeItemCodeValue, setLargeItemCodeValue] = useState<string | null>(
    null,
  );
  //업종종목(소분류)
  const [detailItemValue, setDetailItemValue] = useState('');
  //업종종목(소분류) code값
  const [detailItemCodeValue, setDetailItemCodeValue] = useState<string | null>(
    null,
  );
  //표준 산업 대분류 리스트
  const [industryList, setIndustryList] = useState([]);
  //표준 산업 소분류 리스트
  const [industryDetailList, setIndustryDetailList] = useState([]);
  //계정 리스트
  const [companyAccountList, setCompanyAccountList] = useState<
    companyAccountListProps[]
  >([]);
  const [totalCount, setTotalCount] = useState<number>(1);
  //접근 메뉴 팝업 여기
  const [isModalOpen, setIsModalOpen] = useState(false);
  //접근 메뉴 리스트
  const [accessMenuList, setAccessMenuList] = useState<accessMenuListProps[]>(
    [],
  );
  //제작 체크박스
  const [createAllChecked, setCreateAllChecked] = useState(false);
  //관리 체크박스
  const [manageAllChecked, setManageAllChecked] = useState(false);
  //운영 체크박스
  const [operateAllChecked, setOperateAllChecked] = useState(false);
  //메뉴 체크박스
  const [menuAllChecked, setMenuAllChecked] = useState(false);

  //접근 메뉴 설정
  // useEffect를 사용하여 accessMenuList의 제작 상태 값이 변경될 때마다 검사
  useEffect(() => {
    // 'QE', 'WE'에 해당하는 항목 중 하나라도 체크되지 않은 것이 있는지 확인
    const allChecked = accessMenuList
      .filter((menu) => ['QE', 'WE'].includes(menu.menuCode)) // 'QE', 'WE'만 검사
      .every((menu) => menu.isUse); // 모두 true이면 true, 아니면 false

    setCreateAllChecked(allChecked);
  }, [accessMenuList]);

  // useEffect를 사용하여 accessMenuList의 관리 상태 값이 변경될 때마다 검사
  useEffect(() => {
    // 'QM', 'RM', 'IM'에 해당하는 항목 중 하나라도 체크되지 않은 것이 있는지 확인
    const allChecked = accessMenuList
      .filter((menu) => ['QM', 'RM', 'IM'].includes(menu.menuCode)) // 'QE', 'WE'만 검사
      .every((menu) => menu.isUse); // 모두 true이면 true, 아니면 false

    setManageAllChecked(allChecked);
  }, [accessMenuList]);

  // useEffect를 사용하여 accessMenuList의 운영 상태 값이 변경될 때마다 검사
  useEffect(() => {
    // 'PSM', 'COM', 'MIM', 'LOM', 'STM'에 해당하는 항목 중 하나라도 체크되지 않은 것이 있는지 확인
    const allChecked = accessMenuList
      .filter((menu) =>
        ['PSM', 'COM', 'MIM', 'LOM', 'STM'].includes(menu.menuCode),
      ) // 'QE', 'WE'만 검사
      .every((menu) => menu.isUse); // 모두 true이면 true, 아니면 false

    setOperateAllChecked(allChecked);
  }, [accessMenuList]);

  // useEffect를 사용하여 accessMenuList의 메뉴 상태 값이 변경될 때마다 검사
  useEffect(() => {
    // 'CCC', 'CMC'에 해당하는 항목 중 하나라도 체크되지 않은 것이 있는지 확인
    const allChecked = accessMenuList
      .filter((menu) => ['CCC', 'CMC'].includes(menu.menuCode)) // 'QE', 'WE'만 검사
      .every((menu) => menu.isUse); // 모두 true이면 true, 아니면 false

    setMenuAllChecked(allChecked);
  }, [accessMenuList]);

  //모달 오픈 함수
  const isModalOpenClick = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  // 기업 리스트 불러오기 api
  const getCompanyList = async () => {
    const res = await userInstance.get(
      !onSearch ? `/v1/company` : `/v1/company?searchKeyword=${searchValue}`,
    );
    //console.log(`getCompanyList 결과값`, res);
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
    if (idxValue === '') {
      return null;
    } else {
      const res = await userInstance.get(`/v1/company/${idxValue}`);
      // console.log(`getWorkbook 결과값`, res);
      return res;
    }
  };

  const { data: companyInfoData, refetch: companyInfoRefetch } = useQuery({
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

  // 다음 주소 검색 API 호출
  const openDaumPostcode = () => {
    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        // data 타입도 any로 명시
        const fullAddress = data.address;
        setDaumAddressValue(fullAddress);
      },
    }).open();
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
      setDaumAddressValue(companyInfoData?.data.data.companyRecord.address1);
      setDetailAddressValue(companyInfoData?.data.data.companyRecord.address2);
      setEmailValue(companyInfoData?.data.data.companyRecord.email);
      setLargeItemValue(companyInfoData?.data.data.companyRecord.largeItem);
      setLargeItemCodeValue(
        companyInfoData?.data.data.companyRecord.largeItemCode,
      );
      setDetailItemValue(companyInfoData?.data.data.companyRecord.detailItem);
      setDetailItemCodeValue(
        companyInfoData?.data.data.companyRecord.detailItemCode,
      );
    }
  }, [companyInfoData]);

  // 기업 표준 산업 대분류 목록 불러오기 api
  const getCompanyIndustry = async () => {
    const res = await userInstance.get('/v1/company/industry');
    //console.log(`getIndustry 결과값`, res);
    return res;
  };

  const { data: companyIndustryData, refetch: companyIndustryRefetch } =
    useQuery({
      queryKey: ['get-companyIndustry'],
      queryFn: getCompanyIndustry,
      meta: {
        errorMessage: 'get-companyIndustry 에러 메세지',
      },
    });

  useEffect(() => {
    setIndustryList(companyIndustryData?.data.data.largeItemList);
    //값이 바꼇을때 업태 리스트 초기화
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

  const { data: companyIndustryCodeData, refetch: companyIndustryCodeRefetch } =
    useQuery({
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

  const { data: companyAccountData, refetch: companyAccountRefetch } = useQuery(
    {
      queryKey: ['get-companyAccount'],
      queryFn: getCompanyAccount,
      meta: {
        errorMessage: 'get-companyAccount 에러 메세지',
      },
      enabled: !idxValue && idxValue !== '',
    },
  );

  useEffect(() => {
    if (companyAccountData) {
      setCompanyAccountList(companyAccountData?.data.data.list);
      //계정 리스트 불러올때마다 토탈카운트 변경
      setTotalCount(companyAccountData?.data.data.pagination?.totalCount);
    }
  }, [companyAccountData]);

  //기업 변경될때마다 or 페이지 변경마다 계정리스트 재호출
  useEffect(() => {
    if (idxValue) {
      companyAccountRefetch();
    }
  }, [idxValue, page]);

  useEffect(() => {
    companyListRefetch();
  }, [companyAccountRefetch()]);

  // 아이디 중복 확인 && 토탈 유저 수
  const { data: totalData, refetch: totalDataRefetch } = useQuery({
    queryKey: ['get-memberlist-total'],
    queryFn: () => getUserListTotal({ totalCount, idxValue }),
    meta: {
      errorMessage: 'get-memberlist 에러 메세지',
    },
    enabled: !!companyAccountData,
  });

  //기업 변경될때마다 기업의 보유 계정 수가 변경되며 그때마다 토탈 계정 정보 api 재호출
  useEffect(() => {
    if (totalCount) totalDataRefetch();
  }, [totalCount]);

  /* 아이디 만들기 모달 열기 */
  const openCreateModal = () => {
    //모달 열릴시 체크리스트 초기화
    openModal({
      title: '',
      content: (
        <RegisterModal
          memberList={totalData?.data.data.list}
          refetch={companyAccountRefetch}
          companyIdx={idxValue}
          companyCode={codeValue}
          companyName={nameValue}
          companyCorporateIdentifier={corporateIdentifierValue}
        />
      ),
    });
  };

  //접근 메뉴 리스트 불러오기 api
  const getAccessMenu = async () => {
    const res = await userInstance.get(`/v1/company/access/${codeValue}`);
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
    enabled: codeValue !== '',
  });

  useEffect(() => {
    if (codeValue !== undefined) companyAccessMenuRefetch();
  }, [codeValue]);

  useEffect(() => {
    if (companyAccessMenuData)
      setAccessMenuList(companyAccessMenuData?.data.data.accessMenuList);
  }, [companyAccessMenuData]);

  const accessMenuCheckChange = (menuCode: string) => {
    // accessMenuList 복사본을 생성한 후 상태 업데이트
    const updatedList = accessMenuList.map((menu) =>
      menu.menuCode === menuCode ? { ...menu, isUse: !menu.isUse } : menu,
    );
    setAccessMenuList(updatedList); // 상태 업데이트
  };

  // 콘텐츠 제작 체크박스 클릭 시 호출되는 핸들러
  const createAllClick = () => {
    const newCheckedState = !createAllChecked;
    setCreateAllChecked(newCheckedState);

    // 특정 menuCode들만 업데이트
    const updatedList = accessMenuList.map((menu) => {
      // 원하는 menuCode에 대해서만 isUse 값을 변경
      if (['QE', 'WE'].includes(menu.menuCode)) {
        return { ...menu, isUse: newCheckedState };
      }
      return menu; // 나머지는 변경하지 않음
    });
    setAccessMenuList(updatedList);
  };

  // 콘텐츠 관리 체크박스 클릭 시 호출되는 핸들러
  const manageAllClick = () => {
    const newCheckedState = !manageAllChecked;
    setManageAllChecked(newCheckedState);

    // 특정 menuCode들만 업데이트
    const updatedList = accessMenuList.map((menu) => {
      // 원하는 menuCode에 대해서만 isUse 값을 변경
      if (['QM', 'RM', 'IM'].includes(menu.menuCode)) {
        return { ...menu, isUse: newCheckedState };
      }
      return menu; // 나머지는 변경하지 않음
    });
    setAccessMenuList(updatedList);
  };

  // 운영 관리 체크박스 클릭 시 호출되는 핸들러
  const operateAllClick = () => {
    const newCheckedState = !operateAllChecked;
    setOperateAllChecked(newCheckedState);

    // 특정 menuCode들만 업데이트
    const updatedList = accessMenuList.map((menu) => {
      // 원하는 menuCode에 대해서만 isUse 값을 변경
      if (['PSM', 'COM', 'MIM', 'LOM', 'STM'].includes(menu.menuCode)) {
        return { ...menu, isUse: newCheckedState };
      }
      return menu; // 나머지는 변경하지 않음
    });
    setAccessMenuList(updatedList);
  };

  // 메뉴 관리 체크박스 클릭 시 호출되는 핸들러
  const menuAllClick = () => {
    const newCheckedState = !menuAllChecked;
    setMenuAllChecked(newCheckedState);

    // 특정 menuCode들만 업데이트
    const updatedList = accessMenuList.map((menu) => {
      // 원하는 menuCode에 대해서만 isUse 값을 변경
      if (['CCC', 'CMC'].includes(menu.menuCode)) {
        return { ...menu, isUse: newCheckedState };
      }
      return menu; // 나머지는 변경하지 않음
    });
    setAccessMenuList(updatedList);
  };

  //초기화
  useEffect(() => {
    if (idxValue === '') {
      setNameValue('');
      setLanguageValue('');
      setCorporateIdentifierValue('');
      setRepresentativeNameValue('');
      setRepresentativePhoneNumberValue('');
      setBusinessRegistrationNumberValue('');
      setPhoneNumberValue('');
      setDaumAddressValue('');
      setDetailAddressValue('');
      setEmailValue('');
      setLargeItemValue('');
      setDetailItemValue('');
    }
  }, [idxValue]);

  //기업 생성/ 수정 api
  const postNewCompany = async () => {
    //생성일 때
    if (idxValue === '') {
      const data: any = {
        name: nameValue,
        languageCode: 'KO',
        corporateIdentifier: corporateIdentifierValue,
        representativeName: representativeNameValue,
        representativePhoneNumber: representativePhoneNumberValue,
        businessRegistrationNumber: businessRegistrationNumberValue,
        address1: daumaddressValue,
        address2: detailaddressValue,
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
        address1: daumaddressValue,
        address2: detailaddressValue,
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
      setDaumAddressValue('');
      setDetailAddressValue('');
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
    //기업명, 기업 식별자, 식별자 중복확인, 대표자명
    // !languageValue || 언어코드 빠진상황
    if (
      !nameValue ||
      !corporateIdentifierValue ||
      isDuplicateCorporateIdentifier === false ||
      !representativeNameValue
    ) {
      if (
        nameValue &&
        corporateIdentifierValue &&
        representativeNameValue &&
        isDuplicateCorporateIdentifier === false
      ) {
        openToastifyAlert({
          type: 'error',
          text: '기업 식별자 중복확인 해주세요.',
        });
      } else {
        openToastifyAlert({
          type: 'error',
          text: '필수 항목을 선택해 주세요.',
        });
      }
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

  //기업 중복 확인 api
  const postCompanyCheck = async () => {
    const data: any = {
      corporateIdentifier: corporateIdentifierValue,
    };
    //서버로 생성 요청
    return await userInstance.post(`/v1/company/check`, data);
  };

  const { mutate: postCompanyCheckData } = useMutation({
    mutationFn: postCompanyCheck,
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
      if (response.data.data.isDuplicate === true) {
        openToastifyAlert({
          type: 'error',
          text: '사용하실 수 없는 식별자 입니다.',
        });
        //중복확인 실패
        setIsDuplicateCorporateIdentifier(false);
      } else {
        openToastifyAlert({
          type: 'success',
          text: '사용하실 수 있는 식별자 입니다.',
        });
        //중복확인 성공
        setIsDuplicateCorporateIdentifier(true);
      }
    },
  });

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
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response: { data: { message: string } }) => {
      setIsDeleteCompany(false);
      openToastifyAlert({
        type: 'success',
        text: '삭제 되었습니다.',
      });
      companyListRefetch();
      setIdxValue('');
      setSelectedIdxValue('');
    },
  });
  //계정 활성화 비활성화
  const patchChangeAccount = async (isUse: boolean, idxList: number[]) => {
    const data = {
      //값을 바꾸기 위해 기존과 반대값으로 전달
      isUse: !isUse,
      idxList: idxList,
    };

    return await userInstance.patch(`/v1/account/change-use`, data);
  };

  const { mutate: patchChangeAcconut } = useMutation({
    mutationFn: ({ isUse, idxList }: { isUse: boolean; idxList: number[] }) =>
      patchChangeAccount(isUse, idxList),
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
      openToastifyAlert({
        type: 'success',
        text: '변경 되었습니다.',
      });
      companyAccountRefetch();
    },
  });

  const toggleChangeAccount = (isUse: boolean, idx: number) => {
    patchChangeAcconut({ isUse, idxList: [idx] });
  };

  //접근 메뉴 업데이트 api
  const putAccessMenu = async () => {
    //서버로 생성 요청
    const data = { companyCode: codeValue, accessMenuList: accessMenuList };
    return await userInstance.put(`/v1/company/access`, data);
  };

  const { mutate: putAccessMenuData } = useMutation({
    mutationFn: putAccessMenu,
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
      setIsModalOpen(false);
    },
  });

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
        {idxValue !== '' && (
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
            value={idxValue !== '' ? '언어코드' : '언어코드*'}
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
            disabled={idxValue !== ''}
          />
        </InputWrapper>
        {idxValue === '' && (
          <Discription>*언어코드는 최초 설정 후 변경이 불가합니다.</Discription>
        )}
        <InputWrapper>
          <Label
            value={idxValue !== '' ? '기업 식별자' : '기업 식별자*'}
            width="110px"
            bold
            fontSize="14px"
            padding="10px 10px 10px 0"
            flexEnd
          />
          <Input
            width={idxValue !== '' ? '500px' : '370px'}
            height="35px"
            padding="10px"
            border="normal"
            placeholderSize="14px"
            fontSize="14px"
            type="text"
            placeholder="계정을 구분할 수 있는 식별자를 입력해주세요"
            borderradius="5px"
            value={corporateIdentifierValue}
            onChange={(e) => {
              setCorporateIdentifierValue(e.target.value);
              setIsDuplicateCorporateIdentifier(false);
            }}
            maxLength={20}
            disabled={idxValue !== ''}
          />
          {idxValue === '' && (
            <Button
              buttonType="button"
              onClick={() => postCompanyCheckData()}
              $padding="10px"
              height={'35px'}
              width={'120px'}
              fontSize="13px"
              $filled
              cursor
              disabled={!corporateIdentifierValue}
            >
              <span>중복확인</span>
            </Button>
          )}
        </InputWrapper>
        {idxValue === '' && (
          <Discription>
            *해당 기업 계정임을 구분할 수 있는 식별자를 입력힙니다. 예)dr
            입력시, 해당 기업 계정언 `dr-`를 계정 앞에 부여합니다.
          </Discription>
        )}
        {idxValue === '' && (
          <Discription>
            *기업 식별자는 최초 설정 후 변경이 불가합니다.
          </Discription>
        )}
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
            value={daumaddressValue} // 수정해야함
            width="240px"
            height="35px"
            onClick={openDaumPostcode}
            onKeyDown={() => {}}
            onChange={(e) => {
              setDaumAddressValue(e.target.value);
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
            value={detailaddressValue}
            onChange={(e) => setDetailAddressValue(e.target.value)}
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
          <DoubleSelect
            industryList={industryList}
            industryDetailList={industryDetailList}
            industryValue={largeItemValue}
            detailVaule={detailItemValue}
            industryCoadValue={setLargeItemCodeValue}
            detailCoadValue={setDetailItemCodeValue}
          ></DoubleSelect>
        </InputWrapper>
      </InputContainer>
    );
  };

  const renderAccountInputFields = () => {
    return (
      <>
        {idxValue !== '' ? (
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
                      {account.isUse ? (
                        <span className="iconWrapper">
                          <span className="title">활성화</span>
                          <BiToggleRight
                            style={{
                              width: '24px',
                              height: '24px',
                              cursor: 'pointer',
                              fill: `${COLOR.PRIMARY}`,
                            }}
                            onClick={() =>
                              toggleChangeAccount(account.isUse, account.idx)
                            }
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
                            onClick={() =>
                              toggleChangeAccount(account.isUse, account.idx)
                            }
                          ></BiToggleRight>
                        </span>
                      )}
                    </div>
                  </ItemLayout>
                </ListItem>
              ))}
            </List>
            <PaginationBox
              itemsCountPerPage={
                companyAccountData?.data.data.pagination.pageUnit
              }
              totalItemsCount={
                companyAccountData?.data.data.pagination.totalCount
              }
            />
          </>
        ) : (
          <Blank>기업을 선택해주세요</Blank>
        )}
      </>
    );
  };

  const accessMenuSettingModal = () => {
    return (
      <ModalOverlay>
        <ModalContainer>
          <ModalTitleWrapper>
            <div>접근 메뉴 설정</div>
            <div onClick={isModalOpenClick} style={{ cursor: 'pointer' }}>
              x
            </div>
          </ModalTitleWrapper>
          <ModalBodyWrapper>
            <ModalBody>
              <ModalCheckboxWrapper>
                <input
                  type="checkbox"
                  checked={createAllChecked}
                  onChange={createAllClick}
                ></input>
                <Label value={'콘텐츠 제작'} />
              </ModalCheckboxWrapper>
              {accessMenuList
                .filter(
                  (menu) => menu.menuCode === 'QE' || menu.menuCode === 'WE',
                )
                .map((menu) => (
                  <ModalCheckboxWrapper
                    className="padding"
                    key={`${menu.menuCode}-${menu.menuName}`}
                  >
                    <input
                      type="checkbox"
                      checked={menu.isUse}
                      onChange={() => accessMenuCheckChange(menu.menuCode)}
                    />
                    <Label value={menu.menuName} />
                  </ModalCheckboxWrapper>
                ))}
              <ModalCheckboxWrapper>
                <input
                  type="checkbox"
                  checked={manageAllChecked}
                  onChange={manageAllClick}
                ></input>
                <Label value={'콘텐츠 관리'} />
              </ModalCheckboxWrapper>
              {accessMenuList
                .filter(
                  (menu) =>
                    menu.menuCode === 'QM' ||
                    menu.menuCode === 'RM' ||
                    menu.menuCode === 'IM',
                )
                .map((menu) => (
                  <ModalCheckboxWrapper
                    className="padding"
                    key={`${menu.menuCode}-${menu.menuName}`}
                  >
                    <input
                      type="checkbox"
                      checked={menu.isUse}
                      onChange={() => accessMenuCheckChange(menu.menuCode)}
                    />
                    <Label value={menu.menuName} />
                  </ModalCheckboxWrapper>
                ))}
              <ModalCheckboxWrapper>
                <input
                  type="checkbox"
                  checked={operateAllChecked}
                  onChange={operateAllClick}
                ></input>
                <Label value={'운영 관리'} />
              </ModalCheckboxWrapper>
              {accessMenuList
                .filter(
                  (menu) =>
                    menu.menuCode === 'AM' ||
                    menu.menuCode === 'PM' ||
                    menu.menuCode === 'PSM' ||
                    menu.menuCode === 'MIM' ||
                    menu.menuCode === 'LOM' ||
                    menu.menuCode === 'STM',
                )
                .map((menu) => (
                  <ModalCheckboxWrapper
                    className="padding"
                    key={`${menu.menuCode}-${menu.menuName}`}
                    $disable={menu.isLock}
                  >
                    <input
                      type="checkbox"
                      checked={menu.isUse}
                      onChange={() => accessMenuCheckChange(menu.menuCode)}
                    />
                    <Label value={menu.menuName} />
                  </ModalCheckboxWrapper>
                ))}
              <ModalCheckboxWrapper>
                <input
                  type="checkbox"
                  checked={menuAllChecked}
                  onChange={menuAllClick}
                ></input>
                <Label value={'메뉴 관리'} />
              </ModalCheckboxWrapper>
              {accessMenuList
                .filter(
                  (menu) => menu.menuCode === 'CCC' || menu.menuCode === 'CMC',
                )
                .map((menu) => (
                  <ModalCheckboxWrapper
                    className="padding"
                    key={`${menu.menuCode}-${menu.menuName}`}
                  >
                    <input
                      type="checkbox"
                      checked={menu.isUse}
                      onChange={() => accessMenuCheckChange(menu.menuCode)}
                    />
                    <Label value={menu.menuName} />
                  </ModalCheckboxWrapper>
                ))}
            </ModalBody>
          </ModalBodyWrapper>
          <ModalButtonWrapper>
            <Button
              buttonType="button"
              onClick={isModalOpenClick}
              $padding="10px"
              height={'34px'}
              width={'100px'}
              fontSize="14px"
              cursor
            >
              <span>취소</span>
            </Button>
            <Button
              buttonType="button"
              onClick={() => putAccessMenuData()}
              $padding="10px"
              height={'34px'}
              width={'100px'}
              fontSize="14px"
              $filled
              cursor
            >
              <span>저장</span>
            </Button>
          </ModalButtonWrapper>
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
              <Label value={'기업 리스트'} width="100%" bold fontSize="16px" />
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
                {companyList
                  ?.slice()
                  .sort((a, b) => a.idx - b.idx)
                  .map((company, i) => {
                    const isSelected = selectedIdxValue === (1 + i).toString();
                    return (
                      <CompanyList key={`${company.idx} -${company.name}`}>
                        <ContentList>
                          <Content
                            onClick={() => {
                              setSelectedIdxValue((1 + i).toString());
                              setIdxValue(company.idx);
                              setCodeValue(company.companyCode);
                            }}
                            $isSelected={isSelected}
                          >
                            <div className="title">
                              {company.name}({company.accountCount})
                            </div>
                          </Content>
                        </ContentList>
                        <DeleteIconWrapper>
                          <BiSolidTrashAlt
                            onClick={() => {
                              clickDeleteCompany();
                              //삭제할 카테고리 idx값 관리
                              setIdxValue(company.idx);
                              setSelectedIdxValue((1 + i).toString());
                            }}
                          />
                        </DeleteIconWrapper>
                      </CompanyList>
                    );
                  })}
                {idxValue === '' && (
                  <Content className="add" $isSelected={true}>
                    <div className="title">
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
              {idxValue !== '' && tabVeiw === '기업 관리' && (
                <Button
                  buttonType="button"
                  onClick={() => {
                    setIdxValue('');
                    setSelectedIdxValue('');
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
                    onClick={isModalOpenClick}
                    $padding="10px"
                    height={'34px'}
                    width={'140px'}
                    fontSize="14px"
                    $normal
                    cursor
                    disabled={!idxValue}
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
                    disabled={!idxValue}
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
                    if (idxValue !== '') {
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
                {idxValue === '' && (
                  <Button
                    buttonType="button"
                    onClick={() => {
                      setIdxValue('1');
                    }}
                    $padding="10px"
                    height={'35px'}
                    width={'120px'}
                    fontSize="13px"
                    cursor
                  >
                    <span>취소</span>
                  </Button>
                )}
              </ButtonWrapper>
            )}
            {tabVeiw === '계정 관리' && <>{renderAccountInputFields()}</>}
            {tabVeiw === '계정 관리' && isModalOpen && (
              <>{accessMenuSettingModal()}</>
            )}
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
  //padding-left: 50px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
const MainWrapper = styled.div`
  width: 100%;
  min-height: 700px;
  display: flex;
  gap: 20px;
`;
const SettingWrapper = styled.div`
  min-width: 430px;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;
const PageDescription = styled.p`
  font-size: 12px;
  color: ${COLOR.FONT_GRAY};
  font-weight: 400;
  padding-bottom: 10px;
`;
const ContentListWrapper = styled.div`
  max-height: 530px; /* 컨테이너의 최대 높이 설정 */
  overflow-y: auto; /* 수직 스크롤바 표시 */
  margin-top: 10px;
`;
const CompanyList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ContentList = styled.li`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-right: 8px;
`;
const Content = styled.div<{ $isSelected: boolean }>`
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  ${({ $isSelected }) =>
    $isSelected
      ? `color: ${COLOR.PRIMARY}; border: 1px solid ${COLOR.PRIMARY};`
      : 'none'};
  background-color: ${({ className }) =>
    className === 'add' ? 'white' : 'inherit'};
  border-radius: 5px;

  .title {
    display: flex;
    justify-content: center;
  }

  &:hover {
    background-color: ${COLOR.SELECT_BLUE};
    color: white;
    border-radius: 5px;
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
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  //width: 100%;
  padding: 10px;
  background-color: ${COLOR.LIGHT_GRAY};
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
  height: 640px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Discription = styled.p`
  padding-left: 120px;
  color: ${COLOR.FONT_GRAY};
  font-size: 12px;
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
const Blank = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  padding-top: 10px;
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
const ModalContainer = styled.div`
  width: 400px;
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
  height: 620px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  margin-top: 20px;
  margin-left: 15px;
`;
const ModalBody = styled.div`
  width: 340px;
  height: 590px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  padding-left: 100px;

  .padding {
    padding-left: 25px;
  }
`;
const ModalCheckboxWrapper = styled.div<{ $disable?: boolean }>`
  display: flex;
  gap: 10px;
  ${({ $disable }) => $disable === true && `opacity : 0.5;`}
`;
const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  padding: 10px 12px;
`;
