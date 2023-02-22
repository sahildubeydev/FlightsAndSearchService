const { City } = require("../models/index");

class CityRepository {
  // creating city.
  async createCity({ name }) {
    try {
      const city = await City.create({ name });
      return city;
    } catch (error) {
      console.log(
        "Something went wrong in the repository layer under creatCity"
      );
      throw { error };
    }
  }

  // deleting city.
  async deleteCity(cityId) {
    try {
      await City.destroy({
        where: {
          id: cityId,
        },
      });
      return true;
    } catch (error) {
      console.log(
        "Something went wrong in the repository layer under deleteCity"
      );
      throw { error };
    }
  }

  async updateCity(cityId, data) {
    try {
      const city = await City.update(data, {
        where: {
          id: cityId,
        },
      });
      return city;
    } catch (error) {
      console.log("Something went wrong in the repository layer");
      throw { error };
    }
  }

  async getCity(cityId) {
    try {
      const city = await City.findByPk(cityId);
      return City;
    } catch (error) {
      console.log("Something went wrong in the repository layer under getCity");
      throw { error };
    }
  }
}

module.exports = CityRepository;
