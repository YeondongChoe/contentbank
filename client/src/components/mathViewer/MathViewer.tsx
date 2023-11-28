import React from 'react';
import { MathJaxProvider, MathJaxHtml } from 'mathjax3-react';
import Contents from '../../components/mathViewer/test2.json';

const MathInterleavedWithText = () => {
  const mathml =
    '<math xmlns="http://www.w3.org/1998/Math/MathML"><msup><mi>x</mi><mn>2</mn></msup></math>';
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
      <MathJaxProvider>
        <MathJaxHtml html={html} />
      </MathJaxProvider>
    </div>
  );
};

export default MathInterleavedWithText;
