const DataTypes = require("sequelize");
const db = require("../config/database");
const UserModel = require("./UserModel");

const TokenModel = db.define("token", 
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      require: true,
    },
  }, {
    timestamps: false
  }
);

module.exports = TokenModel;
