import * as React from 'react';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { MdAccountBalance } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getAuthorityItem, getMyInfo } from '../api/user';
import { useAuthority } from '../hooks';
import { myAuthorityAtom } from '../store/myAuthorityAtom';
import { openNaviationBoolAtom, pageIndexAtom } from '../store/utilAtom';

import { Label, openToastifyAlert } from './atom';
import { COLOR } from './constants';

export function Navigation() {
  const [myAuthority, setMyAuthority] = useRecoilState(myAuthorityAtom);
  const isOpenNavigation = useRecoilValue(openNaviationBoolAtom);
  const setpageIndexValue = useSetRecoilState(pageIndexAtom);
  const navigate = useNavigate();
  //[menuType 코드] null: 전체 조회, view: 화면 url만 조회
  const [menuType, setMenuType] = useState(null);

  const moveMainpage = () => {
    navigate('/content-create/quiz');
  };

  const clickLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const depth1Value =
      e.currentTarget.parentElement?.children[0].children[0].children[0];
    const depth2Value = e.currentTarget.children[0].children[1];
    // console.log('---------------', depth1Value?.innerHTML);
    if (depth1Value)
      setpageIndexValue([depth1Value.innerHTML, depth2Value.innerHTML]);
  };

  // 최초 진입시 유저 권한 조회 후 전역 데이터에 넣기
  // 마이페이지 데이터 불러오기 api
  const { data: myInfoData, isLoading } = useQuery({
    queryKey: ['get-myInfo'],
    queryFn: getMyInfo,
    meta: {
      errorMessage: 'get-myInfo 에러 메세지',
    },
  });
  const authorityCode = myInfoData?.data.data.authority.code;
  // 권한 조회 api
  const { data: authorityData, isLoading: authorityIsLoading } = useQuery({
    queryKey: ['get-authority'],
    queryFn: () => getAuthorityItem(authorityCode),
    meta: {
      errorMessage: 'get-authority 에러 메세지',
    },
    enabled: !!authorityCode,
  });
  const authorityList = authorityData?.data.data.permissionList;

  useEffect(() => {
    if (myInfoData && authorityData) {
      // console.log('myInfoData-----------------01', authorityCode);
      // console.log('내권한 배열-----------------', authorityList);
      setMyAuthority(authorityList);
    }
  }, [myInfoData, authorityData, authorityIsLoading]);

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
                {/* <MdAccountBalance style={{ width: '20px', height: '20px' }} /> */}
                <Label type="navi" value={'콘텐츠 제작'}></Label>
              </strong>
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
            </NavigationMenu>
            <NavigationMenu>
              <strong>
                {/* <MdAccountBalance style={{ width: '20px', height: '20px' }} /> */}
                <Label type="navi" value={'콘텐츠 관리'}></Label>
              </strong>
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
              <button type="button" onClick={(e) => clickLink(e)}>
                <Link to={'/content-manage/classify'}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 13 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.0625 4.81818V13.7273H9.25M3.0625 8.63636H9.25M1 1H5.125V4.81818H1V1ZM9.25 7.36364H12V9.90909H9.25V7.36364ZM9.25 12.4545H12V15H9.25V12.4545Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>문항 정보 트리 구조</span>
                </Link>
              </button>
            </NavigationMenu>
            <NavigationMenu>
              <strong>
                {/* <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0023 13.5C9.04797 13.5 8.13276 13.1313 7.45797 12.4749C6.78318 11.8185 6.40408 10.9283 6.40408 10C6.40408 9.07174 6.78318 8.1815 7.45797 7.52513C8.13276 6.86875 9.04797 6.5 10.0023 6.5C10.9566 6.5 11.8718 6.86875 12.5466 7.52513C13.2214 8.1815 13.6005 9.07174 13.6005 10C13.6005 10.9283 13.2214 11.8185 12.5466 12.4749C11.8718 13.1313 10.9566 13.5 10.0023 13.5ZM17.6407 10.97C17.6818 10.65 17.7127 10.33 17.7127 10C17.7127 9.67 17.6818 9.34 17.6407 9L19.8099 7.37C20.0052 7.22 20.0566 6.95 19.9333 6.73L17.8772 3.27C17.7538 3.05 17.4762 2.96 17.25 3.05L14.6902 4.05C14.1556 3.66 13.6005 3.32 12.9528 3.07L12.5724 0.42C12.5313 0.18 12.3154 0 12.0584 0H7.94616C7.68915 0 7.47326 0.18 7.43214 0.42L7.05176 3.07C6.40408 3.32 5.84894 3.66 5.31435 4.05L2.7545 3.05C2.52832 2.96 2.25075 3.05 2.12738 3.27L0.0712765 6.73C-0.0623704 6.95 -0.000687048 7.22 0.194643 7.37L2.36384 9C2.32271 9.34 2.29187 9.67 2.29187 10C2.29187 10.33 2.32271 10.65 2.36384 10.97L0.194643 12.63C-0.000687048 12.78 -0.0623704 13.05 0.0712765 13.27L2.12738 16.73C2.25075 16.95 2.52832 17.03 2.7545 16.95L5.31435 15.94C5.84894 16.34 6.40408 16.68 7.05176 16.93L7.43214 19.58C7.47326 19.82 7.68915 20 7.94616 20H12.0584C12.3154 20 12.5313 19.82 12.5724 19.58L12.9528 16.93C13.6005 16.67 14.1556 16.34 14.6902 15.94L17.25 16.95C17.4762 17.03 17.7538 16.95 17.8772 16.73L19.9333 13.27C20.0566 13.05 20.0052 12.78 19.8099 12.63L17.6407 10.97Z"
                    fill="white"
                  />
                </svg> */}
                <Label type="navi" value={'운영 관리'}></Label>
              </strong>
              {authorityList &&
              !authorityIsLoading &&
              authorityList[4]?.isManage ? (
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
                <button
                  type="button"
                  onClick={(e) => {
                    openToastifyAlert({
                      type: 'error',
                      text: '접근 권한이 없습니다',
                    });
                  }}
                >
                  <Link to={'/'}>
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
              {authorityList &&
              !authorityIsLoading &&
              authorityList[5]?.isManage ? (
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
                <button
                  type="button"
                  onClick={(e) => {
                    openToastifyAlert({
                      type: 'error',
                      text: '접근 권한이 없습니다',
                    });
                  }}
                >
                  <Link to={'/'}>
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
                    <span>권한 관리</span>
                  </Link>
                </button>
              )}
            </NavigationMenu>
          </NavigationMenuWrapper>
        </Container>
      ) : (
        // 테블릿 모바일
        <MiniContainer>
          <MiniNavigationMenuWrapper>
            <MiniNavigationMenu>
              <MdAccountBalance
                style={{ width: '20px', height: '20px', marginTop: '20px' }}
              />
              <button type="button" onClick={(e) => clickLink(e)}>
                <Link to={'/content-create/quiz'} id="nav-link">
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
                </Link>
              </button>
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
                </Link>
              </button>
            </MiniNavigationMenu>
            <MiniNavigationMenu>
              <MdAccountBalance style={{ width: '20px', height: '20px' }} />
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
                </Link>
              </button>
              <button type="button" onClick={(e) => clickLink(e)}>
                <Link to={'/content-manage/classify'}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 13 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.0625 4.81818V13.7273H9.25M3.0625 8.63636H9.25M1 1H5.125V4.81818H1V1ZM9.25 7.36364H12V9.90909H9.25V7.36364ZM9.25 12.4545H12V15H9.25V12.4545Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </button>
            </MiniNavigationMenu>
            <MiniNavigationMenu>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0023 13.5C9.04797 13.5 8.13276 13.1313 7.45797 12.4749C6.78318 11.8185 6.40408 10.9283 6.40408 10C6.40408 9.07174 6.78318 8.1815 7.45797 7.52513C8.13276 6.86875 9.04797 6.5 10.0023 6.5C10.9566 6.5 11.8718 6.86875 12.5466 7.52513C13.2214 8.1815 13.6005 9.07174 13.6005 10C13.6005 10.9283 13.2214 11.8185 12.5466 12.4749C11.8718 13.1313 10.9566 13.5 10.0023 13.5ZM17.6407 10.97C17.6818 10.65 17.7127 10.33 17.7127 10C17.7127 9.67 17.6818 9.34 17.6407 9L19.8099 7.37C20.0052 7.22 20.0566 6.95 19.9333 6.73L17.8772 3.27C17.7538 3.05 17.4762 2.96 17.25 3.05L14.6902 4.05C14.1556 3.66 13.6005 3.32 12.9528 3.07L12.5724 0.42C12.5313 0.18 12.3154 0 12.0584 0H7.94616C7.68915 0 7.47326 0.18 7.43214 0.42L7.05176 3.07C6.40408 3.32 5.84894 3.66 5.31435 4.05L2.7545 3.05C2.52832 2.96 2.25075 3.05 2.12738 3.27L0.0712765 6.73C-0.0623704 6.95 -0.000687048 7.22 0.194643 7.37L2.36384 9C2.32271 9.34 2.29187 9.67 2.29187 10C2.29187 10.33 2.32271 10.65 2.36384 10.97L0.194643 12.63C-0.000687048 12.78 -0.0623704 13.05 0.0712765 13.27L2.12738 16.73C2.25075 16.95 2.52832 17.03 2.7545 16.95L5.31435 15.94C5.84894 16.34 6.40408 16.68 7.05176 16.93L7.43214 19.58C7.47326 19.82 7.68915 20 7.94616 20H12.0584C12.3154 20 12.5313 19.82 12.5724 19.58L12.9528 16.93C13.6005 16.67 14.1556 16.34 14.6902 15.94L17.25 16.95C17.4762 17.03 17.7538 16.95 17.8772 16.73L19.9333 13.27C20.0566 13.05 20.0052 12.78 19.8099 12.63L17.6407 10.97Z"
                  fill="white"
                />
              </svg>
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
                </Link>
              </button>
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
                </Link>
              </button>
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
  gap: 10px;
  color: white;
`;
const NavigationMenu = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
      background-color: #5a76be;
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
  gap: 20px;
`;
const MiniIconWrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  &:hover {
    background-color: #5a76be;
    border-radius: 7px;
  }
`;
const MiniNavigationMenuWrapper = styled.ul`
  padding-left: 0;
  width: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
`;
const MiniNavigationMenu = styled.li`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 14px;
  align-items: center;
  gap: 20px;

  a {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;

    &:hover {
      background-color: #5a76be;
      border-radius: 7px;
    }
  }
`;
