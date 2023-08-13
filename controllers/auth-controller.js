const bcrypt = require("bcryptjs");
const dotenv = require("dotenv/config");
const jwt = require("jsonwebtoken");

const { User } = require("../models/index");
const HttpError = require("../helpers/index");
const { ctrlWrapper } = require("../decorators/index");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription
  });
}
const signin = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = {
    id: user._id
  }
  
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" })
  await User.findByIdAndUpdate(user._id, {token});
  
  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription:
      user.subscription
    }
  });
}

const getCurrent = (req, res) => {
  const { email } = req.user;
  
  res.json({
    email,
  })
}
const signout = async (req, res) => {
  const {_id}=req.user;
  await User.findByIdAndUpdate(_id, {token:""});
  res.status(204).json({
    message: "Logout success"
  })
}

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
