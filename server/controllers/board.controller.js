const { where } = require("sequelize");
const { Board, UserBoardPermission, user } = require("../models");
const error = require("../utils/Error");
const response = require("../utils/Response");

const create = async (req, res) => {
  try {
    await Board.create({ ...req.payload, owner: req.user.dataValues.id });
    return response(res, null, "Board Created Successfully", 201);
  } catch (err) {
    console.log("123", err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: {owner: req.user.id}
    })

    const userPermissions = await UserBoardPermission.findAll({
      where: { userId: req.user.id }
    });
    
    // Extract the boardIds from the userPermissions
    const boardIds = userPermissions.map(permission => permission.boardId);

    const boardsWithPermissions = await Board.findAll({
      where: { id: boardIds }
    });


    return response(res, { boards: [...boards,...boardsWithPermissions] }, "Board Created Successfully", 201);
  } catch (err) {
    console.log("123", err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const givePermission = async (req, res) => {
  try {
    const { permission, boardId } = req.payload;
    const board = await Board.findOne({
      where: { id: boardId },
    });

    // console.log(board.dataValues.owner,req.user.id);

    if (board.dataValues.owner !== req.user.id) {
      throw new Error("This User dont have permission to give access");
    }

    await UserBoardPermission.bulkCreate(permission);

    return response(res, null, "Permission given", 201);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const getPermissionUser = async (req,res)=>{
  try {
    const {boardId } = req.params;

    const data =  await UserBoardPermission.findAll({
       where: {boardId: boardId}
    });

    const board = await Board.findOne({
       where: {id: boardId}
    })

    const userIds = data.map(data => data.userId);

    const Users = await user.findAll({
      where: { id: [...userIds,board.owner] },
      attributes: { exclude: ['password'] }
    });

   

    return response(res, {Users}, "Permission given", 201);
  } catch (err) {
    throw error({ message: err.message, status: "failure" }, err.message);
  }

}

module.exports = {
  create,
  getBoards,
  givePermission,
  getPermissionUser
};
