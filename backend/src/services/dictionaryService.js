const DistrictModel = require("../models/DistrictModel");
const EstablishmentTypeModel = require("../models/EstablishmentTypeModel");

class DictionaryService {
  async getAgeDictionary() {
    let agesDictionary = [];
    const from = 10;
    const to = 70;

    for (let current = from; current <= to; current++) {
      agesDictionary.push({
        label: String(current),
        value: current,
      });
    }

    return agesDictionary;
  }

  async getGenderDictionary() {
    const genderDictionary = [
      { label: "Мужской", value: "мужчина" },
      { label: "Женский", value: "женщина" },
    ];

    return genderDictionary;
  }

  async getCuisineDictionary() {
    const cuisineValues = await CuisineModel.findAll();

    const cuisineDictionary = cuisineValues.map((cuisine) => ({
      label: cuisine.name,
      value: cuisine.id,
    }));

    return cuisineDictionary;
  }

  async getDistrictDictionary() {
    const districtValues = await DistrictModel.findAll();

    const districtDictionary = districtValues.map((district) => ({
      label: district.name,
      value: district.id,
    }));

    return districtDictionary;
  }

  async getEstablishmentTypeDictionary() {
    const establishmentTypeValues = await EstablishmentTypeModel.findAll();

    const establishmentTypeDictionary = establishmentTypeValues.map(
      (establishmentType) => ({
        label: establishmentType.name,
        value: establishmentType.id,
      })
    );

    return establishmentTypeDictionary;
  }
}

module.exports = new DictionaryService();
