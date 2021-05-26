import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams, Redirect } from "react-router-dom";
import { answerQuestion } from "../../Redux/Actions";
import User from "../../Components/User";

export default function QuestionDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.users.currentUser);
  const users = useSelector((state) => state.users.users);
  const questions = useSelector((state) => state.questions.questions);
  const optionsTable = useSelector((state) => state.options.options);
  const [voterPercentage, setVoterPrercentage] = useState(NaN);
  const [checkedIndex, setCheckedIndex] = useState(0);
  const questionOptions = optionsTable.byId[id];
  const options = questionOptions ? Object.values(questionOptions) : [];
  const currentUserSelectedOption = user?.answers?.[id];
  let currentUserSelectedOptionIndex = -1;
  switch (currentUserSelectedOption) {
    case "optionOne":
      currentUserSelectedOptionIndex = 0;
      break;
    case "optionTwo":
      currentUserSelectedOptionIndex = 1;
      break;
  }

  useEffect(() => {
    var voters = 0;
    for (let option of options) {
      voters += option.votes.length;
    }

    setVoterPrercentage(100 / voters);
  }, [optionsTable]);

  const question = questions.byId[id];

  if (!question) {
    return <Redirect to="/404" />;
  }

  const { selectedOptionIndex, author } = question;
  const authorData = users.byId[author];
  const answered = Boolean(user.answers[id]);

  function onChange(event) {
    setCheckedIndex(event.target.value);
  }

  function onClick(event) {
    event.preventDefault();
    const answerId = checkedIndex == 0 ? "optionOne" : "optionTwo";
    dispatch(
      answerQuestion({
        uId: user.id,
        qId: id,
        aId: answerId,
      })
    );
  }

  return (
    <div>
      <div className="d-flex direction-row align-items-center mb-5">
        <h1>By:</h1>
        <User user={authorData} />
      </div>
      <h2>Would You Rather?</h2>
      <Form>
        <Form.Group>
          {options.map((option, index) => {
            return (
              <div
                key={`option_${index}`}
                className="mb-2"
                style={{
                  background:
                    currentUserSelectedOptionIndex == index
                      ? "#A0E7E5"
                      : "transparent",
                }}
              >
                <Form.Check
                  {...(answered
                    ? { checked: index == selectedOptionIndex }
                    : { checked: index == checkedIndex })}
                  onChange={onChange}
                  disabled={answered}
                  type="radio"
                  name="options"
                  label={`${option.text}`}
                  id={`${option.text.replaceAll(" ", "-")}`}
                  value={index}
                />
                {answered ? `voters: ${option.votes.length}` : null}
                {answered ? (
                  <div>{`percentage: ${Math.ceil(
                    option.votes.length * voterPercentage
                  )}%`}</div>
                ) : null}
              </div>
            );
          })}
        </Form.Group>
      </Form>
      {answered ? null : <Button onClick={onClick}>Submit</Button>}
    </div>
  );
}
