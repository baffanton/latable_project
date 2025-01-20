const restaurantService = require("../services/restaurantService");
const userService = require("../services/userService");
const SUCCESS_CODE = require("../shared/constants");
const restaurantDto = require("../dtos/restaurantDto");

class RestaurantController {
  async getRestaurantCard(req, res, next) {
    try {
      const { id } = req.body;

      const restaurantData = await restaurantService.getRestaurant(id);
      const workModeData = await restaurantService.getWorkMode(id);
      const reviewsData = await restaurantService.getRating(id);
      const additionalNames = await restaurantService.getAdditionalNames(id);

      const restaurantModel = {
        ...restaurantDto(restaurantData),
        workMode: workModeData,
        rating: reviewsData,
        ...additionalNames,
      };

      res.status(SUCCESS_CODE).json(restaurantModel);
    } catch (e) {
      next(e);
    }
  }

  async createReview(req, res, next) {
    try {
      const createdReview = await restaurantService.createReview(req.body);

      const { id, user_id, score, review, publication_date } = createdReview;

      const reviewUser = await userService.findUserByPk(user_id);

      res.status(SUCCESS_CODE).json({
        reviewId: id,
        userName: `${reviewUser.surname} ${reviewUser.name}`,
        publicationDate: publication_date,
        ratingScore: score,
        reviewText: review,
      });
    } catch (e) {
      next(e);
    }
  }

  async updateReview(req, res, next) {
    try {
      const updatedReview = await restaurantService.updateReview(req.body);

      const { id, user_id, score, review, publication_date } = updatedReview;

      const reviewUser = await userService.findUserByPk(user_id);

      res.status(SUCCESS_CODE).json({
        reviewId: id,
        userName: `${reviewUser.surname} ${reviewUser.name}`,
        publicationDate: publication_date,
        ratingScore: score,
        reviewText: review,
      });
    } catch (e) {
      next(e);
    }
  }

  async findReviewByIds(req, res, next) {
    try {
      const findedReview = await restaurantService.findReview(req.body);

      if (!findedReview) {
        res.status(SUCCESS_CODE);
        return;
      }

      const { id, user_id, score, review, publication_date } = findedReview;

      const reviewUser = await userService.findUserByPk(user_id);

      res.status(SUCCESS_CODE).json({
        reviewId: id,
        userName: `${reviewUser.surname} ${reviewUser.name}`,
        publicationDate: publication_date,
        ratingScore: score,
        reviewText: review,
      });
    } catch (e) {
      next(e);
    }
  }

  async searchRestaurantsByName(req, res, next) {
    try {
      const { searchValue } = req.body;

      const restaurantList = await restaurantService.findByPartOfName(
        searchValue
      );

      res.status(SUCCESS_CODE).json({ data: restaurantList });
    } catch (e) {
      next(e);
    }
  }

  async getRestaurantsBySortAndFilter(req, res, next) {
    try {
      const { filters, sorter, pagination } = req.body;

      const restaurantsList = await restaurantService.findByFilters(
        filters,
        sorter,
        pagination
      );

      res.status(SUCCESS_CODE).json({ data: restaurantsList });
    } catch (e) {
      next(e);
    }
  }

  async getPopularList(_req, res, next) {
    try {
      const restaurantsList = await restaurantService.getPopularList();

      const mappedRestaurantList = await Promise.all(
        restaurantsList.map(async (restaurant) => {
          const restId = restaurant.dataValues.id;

          const workModeData = await restaurantService.getWorkMode(restId);
          const reviewsData = await restaurantService.getRating(restId);
          const additionalNames = await restaurantService.getAdditionalNames(
            restId
          );

          return {
            ...restaurantDto(restaurant.dataValues),
            workMode: workModeData,
            rating: reviewsData,
            ...additionalNames,
          };
        })
      );

      res.status(SUCCESS_CODE).json({ data: mappedRestaurantList });
    } catch (e) {
      next(e);
    }
  }

  async getFilteredRestaurants(req, res, next) {
    try {
      console.log(req.body);
      const { searchValue, pagination, filters } = req.body;

      const { restaurants, total } =
        await restaurantService.getFilteredRestaurants(
          searchValue,
          filters,
          pagination
        );

      const mappedRestaurantList = await Promise.all(
        restaurants.map(async (restaurant) => {
          const restId = restaurant.dataValues.id;

          const workModeData = await restaurantService.getWorkMode(restId);
          const reviewsData = await restaurantService.getRating(restId);
          const additionalNames = await restaurantService.getAdditionalNames(
            restId
          );

          return {
            ...restaurantDto(restaurant.dataValues),
            workMode: workModeData,
            rating: reviewsData,
            ...additionalNames,
          };
        })
      );

      res.status(SUCCESS_CODE).json({ data: mappedRestaurantList, total });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RestaurantController();
