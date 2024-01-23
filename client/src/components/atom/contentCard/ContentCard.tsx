import * as React from 'react';
import { useState, useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { pageAtom } from '../../../store/utilAtom';
import { QuestionTableType } from '../../../types';
import { COLOR } from '../../constants';
import { Button } from '../button';
import { CheckBox } from '../checkBox';

type ContentCardProps = {
  content: QuestionTableType;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isEnabled: boolean;
  checkList: number[];
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>;
};

export function ContentCard({
  content,
  checkList,
  isEnabled,
  setCheckList,
  setIsEnabled,
}: ContentCardProps) {
  const page = useRecoilValue(pageAtom);

  //console.log(checkList);

  const [isChecked, setIsChecked] = useState(
    checkList.includes(content.contentSeq),
  );
  //console.log(isChecked);
  console.log(checkList.includes(content.contentSeq));
  const handleSingleCheck = (seq: number) => {
    setIsChecked((prev) => !prev);
    if (!isChecked) {
      setCheckList((prev) => [...prev, seq]);
      setIsEnabled(false);
    } else {
      setCheckList((prev) => prev.filter((el) => el !== seq));
    }
  };

  useEffect(() => {
    setCheckList([]);
  }, [page]);

  useEffect(() => {
    setIsChecked(checkList.includes(content.contentSeq));
  }, [checkList]);

  useEffect(() => {
    if (checkList.length <= 0) {
      setIsEnabled(true);
    }
  }, [checkList]);

  return (
    <Component>
      <Wrapper $isChecked={isChecked}>
        <IconWrapper>
          {/* <div>
            <CheckBoxx
              type="checkbox"
              onChange={(e) =>
                handleSingleCheck(
                  e.target.checked,
                  content.contentSeq as number,
                )
              }
              // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
              checked={
                checkList.includes(content.contentSeq as number) ? true : false
              }
            />
          </div> */}
          <CheckBox
            onClick={() => handleSingleCheck(content.contentSeq)}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            // onChange={(e) =>
            //   handleSingleCheck(e.target.checked, content.contentSeq as number)
            // }
            // isChecked={isChecked}
            // checked={
            //   checkList.includes(content.contentSeq as number) ? true : false
            // }
          ></CheckBox>
          {isChecked ? (
            <div style={{ cursor: 'pointer' }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.531331 0C0.219736 0.0390547 -0.00502249 0.222442 8.5322e-05 0.434695V19.5613C-0.00246858 19.7175 0.12268 19.8618 0.324452 19.9399C0.526224 20.0197 0.776522 20.0197 0.980847 19.9416L8.5 16L16.0192 19.9416C16.2235 20.0197 16.4738 20.0197 16.6756 19.9399C16.8774 19.8618 17.0025 19.7175 17 19.5613V0.434695C17 0.195273 16.7062 0 16.3461 0H0.653927C0.633494 0 0.613062 0 0.592629 0C0.572197 0 0.551764 0 0.531331 0ZM1.30777 0.86939H15.6923V18.8006L8.925 15.2C8.72323 15.1219 8.27677 15.1219 8.075 15.2L1.30777 18.8006V0.86939Z"
                  fill="white"
                />
              </svg>
            </div>
          ) : (
            <div style={{ cursor: 'pointer' }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.531331 0C0.219736 0.0390547 -0.00502249 0.222442 8.5322e-05 0.434695V19.5613C-0.00246858 19.7175 0.12268 19.8618 0.324452 19.9399C0.526224 20.0197 0.776522 20.0197 0.980847 19.9416L8.5 16L16.0192 19.9416C16.2235 20.0197 16.4738 20.0197 16.6756 19.9399C16.8774 19.8618 17.0025 19.7175 17 19.5613V0.434695C17 0.195273 16.7062 0 16.3461 0H0.653927C0.633494 0 0.613062 0 0.592629 0C0.572197 0 0.551764 0 0.531331 0ZM1.30777 0.86939H15.6923V18.8006L8.925 15.2C8.72323 15.1219 8.27677 15.1219 8.075 15.2L1.30777 18.8006V0.86939Z"
                  fill="#4A4A4A"
                />
              </svg>
            </div>
          )}
        </IconWrapper>
        <CodeWrapper>
          <Code>{content.questionCode}</Code>
          <ButtonWrapper>
            <Button
              height={'20px'}
              width={'70px'}
              $padding="15px"
              fontSize="12px"
              $borderRadius="20px"
              isChecked={isChecked}
            >
              2015
            </Button>
            <Button
              height={'20px'}
              width={'100px'}
              $padding="15px"
              fontSize="12px"
              $borderRadius="20px"
              isChecked={isChecked}
            >
              2015년 개정
            </Button>
            <Button
              height={'20px'}
              width={'70px'}
              $padding="15px"
              fontSize="12px"
              $borderRadius="20px"
              isChecked={isChecked}
            >
              중등
            </Button>
            <Button
              height={'20px'}
              width={'70px'}
              $padding="15px"
              fontSize="12px"
              $borderRadius="20px"
              isChecked={isChecked}
            >
              6학년
            </Button>
            <Button
              height={'20px'}
              width={'70px'}
              $padding="15px"
              fontSize="12px"
              $borderRadius="20px"
              isChecked={isChecked}
            >
              1학기
            </Button>
          </ButtonWrapper>
        </CodeWrapper>
        <SubTitleWrapper>
          <SubTitle>03 일차부등식 소분류</SubTitle>
          <MinerTitle>12 계수가 소수 일차부등식</MinerTitle>
        </SubTitleWrapper>
        <DescriptionWrapper>
          <Button
            height={'30px'}
            width={'70px'}
            fontSize="13px"
            $borderRadius="20px"
            isChecked={isChecked}
          >
            객관식
          </Button>
          <div>홍길동</div>
          <div>2024.01.17 13:33:33</div>
          {isChecked ? (
            <div>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.24996 23.4165C5.67704 23.4165 5.18676 23.2127 4.77913 22.805C4.37149 22.3974 4.16732 21.9068 4.16663 21.3332V10.9165C4.16663 10.3436 4.37079 9.85331 4.77913 9.44567C5.18746 9.03803 5.67774 8.83386 6.24996 8.83317H7.29163V6.74984C7.29163 5.30886 7.79961 4.08074 8.81558 3.06546C9.83156 2.05018 11.0597 1.5422 12.5 1.5415C13.9409 1.5415 15.1694 2.04949 16.1854 3.06546C17.2013 4.08143 17.709 5.30956 17.7083 6.74984V8.83317H18.75C19.3229 8.83317 19.8135 9.03734 20.2218 9.44567C20.6302 9.854 20.834 10.3443 20.8333 10.9165V21.3332C20.8333 21.9061 20.6295 22.3967 20.2218 22.805C19.8142 23.2134 19.3236 23.4172 18.75 23.4165H6.24996ZM12.5 18.2082C13.0729 18.2082 13.5635 18.0044 13.9718 17.5967C14.3802 17.1891 14.584 16.6984 14.5833 16.1248C14.5833 15.5519 14.3795 15.0616 13.9718 14.654C13.5642 14.2464 13.0736 14.0422 12.5 14.0415C11.927 14.0415 11.4368 14.2457 11.0291 14.654C10.6215 15.0623 10.4173 15.5526 10.4166 16.1248C10.4166 16.6978 10.6208 17.1884 11.0291 17.5967C11.4375 18.005 11.9277 18.2089 12.5 18.2082ZM9.37496 8.83317H15.625V6.74984C15.625 5.88178 15.3211 5.14393 14.7135 4.5363C14.1059 3.92866 13.368 3.62484 12.5 3.62484C11.6319 3.62484 10.8941 3.92866 10.2864 4.5363C9.67878 5.14393 9.37496 5.88178 9.37496 6.74984V8.83317Z"
                  fill="white"
                />
              </svg>
            </div>
          ) : (
            <div>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                cursor={'pointer'}
              >
                <path
                  d="M6.24996 23.4166C5.67704 23.4166 5.18676 23.2128 4.77913 22.8052C4.37149 22.3975 4.16732 21.9069 4.16663 21.3333V10.9166C4.16663 10.3437 4.37079 9.85343 4.77913 9.44579C5.18746 9.03815 5.67774 8.83399 6.24996 8.83329H7.29163V6.74996C7.29163 5.30899 7.79961 4.08086 8.81558 3.06558C9.83156 2.05031 11.0597 1.54232 12.5 1.54163C13.9409 1.54163 15.1694 2.04961 16.1854 3.06558C17.2013 4.08156 17.709 5.30968 17.7083 6.74996V8.83329H18.75C19.3229 8.83329 19.8135 9.03746 20.2218 9.44579C20.6302 9.85413 20.834 10.3444 20.8333 10.9166V21.3333C20.8333 21.9062 20.6295 22.3968 20.2218 22.8052C19.8142 23.2135 19.3236 23.4173 18.75 23.4166H6.24996ZM12.5 18.2083C13.0729 18.2083 13.5635 18.0045 13.9718 17.5968C14.3802 17.1892 14.584 16.6986 14.5833 16.125C14.5833 15.552 14.3795 15.0618 13.9718 14.6541C13.5642 14.2465 13.0736 14.0423 12.5 14.0416C11.927 14.0416 11.4368 14.2458 11.0291 14.6541C10.6215 15.0625 10.4173 15.5527 10.4166 16.125C10.4166 16.6979 10.6208 17.1885 11.0291 17.5968C11.4375 18.0052 11.9277 18.209 12.5 18.2083ZM9.37496 8.83329H15.625V6.74996C15.625 5.8819 15.3211 5.14406 14.7135 4.53642C14.1059 3.92878 13.368 3.62496 12.5 3.62496C11.6319 3.62496 10.8941 3.92878 10.2864 4.53642C9.67878 5.14406 9.37496 5.8819 9.37496 6.74996V8.83329Z"
                  fill="black"
                />
              </svg>
            </div>
          )}
        </DescriptionWrapper>
      </Wrapper>
    </Component>
  );
}
const CheckBoxx = styled.input``;

const Component = styled.li`
  width: 100%;
  height: 80px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 10px;
`;
const Wrapper = styled.button<{ $isChecked?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  border: none;
  background-color: white;
  ${({ $isChecked }) =>
    $isChecked
      ? `background-color: ${COLOR.SECONDARY}; color: white; border-radius: 10px;`
      : 'background-color: white;'}
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 20px;
`;
const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  //flex: 1 0 0;
  padding-right: 50px;
`;
const Code = styled.div`
  font-size: 15px;
  font-weight: 800;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 2px;
`;
const SubTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
`;
const MinerTitle = styled.div`
  font-size: 12px;
`;
const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  justify-content: flex-end;
  font-size: 15px;
  gap: 20px;
`;
