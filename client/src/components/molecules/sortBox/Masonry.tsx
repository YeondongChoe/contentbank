import * as React from 'react';
import { ReactNode } from 'react';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

// 프롭스 타입 정의
interface MyResponsiveWrapperProps {
  breakpoints: { [key: number]: number };
  children: ReactNode;
}

// 훅을 사용한 반응형 Masonry
const MyResponsiveWrapper: React.FC<MyResponsiveWrapperProps> = ({
  breakpoints,
  children,
}) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={breakpoints}>
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
};

// 고정형 Masonry 프롭스 타입 정의
interface MyStaticWrapperProps {
  columnsCount?: number; // 기본값을 설정할 수 있도록 옵셔널로 설정
  children: ReactNode;
}

// 고정형 Masonry
const MyStaticWrapper: React.FC<MyStaticWrapperProps> = ({
  columnsCount = 3,
  children,
}) => {
  return <Masonry columnsCount={columnsCount}>{children}</Masonry>;
};

// 필요한 경우 두 컴포넌트를 내보냄
export { MyResponsiveWrapper, MyStaticWrapper };
