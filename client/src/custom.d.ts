declare global {
  interface Window {
    MathJax?: {
      typeset: (elements: Element[]) => void;
      // 다른 MathJax 메서드나 속성들도 필요한 경우 추가
    };
  }
}
