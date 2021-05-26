import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { addNewQuestion } from "../../Redux/Actions";
import { useHistory, useLocation } from "react-router-dom";

export default function QuestionAddForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.users.currentUser);
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  function onChange(event) {
    const { id, value } = event.target;
    if (id == "optionOne") {
      setOptionOne(value);
    } else {
      setOptionTwo(value);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const question = {
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: user.id,
    };
    dispatch(addNewQuestion(question));
    history.push("/");
  }

  return (
    <div>
      <h1>Would Your Rather?</h1>
      <Form>
        <Form.Group>
          <Form.Label>Option 1:</Form.Label>
          <Form.Control
            id="optionOne"
            type="text"
            placeholder="Enter First Option"
            onChange={onChange}
            value={optionOne}
          />
          <Form.Label>Option 2:</Form.Label>
          <Form.Control
            id="optionTwo"
            type="text"
            placeholder="Enter Second Option"
            onChange={onChange}
            value={optionTwo}
          />
        </Form.Group>
        <Button type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
