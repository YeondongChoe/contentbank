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

// 다음 지도 API
interface Window {
  daum: any;
}

// src/react-beautiful-dnd.d.ts
declare module 'react-beautiful-dnd' {
  import * as React from 'react';

  export interface DraggableProps {
    draggableId: string;
    index: number;
  }

  export interface DroppableProps {
    droppableId: string;
  }

  export const DragDropContext: React.FC<{ onDragEnd: (result: any) => void }>;
  export const Droppable: React.FC<DroppableProps>;
  export const Draggable: React.FC<DraggableProps>;
}
