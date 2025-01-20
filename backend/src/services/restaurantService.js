const CuisineModel = require("../models/CuisineModel");
const DistrictModel = require("../models/DistrictModel");
const EstablishmentTypeModel = require("../models/EstablishmentTypeModel");
const RestaurantModel = require("../models/RestaurantModel");
const RestaurantReviewModel = require("../models/RestaurantReviewModel");
const UserModel = require("../models/UserModel");
const WorkModeModel = require("../models/WorkModeModel");
const { BadRequest } = require("../utils/errors");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getWorkMode = (workModeData) => {
  const days = {
    1: "Пн",
    2: "Вт",
    3: "Ср",
    4: "Чт",
    5: "Пт",
    6: "Сб",
    7: "Вс",
  };

  return workModeData.map(({ weekdays, time_from, time_to }) => {
    const firstDay = days[weekdays[0]];
    const lastDay = days[weekdays[weekdays.length - 1]];

    return {
      firstDay,
      lastDay,
      timeFrom: time_from.substring(0, 5),
      timeTo: time_to.substring(0, 5),
    };
  });
};

class RestaurantService {
  async getRestaurant(id) {
    const restaurant = await RestaurantModel.findByPk(id);

    if (!restaurant) {
      throw new BadRequest(`Ресторана с id = ${id} не существует`);
    }

    return restaurant;
  }

  async getCuisineName(cuisineId) {
    const cuisine = await CuisineModel.findByPk(cuisineId);

    if (!cuisine) {
      throw new BadRequest(`Типа кухни не существует`);
    }

    return cuisine;
  }

  async getDistrictName(districtId) {
    const district = await DistrictModel.findByPk(districtId);

    if (!district) {
      throw new BadRequest(`Района не существует`);
    }

    return district;
  }

  async getEstablishmentTypeName(establishmentTypeId) {
    const establishmentType = await EstablishmentTypeModel.findByPk(
      establishmentTypeId
    );

    if (!establishmentType) {
      throw new BadRequest(`Типа заведения не существует`);
    }

    return establishmentType;
  }

  async getWorkMode(restaurantId) {
    const workMode = await WorkModeModel.findAll({
      where: { restaurant_id: restaurantId },
    });

    if (!workMode) {
      throw new BadRequest("Не существует такого режима работы");
    }

    return getWorkMode(workMode);
  }

  async getRating(restaurantId) {
    const reviewList = await RestaurantReviewModel.findAll({
      where: { restaurant_id: restaurantId },
    });

    if (!reviewList) {
      return { totalRating: 0, reviewCount: 0, comments: [] };
    }

    return reviewList.reduce(
      async (acc, currentReview) => {
        const { user_id, rating, comment, publication_date } = currentReview;

        const awaitAcc = await acc;

        if (!comment) {
          return {
            totalRating:
              (awaitAcc.totalRating + rating) / (awaitAcc.reviewCount + 1),
            reviewCount: awaitAcc.reviewCount + 1,
            comments: awaitAcc.comments,
          };
        }

        const reviewUser = await UserModel.findByPk(user_id);

        if (!reviewUser) {
          throw new BadRequest("Пользователь не найден");
        }

        const { name, surname } = reviewUser;

        return {
          totalRating:
            (awaitAcc.totalRating + rating) / (awaitAcc.reviewCount + 1),
          reviewCount: awaitAcc.reviewCount + 1,
          comments: [
            ...awaitAcc.comments,
            {
              userName: `${surname} ${name}`,
              publicationDate: publication_date,
              rating: rating,
              comment: comment,
            },
          ],
        };
      },
      { totalRating: 0, reviewCount: 0, comments: [] }
    );
  }

  async createReview(reviewInfo) {
    const { userId, restaurantId, ratingScore, reviewText } = reviewInfo;

    const date = new Date().toLocaleDateString("ru-RU");

    const newReview = await RestaurantReviewModel.create({
      user_id: userId,
      restaurant_id: restaurantId,
      score: ratingScore,
      review: reviewText,
      publication_date: date,
    });
    return newReview;
  }

  async updateReview(reviewInfo) {
    const { reviewId, ratingScore, reviewText } = reviewInfo;

    const review = await RestaurantReviewModel.findByPk(reviewId);

    if (!review) {
      throw BadRequest("Не найдено");
    }

    const date = new Date().toLocaleDateString("ru-RU");

    await review.update({
      score: ratingScore,
      review: reviewText,
      publication_date: date,
    });
    await review.save();

    return review;
  }

  async findReview(reviewIds) {
    const { userId, restaurantId } = reviewIds;

    const review = await RestaurantReviewModel.findOne({
      where: { user_id: userId, restaurant_id: restaurantId },
    });

    return review;
  }

  async findByPartOfName(searchValue) {
    const restaurantList = await RestaurantModel.findAll({
      where: { name: { [Op.like]: `%${searchValue}%` } },
    });

    return restaurantList;
  }

  async getAdditionalNames(restaurantId) {
    const restaurant = await RestaurantModel.findByPk(restaurantId);

    if (!restaurant) {
      throw new BadRequest("Ресторан не найден");
    }

    const { cuisine_id, establishment_type_id, district_id } = restaurant;

    return {
      cuisine: (await this.getCuisineName(cuisine_id)).name,
      establishmentType: (
        await this.getEstablishmentTypeName(establishment_type_id)
      ).name,
      district: (await this.getDistrictName(district_id)).name,
    };
  }

  async findByFilters(filters, sorter, pagination) {
    const whereModel = filters.reduce((acc, filterItem) => {
      const { value, field, mode } = filterItem;

      if (mode === "IsEqual") {
        return {
          ...acc,
          [field]: {
            [Op.or]: value,
          },
        };
      }

      if (mode === "GreaterThanOrEqualTo") {
        return {
          ...acc,
          [field]: {
            [Op.gte]: value,
          },
        };
      }

      if (mode === "LessThanOrEqualTo") {
        return {
          ...acc,
          [field]: {
            [Op.lte]: value,
          },
        };
      }

      throw new BadRequest("Ошибочное построение фильтра");
    }, {});

    const filteredRestaurants = await RestaurantModel.findAll({
      where: whereModel,
    });

    return filteredRestaurants;
  }

  async getPopularList() {
    const restaurants = await RestaurantModel.findAll();
    const restaurantsReview = await RestaurantReviewModel.findAll();

    const restaurantsRating = restaurants.map((rest) => {
      const reviews = restaurantsReview.filter(
        (restReview) => restReview.restaurant_id === rest.id
      );

      if (!reviews.length) {
        return {
          ...rest,
          ratingValue: 0,
        };
      }

      return {
        ...rest,
        ratingValue: reviews.reduce((acc, review) => acc + review.rating, 0),
      };
    });

    const sortedRestaurantsRating = restaurantsRating.sort((a, b) => a - b);
    const limitedRestaurantsRating = sortedRestaurantsRating.slice(0, 10);

    return limitedRestaurantsRating;
  }

  async getFilteredRestaurants(searchValue, filters, pagination) {
    const mappedFields = filters.map((filter) => {
      if (filter.field === "establishmentTypeId") {
        return { ...filter, field: "establishment_type_id" };
      }

      if (filter.field === "cuisineId") {
        return { ...filter, field: "cuisine_id" };
      }

      if (filter.field === "districtId") {
        return { ...filter, field: "district_id" };
      }

      return filter;
    });

    const filteredModel = mappedFields.reduce((acc, { field, mode, value }) => {
      if (mode === "IsEqual") {
        return {
          ...acc,
          [field]: {
            [Op.eq]: value,
          },
        };
      }

      if (mode === "GreaterThanOrEqualTo") {
        return {
          ...acc,
          [field]: {
            [Op.gte]: value,
          },
        };
      }

      if (mode === "LessThanOrEqualTo") {
        return {
          ...acc,
          [field]: {
            [Op.lte]: value,
          },
        };
      }
    }, {});

    const withSearch =
      searchValue === ""
        ? filteredModel
        : { ...filteredModel, name: { [Op.like]: `%${searchValue}%` } };

    const total = await RestaurantModel.count({ where: withSearch });

    const findedRestaurants = await RestaurantModel.findAll({
      limit: pagination.limit,
      offset: pagination.offset,
      where: withSearch,
    });

    return { restaurants: findedRestaurants, total };
  }
}

module.exports = new RestaurantService();
