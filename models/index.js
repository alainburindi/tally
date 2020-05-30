import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
// Option 1: Passing parameters separately
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

const models = {
  User: sequelize.import("./user"),
  Vote: sequelize.import("./vote"),
  Choice: sequelize.import("./choice"),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
