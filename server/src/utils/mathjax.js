const puppeteer = require("puppeteer");

async function convertMathToImage(mathExpression, outputFilePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // MathJax 스크립트를 삽입한 HTML 페이지 생성
  const htmlContent = `
    <html>
      <head>
        <script id="MathJax-script" async src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>  
      </head>
      <body>
        <div id="mathjax-content">${mathExpression}</div>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);
  //console.log(htmlContent);

  // 스크린샷 찍기
  await page.screenshot({ path: outputFilePath });

  await browser.close();

  console.log(`Math expression converted and saved to ${outputFilePath}`);
}

// 모듈로 내보내기
module.exports = {
  convertMathToImage,
};
