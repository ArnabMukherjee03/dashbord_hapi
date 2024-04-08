'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Card.belongsTo(models.List,{
        foreignKey: "listId",
        onDelete: 'CASCADE'
      })
      Card.hasMany(models.Comment,{
        foreignKey: "cardId",
        onDelete: 'CASCADE'
      })
      Card.belongsToMany(models.user,{
        through: 'CardPermission',
        foreignKey: 'taskId'
      })
    }
  }
  Card.init({
    title: DataTypes.STRING,
    order: DataTypes.INTEGER,
    listId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};