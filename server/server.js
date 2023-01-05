const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./database/connection");
const constants = require("./utils/constants");

const app = express();

app.use(express.json());
app.use(cors());

// @import Routes
const QuestionRouter = require("./routes/question.routes");

// @define Routes
app.use(constants.API.PREFIX.concat("/question"), QuestionRouter);

const start = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    app.listen(PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT ${PORT}..!`);
      connection();
    });
  } catch (err) {
    console.log(err);
  }
};

start();
