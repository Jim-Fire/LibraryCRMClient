import React, { Component } from "react";
import { Card, CardText, CardBody, Button } from "reactstrap";
class Modal extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.forceUnmount();
    }, 3000);
  }
  render() {
    const {
      message,
      titleResolve,
      titleReject,
      resolve,
      reject,
      type
    } = this.props;
    let buttonResolve =
      titleResolve && resolve ? (
        <Button color="success" onClick={resolve}>
          {titleResolve}
        </Button>
      ) : (
        ""
      );
    let buttonReject =
      titleReject && reject ? (
        <Button color="danger" onClick={reject}>
          {titleReject}
        </Button>
      ) : (
        ""
      );
    let styledBorder = {};
    switch (type) {
      case "success":
        styledBorder = {
          border: "3px solid green"
        };
        break;
      case "error":
        styledBorder = {
          border: "3px solid red"
        };
        break;
      default:
        styledBorder = {
          border: "3px solid black"
        };
        break;
    }
    return (
      <div className="simple-modal" style={styledBorder}>
        <Card style={{ background: "rgb(0,0,0,0.7)", color: "white" }}>
          <CardBody>
            <CardText>{message}</CardText>
            {buttonResolve}
            {buttonReject}
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default Modal;
