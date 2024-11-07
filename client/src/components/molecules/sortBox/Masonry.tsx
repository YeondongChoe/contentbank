import * as React from 'react';
import { ReactNode } from 'react';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import styled from 'styled-components';

// 프롭스 타입 정의
interface MyResponsiveWrapperProps {
  breakpoints: { [key: number]: number };
  children: ReactNode;
  gap?: string; // gap 프롭
  margin?: string; // margin 프롭
  padding?: string; // padding 프롭
}

// Styled Container
const ResponsiveContainer = styled.div<{
  gap?: string;
  margin?: string;
  padding?: string;
}>`
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};

  /* Masonry 아이템 간의 간격 설정 */
  & > div {
    margin-bottom: ${({ gap }) =>
      gap || '0'}; /* gap을 div의 margin-bottom으로 적용 */
  }
`;

// 훅을 사용한 반응형 Masonry
const MyResponsiveWrapper: React.FC<MyResponsiveWrapperProps> = ({
  breakpoints,
  children,
  gap,
  margin,
  padding,
}) => {
  return (
    <ResponsiveContainer gap={gap} margin={margin} padding={padding}>
      <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
        <Masonry>{children}</Masonry>
      </ResponsiveMasonry>
    </ResponsiveContainer>
  );
};

// 고정형 Masonry 프롭스 타입 정의
interface MyStaticWrapperProps {
  columnsCount?: number; // 기본값을 설정할 수 있도록 옵셔널로 설정
  children: ReactNode;
  gap?: string; // gap 프롭
  margin?: string; // margin 프롭
  padding?: string; // padding 프롭
}

// Styled Container for Static
const StaticContainer = styled.div<{
  gap?: string;
  margin?: string;
  padding?: string;
}>`
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};

  /* Masonry 아이템 간의 간격 설정 */
  & > div {
    margin-bottom: ${({ gap }) =>
      gap || '0'}; /* gap을 div의 margin-bottom으로 적용 */
  }
`;

// 고정형 Masonry
const MyStaticWrapper: React.FC<MyStaticWrapperProps> = ({
  columnsCount = 3,
  children,
  gap,
  margin,
  padding,
}) => {
  return (
    <StaticContainer gap={gap} margin={margin} padding={padding}>
      <Masonry columnsCount={columnsCount}>{children}</Masonry>
    </StaticContainer>
  );
};

// 필요한 경우 두 컴포넌트를 내보냄
export { MyResponsiveWrapper, MyStaticWrapper };
