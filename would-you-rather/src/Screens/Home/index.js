import React from "react";
import Questions from "../../Components/Questions";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Home(props) {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Questions />
        </Col>
      </Row>
    </Container>
  );
}
