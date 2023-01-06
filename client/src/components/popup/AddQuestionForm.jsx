import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { categories } from "../../data/questionCategories";

const AddQuestionForm = ({ onHide }) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState({
    question: "",
    category: "",
  });

  const addQuestion = async (status) => {
    await axios
      .post(`question/addQuestion`, {
        question: question,
        category: category,
        status: status,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("question added successfully");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          const errors = err.response.data.validationErrors;

          let question = "";
          let category = "";
          errors.forEach((e) => {
            console.log(e);
            console.log(e.context.key);
            switch (e.context.key) {
              case "question":
                if ((e.type = "string.empty")) {
                  question = "Question required";
                }
                break;

              case "category":
                if ((e.type = "string.empty")) {
                  category = "Category required";
                }
                break;

              default:
                break;
            }
          });
          setError({
            question: question,
            category: category,
          });
        }
      });
  };

  const handlePublish = async () => {
    addQuestion("Published");
  };

  const handleSaveDraft = async () => {
    addQuestion("Draft");
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Your Questions</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        {error && (
          <Form.Text className="text-danger">{error.question}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Question Category</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Form.Select>
        {error && (
          <Form.Text className="text-danger">{error.category}</Form.Text>
        )}
      </Form.Group>
      <div className=" text-center mt-4">
        <Button variant="secondary" onClick={handleSaveDraft}>
          save as Draft
        </Button>
        &nbsp;&nbsp;
        <Button variant="primary" onClick={handlePublish}>
          Publish
        </Button>
      </div>
    </Form>
  );
};

export default AddQuestionForm;
