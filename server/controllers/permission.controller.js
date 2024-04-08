const { where } = require("sequelize");
const {CardPermission,Board} = require("../models");
const error = require("../utils/Error");
const response = require("../utils/Response");

const giveCardPermission = async (req, res) => {
    try {
      const { permission, boardId } = req.payload;
      const board = await Board.findOne({
        where: { id: boardId },
      });
  
      if (board.dataValues.owner !== req.user.id) {
        throw new Error("This User dont have permission to give access");
      }

      const promises = [];
      for (const item of permission) {
        const existingData = CardPermission.findOne({ where: { userId: item.userId,taskId: item.taskId } });
        promises.push(existingData.then(existing => {
          if (existing) {
            return CardPermission.destroy({ where: { userId: item.userId,taskId: item.taskId } });
          } else {
            const new_item = {
              userId: item.userId,
              taskId: item.taskId
            }
            return CardPermission.create(new_item);
          }
        }));
      }
  
      await Promise.all(promises);
  
      return response(res, null, "Permission given", 201);
    } catch (err) {
      throw error({ message: err.message, status: "failure" }, err.message);
    }
  };

  module.exports = {
    giveCardPermission
  }