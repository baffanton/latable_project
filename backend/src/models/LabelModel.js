const DataTypes = require("sequelize");
const db = require("../config/database");

const LabelModel = db.define("label", 
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      require: true,
    },
    name: {
      type: DataTypes.STRING,
      require: true,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = LabelModel;
