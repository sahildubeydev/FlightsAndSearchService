const { Op } = require("sequelize");

const { City } = require("../models/index");

class CityRepository {
  // creating city.
  async createCity({ name }) {
    try {
      const city = await City.create({ name });
      return city;
    } catch (error) {
      console.log(
        "Something went wrong in the repository layer inside createCity"
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
        "Something went wrong in the repository layer inside   deleteCity"
      );
      throw { error };
    }
  }

  async updateCity(cityId, data) {
    try {
      // The below approach also works but will not return updated object
      // If we are using PgSQL then returning: true can be used, else not
      // const city = await City.update(data, {
      //   where: {
      //     id: cityId,
      //   },
      // });

      // for getting updated data in mysql we use the below approach
      const city = await City.findByPk(cityId);
      city.name = data.name;
      await city.save();
      return city;
    } catch (error) {
      console.log(
        "Something went wrong in the repository layer inside updateCity"
      );
      throw { error };
    }
  }

  async getCity(cityId) {
    try {
      const city = await City.findByPk(cityId);
      return city;
    } catch (error) {
      console.log(
        "Something went wrong in the repository layer inside getCity"
      );
      throw { error };
    }
  }

  async getAllCities(filter) {
    // filter can be empty also
    try {
      if (filter.name) {
        const cities = await City.findAll({
          where: {
            name: {
              [Op.startsWith]: filter.name,
            },
          },
        });
        return cities;
      }
      const citites = await City.findAll();
      return citites;
    } catch (error) {
      console.log(
        "Something went wrong in the repository layer inside getAllCities"
      );
      throw { error };
    }
  }
}

module.exports = CityRepository;
