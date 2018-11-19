import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import NavBar from "../containers/NavBar";

class MainTemplate extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar
          showBooksCatalog={this.props.showBooksCatalog}
          showOrders={this.props.showOrders}
          showCurrentOrder={this.props.showCurrentOrder}
        />
        <Container className="app-container main-container">
          <Row className="justify-content-center align-items-center">
            <Col xs={10}>{this.props.children}</Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default MainTemplate;
