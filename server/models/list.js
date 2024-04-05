'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.hasMany(models.Card,{
        foreignKey: "listId",
        onDelete: 'CASCADE'
      })
      List.belongsTo(models.Board,{
        foreignKey: "boardId",
        onDelete: 'CASCADE'
      })
    }
  }
  List.init({
    title: DataTypes.STRING,
    order: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};