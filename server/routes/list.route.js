const {
  getList,
  dragAndDrop,
  createList,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/list.controller");
const { verifyJwt } = require("../middleware/auth.middleware");
const { userPermission } = require("../middleware/userPermission.middleware");

const router = [
  {
    method: "GET",
    path: "/{boardId}/list",
    options: {
      handler: getList,
      pre: [
        {
          method: verifyJwt,
        },
        {
          method: userPermission,
        }
      ],
    },
  },
  {
    method: "PUT",
    path: "/card/draganddrop",
    options: {
      handler: dragAndDrop,
      pre: [
        {
          method: verifyJwt,
        },
        {
          method: userPermission,
        },
      ],
    },
  },
  {
    method: "POST",
    path: "/crete/list",
    options: {
      handler: createList,
      pre: [
        {
          method: verifyJwt,
        },
        {
          method: userPermission,
        },
      ],
    },
  },
  {
    method: "POST",
    path: "/crete/list/card",
    options: {
      handler: createCard,
      pre: [
        {
          method: verifyJwt,
        },
        {
          method: userPermission,
        },
      ],
    },
  },
  {
    method: "PUT",
    path: "/update/card/{cardId}",
    options: {
      handler: updateCard,
      pre: [
        {
          method: verifyJwt,
        },
        {
          method: userPermission,
        },
      ],
    },
  },
  {
    method: "DELETE",
    path: "/delete/card/{cardId}",
    options: {
      handler: deleteCard,
      pre: [
        {
          method: verifyJwt,
        },
        {
          method: userPermission,
        },
      ],
    },
  },
];

module.exports = router;
