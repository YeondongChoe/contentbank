import { useEffect, useState } from 'react';

export const useScript = (src: string) => {
  const [status, setStatus] = useState({ loaded: false, error: false });

  useEffect(() => {
    // 스크립트 태그 생성
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    // 스크립트 로드 성공 처리
    script.onload = () => {
      setStatus({ loaded: true, error: false });
    };

    // 스크립트 로드 실패 처리
    script.onerror = () => {
      setStatus({ loaded: true, error: true });
    };

    // DOM에 스크립트 태그 추가
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 태그 제거
    return () => {
      document.body.removeChild(script);
    };
  }, [src]); // src가 변경될 때마다 훅 재실행

  return status;
};
