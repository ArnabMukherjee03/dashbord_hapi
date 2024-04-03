const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../utils/Response");
const error = require("../utils/Error");


const register = async (req, res) => {
  try {
    const { email, password, name, role } = await req.payload;

    console.log(req.payload);

    const existedUser = await user.findOne({ where: { email } });

    if (existedUser) {
      throw new Error("User With this Email Already Exist");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await user.create(
      {
        name,
        email,
        role,
        password: hashedPass,
      },
      { returning: true }
    );

    return response(res, null, "User Created Successfully", 201);
  } catch (err) {
    console.log("123",err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = await req.payload;

    const userData = await user.findOne({
      where: { email },
    });

    if (!userData) {
      throw new Error("User Does Not Exist");
    }

    const isPassValid = await bcrypt.compare(password, userData.password);

    if (!isPassValid) {
      throw new Error("Invalid User Credentials");
    }

    const accessToken = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        name: userData.name,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const loggedinUser = await user.findOne({
      where: { id: userData.id },
      attributes: { exclude: ["password"] },
    });

    const options = {
      httpOnly: true,
      secure: true,
      path: "/",
    };

    return response(
      res,
      { user: loggedinUser },
      "User Loggedin Successfully",
      200,
      { accessToken }
    ).state("accessToken", accessToken, options);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      path: "/",
    };
    return response(res, null, "User Log Out Successfully", 200).unstate(
      "accessToken",
      options
    );
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const getUser = async (req, res) => {
  try {
    return response(res, { user: req.user }, "User Fetched Succesfully", 200);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};


const fetchUser = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: { exclude: ['password'] }
    })

    return response(res, { users: users }, "User Fetched Succesfully", 200);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};


module.exports = {
  register,
  login,
  logout,
  getUser,
  fetchUser
};
