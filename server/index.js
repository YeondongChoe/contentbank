const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const generatePDF = require("./src/utils/pdfGenerator.js");

const app = express();
app.use(bodyParser.json());
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 주소로 변경
    credentials: true,
  })
);

// const fs = require("fs");
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
  const { title, content } = req.body;
  // 데이터 및 CSS 스타일

  const data = {
    title: title,
    content: content,
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
