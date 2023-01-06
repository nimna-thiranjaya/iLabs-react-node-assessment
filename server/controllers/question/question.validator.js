const { required } = require("joi");
const joi = require("joi");

const validation = joi.object({
  question: joi.string().trim(true).required(),
  category: joi.string().trim(true).required(),
  status: joi.string().trim(true).required(),
});

const questionValidation = async (req, res, next) => {
  const data = req.body;

  const { error } = validation.validate(data, { abortEarly: false });

  if (error) {
    return res.status(406).send({
      success: false,
      validationErrors: error.details,
    });
  } else {
    next();
  }
};

module.exports = questionValidation;
