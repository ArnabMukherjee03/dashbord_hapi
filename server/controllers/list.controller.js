const error = require("../utils/Error");
const response = require("../utils/Response");
const { Board,List,Card } = require("../models");



const getList = async (req,res) => {
  try {
    const {boardId} = req.params;

    const boards = await Board.findOne({
      where: { id:  boardId}, 
      include: [
        {
          model: List, 
          include: [
            {
              model: Card,
            },
          ],
        },
      ],
      order: [[{ model: List }, 'order', 'ASC'], [{ model: List, include: [{ model: Card }] }, { model: Card }, 'order', 'ASC']],
    });
    return response(res, {board: boards}, "List fetched Sucessfully", 201);
  } catch (err) {
    console.log("111",err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const dragAndDrop = async (req,res) => {
  try {
    const {data} = req.payload;

    for (const item of data) {
      if(item){
        await Card.update(item.update,{where: {id: item.cardId}})
      }
    }
    return response(res, {board: null}, "Card Reordered", 201);
  } catch (err) {
    console.log("111",err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const createList = async (req,res) => {
  try {
    await List.create(req.payload)
    return response(res, null, "List Created Sucessfully", 201);
  } catch (err) {
    console.log("111",err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const createCard = async (req,res) => {
  try {
    await Card.create(req.payload)
    return response(res, null, "Task Created Sucessfully", 201);
  } catch (err) {
    console.log("111",err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};


const updateCard = async (req,res) => {
  try {
    const {cardId} = req.params;
    await Card.update(req.payload,{where: {id:cardId}})
    return response(res, null, "Task Updated Sucessfully", 201);
  } catch (err) {
    console.log("111",err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

const deleteCard = async (req,res) => {
  try {
    const {cardId} = req.params;
    await Card.destroy({where: {id:cardId}})
    return response(res, null, "Task Updated Sucessfully", 201);
  } catch (err) {
    console.log("111",err.message);
    throw error({ message: err.message, status: "failure" }, err.message);
  }
};

module.exports = {
  getList,
  dragAndDrop,
  createList,
  createCard,
  updateCard,
  deleteCard
};
