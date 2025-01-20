const DataTypes = require("sequelize");
const db = require("../config/database");
const UserModel = require("./UserModel");
const RestaurantModel = require("./RestaurantModel");

const RestaurantReviewModel = db.define(
  "restaurant_review",
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      unique: true,
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
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publication_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = RestaurantReviewModel;
