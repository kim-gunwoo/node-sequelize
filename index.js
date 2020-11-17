const app = require("./app");
const PORT = process.env.PORT | 8000;

const sequelize = require("./models").sequelize;
sequelize.sync();

app.listen(PORT, () => {
  console.log(`server run localhost:${PORT}`);
});
