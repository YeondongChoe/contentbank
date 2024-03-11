const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const generatePDF = require("./src/utils/pdfGenerator.js");
const { convert } = require("mathml-to-svg");
const mj = require("mathjax-node");
const { mathjax } = require("mathjax-full/js/mathjax");
const { TeX } = require("mathjax-full/js/input/tex");
const { SVG } = require("mathjax-full/js/output/svg");

const app = express();
app.use(bodyParser.json());
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 주소로 변경
    credentials: true,
  })
);

// // 초기화
// mj.start();

// // MathML을 SVG로 변환하는 함수
// const convertMathMLToSVG = async (mathML) => {
//   return new Promise((resolve, reject) => {
//     mj.typeset(
//       {
//         math: mathML,
//         format: "MathML",
//         svg: true,
//       },
//       (data) => {
//         if (!data.errors) {
//           resolve(data.svg);
//         } else {
//           reject(new Error("Failed to convert MathML to SVG"));
//         }
//       }
//     );
//   });
// };

// 예시 MathML 코드
const exampleMathML = `<div class="level3"><p>다음과 같이 약속할 때 <span data-mathinfo="85,1000,3920,2250;;{ {  { 1 } over { 4 } ♥ { 5 } over { 6 }  } }" class="itexmath" contenteditable="inherit" data-latex="\\displaystyle  { { \\dfrac { 1 } { 4 } } ♥ { \\dfrac { 5 } { 6 } } } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mfrac><mn>1</mn><mn>4</mn></mfrac></mstyle></mrow><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mo>&amp;#x2665;</mo></mrow><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mfrac><mn>5</mn><mn>6</mn></mfrac></mstyle></mrow></mrow></mstyle></math>">\\(\\displaystyle  { { \\dfrac { 1 } { 4 } } ♥ { \\dfrac { 5 } { 6 } } } \\)</span>를 계산해 보세요. (단, 대분수로 쓰세요.)</p><table style="border-collapse: collapse; width: 100%; margin: 3px;"><tbody><tr><td colspan="1" rowspan="1" style="border: 1px solid black; width: 100%; height: 8px; vertical-align: middle;"><p class="para0" style="text-align:center;">㉮♥㉯<span data-mathinfo="85,1000,1344,1000;;{ { = } }" class="itexmath" contenteditable="inherit" data-latex="\\displaystyle  { = } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mo>=</mo></mrow></mstyle></math>">\\(\\displaystyle  { = } \\)</span>㉯<span data-mathinfo="85,1000,1344,1000;;{ { + } }" class="itexmath" contenteditable="inherit" data-latex="\\displaystyle  { + } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mo>+</mo></mrow></mstyle></math>">\\(\\displaystyle  { + } \\)</span>(㉯<span data-mathinfo="85,1000,1344,1000;;{ { - } }" class="itexmath" contenteditable="inherit" data-latex="\\displaystyle  { - } " data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mstyle displaystyle=&quot;true&quot; scriptlevel=&quot;0&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mo>&amp;#x2212;</mo></mrow></mstyle></math>">\\(\\displaystyle  { - } \\)</span>㉮)</p></td></tr></tbody></table><p></p></div>`;

// app.post("/render-math", (req, res) => {
//   const { mathml } = req.body;

//   // MathML을 SVG로 변환
//   convertMathMLToSVG(mathml)
//     .then((svg) => {
//       //console.log("Converted MathML to SVG:", svg);
//       res.send(svg);
//     })
//     .catch((error) => {
//       //console.error("Error:", error);
//     });
// });

app.post("/render-math", async (req, res) => {
  try {
    const mathjax = require("mathjax");
    const { mathml } = req.body;
    mathml = mathml.replace(/&/g, "&amp;");
    console.log(mathml);

    const MathJax = await mathjax.init({
      loader: { load: ["input/tex", "output/svg"] },
    });

    // 수식을 SVG로 렌더링
    const svg = MathJax.tex2svg(mathml, { display: true });
    const svgString = MathJax.startup.adaptor.outerHTML(svg);

    // 클라이언트에 SVG 결과만 전송
    res.send(svgString);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// // LaTeX를 MathML로 변환하는 함수
// const convertLaTeXToMathML = async (mathML) => {
//   return new Promise((resolve, reject) => {
//     mj.typeset(
//       {
//         math: mathML,
//         format: "MathML",
//         svg: true,
//       },
//       (data) => {
//         if (!data.errors) {
//           resolve(data.svg);
//         } else {
//           reject(new Error("Failed to convert LaTeX to MathML"));
//         }
//       }
//     );
//   });
// };

// // MathML을 SVG 이미지로 변환하는 함수
// const convertMathMLToSVG = async (latex) => {
//   try {
//     //console.log("Original MathML:", mathML); // MathML 확인
//     const mathML = convertLaTeXToMathML(latex);
//     const svg = await convert(mathML);
//     return svg;
//   } catch (error) {
//     throw new Error("Failed to convert MathML to SVG");
//   }
// };

// // POST /get-math-image 엔드포인트 핸들러
// app.post("/get-math-image", async (req, res) => {
//   try {
//     const { content } = req.body;

//     // MathML을 SVG 이미지로 변환
//     const svgImage = await convertMathMLToSVG(content);

//     // 클라이언트에게 SVG 이미지 응답
//     res.send(svgImage);
//     console.log("Math expressions converted to images successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// const mathjax = require("mathjax-full/js/mathjax.js");

// // MathJax 초기화
// const initializeMathJax = async () => {
//   try {
//     const handler = mathjax.startup.promise;
//     await handler;
//   } catch (err) {
//     console.error(err);
//   }
// };

// // MathML을 SVG 이미지로 변환하는 함수
// const convertMathMLToSVG = async (mathML) => {
//   const svg = mathjax.startup.document(mathML, { InputJax: new SVG() });
//   await svg.typeset();
//   return svg.outerHTML;
// };

// // 이미지로 변환하여 바탕화면에 저장
// const outputPath = "C:/Users/yeondong/Desktop/math_image.svg"; // 원하는 경로로 변경

// app.post("/get-math-image", async (req, res) => {
//   try {
//     const { content } = req.body;

//     // MathJax 초기화
//     await initializeMathJax();

//     // MathML을 SVG 이미지로 변환
//     const svgImage = await convertMathMLToSVG(content);

//     // 클라이언트에게 SVG 이미지 응답
//     res.send(svgImage);
//     console.log("Math expressions converted to images successfully!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

//const path = require("path");
// // 수학 수식 및 출력 경로 설정
// // 바탕화면의 경로
// const desktopPath = path.join(require("os").homedir(), "Desktop");
// // 파일을 저장할 디렉토리 경로
// const outputDirectory = path.join(desktopPath);
// // 최종적인 파일 경로
// const outputFilePath = path.join(outputDirectory, "output.png");

app.set("view engine", "ejs");

app.post("/get-pdf", async (req, res) => {
  const { title, content, column } = req.body;
  // 데이터 및 CSS 스타일

  const data = {
    title: title,
    content: content,
    column: column,
  };

  // PDF 생성 모듈 호출
  const pdfBuffer = await generatePDF(data);

  // PDF를 클라이언트로 전송
  res.contentType("application/pdf");
  res.send(pdfBuffer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
