import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  NODE_ENV,
  DB_DIALECT,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: NODE_ENV != "staging",
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
