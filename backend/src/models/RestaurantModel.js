const DataTypes = require("sequelize");
const db = require("../config/database");
const DistrictModel = require("./DistrictModel");
const EstablishmentTypeModel = require("./EstablishmentTypeModel");
const CuisineModel = require("./CuisineModel");

const RestaurantModel = db.define(
  "restaurant",
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      defaultValue: [],
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: DistrictModel,
        key: "id",
      },
    },
    establishment_type_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: EstablishmentTypeModel,
        key: "id",
      },
    },
    vk_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    site_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cuisine_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: CuisineModel,
        key: "id",
      },
    },
    average_check: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = RestaurantModel;
