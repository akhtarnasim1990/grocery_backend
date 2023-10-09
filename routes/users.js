var express = require("express");
var userRouter = express.Router();
const { userSignUp, userLogin } = require("../controller/userController");

/* GET users listing. */
userRouter.post("/signUp", userSignUp);
userRouter.post("/login", userLogin);

module.exports = userRouter;
