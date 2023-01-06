const Questions = require("../models/question.model");
const save = async (questionData) => {
  return await Questions.create(questionData);
};

const questionFindByID = async (id) => {
  return await Questions.findById(id);
};

const findAllQuestions = async () => {
  return await Questions.find().sort({
    createdAt: -1,
  });
};

const updateQuestion = async (id, updatedQuestion) => {
  return await Questions.findByIdAndUpdate(id, updatedQuestion);
};

const deleteQuestionById = async (id) => {
  return await Questions.findByIdAndDelete(id);
};

module.exports = {
  save,
  questionFindByID,
  findAllQuestions,
  updateQuestion,
  deleteQuestionById,
};
