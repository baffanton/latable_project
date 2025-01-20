const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
console.log(process.env.JWT_ACCESS_SECRET);

const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = dbConnection;
