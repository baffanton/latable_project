const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const userDto = require("../dtos/userDto");
const { BadRequest, AuthorizedError } = require("../utils/errors");

const generateRandomCode = () => {
  const min = 100000;
  const max = 999999;

  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

const DEFAULT_PASSWORD_SALT = 3;

class UserService {
  async generateHashPassword(password, salt) {
    return await bcrypt.hash(password, salt || DEFAULT_PASSWORD_SALT);
  }

  async registrationAuthInfoStep(email, password) {
    const candidate = await UserModel.findOne({
      where: { email },
    });

    console.log(candidate);

    // TODO: Переделать дату
    if (candidate) {
      if (
        new Date() - candidate.createdAt - 18000000 < 600000 &&
        candidate.registered
      ) {
        throw new BadRequest(
          "Пользователь с данным электронным адресом уже существует. Войдите в систему или попробуйте другой электронный адрес!"
        );
      }

      await candidate.destroy();
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const regCode = generateRandomCode();
    const userId = uuid.v4();

    const newUser = await UserModel.create({
      id: userId,
      email,
      password: hashPassword,
      code: regCode,
    });

    await mailService.sendCode(email, regCode);

    return newUser.id;
  }

  async registrationCodeStep(userId, code) {
    const user = await UserModel.findByPk(userId);

    if (user.code !== code) {
      throw new BadRequest("Введен не верный код. Попробуйте ещё раз!");
    }
  }

  async registrationUserInfoStep(userInfo) {
    const { id, name, surname, age, gender } = userInfo;

    const regUser = await UserModel.findByPk(id);

    await regUser.update({ name, surname, age, gender, registered: true });
    await regUser.save();

    const tokens = tokenService.generateTokens({ id, email: regUser.email });

    await tokenService.saveToken(id, tokens.refreshToken);

    const updatedUser = userDto(regUser);

    return { ...tokens, user: updatedUser };
  }

  async sendCodeAgain(userId) {
    const user = await UserModel.findByPk(userId);

    const { email, code } = user;

    await mailService.sendCode(email, code);
  }

  async login(email, password) {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw new BadRequest(
        "Пользователь с таким электронным адресом не существует"
      );
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw new BadRequest("Введены не верные данные. Попробуйте ещё раз!");
    }

    const tokens = tokenService.generateTokens({ id: user.id, email });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    const updatedUser = userDto(user);

    return { ...tokens, user: updatedUser };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new AuthorizedError("Пользователь не авторизован");
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new AuthorizedError("Пользователь не авторизован");
    }

    const user = await UserModel.findByPk(userData.id);
    const tokens = tokenService.generateTokens({
      id: user.id,
      email: user.email,
    });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    const updatedUser = userDto(user);

    return { ...tokens, user: updatedUser };
  }

  async findUserByEmail(email) {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw new BadRequest(
        "Пользователя с такими электронным адресом не существует"
      );
    }

    return user;
  }

  async findUserByPk(id) {
    const user = await UserModel.findByPk(id);

    if (!user) {
      throw new BadRequest("Пользователь не существует");
    }

    return user;
  }

  generateCode() {
    return generateRandomCode();
  }

  async sendCode(email, code, templateName) {
    await mailService.sendCode(email, code, templateName);
  }

  async updateUserById(userId, params) {
    const user = await UserModel.findByPk(userId);

    if (!user) {
      throw new BadRequest("Пользователя не существует");
    }

    await user.update({ ...params });
    await user.save();
  }

  async checkCode(user, code) {
    if (user.code !== code) {
      throw new BadRequest("Введен не верный код. Попробуйте ещё раз!");
    }
  }

  async;
}

module.exports = new UserService();
