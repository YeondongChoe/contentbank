const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const generatePDF = require("./src/utils/pdfGenerator.js");
const { convertMathToImage } = require("./src/utils/mathjax.js");
const path = require("path");

const app = express();
const port = 5000;

// 수학 수식 및 출력 경로 설정

app.post("/get-math", async (req, res) => {
  const { contents } = req.body;
  const mathExpression = "\\frac{a}{b}";
  // 바탕화면의 경로
  const desktopPath = path.join(require("os").homedir(), "Desktop");

  // 파일을 저장할 디렉토리 경로
  const outputDirectory = path.join(desktopPath);

  // 최종적인 파일 경로
  const outputFilePath = path.join(outputDirectory);

  // 모듈화된 함수 호출
  convertMathToImage(mathExpression, outputFilePath);
});

app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 주소로 변경
    credentials: true,
  })
);
app.use(bodyParser.json());

//app.set("view engine", "ejs");

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
