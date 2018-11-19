import React from "react";
import { Container, Row, Col } from "reactstrap";
import MessageModal from "../containers/MessageModal";

export default ({ children }) => (
  <Container className="app-container auth-container">
    <Row className="justify-content-center align-items-center">
      <Col xs={6}>{children}</Col>
    </Row>
  </Container>
);
