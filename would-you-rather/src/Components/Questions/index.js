import React, { useState } from "react";
import UnAnsweredQuestions from "../UnAnsweredQuestions";
import AnsweredQuestions from "../AnsweredQuestions";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Questions(props) {
  const [activeKey, setActiveKey] = useState("unanswered");

  function onSelect(eventKey) {
    setActiveKey(eventKey);
  }
  return (
    <Container
      style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
    >
      <Row>
        <Col>
          <Tabs activeKey={activeKey} id="questions-tabs" onSelect={onSelect}>
            <Tab eventKey="unanswered" title="Unanswered Questions">
              <UnAnsweredQuestions />
            </Tab>
            <Tab eventKey="answered" title="Answered Questions">
              <AnsweredQuestions />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}
