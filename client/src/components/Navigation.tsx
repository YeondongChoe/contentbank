import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { FaRegBuilding } from 'react-icons/fa';
import { GiProcessor } from 'react-icons/gi';
import { GoCodescanCheckmark } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuSiren } from 'react-icons/lu';
import {
  MdManageHistory,
  MdOutlineMedicalInformation,
  MdAccountBalance,
} from 'react-icons/md';
import { VscGraph } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { userInstance } from '../api/axios';
import { useJwtDecode } from '../hooks/useJwtDecode';
import {
  pageAtom,
  openNaviationBoolAtom,
  pageIndexAtom,
} from '../store/utilAtom';
import { accessMenuListProps } from '../types';
import { getAuthorityCookie } from '../utils/cookies';
import { postRefreshToken } from '../utils/tokenHandler';

import { Label } from './atom';
import { COLOR } from './constants';

export function Navigation() {
  const token = getAuthorityCookie('accessToken');
  const companyCode = getAuthorityCookie('companyCode');
  const setPage = useSetRecoilState(pageAtom);
  const decodingInfo = useJwtDecode(token);
  const isOpenNavigation = useRecoilValue(openNaviationBoolAtom);
  const setpageIndexValue = useSetRecoilState(pageIndexAtom);
  const navigate = useNavigate();
  //기업코드
  const [codeValue, setCodeValue] = useState<string | null>(null);
  //접근 메뉴 리스트
  const [accessMenuList, setAccessMenuList] = useState<accessMenuListProps[]>(
    [],
  );

  //전역변수에 저장된 기업코드 가져오기
  useEffect(() => {
    setCodeValue(companyCode);
  }, []);

  //접근 메뉴 리스트 불러오기 api
  const getAccessMenu = async () => {
    try {
      if (codeValue !== null) {
        const res = await userInstance.get(`/v1/company/access/${codeValue}`);
        return res;
      } else {
        console.log('기업코드가 없습니다');
      }
    } catch (error: any) {
      if (error.data?.code === 'GE-002') {
        // 토큰 만료 에러 코드 확인 후 토큰 갱신
        console.log('error', error);
        await postRefreshToken();
        // 토큰 갱신 후 다시 API 호출
        const retryRes = await userInstance.get(
          `/v1/company/access/${codeValue}`,
        );
        return retryRes;
      } else {
        console.log('메뉴 리프레시토큰 요청 못함');
        throw error; // 다른 에러는 그대로 throw
      }
    }
  };
  // const getAccessMenu = async () => {
  //   const res = await userInstance.get(`/v1/company/access/${codeValue}`);
  //   console.log(`getAccessMenu 결과값`, res);
  //   return res;
  // };

  const { data: companyAccessMenuData, refetch: companyAccessMenuRefetch } =
    useQuery({
      queryKey: ['get-companyAccessMenu', codeValue],
      queryFn: getAccessMenu,
      meta: {
        errorMessage: 'get-companyAccessMenu 에러 메세지',
      },
    });

  // useEffect(() => {
  //   if (codeValue !== null) companyAccessMenuRefetch();
  //   console.log('리페치작동');
  // }, []);

  useEffect(() => {
    if (companyAccessMenuData) {
      setAccessMenuList(companyAccessMenuData?.data.data.accessMenuList);
    }
  }, [companyAccessMenuData]);

  const moveMainpage = () => {
    navigate('/content-create/quiz');
    setpageIndexValue(['콘텐츠 제작', '문항 제작']);
  };

  const clickLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const depth1Value =
      e.currentTarget.parentElement?.children[0].children[0].children[0];
    const depth2Value = e.currentTarget.children[0].children[1];
    if (depth1Value)
      setpageIndexValue([depth1Value.innerHTML, depth2Value.innerHTML]);
    //네비게이션 클릭할때마다 페이지 네이션 초기화
    setPage(1);
  };

  return (
    <>
      {isOpenNavigation ? (
        <Container>
          <IconWrapper onClick={moveMainpage}>
            <MdAccountBalance
              style={{
                width: '50px',
                height: '50px',
                color: 'white',
                cursor: 'pointer',
              }}
            />
          </IconWrapper>
          <NavigationMenuWrapper>
            <NavigationMenu>
              <strong>
                <Label type="navi" value={'콘텐츠 제작'}></Label>
              </strong>

              {/* 문항 제작 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'QE')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.QE?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-create/quiz'}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7V1H3V7H9ZM10 7C10 7.55 9.55 8 9 8H3C2.45 8 2 7.55 2 7V1C2 0.45 2.45 0 3 0H9C9.55 0 10 0.45 10 1V7ZM7 9V10H1C0.45 10 0 9.55 0 9V2.5H1V9H7ZM6.1 1.5C5.65 1.5 5.3 1.6 5.05 1.8C4.8 2 4.65 2.3 4.65 2.7H5.6C5.6 2.55 5.65 2.45 5.75 2.35C5.85 2.3 5.95 2.25 6.1 2.25C6.25 2.25 6.4 2.3 6.5 2.4C6.6 2.5 6.65 2.6 6.65 2.8C6.65 2.95 6.6 3.1 6.55 3.2C6.5 3.3 6.35 3.4 6.25 3.5C6 3.65 5.8 3.8 5.75 3.95C5.55 4.05 5.5 4.25 5.5 4.5H6.5C6.5 4.35 6.5 4.2 6.55 4.15C6.6 4.05 6.7 3.95 6.8 3.9C7 3.8 7.2 3.65 7.35 3.45C7.5 3.2 7.6 3 7.6 2.75C7.6 2.35 7.45 2.05 7.2 1.85C6.95 1.6 6.55 1.5 6.1 1.5ZM5.5 5V6H6.5V5H5.5Z"
                            fill="white"
                          />
                        </svg>
                        <span>문항 제작</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7V1H3V7H9ZM10 7C10 7.55 9.55 8 9 8H3C2.45 8 2 7.55 2 7V1C2 0.45 2.45 0 3 0H9C9.55 0 10 0.45 10 1V7ZM7 9V10H1C0.45 10 0 9.55 0 9V2.5H1V9H7ZM6.1 1.5C5.65 1.5 5.3 1.6 5.05 1.8C4.8 2 4.65 2.3 4.65 2.7H5.6C5.6 2.55 5.65 2.45 5.75 2.35C5.85 2.3 5.95 2.25 6.1 2.25C6.25 2.25 6.4 2.3 6.5 2.4C6.6 2.5 6.65 2.6 6.65 2.8C6.65 2.95 6.6 3.1 6.55 3.2C6.5 3.3 6.35 3.4 6.25 3.5C6 3.65 5.8 3.8 5.75 3.95C5.55 4.05 5.5 4.25 5.5 4.5H6.5C6.5 4.35 6.5 4.2 6.55 4.15C6.6 4.05 6.7 3.95 6.8 3.9C7 3.8 7.2 3.65 7.35 3.45C7.5 3.2 7.6 3 7.6 2.75C7.6 2.35 7.45 2.05 7.2 1.85C6.95 1.6 6.55 1.5 6.1 1.5ZM5.5 5V6H6.5V5H5.5Z"
                            fill="white"
                          />
                        </svg>
                        <span>문항 제작</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 학습지 제작 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'WE')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.WE?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-create/exam'}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.875 5.12001L6 2.38501L1.125 5.12001L6 7.85501L10.875 5.12001Z"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.065 6.13512V7.89512L6 9.61512L2.935 7.89512V6.13512M10.875 8.75512V5.12012"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>학습지</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.875 5.12001L6 2.38501L1.125 5.12001L6 7.85501L10.875 5.12001Z"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.065 6.13512V7.89512L6 9.61512L2.935 7.89512V6.13512M10.875 8.75512V5.12012"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>학습지</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}
            </NavigationMenu>
            <NavigationMenu>
              <strong>
                <Label type="navi" value={'콘텐츠 관리'}></Label>
              </strong>

              {/* 문항 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'QM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.QM?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/quiz'}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7V1H3V7H9ZM10 7C10 7.55 9.55 8 9 8H3C2.45 8 2 7.55 2 7V1C2 0.45 2.45 0 3 0H9C9.55 0 10 0.45 10 1V7ZM7 9V10H1C0.45 10 0 9.55 0 9V2.5H1V9H7Z"
                            fill="white"
                          />
                          <g clipPath="url(#clip0_242_1571)">
                            <path
                              d="M5.54168 5.66658L5.47501 5.13325C5.4389 5.11936 5.4049 5.1027 5.37301 5.08325C5.34112 5.06381 5.30985 5.04297 5.27918 5.02075L4.78335 5.22909L4.32501 4.43742L4.75418 4.11242C4.7514 4.09297 4.75001 4.07425 4.75001 4.05625V3.94375C4.75001 3.92564 4.7514 3.90686 4.75418 3.88742L4.32501 3.56242L4.78335 2.77075L5.27918 2.97909C5.30973 2.95686 5.34168 2.93603 5.37501 2.91659C5.40835 2.89714 5.44168 2.88047 5.47501 2.86659L5.54168 2.33325H6.45835L6.52501 2.86659C6.56112 2.88047 6.59518 2.89714 6.62718 2.91659C6.65918 2.93603 6.6904 2.95686 6.72085 2.97909L7.21668 2.77075L7.67501 3.56242L7.24585 3.88742C7.24862 3.90686 7.25001 3.92564 7.25001 3.94375V4.05609C7.25001 4.0742 7.24723 4.09297 7.24168 4.11242L7.67085 4.43742L7.21251 5.22909L6.72085 5.02075C6.69029 5.04297 6.65835 5.06381 6.62501 5.08325C6.59168 5.1027 6.55835 5.11936 6.52501 5.13325L6.45835 5.66658H5.54168ZM6.00835 4.58325C6.16946 4.58325 6.30696 4.52631 6.42085 4.41242C6.53473 4.29853 6.59168 4.16103 6.59168 3.99992C6.59168 3.83881 6.53473 3.70131 6.42085 3.58742C6.30696 3.47353 6.16946 3.41659 6.00835 3.41659C5.84446 3.41659 5.70623 3.47353 5.59368 3.58742C5.48112 3.70131 5.4249 3.83881 5.42501 3.99992C5.42501 4.16103 5.48129 4.29853 5.59385 4.41242C5.7064 4.52631 5.84457 4.58325 6.00835 4.58325Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_242_1571">
                              <rect
                                width="4"
                                height="4"
                                fill="white"
                                transform="translate(4 2)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>문항 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7V1H3V7H9ZM10 7C10 7.55 9.55 8 9 8H3C2.45 8 2 7.55 2 7V1C2 0.45 2.45 0 3 0H9C9.55 0 10 0.45 10 1V7ZM7 9V10H1C0.45 10 0 9.55 0 9V2.5H1V9H7Z"
                            fill="white"
                          />
                          <g clipPath="url(#clip0_242_1571)">
                            <path
                              d="M5.54168 5.66658L5.47501 5.13325C5.4389 5.11936 5.4049 5.1027 5.37301 5.08325C5.34112 5.06381 5.30985 5.04297 5.27918 5.02075L4.78335 5.22909L4.32501 4.43742L4.75418 4.11242C4.7514 4.09297 4.75001 4.07425 4.75001 4.05625V3.94375C4.75001 3.92564 4.7514 3.90686 4.75418 3.88742L4.32501 3.56242L4.78335 2.77075L5.27918 2.97909C5.30973 2.95686 5.34168 2.93603 5.37501 2.91659C5.40835 2.89714 5.44168 2.88047 5.47501 2.86659L5.54168 2.33325H6.45835L6.52501 2.86659C6.56112 2.88047 6.59518 2.89714 6.62718 2.91659C6.65918 2.93603 6.6904 2.95686 6.72085 2.97909L7.21668 2.77075L7.67501 3.56242L7.24585 3.88742C7.24862 3.90686 7.25001 3.92564 7.25001 3.94375V4.05609C7.25001 4.0742 7.24723 4.09297 7.24168 4.11242L7.67085 4.43742L7.21251 5.22909L6.72085 5.02075C6.69029 5.04297 6.65835 5.06381 6.62501 5.08325C6.59168 5.1027 6.55835 5.11936 6.52501 5.13325L6.45835 5.66658H5.54168ZM6.00835 4.58325C6.16946 4.58325 6.30696 4.52631 6.42085 4.41242C6.53473 4.29853 6.59168 4.16103 6.59168 3.99992C6.59168 3.83881 6.53473 3.70131 6.42085 3.58742C6.30696 3.47353 6.16946 3.41659 6.00835 3.41659C5.84446 3.41659 5.70623 3.47353 5.59368 3.58742C5.48112 3.70131 5.4249 3.83881 5.42501 3.99992C5.42501 4.16103 5.48129 4.29853 5.59385 4.41242C5.7064 4.52631 5.84457 4.58325 6.00835 4.58325Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_242_1571">
                              <rect
                                width="4"
                                height="4"
                                fill="white"
                                transform="translate(4 2)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>문항 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 신고 문항 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'RM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.RM?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/report'}>
                        <LuSiren
                          style={{ width: '20px', height: '20px' }}
                        ></LuSiren>
                        <span>신고 문항</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <LuSiren
                          style={{ width: '20px', height: '20px' }}
                        ></LuSiren>
                        <span>신고 문항</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 검수 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'IM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.IM?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/inspection'}>
                        <GoCodescanCheckmark
                          style={{ width: '20px', height: '20px' }}
                        ></GoCodescanCheckmark>
                        <span>검수 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <GoCodescanCheckmark
                          style={{ width: '20px', height: '20px' }}
                        ></GoCodescanCheckmark>
                        <span>검수 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}
            </NavigationMenu>
            <NavigationMenu>
              <strong>
                <Label type="navi" value={'운영 관리'}></Label>
              </strong>

              {/* 기업 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'COM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.COM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/operation-manage/company'}>
                        <FaRegBuilding
                          style={{ width: '18px', height: '18px' }}
                        ></FaRegBuilding>
                        <span>기업 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <FaRegBuilding
                          style={{ width: '18px', height: '18px' }}
                        ></FaRegBuilding>
                        <span>기업 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 회원관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'AM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.AM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/operation-manage/member'}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 0C1.7625 0 0.75 1 0.75 2.22222C0.75 2.96296 1.125 3.62963 1.6875 4C0.675 4.51852 0 5.51852 0 6.66667H0.75C0.75 5.44444 1.7625 4.44444 3 4.44444C4.2375 4.44444 5.25 5.44444 5.25 6.66667H6C6 5.48148 6.975 4.48148 8.175 4.44444H8.25C9.1875 4.44444 9.975 3.88889 10.3125 3.11111C10.3125 3.11111 10.3125 3.07407 10.35 3.07407C10.3875 3.03704 10.3875 2.96296 10.3875 2.92593C10.3875 2.88889 10.3875 2.88889 10.425 2.85185C10.425 2.81481 10.4625 2.74074 10.4625 2.7037C10.4625 2.66667 10.4625 2.62963 10.5 2.59259C10.5 2.55556 10.5 2.51852 10.5375 2.48148V2.25926C10.5375 1.03704 9.525 0.037037 8.2875 0.037037C7.05 0.037037 6.0375 1.03704 6.0375 2.25926C6.0375 3 6.4125 3.66667 6.975 4.03704C6.4125 4.2963 5.9625 4.74074 5.6625 5.25926C5.3625 4.74074 4.9125 4.2963 4.35 4.03704C4.875 3.62963 5.25 2.96296 5.25 2.22222C5.25 1 4.2375 0 3 0ZM3 0.740741C3.825 0.740741 4.5 1.40741 4.5 2.22222C4.5 3.03704 3.825 3.7037 3 3.7037C2.175 3.7037 1.5 3.03704 1.5 2.22222C1.5 1.40741 2.175 0.740741 3 0.740741ZM8.25 0.740741C9.075 0.740741 9.75 1.40741 9.75 2.22222C9.75 3.03704 9.075 3.7037 8.25 3.7037C7.425 3.7037 6.75 3.03704 6.75 2.22222C6.75 1.40741 7.425 0.740741 8.25 0.740741ZM9.0375 4.81481V5.59259C8.8125 5.62963 8.5875 5.74074 8.4 5.85185L7.8375 5.2963L7.3125 5.81482L7.875 6.37037C7.725 6.55556 7.65 6.77778 7.6125 7.03704H6.75V7.77778H7.5375C7.575 8 7.6875 8.22222 7.8 8.44444L7.2375 9L7.7625 9.51852L8.325 8.96296C8.5125 9.07407 8.7375 9.18518 8.9625 9.22222V10H9.7125V9.22222C9.9375 9.18518 10.1625 9.07407 10.35 8.96296L10.9125 9.51852L11.4375 9L10.875 8.44444C11.025 8.25926 11.1 8.03704 11.1375 7.77778H12V7.03704H11.2125C11.175 6.81481 11.0625 6.59259 10.95 6.37037L11.5125 5.81482L10.9875 5.2963L10.425 5.85185C10.2375 5.74074 10.0125 5.62963 9.7875 5.59259V4.81481H9.0375ZM9.375 6.2963C10.0125 6.2963 10.5 6.77778 10.5 7.40741C10.5 8.03704 10.0125 8.51852 9.375 8.51852C8.7375 8.51852 8.25 8.03704 8.25 7.40741C8.25 6.77778 8.7375 6.2963 9.375 6.2963ZM9.375 7.03704C9.32732 7.03762 9.28035 7.04849 9.23738 7.06889C9.19275 7.08984 9.15215 7.11829 9.11737 7.15296C9.08227 7.1873 9.05346 7.22741 9.03225 7.27148C9.01159 7.31393 9.00059 7.36032 9 7.40741C9 7.4537 9.01163 7.5 9.03225 7.54333C9.05288 7.58667 9.08212 7.62741 9.11737 7.66185C9.15225 7.69667 9.1935 7.72555 9.23738 7.74593C9.28035 7.76633 9.32732 7.7772 9.375 7.77778C9.5625 7.77778 9.75 7.59259 9.75 7.40741C9.75 7.22222 9.5625 7.03704 9.375 7.03704Z"
                            fill="white"
                          />
                        </svg>
                        <span>회원 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 0C1.7625 0 0.75 1 0.75 2.22222C0.75 2.96296 1.125 3.62963 1.6875 4C0.675 4.51852 0 5.51852 0 6.66667H0.75C0.75 5.44444 1.7625 4.44444 3 4.44444C4.2375 4.44444 5.25 5.44444 5.25 6.66667H6C6 5.48148 6.975 4.48148 8.175 4.44444H8.25C9.1875 4.44444 9.975 3.88889 10.3125 3.11111C10.3125 3.11111 10.3125 3.07407 10.35 3.07407C10.3875 3.03704 10.3875 2.96296 10.3875 2.92593C10.3875 2.88889 10.3875 2.88889 10.425 2.85185C10.425 2.81481 10.4625 2.74074 10.4625 2.7037C10.4625 2.66667 10.4625 2.62963 10.5 2.59259C10.5 2.55556 10.5 2.51852 10.5375 2.48148V2.25926C10.5375 1.03704 9.525 0.037037 8.2875 0.037037C7.05 0.037037 6.0375 1.03704 6.0375 2.25926C6.0375 3 6.4125 3.66667 6.975 4.03704C6.4125 4.2963 5.9625 4.74074 5.6625 5.25926C5.3625 4.74074 4.9125 4.2963 4.35 4.03704C4.875 3.62963 5.25 2.96296 5.25 2.22222C5.25 1 4.2375 0 3 0ZM3 0.740741C3.825 0.740741 4.5 1.40741 4.5 2.22222C4.5 3.03704 3.825 3.7037 3 3.7037C2.175 3.7037 1.5 3.03704 1.5 2.22222C1.5 1.40741 2.175 0.740741 3 0.740741ZM8.25 0.740741C9.075 0.740741 9.75 1.40741 9.75 2.22222C9.75 3.03704 9.075 3.7037 8.25 3.7037C7.425 3.7037 6.75 3.03704 6.75 2.22222C6.75 1.40741 7.425 0.740741 8.25 0.740741ZM9.0375 4.81481V5.59259C8.8125 5.62963 8.5875 5.74074 8.4 5.85185L7.8375 5.2963L7.3125 5.81482L7.875 6.37037C7.725 6.55556 7.65 6.77778 7.6125 7.03704H6.75V7.77778H7.5375C7.575 8 7.6875 8.22222 7.8 8.44444L7.2375 9L7.7625 9.51852L8.325 8.96296C8.5125 9.07407 8.7375 9.18518 8.9625 9.22222V10H9.7125V9.22222C9.9375 9.18518 10.1625 9.07407 10.35 8.96296L10.9125 9.51852L11.4375 9L10.875 8.44444C11.025 8.25926 11.1 8.03704 11.1375 7.77778H12V7.03704H11.2125C11.175 6.81481 11.0625 6.59259 10.95 6.37037L11.5125 5.81482L10.9875 5.2963L10.425 5.85185C10.2375 5.74074 10.0125 5.62963 9.7875 5.59259V4.81481H9.0375ZM9.375 6.2963C10.0125 6.2963 10.5 6.77778 10.5 7.40741C10.5 8.03704 10.0125 8.51852 9.375 8.51852C8.7375 8.51852 8.25 8.03704 8.25 7.40741C8.25 6.77778 8.7375 6.2963 9.375 6.2963ZM9.375 7.03704C9.32732 7.03762 9.28035 7.04849 9.23738 7.06889C9.19275 7.08984 9.15215 7.11829 9.11737 7.15296C9.08227 7.1873 9.05346 7.22741 9.03225 7.27148C9.01159 7.31393 9.00059 7.36032 9 7.40741C9 7.4537 9.01163 7.5 9.03225 7.54333C9.05288 7.58667 9.08212 7.62741 9.11737 7.66185C9.15225 7.69667 9.1935 7.72555 9.23738 7.74593C9.28035 7.76633 9.32732 7.7772 9.375 7.77778C9.5625 7.77778 9.75 7.59259 9.75 7.40741C9.75 7.22222 9.5625 7.03704 9.375 7.03704Z"
                            fill="white"
                          />
                        </svg>
                        <span>회원 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 권한관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'PM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.PM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/operation-manage/authority'}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 10 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.5 0.875H1.5C1.26801 0.875232 1.04558 0.967493 0.881537 1.13154C0.717493 1.29558 0.625232 1.51801 0.625 1.75V12.25C0.625232 12.482 0.717493 12.7044 0.881537 12.8685C1.04558 13.0325 1.26801 13.1248 1.5 13.125H8.5C8.73196 13.1247 8.95432 13.0324 9.11834 12.8683C9.28235 12.7043 9.37465 12.482 9.375 12.25V1.75C9.37477 1.51801 9.28251 1.29558 9.11846 1.13154C8.95442 0.967493 8.73199 0.875232 8.5 0.875ZM6.75 12.25H3.25V11.375C3.25 11.259 3.29609 11.1477 3.37814 11.0656C3.46019 10.9836 3.57147 10.9375 3.6875 10.9375H6.3125C6.42853 10.9375 6.53981 10.9836 6.62186 11.0656C6.70391 11.1477 6.75 11.259 6.75 11.375V12.25ZM7.625 12.25V11.375C7.625 11.0269 7.48672 10.6931 7.24058 10.4469C6.99444 10.2008 6.6606 10.0625 6.3125 10.0625H3.6875C3.3394 10.0625 3.00556 10.2008 2.75942 10.4469C2.51328 10.6931 2.375 11.0269 2.375 11.375V12.25H1.5V1.75H8.5V12.25H7.625Z"
                            fill="white"
                          />
                        </svg>
                        <span>권한 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 10 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.5 0.875H1.5C1.26801 0.875232 1.04558 0.967493 0.881537 1.13154C0.717493 1.29558 0.625232 1.51801 0.625 1.75V12.25C0.625232 12.482 0.717493 12.7044 0.881537 12.8685C1.04558 13.0325 1.26801 13.1248 1.5 13.125H8.5C8.73196 13.1247 8.95432 13.0324 9.11834 12.8683C9.28235 12.7043 9.37465 12.482 9.375 12.25V1.75C9.37477 1.51801 9.28251 1.29558 9.11846 1.13154C8.95442 0.967493 8.73199 0.875232 8.5 0.875ZM6.75 12.25H3.25V11.375C3.25 11.259 3.29609 11.1477 3.37814 11.0656C3.46019 10.9836 3.57147 10.9375 3.6875 10.9375H6.3125C6.42853 10.9375 6.53981 10.9836 6.62186 11.0656C6.70391 11.1477 6.75 11.259 6.75 11.375V12.25ZM7.625 12.25V11.375C7.625 11.0269 7.48672 10.6931 7.24058 10.4469C6.99444 10.2008 6.6606 10.0625 6.3125 10.0625H3.6875C3.3394 10.0625 3.00556 10.2008 2.75942 10.4469C2.51328 10.6931 2.375 11.0269 2.375 11.375V12.25H1.5V1.75H8.5V12.25H7.625Z"
                            fill="white"
                          />
                        </svg>
                        <span>권한 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 프로세스 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'PSM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.PSM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/process'}>
                        <GiProcessor
                          style={{ width: '20px', height: '20px' }}
                        ></GiProcessor>
                        <span>프로세스 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <GiProcessor
                          style={{ width: '20px', height: '20px' }}
                        ></GiProcessor>
                        <span>프로세스 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 메타정보 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'MIM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.MIM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/metainfo'}>
                        <MdOutlineMedicalInformation
                          style={{ width: '20px', height: '20px' }}
                        ></MdOutlineMedicalInformation>
                        <span>메타정보 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <MdOutlineMedicalInformation
                          style={{ width: '20px', height: '20px' }}
                        ></MdOutlineMedicalInformation>
                        <span>메타정보 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 로그 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'LOM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.LOM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/preparing'}>
                        <MdManageHistory
                          style={{ width: '20px', height: '20px' }}
                        ></MdManageHistory>
                        <span>로그 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/preparing'}>
                        <MdManageHistory
                          style={{ width: '20px', height: '20px' }}
                        ></MdManageHistory>
                        <span>로그 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 통계 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'STM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.STM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/preparing'}>
                        <VscGraph
                          style={{ width: '18px', height: '18px' }}
                        ></VscGraph>
                        <span>통계 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/preparing'}>
                        <VscGraph
                          style={{ width: '18px', height: '18px' }}
                        ></VscGraph>
                        <span>통계 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 정산 관리 */}
              {/* {accessMenuList.filter((menu) => menu.menuCode === '??')[0]
                ?.isUse ? (
                  <button type="button" onClick={(e) => clickLink(e)}>
                  <Link to={'/preparing'}>
                    <TbReportMoney
                      style={{ width: '20px', height: '20px' }}
                    ></TbReportMoney>
                    <span>정산 관리</span>
                  </Link>
                </button>
              ) : null} */}
            </NavigationMenu>
            <NavigationMenu>
              <strong>
                <Label type="navi" value={'메뉴 관리'}></Label>
              </strong>

              {/* 콘텐츠 제작 설정 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'CCC')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.CCC?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/creatingcontentSetting'}>
                        <IoSettingsOutline
                          style={{ width: '18px', height: '18px' }}
                        ></IoSettingsOutline>
                        <span>콘텐츠 제작 설정</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <IoSettingsOutline
                          style={{ width: '18px', height: '18px' }}
                        ></IoSettingsOutline>
                        <span>콘텐츠 제작 설정</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 콘텐츠 관리 설정 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'CMC')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.CMC?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/managingcontentSetting'}>
                        <IoSettingsOutline
                          style={{ width: '18px', height: '18px' }}
                        ></IoSettingsOutline>
                        <span>콘텐츠 관리 설정</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <IoSettingsOutline
                          style={{ width: '18px', height: '18px' }}
                        ></IoSettingsOutline>
                        <span>콘텐츠 관리 설정</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}
            </NavigationMenu>
          </NavigationMenuWrapper>
        </Container>
      ) : (
        // 테블릿 모바일
        <MiniContainer>
          <MiniNavigationMenuWrapper>
            <MiniNavigationMenu>
              <MdAccountBalance
                style={{
                  width: '20px',
                  height: '20px',
                  marginTop: '40px',
                  cursor: 'pointer',
                }}
                onClick={moveMainpage}
              />
            </MiniNavigationMenu>
            <MiniNavigationMenu>
              <strong>
                <Label value={'콘텐츠 제작'} display></Label>
                <Label type="navi" value={'제작'} margin="20px 0 0 0"></Label>
              </strong>

              {/* 문항 제작 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'QE')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.QE?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-create/quiz'}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7V1H3V7H9ZM10 7C10 7.55 9.55 8 9 8H3C2.45 8 2 7.55 2 7V1C2 0.45 2.45 0 3 0H9C9.55 0 10 0.45 10 1V7ZM7 9V10H1C0.45 10 0 9.55 0 9V2.5H1V9H7ZM6.1 1.5C5.65 1.5 5.3 1.6 5.05 1.8C4.8 2 4.65 2.3 4.65 2.7H5.6C5.6 2.55 5.65 2.45 5.75 2.35C5.85 2.3 5.95 2.25 6.1 2.25C6.25 2.25 6.4 2.3 6.5 2.4C6.6 2.5 6.65 2.6 6.65 2.8C6.65 2.95 6.6 3.1 6.55 3.2C6.5 3.3 6.35 3.4 6.25 3.5C6 3.65 5.8 3.8 5.75 3.95C5.55 4.05 5.5 4.25 5.5 4.5H6.5C6.5 4.35 6.5 4.2 6.55 4.15C6.6 4.05 6.7 3.95 6.8 3.9C7 3.8 7.2 3.65 7.35 3.45C7.5 3.2 7.6 3 7.6 2.75C7.6 2.35 7.45 2.05 7.2 1.85C6.95 1.6 6.55 1.5 6.1 1.5ZM5.5 5V6H6.5V5H5.5Z"
                            fill="white"
                          />
                        </svg>
                        <span style={{ display: 'none' }}>문항 제작</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7V1H3V7H9ZM10 7C10 7.55 9.55 8 9 8H3C2.45 8 2 7.55 2 7V1C2 0.45 2.45 0 3 0H9C9.55 0 10 0.45 10 1V7ZM7 9V10H1C0.45 10 0 9.55 0 9V2.5H1V9H7ZM6.1 1.5C5.65 1.5 5.3 1.6 5.05 1.8C4.8 2 4.65 2.3 4.65 2.7H5.6C5.6 2.55 5.65 2.45 5.75 2.35C5.85 2.3 5.95 2.25 6.1 2.25C6.25 2.25 6.4 2.3 6.5 2.4C6.6 2.5 6.65 2.6 6.65 2.8C6.65 2.95 6.6 3.1 6.55 3.2C6.5 3.3 6.35 3.4 6.25 3.5C6 3.65 5.8 3.8 5.75 3.95C5.55 4.05 5.5 4.25 5.5 4.5H6.5C6.5 4.35 6.5 4.2 6.55 4.15C6.6 4.05 6.7 3.95 6.8 3.9C7 3.8 7.2 3.65 7.35 3.45C7.5 3.2 7.6 3 7.6 2.75C7.6 2.35 7.45 2.05 7.2 1.85C6.95 1.6 6.55 1.5 6.1 1.5ZM5.5 5V6H6.5V5H5.5Z"
                            fill="white"
                          />
                        </svg>
                        <span style={{ display: 'none' }}>문항 제작</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 학습지 제작 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'WE')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.WE?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-create/exam'}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.875 5.12001L6 2.38501L1.125 5.12001L6 7.85501L10.875 5.12001Z"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.065 6.13512V7.89512L6 9.61512L2.935 7.89512V6.13512M10.875 8.75512V5.12012"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span style={{ display: 'none' }}>학습지</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.875 5.12001L6 2.38501L1.125 5.12001L6 7.85501L10.875 5.12001Z"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.065 6.13512V7.89512L6 9.61512L2.935 7.89512V6.13512M10.875 8.75512V5.12012"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span style={{ display: 'none' }}>학습지</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}
            </MiniNavigationMenu>
            <MiniNavigationMenu>
              <strong>
                <Label value={'콘텐츠 관리'} display></Label>
                <Label type="navi" value={'관리'} margin="10px 0 0 0"></Label>
              </strong>

              {/* 문항관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'QM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.QM?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/quiz'}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7V1H3V7H9ZM10 7C10 7.55 9.55 8 9 8H3C2.45 8 2 7.55 2 7V1C2 0.45 2.45 0 3 0H9C9.55 0 10 0.45 10 1V7ZM7 9V10H1C0.45 10 0 9.55 0 9V2.5H1V9H7Z"
                            fill="white"
                          />
                          <g clipPath="url(#clip0_242_1571)">
                            <path
                              d="M5.54168 5.66658L5.47501 5.13325C5.4389 5.11936 5.4049 5.1027 5.37301 5.08325C5.34112 5.06381 5.30985 5.04297 5.27918 5.02075L4.78335 5.22909L4.32501 4.43742L4.75418 4.11242C4.7514 4.09297 4.75001 4.07425 4.75001 4.05625V3.94375C4.75001 3.92564 4.7514 3.90686 4.75418 3.88742L4.32501 3.56242L4.78335 2.77075L5.27918 2.97909C5.30973 2.95686 5.34168 2.93603 5.37501 2.91659C5.40835 2.89714 5.44168 2.88047 5.47501 2.86659L5.54168 2.33325H6.45835L6.52501 2.86659C6.56112 2.88047 6.59518 2.89714 6.62718 2.91659C6.65918 2.93603 6.6904 2.95686 6.72085 2.97909L7.21668 2.77075L7.67501 3.56242L7.24585 3.88742C7.24862 3.90686 7.25001 3.92564 7.25001 3.94375V4.05609C7.25001 4.0742 7.24723 4.09297 7.24168 4.11242L7.67085 4.43742L7.21251 5.22909L6.72085 5.02075C6.69029 5.04297 6.65835 5.06381 6.62501 5.08325C6.59168 5.1027 6.55835 5.11936 6.52501 5.13325L6.45835 5.66658H5.54168ZM6.00835 4.58325C6.16946 4.58325 6.30696 4.52631 6.42085 4.41242C6.53473 4.29853 6.59168 4.16103 6.59168 3.99992C6.59168 3.83881 6.53473 3.70131 6.42085 3.58742C6.30696 3.47353 6.16946 3.41659 6.00835 3.41659C5.84446 3.41659 5.70623 3.47353 5.59368 3.58742C5.48112 3.70131 5.4249 3.83881 5.42501 3.99992C5.42501 4.16103 5.48129 4.29853 5.59385 4.41242C5.7064 4.52631 5.84457 4.58325 6.00835 4.58325Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_242_1571">
                              <rect
                                width="4"
                                height="4"
                                fill="white"
                                transform="translate(4 2)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span style={{ display: 'none' }}>문항 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 7V1H3V7H9ZM10 7C10 7.55 9.55 8 9 8H3C2.45 8 2 7.55 2 7V1C2 0.45 2.45 0 3 0H9C9.55 0 10 0.45 10 1V7ZM7 9V10H1C0.45 10 0 9.55 0 9V2.5H1V9H7Z"
                            fill="white"
                          />
                          <g clipPath="url(#clip0_242_1571)">
                            <path
                              d="M5.54168 5.66658L5.47501 5.13325C5.4389 5.11936 5.4049 5.1027 5.37301 5.08325C5.34112 5.06381 5.30985 5.04297 5.27918 5.02075L4.78335 5.22909L4.32501 4.43742L4.75418 4.11242C4.7514 4.09297 4.75001 4.07425 4.75001 4.05625V3.94375C4.75001 3.92564 4.7514 3.90686 4.75418 3.88742L4.32501 3.56242L4.78335 2.77075L5.27918 2.97909C5.30973 2.95686 5.34168 2.93603 5.37501 2.91659C5.40835 2.89714 5.44168 2.88047 5.47501 2.86659L5.54168 2.33325H6.45835L6.52501 2.86659C6.56112 2.88047 6.59518 2.89714 6.62718 2.91659C6.65918 2.93603 6.6904 2.95686 6.72085 2.97909L7.21668 2.77075L7.67501 3.56242L7.24585 3.88742C7.24862 3.90686 7.25001 3.92564 7.25001 3.94375V4.05609C7.25001 4.0742 7.24723 4.09297 7.24168 4.11242L7.67085 4.43742L7.21251 5.22909L6.72085 5.02075C6.69029 5.04297 6.65835 5.06381 6.62501 5.08325C6.59168 5.1027 6.55835 5.11936 6.52501 5.13325L6.45835 5.66658H5.54168ZM6.00835 4.58325C6.16946 4.58325 6.30696 4.52631 6.42085 4.41242C6.53473 4.29853 6.59168 4.16103 6.59168 3.99992C6.59168 3.83881 6.53473 3.70131 6.42085 3.58742C6.30696 3.47353 6.16946 3.41659 6.00835 3.41659C5.84446 3.41659 5.70623 3.47353 5.59368 3.58742C5.48112 3.70131 5.4249 3.83881 5.42501 3.99992C5.42501 4.16103 5.48129 4.29853 5.59385 4.41242C5.7064 4.52631 5.84457 4.58325 6.00835 4.58325Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_242_1571">
                              <rect
                                width="4"
                                height="4"
                                fill="white"
                                transform="translate(4 2)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span style={{ display: 'none' }}>문항 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 신고문항 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'RM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.RM?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/report'}>
                        <LuSiren
                          style={{
                            width: '20px',
                            height: '20px',
                            stroke: 'white',
                          }}
                        ></LuSiren>
                        <span style={{ display: 'none' }}>신고 문항</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <LuSiren
                          style={{
                            width: '20px',
                            height: '20px',
                            stroke: 'white',
                          }}
                        ></LuSiren>
                        <span style={{ display: 'none' }}>신고 문항</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 검수 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'IM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.IM?.isEdit ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/inspection'}>
                        <GoCodescanCheckmark
                          style={{
                            width: '20px',
                            height: '20px',
                            fill: 'white',
                          }}
                        ></GoCodescanCheckmark>
                        <span style={{ display: 'none' }}>검수 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <GoCodescanCheckmark
                          style={{
                            width: '20px',
                            height: '20px',
                            fill: 'white',
                          }}
                        ></GoCodescanCheckmark>
                        <span style={{ display: 'none' }}>검수 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}
            </MiniNavigationMenu>
            <MiniNavigationMenu>
              <strong>
                <Label value={'운영 관리'} display></Label>
                <Label type="navi" value={'운영'} margin="10px 0 0 0"></Label>
              </strong>

              {/* 기업 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'COM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.COM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/operation-manage/company'}>
                        <FaRegBuilding
                          style={{
                            width: '18px',
                            height: '18px',
                            fill: 'white',
                          }}
                        ></FaRegBuilding>
                        <span style={{ display: 'none' }}>기업 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <FaRegBuilding
                          style={{
                            width: '18px',
                            height: '18px',
                            fill: 'white',
                          }}
                        ></FaRegBuilding>
                        <span style={{ display: 'none' }}>기업 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 회원관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'AM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.AM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/operation-manage/member'}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 0C1.7625 0 0.75 1 0.75 2.22222C0.75 2.96296 1.125 3.62963 1.6875 4C0.675 4.51852 0 5.51852 0 6.66667H0.75C0.75 5.44444 1.7625 4.44444 3 4.44444C4.2375 4.44444 5.25 5.44444 5.25 6.66667H6C6 5.48148 6.975 4.48148 8.175 4.44444H8.25C9.1875 4.44444 9.975 3.88889 10.3125 3.11111C10.3125 3.11111 10.3125 3.07407 10.35 3.07407C10.3875 3.03704 10.3875 2.96296 10.3875 2.92593C10.3875 2.88889 10.3875 2.88889 10.425 2.85185C10.425 2.81481 10.4625 2.74074 10.4625 2.7037C10.4625 2.66667 10.4625 2.62963 10.5 2.59259C10.5 2.55556 10.5 2.51852 10.5375 2.48148V2.25926C10.5375 1.03704 9.525 0.037037 8.2875 0.037037C7.05 0.037037 6.0375 1.03704 6.0375 2.25926C6.0375 3 6.4125 3.66667 6.975 4.03704C6.4125 4.2963 5.9625 4.74074 5.6625 5.25926C5.3625 4.74074 4.9125 4.2963 4.35 4.03704C4.875 3.62963 5.25 2.96296 5.25 2.22222C5.25 1 4.2375 0 3 0ZM3 0.740741C3.825 0.740741 4.5 1.40741 4.5 2.22222C4.5 3.03704 3.825 3.7037 3 3.7037C2.175 3.7037 1.5 3.03704 1.5 2.22222C1.5 1.40741 2.175 0.740741 3 0.740741ZM8.25 0.740741C9.075 0.740741 9.75 1.40741 9.75 2.22222C9.75 3.03704 9.075 3.7037 8.25 3.7037C7.425 3.7037 6.75 3.03704 6.75 2.22222C6.75 1.40741 7.425 0.740741 8.25 0.740741ZM9.0375 4.81481V5.59259C8.8125 5.62963 8.5875 5.74074 8.4 5.85185L7.8375 5.2963L7.3125 5.81482L7.875 6.37037C7.725 6.55556 7.65 6.77778 7.6125 7.03704H6.75V7.77778H7.5375C7.575 8 7.6875 8.22222 7.8 8.44444L7.2375 9L7.7625 9.51852L8.325 8.96296C8.5125 9.07407 8.7375 9.18518 8.9625 9.22222V10H9.7125V9.22222C9.9375 9.18518 10.1625 9.07407 10.35 8.96296L10.9125 9.51852L11.4375 9L10.875 8.44444C11.025 8.25926 11.1 8.03704 11.1375 7.77778H12V7.03704H11.2125C11.175 6.81481 11.0625 6.59259 10.95 6.37037L11.5125 5.81482L10.9875 5.2963L10.425 5.85185C10.2375 5.74074 10.0125 5.62963 9.7875 5.59259V4.81481H9.0375ZM9.375 6.2963C10.0125 6.2963 10.5 6.77778 10.5 7.40741C10.5 8.03704 10.0125 8.51852 9.375 8.51852C8.7375 8.51852 8.25 8.03704 8.25 7.40741C8.25 6.77778 8.7375 6.2963 9.375 6.2963ZM9.375 7.03704C9.32732 7.03762 9.28035 7.04849 9.23738 7.06889C9.19275 7.08984 9.15215 7.11829 9.11737 7.15296C9.08227 7.1873 9.05346 7.22741 9.03225 7.27148C9.01159 7.31393 9.00059 7.36032 9 7.40741C9 7.4537 9.01163 7.5 9.03225 7.54333C9.05288 7.58667 9.08212 7.62741 9.11737 7.66185C9.15225 7.69667 9.1935 7.72555 9.23738 7.74593C9.28035 7.76633 9.32732 7.7772 9.375 7.77778C9.5625 7.77778 9.75 7.59259 9.75 7.40741C9.75 7.22222 9.5625 7.03704 9.375 7.03704Z"
                            fill="white"
                          />
                        </svg>
                        <span style={{ display: 'none' }}>회원 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 0C1.7625 0 0.75 1 0.75 2.22222C0.75 2.96296 1.125 3.62963 1.6875 4C0.675 4.51852 0 5.51852 0 6.66667H0.75C0.75 5.44444 1.7625 4.44444 3 4.44444C4.2375 4.44444 5.25 5.44444 5.25 6.66667H6C6 5.48148 6.975 4.48148 8.175 4.44444H8.25C9.1875 4.44444 9.975 3.88889 10.3125 3.11111C10.3125 3.11111 10.3125 3.07407 10.35 3.07407C10.3875 3.03704 10.3875 2.96296 10.3875 2.92593C10.3875 2.88889 10.3875 2.88889 10.425 2.85185C10.425 2.81481 10.4625 2.74074 10.4625 2.7037C10.4625 2.66667 10.4625 2.62963 10.5 2.59259C10.5 2.55556 10.5 2.51852 10.5375 2.48148V2.25926C10.5375 1.03704 9.525 0.037037 8.2875 0.037037C7.05 0.037037 6.0375 1.03704 6.0375 2.25926C6.0375 3 6.4125 3.66667 6.975 4.03704C6.4125 4.2963 5.9625 4.74074 5.6625 5.25926C5.3625 4.74074 4.9125 4.2963 4.35 4.03704C4.875 3.62963 5.25 2.96296 5.25 2.22222C5.25 1 4.2375 0 3 0ZM3 0.740741C3.825 0.740741 4.5 1.40741 4.5 2.22222C4.5 3.03704 3.825 3.7037 3 3.7037C2.175 3.7037 1.5 3.03704 1.5 2.22222C1.5 1.40741 2.175 0.740741 3 0.740741ZM8.25 0.740741C9.075 0.740741 9.75 1.40741 9.75 2.22222C9.75 3.03704 9.075 3.7037 8.25 3.7037C7.425 3.7037 6.75 3.03704 6.75 2.22222C6.75 1.40741 7.425 0.740741 8.25 0.740741ZM9.0375 4.81481V5.59259C8.8125 5.62963 8.5875 5.74074 8.4 5.85185L7.8375 5.2963L7.3125 5.81482L7.875 6.37037C7.725 6.55556 7.65 6.77778 7.6125 7.03704H6.75V7.77778H7.5375C7.575 8 7.6875 8.22222 7.8 8.44444L7.2375 9L7.7625 9.51852L8.325 8.96296C8.5125 9.07407 8.7375 9.18518 8.9625 9.22222V10H9.7125V9.22222C9.9375 9.18518 10.1625 9.07407 10.35 8.96296L10.9125 9.51852L11.4375 9L10.875 8.44444C11.025 8.25926 11.1 8.03704 11.1375 7.77778H12V7.03704H11.2125C11.175 6.81481 11.0625 6.59259 10.95 6.37037L11.5125 5.81482L10.9875 5.2963L10.425 5.85185C10.2375 5.74074 10.0125 5.62963 9.7875 5.59259V4.81481H9.0375ZM9.375 6.2963C10.0125 6.2963 10.5 6.77778 10.5 7.40741C10.5 8.03704 10.0125 8.51852 9.375 8.51852C8.7375 8.51852 8.25 8.03704 8.25 7.40741C8.25 6.77778 8.7375 6.2963 9.375 6.2963ZM9.375 7.03704C9.32732 7.03762 9.28035 7.04849 9.23738 7.06889C9.19275 7.08984 9.15215 7.11829 9.11737 7.15296C9.08227 7.1873 9.05346 7.22741 9.03225 7.27148C9.01159 7.31393 9.00059 7.36032 9 7.40741C9 7.4537 9.01163 7.5 9.03225 7.54333C9.05288 7.58667 9.08212 7.62741 9.11737 7.66185C9.15225 7.69667 9.1935 7.72555 9.23738 7.74593C9.28035 7.76633 9.32732 7.7772 9.375 7.77778C9.5625 7.77778 9.75 7.59259 9.75 7.40741C9.75 7.22222 9.5625 7.03704 9.375 7.03704Z"
                            fill="white"
                          />
                        </svg>
                        <span style={{ display: 'none' }}>회원 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 권한관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'PM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.PM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/operation-manage/authority'}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 10 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.5 0.875H1.5C1.26801 0.875232 1.04558 0.967493 0.881537 1.13154C0.717493 1.29558 0.625232 1.51801 0.625 1.75V12.25C0.625232 12.482 0.717493 12.7044 0.881537 12.8685C1.04558 13.0325 1.26801 13.1248 1.5 13.125H8.5C8.73196 13.1247 8.95432 13.0324 9.11834 12.8683C9.28235 12.7043 9.37465 12.482 9.375 12.25V1.75C9.37477 1.51801 9.28251 1.29558 9.11846 1.13154C8.95442 0.967493 8.73199 0.875232 8.5 0.875ZM6.75 12.25H3.25V11.375C3.25 11.259 3.29609 11.1477 3.37814 11.0656C3.46019 10.9836 3.57147 10.9375 3.6875 10.9375H6.3125C6.42853 10.9375 6.53981 10.9836 6.62186 11.0656C6.70391 11.1477 6.75 11.259 6.75 11.375V12.25ZM7.625 12.25V11.375C7.625 11.0269 7.48672 10.6931 7.24058 10.4469C6.99444 10.2008 6.6606 10.0625 6.3125 10.0625H3.6875C3.3394 10.0625 3.00556 10.2008 2.75942 10.4469C2.51328 10.6931 2.375 11.0269 2.375 11.375V12.25H1.5V1.75H8.5V12.25H7.625Z"
                            fill="white"
                          />
                        </svg>
                        <span style={{ display: 'none' }}>권한 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 10 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.5 0.875H1.5C1.26801 0.875232 1.04558 0.967493 0.881537 1.13154C0.717493 1.29558 0.625232 1.51801 0.625 1.75V12.25C0.625232 12.482 0.717493 12.7044 0.881537 12.8685C1.04558 13.0325 1.26801 13.1248 1.5 13.125H8.5C8.73196 13.1247 8.95432 13.0324 9.11834 12.8683C9.28235 12.7043 9.37465 12.482 9.375 12.25V1.75C9.37477 1.51801 9.28251 1.29558 9.11846 1.13154C8.95442 0.967493 8.73199 0.875232 8.5 0.875ZM6.75 12.25H3.25V11.375C3.25 11.259 3.29609 11.1477 3.37814 11.0656C3.46019 10.9836 3.57147 10.9375 3.6875 10.9375H6.3125C6.42853 10.9375 6.53981 10.9836 6.62186 11.0656C6.70391 11.1477 6.75 11.259 6.75 11.375V12.25ZM7.625 12.25V11.375C7.625 11.0269 7.48672 10.6931 7.24058 10.4469C6.99444 10.2008 6.6606 10.0625 6.3125 10.0625H3.6875C3.3394 10.0625 3.00556 10.2008 2.75942 10.4469C2.51328 10.6931 2.375 11.0269 2.375 11.375V12.25H1.5V1.75H8.5V12.25H7.625Z"
                            fill="white"
                          />
                        </svg>
                        <span style={{ display: 'none' }}>권한 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 프로세스 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'PSM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.PSM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/process'}>
                        <GiProcessor
                          style={{
                            width: '20px',
                            height: '20px',
                            fill: 'white',
                          }}
                        ></GiProcessor>
                        <span style={{ display: 'none' }}>프로세스 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <GiProcessor
                          style={{
                            width: '20px',
                            height: '20px',
                            fill: 'white',
                          }}
                        ></GiProcessor>
                        <span style={{ display: 'none' }}>프로세스 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 메타정보 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'MIM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.MIM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/content-manage/metainfo'}>
                        <MdOutlineMedicalInformation
                          style={{
                            width: '20px',
                            height: '20px',
                            fill: 'white',
                          }}
                        ></MdOutlineMedicalInformation>
                        <span style={{ display: 'none' }}>메타정보 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <MdOutlineMedicalInformation
                          style={{
                            width: '20px',
                            height: '20px',
                            fill: 'white',
                          }}
                        ></MdOutlineMedicalInformation>
                        <span style={{ display: 'none' }}>메타정보 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 로그 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'LOM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.LOM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/preparing'}>
                        <MdManageHistory
                          style={{
                            width: '20px',
                            height: '20px',
                            fill: 'white',
                          }}
                        ></MdManageHistory>
                        <span style={{ display: 'none' }}>로그 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <MdManageHistory
                          style={{
                            width: '20px',
                            height: '20px',
                            fill: 'white',
                          }}
                        ></MdManageHistory>
                        <span style={{ display: 'none' }}>로그 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 통계 관리 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'STM')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.STM?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/preparing'}>
                        <VscGraph
                          style={{
                            width: '18px',
                            height: '18px',
                            fill: 'white',
                          }}
                        ></VscGraph>
                        <span style={{ display: 'none' }}>통계 관리</span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <VscGraph
                          style={{
                            width: '18px',
                            height: '18px',
                            fill: 'white',
                          }}
                        ></VscGraph>
                        <span style={{ display: 'none' }}>통계 관리</span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 정산 관리 */}
              {/* <button type="button" onClick={(e) => clickLink(e)}>
                <Link to={'/preparing'}>
                  <TbReportMoney
                    style={{ width: '20px', height: '20px', stroke: 'white' }}
                  ></TbReportMoney>
                  <span style={{ display: 'none' }}>정산 관리</span>
                </Link>
              </button> */}
            </MiniNavigationMenu>
            <MiniNavigationMenu>
              <strong>
                <Label value={'메뉴 관리'} display></Label>
                <Label type="navi" value={'메뉴'} margin="10px 0 0 0"></Label>
              </strong>

              {/* 콘텐츠 제작 설정 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'CCC')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.CCC?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/creatingcontentSetting'}>
                        <IoSettingsOutline
                          style={{
                            width: '18px',
                            height: '18px',
                            stroke: 'white',
                          }}
                        ></IoSettingsOutline>
                        <span style={{ display: 'none' }}>
                          콘텐츠 제작 설정
                        </span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <IoSettingsOutline
                          style={{
                            width: '18px',
                            height: '18px',
                            stroke: 'white',
                          }}
                        ></IoSettingsOutline>
                        <span style={{ display: 'none' }}>
                          콘텐츠 제작 설정
                        </span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}

              {/* 콘텐츠 관리 설정 */}
              {accessMenuList.filter((menu) => menu.menuCode === 'CMC')[0]
                ?.isUse ? (
                <>
                  {/* 권한 여부 */}
                  {decodingInfo?.permissionList &&
                  decodingInfo?.permissionList?.CMC?.isManage ? (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/managingcontentSetting'}>
                        <IoSettingsOutline
                          style={{
                            width: '18px',
                            height: '18px',
                            stroke: 'white',
                          }}
                        ></IoSettingsOutline>
                        <span style={{ display: 'none' }}>
                          콘텐츠 관리 설정
                        </span>
                      </Link>
                    </button>
                  ) : (
                    <button type="button" onClick={(e) => clickLink(e)}>
                      <Link to={'/no-authrized'}>
                        <IoSettingsOutline
                          style={{
                            width: '18px',
                            height: '18px',
                            stroke: 'white',
                          }}
                        ></IoSettingsOutline>
                        <span style={{ display: 'none' }}>
                          콘텐츠 관리 설정
                        </span>
                      </Link>
                    </button>
                  )}
                </>
              ) : null}
            </MiniNavigationMenu>
          </MiniNavigationMenuWrapper>
        </MiniContainer>
      )}
    </>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.SECONDARY};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;
const NavigationMenuWrapper = styled.ul`
  padding-left: 0;
  width: 230px;
  display: flex;
  flex-direction: column;
  //gap: 10px;
  color: white;
`;
const NavigationMenu = styled.li`
  display: flex;
  flex-direction: column;
  //gap: 10px;
  font-size: 14px;

  > strong {
    display: flex;
    align-items: center;
    font-weight: 600;
    margin-left: 10px;
    margin-top: 10px;
    text-align: left;
  }

  > button {
    border: none;
    background-color: transparent;
  }
  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    padding: 10px 30px;
    gap: 5px;
    color: white;

    span {
      padding-left: 5px;
    }

    &:hover {
      background-color: ${COLOR.NAVI_HOVER};
      border-radius: 7px;
    }
  }
`;

const MiniContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.SECONDARY};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const MiniNavigationMenuWrapper = styled.ul`
  padding-left: 0;
  width: 40px;
  display: flex;
  flex-direction: column;
  //gap: 10px;
  color: white;
`;
const MiniNavigationMenu = styled.li`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 14px;
  align-items: center;
  gap: 10px;

  button {
    background-color: ${COLOR.SECONDARY};
    border: 1px solid ${COLOR.NAVI_HOVER};
    border-radius: 7px;
  }

  a {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;

    &:hover {
      background-color: ${COLOR.NAVI_HOVER};
      border-radius: 7px;
    }
  }
`;
