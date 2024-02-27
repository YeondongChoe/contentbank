const express = require("express");

const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // 데이터 및 CSS 스타일
  const data = {
    title: "Hello, World!",
    content: "This is a sample HTML with inline CSS.",
    style: "color: red; font-size: 20px;",
  };

  // EJS 템플릿을 사용하여 HTML 생성
  const html = ejs.render(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- CSS 스타일 적용 -->
      <style>
        /* 여기에 CSS 스타일을 추가하세요 */
        .page {
          display: flex;
        }
        .left, .right {
          flex: 1;
          box-sizing: border-box;
          padding: 20px;
          border: 1px solid #000;
        }
      </style>
    </head>
    <body>
      <!-- 여기에 동적으로 생성된 HTML 내용을 추가하세요 -->
      <div class="page">
        <div class="left">
          <!-- 왼쪽 페이지에 들어갈 내용 -->
        </div>
        <div class="right">
          <!-- 오른쪽 페이지에 들어갈 내용 -->
        </div>
      </div>
    </body>
    </html>
  `,
    data
  );

  res.send(html);
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.use("/", eeee);

// app.listen(port, () => {
//   console.log(`서버가 ${port} 포트에서 실행중입니다.`);
// });
