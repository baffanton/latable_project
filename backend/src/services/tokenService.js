const jwt = require("jsonwebtoken");
const TokenModel = require("../models/TokenModel");

class TokenService {
  generateTokens(payload) {
    const { JWT_ACCESS_SECRET, JWT_REFRESH_TOKEN } = process.env;
  
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);

      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ where: { user_id: userId } });

    if (tokenData) {
      await tokenData.update({ refreshToken });

      return await tokenData.save();
    }

    const token = await TokenModel.create({ user_id: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.destroy({ where: { refreshToken } });

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ where: { refreshToken } });

    return tokenData;
  }
}

module.exports = new TokenService();