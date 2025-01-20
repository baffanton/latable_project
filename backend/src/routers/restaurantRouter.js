const express = require("express");
const restaurantController = require("../controllers/restaurantController");

const restaurantRouter = express.Router();

restaurantRouter.post("/get-card", restaurantController.getRestaurantCard);
restaurantRouter.post("/create-review", restaurantController.createReview);
restaurantRouter.post("/update-review", restaurantController.updateReview);
restaurantRouter.post("/get-review", restaurantController.findReviewByIds);
restaurantRouter.post(
  "/get-restaurants-by-name",
  restaurantController.searchRestaurantsByName
);
restaurantRouter.get("/get-popular", restaurantController.getPopularList);
restaurantRouter.post(
  "/get-restaurants",
  restaurantController.getFilteredRestaurants
);

module.exports = restaurantRouter;
