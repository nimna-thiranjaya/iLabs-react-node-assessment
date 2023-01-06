const QuestionService = require("../../services/question.services");
const Questions = require("../../models/question.model");

//Create Question controller functions
const AddQuestion = async (req, res) => {
  try {
    const newQuestion = req.body;

    const question = new Questions(newQuestion);

    //save question
    const result = await QuestionService.save(question);

    //Check result and send response
    if (result) {
      return res.status(201).send({
        success: true,
        message: "Question created!",
      });
    } else {
      return res.status(400).send({
        success: true,
        message: "Question creating failed!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//Get specific Question by ID controller functions
const GetSpecificQuestion = async (req, res) => {
  try {
    //Get question id from path variable
    const id = req.params.id;
    const result = await QuestionService.questionFindByID(id);

    //Check result and send response
    if (result) {
      return res.status(201).send({
        success: true,
        question: result,
      });
    } else {
      return res.status(404).send({
        success: true,
        message: "Question not found!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//Get all Questions controller functions
const GetAllQuestions = async (req, res) => {
  try {
    const result = await QuestionService.findAllQuestions();

    //Check result and send response
    if (result) {
      return res.status(201).send({
        success: true,
        questions: result,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Questions not found!",
        questions: result,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//Change question status controller function
const ChangeQuestionStatus = async (req, res) => {
  try {
    //get question id from path variable
    const id = req.params.id;

    //validate question id
    const checkQuestion = await QuestionService.questionFindByID(id);

    if (!checkQuestion) {
      return res.status(404).send({
        success: false,
        message: "Question not found!",
      });
    } else {
      let updateData = "";

      if (
        checkQuestion.status === "Draft" ||
        checkQuestion.status === "Disabled"
      ) {
        updateData = {
          status: "Published",
        };
      } else {
        updateData = {
          status: "Disabled",
        };
      }

      await QuestionService.updateQuestion(id, updateData);
      return res.status(200).send({
        success: true,
        message: "Question status changed!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//Delete question by id function
const DeleteQuestion = async (req, res) => {
  try {
    //get question id from path variable
    const id = req.params.id;

    //validate question id
    const checkQuestion = await QuestionService.questionFindByID(id);

    if (!checkQuestion) {
      return res.status(404).send({
        success: false,
        message: "Question not found!",
      });
    } else {
      await QuestionService.deleteQuestionById(id);
      return res.status(200).send({
        success: true,
        message: "Question Deleted!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//Search question functions
const SearchQuestions = async (req, res) => {
  try {
    //get question id from path variable
    const searchKey = req.query.searchKey.toLowerCase();

    //Get all questions form db
    const allQuestions = await QuestionService.findAllQuestions();

    //Filter question using search key
    const searchResult = allQuestions.filter((question) =>
      question.question.toLowerCase().includes(searchKey)
    );

    return res.status(200).send({
      success: true,
      result: searchResult,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  AddQuestion,
  GetSpecificQuestion,
  GetAllQuestions,
  ChangeQuestionStatus,
  DeleteQuestion,
  SearchQuestions,
};
