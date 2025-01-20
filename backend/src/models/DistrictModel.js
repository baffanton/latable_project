const DataTypes = require("sequelize");
const db = require("../config/database");

const DistrictModel = db.define("district", 
  {
    id: {
      type: DataTypes.STRING,
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

module.exports = DistrictModel;
