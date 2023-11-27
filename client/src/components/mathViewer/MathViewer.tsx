import React, { useState } from 'react';
import MathJax from 'react-mathjax-preview';
import Contents from './test1.json';

const MathJaxComponent: React.FC = () => {
  const mathExpression = Contents.it_quest; // it_quest 필드를 가져옴
  const [math, setMath] = useState(mathExpression);

  return <MathJax math={math} />;
};

export default MathJaxComponent;
