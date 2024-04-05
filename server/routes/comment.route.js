
  const { createComment, createReply, getComments, deleteComment } = require("../controllers/comment.controller");
const { verifyJwt } = require("../middleware/auth.middleware");
//   const { userPermission } = require("../middleware/userPermission.middleware");
  
  const router = [
    {
      method: "POST",
      path: "/create/comment",
      options: {
        handler: createComment,
        pre: [
          {
            method: verifyJwt,
          }
        ],
      },
    },
    {
        method: "POST",
        path: "/create/reply",
        options: {
          handler: createReply,
          pre: [
            {
              method: verifyJwt,
            }
          ],
        },
      },
      {
        method: "GET",
        path: "/comments/{cardId}",
        options: {
          handler: getComments,
          pre: [
            {
              method: verifyJwt,
            }
          ],
        },
      },
      {
        method: "DELETE",
        path: "/comment/{id}",
        options: {
          handler: deleteComment,
          pre: [
            {
              method: verifyJwt,
            }
          ],
        },
      }
  ];
  
  module.exports = router;
  