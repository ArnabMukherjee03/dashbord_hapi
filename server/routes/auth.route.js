const { register, login, logout, getUser, fetchUser } = require("../controllers/auth.controller");
const { verifyJwt } = require("../middleware/auth.middleware");

const router = [
  {
    method: "POST",
    path: "/auth/register",
    options: {
      handler: register,
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    options: {
      handler: login,
    },
  },
  {
    method: "GET",
    path: "/auth/logout",
    options: {
      handler: logout,
    },
  },
  {
    method: "GET",
    path: "/auth/user",
    options: {
      handler: getUser,
      pre: [
        {
          method: verifyJwt
        }
      ]
    },
  },
  {
    method: "GET",
    path: "/users",
    options: {
      handler: fetchUser,
    },
  }
];

module.exports = router;
