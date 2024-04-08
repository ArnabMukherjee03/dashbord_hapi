const Boom = require('@hapi/boom')
const { UserBoardPermission,Board } = require('../models');



exports.userPermission = async (req, res) => {
  
   const {boardId} = req.payload || req.params;

   if(!boardId){
      throw Boom.badRequest('Please Provide BoardId')
   }


   const board = await Board.findOne({where: {
     id: boardId
   }})

   const permission = await UserBoardPermission.findOne({
    where:  {
        boardId: boardId,
        userId: req.user.id
    }
   })
   
   if(board.owner!==req.user.id){
      if(!permission){
          throw Boom.unauthorized("User don't have permission ")
      }
   }

  return res.continue
}
