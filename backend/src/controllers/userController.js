const PinnedRestaurantModel = require("../models/PinnedRestaurantModel");
const userService = require("../services/userService");
const SUCCESS_CODE = require("../shared/constants");

class UserController {
  //
  // Регистрация
  //

  // Регистрация. Шаг "Данные для авторизации"

  async registrationAuthInfoStep(req, res, next) {
    try {
      const { email, password } = req.body;

      const newUserId = await userService.registrationAuthInfoStep(
        email,
        password
      );

      res.status(SUCCESS_CODE).send({ id: newUserId });
    } catch (e) {
      next(e);
    }
  }

  // Регистрация. Шаг "Проверка кода"

  async registrationCodeStep(req, res, next) {
    try {
      const { id, code } = req.body;

      await userService.registrationCodeStep(id, code);

      res.set({ "Content-Type": "text/plain" });

      res.sendStatus(SUCCESS_CODE);
    } catch (e) {
      next(e);
    }
  }

  // Регистрация. Шаг "Данные о пользователе"

  async registrationUserInfoStep(req, res, next) {
    try {
      const userModel = await userService.registrationUserInfoStep(req.body);

      res.cookie("refreshToken", userModel.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(SUCCESS_CODE).json(userModel);
    } catch (e) {
      next(e);
    }
  }

  //
  // Авторизация
  //

  // Авторизация. Вход в аккаунт

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userModel = await userService.login(email, password);

      res.cookie("refreshToken", userModel.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(SUCCESS_CODE).json(userModel);
    } catch (e) {
      next(e);
    }
  }

  // Авторизация. Выход из аккаунта

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      userService.logout(refreshToken);

      res.clearCookie("refreshToken");

      return res.sendStatus(SUCCESS_CODE);
    } catch (e) {
      next(e);
    }
  }

  //
  // Забыли пароль
  //

  // Забыли пароль. Шаг "Данные для авторизации"

  async recoveryPasswordAuthInfoStep(req, res, next) {
    try {
      const { email, _phone } = req.body;

      const { id } = await userService.findUserByEmail(email);
      const code = userService.generateCode();

      await userService.updateUserById(id, { code });

      await userService.sendCode(email, code, "recovery");

      res.status(SUCCESS_CODE).send({ id });
    } catch (e) {
      next(e);
    }
  }

  // Забыли пароль. Шаг "Проверка кода"

  async recoveryPasswordCodeStep(req, res, next) {
    try {
      const { id, code } = req.body;

      const user = await userService.findUserByPk(id);

      await userService.checkCode(user, code);

      res.sendStatus(SUCCESS_CODE);
    } catch (e) {
      next(e);
    }
  }

  // Забыли пароль. Шаг "Смена пароля"

  async recoveryPasswordChangePasswordStep(req, res, next) {
    try {
      const { id, password } = req.body;

      const hashPassword = await userService.generateHashPassword(password);

      await userService.updateUserById(id, { password: hashPassword });

      res.sendStatus(SUCCESS_CODE);
    } catch (e) {
      next(e);
    }
  }

  // Помощь. Отправить код снова
  async sendCodeAgain(req, res, next) {
    try {
      const { id } = req.body;

      await userService.sendCodeAgain(id);

      res.sendStatus(SUCCESS_CODE);
    } catch (e) {
      next(e);
    }
  }

  // Токен. Обновление
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userModel = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userModel.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(SUCCESS_CODE).json(userModel);
    } catch (e) {
      next(e);
    }
  }

  // Ресторан. Добавление в избранное
  async addToPinned(req, res, next) {
    try {
      const { userId, restaurantId } = req.body;

      await PinnedRestaurantModel.create({
        user_id: userId,
        restaurant_id: restaurantId,
      });

      res.sendStatus(SUCCESS_CODE);
    } catch (e) {
      next(e);
    }
  }

  // Ресторан. Убрать из избранного
  async removeFromPinned(req, res, next) {
    try {
      const { userId, restaurantId } = req.body;

      const findedReview = await PinnedRestaurantModel.findAll({
        where: {
          user_id: userId,
          restaurant_id: restaurantId,
        },
      });

      if (!findedReview) {
        res.sendStatus(400);
        return;
      }

      await findedReview.destroy();

      res.status(SUCCESS_CODE);
    } catch (e) {
      next(e);
    }
  }

  // Ресторан. Проверка есть ли в избранных
  async checkPinned(req, res, next) {
    try {
      const { userId, restaurantId } = req.body;

      const findedReview = await PinnedRestaurantModel.findOne({
        where: {
          user_id: userId,
          restaurant_id: restaurantId,
        },
      });

      console.log(findedReview);

      res.status(SUCCESS_CODE).json({ data: !!findedReview });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
