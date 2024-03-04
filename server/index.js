const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const generatePDF = require("./src/utils/pdfGenerator.js");

const app = express();
const port = 5000;

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
