const express = require("express");
const router = express.Router();
const { user_tb } = require("../models");
const Op = require("../models");

// 특정사용자로 정보조회 ex) 특정 사용자 상세 정보
router.get("/:loginid", async (req, res, next) => {
  const param = req.params;

  try {
    const user = await user_tb.findOne({ where: param });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// 사용자 정보를 조회할때
router.get("/", async (req, res, next) => {
  const search = req.body;

  try {
    const user = await user_tb.findAll({ where: search });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// 사용자 추가
router.post("/", async (req, res, next) => {
  const signUpUser = req.body;
  const loginid = signUpUser.loginid;
  const email = signUpUser.email;
  const usernm = signUpUser.usernm;
  const pwd = signUpUser.pwd;

  try {
    const user = await user_tb.findOne({
      //where: { [Op.or]: [{ loginid: loginid }, { email: email }] },
      where: { loginid: loginid },
    });

    if (user) {
      throw Error("user exist");
    }

    const success = await user_tb.create({
      usernm: usernm,
      loginid: loginid,
      email: email,
      pwd: pwd,
    });

    res.send(success);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
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

router.patch("/", async (req, res, next) => {
  const user = await user_tb.findAll({});
  console.log(user);
  res.json(user);
});

router.delete("/", async (req, res, next) => {
  const user = await user_tb.findAll({});
  console.log(user);
  res.json(user);
});

module.exports = router;
