  const { giveCardPermission } = require("../controllers/permission.controller");
const { verifyJwt } = require("../middleware/auth.middleware");
  const { userPermission } = require("../middleware/userPermission.middleware");
  
  const router = [
    {
      method: "PUT",
      path: "/cardpermission",
      options: {
        handler: giveCardPermission,
        pre: [
          {
            method: verifyJwt,
          }
        ],
      },
    },
  ];
  
  module.exports = router;
  