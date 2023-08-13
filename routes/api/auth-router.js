const express = require("express");
const { validateBody } = require("../../decorators/index");
const { userSchemas } = require("../../schemas/index");
const { authController } = require("../../controllers/index");
const { authenticate } = require("../../middlewares/index")

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchemas.userSignupSchema), authController.signup);
authRouter.post("/login", validateBody(userSchemas.userSignupSchema), authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);

module.exports = authRouter;