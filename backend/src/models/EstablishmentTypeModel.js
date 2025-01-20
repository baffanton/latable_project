const DataTypes = require("sequelize");
const db = require("../config/database");

const EstablishmentTypeModel = db.define("establishment_type", 
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

module.exports = EstablishmentTypeModel;
