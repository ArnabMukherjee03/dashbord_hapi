const { where } = require("sequelize");
const { Board, UserBoardPermission, Sequelize } = require("../models");
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

    const boardsWithPermissions = await Board.findAll({
      include: [{
        model: UserBoardPermission,
        where: { userId: req.user.id }
      }]
    });

    // console.log(boardsWithPermissions);
    return response(res, { boards: boards }, "Board Created Successfully", 201);
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

module.exports = {
  create,
  getBoards,
  givePermission,
};
