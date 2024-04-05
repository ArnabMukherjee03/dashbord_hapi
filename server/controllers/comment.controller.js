const { where } = require("sequelize");
const { Comment,Reply } = require("../models");
const error = require("../utils/Error");
const response = require("../utils/Response");

const createComment = async(req,res)=>{
    try {
        console.log("comment",req.payload);
        await Comment.create(req.payload);
        return response(res, null, "Comment Created Successfully", 201);
    } catch (err) {
        throw error({ message: err.message, status: "failure" }, err.message);
    }
}

const createReply = async(req,res)=>{
    try {
        console.log("reply",req.payload);
        await Reply.create(req.payload)
        return response(res, null, "Comment Created Successfully", 201);
    } catch (err) {
        throw error({ message: err.message, status: "failure" }, err.message);
    }
}


const getComments = async(req,res)=>{
    try {
        const {cardId} = req.params;
        const comments = await Comment.findAll({
            where: {cardId: cardId},
            include: {
              model: Reply,
              as: 'Replies',
              include: {
                model: Reply,
                as: 'Replies' 
              }
            }
          });
        return response(res, {comments}, "Comment fetched Successfully", 201);
    } catch (err) {
        throw error({ message: err.message, status: "failure" }, err.message);
    }
}

const deleteComment = async(req,res)=>{
    try {
        const {id} = req.params;
        await Comment.destroy({
            where: {id: id}
        })
        return response(res, null, "Comment deleted Successfully", 201);
    } catch (error) {
    throw error({ message: err.message, status: "failure" }, err.message);
    }
}

module.exports = {
    createComment,
    createReply,
    getComments,
    deleteComment
}