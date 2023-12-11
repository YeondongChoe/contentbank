import * as React from 'react';

// import { MathJaxProvider, MathJaxHtml } from 'mathjax3-react';
import Contents from '../../components/mathViewer/test2.json';

const MathInterleavedWithText = () => {
  const html = `
<p style="text-align:center;">
  <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
    <msup>
      <mrow>
        <mi>r</mi>
      </mrow>
      <mrow>
        <mn>2</mn>
      </mrow>
    </msup>
    <mo>+</mo>
    <msup>
      <mrow>
        <mi>z</mi>
      </mrow>
      <mrow>
        <mn>2</mn>
      </mrow>
    </msup>
    <mo>=</mo>
    <mn>4</mn>
  </math>
</p>
`;
  return (
    <div>
      {/* <MathJaxProvider>
        <MathJaxHtml html={Contents.it_quest} />
      </MathJaxProvider> */}
    </div>
  );
};

export default MathInterleavedWithText;
