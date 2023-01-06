const express = require("express");
const {
  AddQuestion,
  GetSpecificQuestion,
  GetAllQuestions,
  ChangeQuestionStatus,
  DeleteQuestion,
  SearchQuestions,
} = require("../controllers/question/question.controller");
const questionValidation = require("../controllers/question/question.validator");

const QuestionRouter = express.Router();

QuestionRouter.post("/addQuestion", questionValidation, AddQuestion);
QuestionRouter.get("/getOneQuestion/:id", GetSpecificQuestion);
QuestionRouter.get("/getAllQuestions", GetAllQuestions);
QuestionRouter.patch("/changeStatus/:id", ChangeQuestionStatus);
QuestionRouter.delete("/deleteQuestion/:id", DeleteQuestion);
QuestionRouter.get("/searchQuestions", SearchQuestions);

module.exports = QuestionRouter;
