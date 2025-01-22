const DataTypes = require("sequelize");
const db = require("../config/database");
const UserModel = require("./UserModel");
const RestaurantModel = require("./RestaurantModel");

const UserPinRestaurantModel = db.define(
  "user_pin_restaurant",
  {
    id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    restaurant_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: RestaurantModel,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = UserPinRestaurantModel;
