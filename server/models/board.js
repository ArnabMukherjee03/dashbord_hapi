'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Board.belongsToMany(models.user,{
        through: 'UserBoardPermission',
        foreignKey: 'boardId'
      })
      Board.belongsTo(models.user,{
        foreignKey: "owner",
        onDelete: 'CASCADE'
      })
    }
  }
  Board.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    owner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};