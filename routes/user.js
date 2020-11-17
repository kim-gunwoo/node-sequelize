const express = require("express");
const router = express.Router();
const { user_tb } = require("../models");

router.get("/", async (req, res) => {
  /*await user_tb.create({
    usernm: "관리자",
    loginid: "admin",
    email: "test@test",
    pwd: "123",
  });*/

  const user = await user_tb.findAll({});
  console.log(user);
  res.json(user);
});

module.exports = router;
