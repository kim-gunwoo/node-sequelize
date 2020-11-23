const express = require("express");
const router = express.Router();
//const { user_tb } = require("../models");
const models = require("../models");
const user_tb = models.user_tb;
const Op = models.Sequelize.Op;
const sequelize = models.sequelize;

router.get("/", async (req, res, next) => {
  const user = await user_tb.findAll({});
  res.json(user);
});

// transaction test managed
router.post("/", async (req, res, next) => {
  try {
    // get transaction
    await sequelize.transaction(async (transaction) => {
      await user_tb.create(
        {
          usernm: "usernm",
          loginid: "loginid",
          email: "e@e",
        },
        { transaction }
      );

      await user_tb.create(
        {
          usernm: "usernm",
          loginid: "loginid",
          email: "e@e",
        },
        { transaction }
      );
    });

    res.json({ success: "success" });
  } catch (err) {
    next(err);
  }
});

// transaction test unmanaged
router.patch("/", async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    // get transaction
    const user = await user_tb.create(
      {
        usernm: "usernm",
        loginid: "loginid",
        email: "e@e",
      },
      { transaction }
    );

    await user_tb.update(
      { usernm: "a;dslifajsdilfajsdfa" },
      { where: { _id: user._id }, transaction }
    );

    await user_tb.create(
      {
        usernm: "usernm",
        loginid: "loginid",
        email: "e@e",
      },
      { transaction }
    );

    // throw new Error("transaction test");

    await transaction.commit();
    res.json({ success: "success" });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
});

// transaction test
router.delete("/", async (req, res, next) => {
  let transaction;

  try {
    // get transaction
    transaction = await sequelize.transaction();

    await user_tb.destroy({ where: { loginid: "loginid" }, transaction });

    throw new Error("transaction test");

    // commit
    await transaction.commit();
    res.json({ success: "success" });
  } catch (err) {
    // Rollback transaction if any errors were encountered
    await transaction.rollback();
    next(err);
  }
});

module.exports = router;
