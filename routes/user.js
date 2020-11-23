const express = require("express");
const router = express.Router();
//const { user_tb } = require("../models");
const models = require("../models");
const user_tb = models.user_tb;
const Op = models.Sequelize.Op;

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
      /*where: {
        _id: {
          [Op.or]: [12, 13],
        },
      },*/
      where: { [Op.or]: [{ loginid: loginid }, { email: email }] },
      //where: { loginid: loginid },
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

// 전체 변경시 사용
router.put("/", async (req, res, next) => {
  res.json({});
});

// 일부 내역 수정시 사용
router.patch("/", async (req, res, next) => {
  const updateUser = req.body.user;
  const usernm = updateUser.usernm;
  const loginid = updateUser.loginid;
  const email = updateUser.email;

  try {
    const user = await user_tb.findOne({
      where: { [Op.or]: [{ loginid: loginid }, { email: email }] },
    });

    if (!user) {
      throw Error("user no exist");
    }

    const success = await user_tb.update(
      { usernm: usernm },
      { where: { _id: user._id } }
    );

    res.json(success);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  const deleteUser = req.body;
  const usernm = deleteUser.usernm;
  const loginid = deleteUser.loginid;
  const email = deleteUser.email;

  try {
    const user = await user_tb.findOne({
      where: { [Op.or]: [{ loginid: loginid }, { email: email }] },
    });

    if (!user) {
      throw Error("user no exist");
    }

    const success = await user_tb.destroy({ where: { _id: user._id } });

    res.json(success);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
