const express = require("express");
// const bodyParser = require("body-parser")
const app = express();
const test = require("./Router/test");
const port = 5000;

// app.use(bodyParser.json());
app.use("/", test);

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행중입니다.`);
});
