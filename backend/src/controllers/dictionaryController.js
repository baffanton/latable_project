const dictionaryService = require("../services/dictionaryService");
const SUCCESS_CODE = require("../shared/constants");

class DictionaryController {
  async getAgeDictionary(_req, res, next) {
    try {
      const dictItems = await dictionaryService.getAgeDictionary();

      res.status(SUCCESS_CODE).json(dictItems);
    } catch (e) {
      next(e);
    }
  }

  async getGenderDictionary(_req, res, next) {
    try {
      const dictItems = await dictionaryService.getGenderDictionary();

      res.status(SUCCESS_CODE).json(dictItems);
    } catch (e) {
      next(e);
    }
  }

  async getCuisineDictionary(_req, res, next) {
    try {
      const dictItems = await dictionaryService.getCuisineDictionary();

      res.status(SUCCESS_CODE).json(dictItems);
    } catch (e) {
      next(e);
    }
  }

  async getDistrictDictionary(_req, res, next) {
    try {
      const dictItems = await dictionaryService.getDistrictDictionary();

      res.status(SUCCESS_CODE).json(dictItems);
    } catch (e) {
      next(e);
    }
  }

  async getEstablishmentTypeDictionary(_req, res, next) {
    try {
      const dictItems =
        await dictionaryService.getEstablishmentTypeDictionary();

      res.status(SUCCESS_CODE).json(dictItems);
    } catch (e) {
      next(e);
    }
  }

  async getSortType(_req, res, next) {
    try {
      const dictItems = await dictionaryService.getSortTypeDictionary();

      res.status(SUCCESS_CODE).json(dictItems);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DictionaryController();
