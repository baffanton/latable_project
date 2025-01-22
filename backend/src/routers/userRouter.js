const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/registration", userController.registrationAuthInfoStep);
userRouter.post("/registration/code", userController.registrationCodeStep);
userRouter.post("/registration/info", userController.registrationUserInfoStep);
userRouter.post("/registration/code-again", userController.sendCodeAgain);

userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);

userRouter.post("/recovery", userController.recoveryPasswordAuthInfoStep);
userRouter.post("/recovery/code", userController.recoveryPasswordCodeStep);
userRouter.post(
  "/recovery/password",
  userController.recoveryPasswordChangePasswordStep
);
userRouter.post("/recovery/code-again", userController.sendCodeAgain);

userRouter.post("/add-pin", userController.addToPinned);
userRouter.post("/remove-pin", userController.removeFromPinned);
userRouter.post("/check-pin", userController.checkPinned);
userRouter.post("/check-pin-list", userController.checkPinnedList);

module.exports = userRouter;
