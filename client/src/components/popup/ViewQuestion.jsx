import React, { useState, useEffect } from "react";
import axios from "axios";
const moment = require("moment");

const ViewQuestion = ({ id }) => {
  const [question, setQuestion] = useState("");

  const GetSpecificQuestion = async () => {
    await axios
      .get(`question/getOneQuestion/${id}`)
      .then((res) => {
        if (res.data.success) {
          setQuestion(res.data.question);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetSpecificQuestion();
  }, []);

  return (
    <div>
      Question : {question.question}
      <br />
      Category : {question.category} <br />
      Created Date : {moment(question.createdAt).format("MM/DD/YYYY")}
      <br />
    </div>
  );
};

export default ViewQuestion;
