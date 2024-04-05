'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Card,{foreignKey: 'cardId',onDelete: 'CASCADE'})
      Comment.hasMany(models.Reply, { as: 'Replies', foreignKey: 'commentId',onDelete: 'CASCADE' });
     
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};