import * as React from 'react';
import { useLayoutEffect, useState } from 'react';

import { MathJax, MathJax3Object, MathJaxContext } from 'better-react-mathjax';
import { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode';
import styled from 'styled-components';

import { ItemQuestionType } from '../../types';
type MathViewerProps = {
  data: ItemQuestionType;
};

const config = {
  loader: { load: ['[tex]/html'] },
  tex: {
    packages: { '[+]': ['html'] },
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

export function MathViewer({ data }: MathViewerProps) {
  const [htmlString, setHtmlString] = useState<string | MmlNode>('');

  const dataMathml = (data: string) => {
    // 가져온 스트링 값의 data-mathml=" 이후 </math> 이전 까지 자른 후 반환
    // const mathmlStartIndex = data.indexOf('data-mathml="') + 13;
    // const mathmlEndIndex = data.indexOf('</math>') + 7;
    // const mathml = data.substring(mathmlStartIndex, mathmlEndIndex);
    // 반환된 태그를 MathJax 로 출력
    // MathJax.
    // MathJax.startup.toMML(mathml);

    // setHtmlString(mathml);
    // console.log(mathml);

    // setHtmlStringArr(mathmlArr);
    //속아낸값을 다시 리턴

    // setHtmlString(data);

    // htmlString = data;
    return data;
  };

  // useLayoutEffect(() => {}, [data]);

  const renders = (mathJax: MathJax3Object) => {
    mathJax.Hub.PreProcess();
    // mathJax.startup.defaultReady();
    // const toMML = mathJax.startup.toMML;
    // mathJax.startup.output.postFilters.add(
    //   (args: { math: any; data: any }) => {
    //     const math = args.math,
    //       node = args.data;
    //     const original = math.math
    //       ? math.math
    //       : math.inputJax.processStrings
    //       ? ''
    //       : math.start.node.outerHTML;
    //     node.setAttribute('data-original', original);
    //     node.setAttribute(
    //       'data-mathml',
    //       toMML(math.root).replace(/\n\s*/g, ''),
    //     );
    //   },
    // );
  };

  // 안정성 문제로 리액트에서 권장하는 방식
  const createMarkup = (data: string) => {
    return { __html: dataMathml(data) };
  };

  return (
    <Component>
      <MathJaxContext
        version={3}
        config={config}
        onStartup={(mathJax) => renders(mathJax)}
      >
        <strong>{data.it_title}</strong>

        <MathJax inline dynamic>
          <div dangerouslySetInnerHTML={createMarkup(data.it_quest)}></div>
          <div dangerouslySetInnerHTML={createMarkup(data.it_answer[0])}></div>
        </MathJax>
      </MathJaxContext>
    </Component>
  );
}

const Component = styled.div``;
