const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ test: "hellow bye bye" });
});

module.exports = router;
