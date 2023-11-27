declare global {
  interface Window {
    MathJax?: {
      typeset: (elements: Element[]) => void;
      // 다른 MathJax 메서드나 속성들도 필요한 경우 추가
    };
  }
}

declare module 'mathjax3-react' {
  const MathJax: any;
  export default MathJax;
}

declare module 'react-mathjax-preview' {
  const MathJax: React.ComponentType<{ math: string }>;
  export default MathJax;
}
