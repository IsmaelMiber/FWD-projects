import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function Question(props) {
  return (
    <Container>
      <h1>Would Your Rather?</h1>
      <Link to={`/questions/${props.question.id}`}>View Poll</Link>
    </Container>
  );
}
