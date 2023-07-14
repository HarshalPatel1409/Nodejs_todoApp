import { User } from "../models/user.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // in model password select is false, so access it
    const user = await User.findOne({ email }).select("+ password");

    // if not present then error(calling from middleware/error.js)
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bycrypt.compare(password, user.password);

    // Checking the password(calling from middleware/error.js)
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome Back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check the user email in db
    let user = await User.findOne({ email });

    // if present then sent to login(calling from middleware/error.js)
    if (!user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bycrypt.hash(password, 10);

    // and if not then create one in db
    await User.create({ name, email, password: hashedPassword });

    // direct login and creating the cookie
    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

// My Data
export const getMyProfile = (req, res) => {
  // Authentication is done in "middleware/auth.js"
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// logout
export const logout = (req, res) => {
  // Authentication is done in "middleware/auth.js"
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
