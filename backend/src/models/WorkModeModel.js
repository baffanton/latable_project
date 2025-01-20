const DataTypes = require("sequelize");
const db = require("../config/database");
const RestaurantModel = require("./RestaurantModel");

const WorkModeModel = db.define(
  "work_mode",
  {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: RestaurantModel,
        key: "id",
      },
    },
    weekdays: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    time_from: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    time_to: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = WorkModeModel;
