const { create, getBoards, givePermission } = require("../controllers/board.controller");
const { verifyJwt } = require("../middleware/auth.middleware");

const router = [
  {
    method: "POST",
    path: "/board/create",
    options: {
      handler: create,
      pre: [
        {
          method: verifyJwt
        }
      ]
    },
  },
  {
    method: "GET",
    path: "/board/get",
    options: {
      handler: getBoards,
      pre: [
        {
          method: verifyJwt
        }
      ]
    },
  },
  {
    method: "POST",
    path: "/board/permission",
    options: {
      handler: givePermission,
      pre: [
        {
          method: verifyJwt
        }
      ]
    },
  }
];

module.exports = router;
