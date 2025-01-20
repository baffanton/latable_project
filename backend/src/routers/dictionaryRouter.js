const express = require("express");
const dictionaryController = require("../controllers/dictionaryController");

const dictionaryRouter = express.Router();

dictionaryRouter.get("/get-age", dictionaryController.getAgeDictionary);
dictionaryRouter.get("/get-gender", dictionaryController.getGenderDictionary);
dictionaryRouter.get("/get-cuisine", dictionaryController.getCuisineDictionary);
dictionaryRouter.get(
  "/get-district",
  dictionaryController.getDistrictDictionary
);
dictionaryRouter.get(
  "/get-establishment-type",
  dictionaryController.getEstablishmentTypeDictionary
);

module.exports = dictionaryRouter;
