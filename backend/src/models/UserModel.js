const DataTypes = require("sequelize");
const db = require("../config/database");

const UserModel = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.ENUM("мужской", "женский"),
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    code: {
      type: DataTypes.STRING,
    },
    registered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = UserModel;
