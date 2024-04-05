'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.Comment, { foreignKey: 'commentId' });
      Reply.hasMany(models.Reply, { as: 'Replies', foreignKey: 'parentId', onDelete: 'CASCADE' });
      Reply.belongsTo(models.Reply, { as: 'Parent', foreignKey: 'parentId',onDelete: 'CASCADE' });
    }
  }
  Reply.init({
    text: DataTypes.STRING,
    commentId: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reply',
  });
  return Reply;
};