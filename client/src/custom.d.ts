declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'html2pdf.js' {
  const html2pdf: any; // 또는 모듈의 실제 타입에 맞게 설정

  export default html2pdf;
}

declare module '*.png' {
  const value: string;
  export default value;
}
