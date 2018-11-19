import React, { Component } from "react";
import { getUser } from "../actions/authActions";
import MainTemplate from "../templates/MainTemplate";
import BooksCatalog from "../components/BooksCatalog";
import OrdersList from "../components/OrdersList";
import CurrentOrder from "../components/CurrentOrder";

import { connect } from "react-redux";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: "BooksCatalog"
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.showBooksCatalog = this.showBooksCatalog.bind(this);
    this.showOrders = this.showOrders.bind(this);
    this.showCurrentOrder = this.showCurrentOrder.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.unauthorizated) {
      console.log("Redirecring to login page... ");
      this.props.history.push("/sign-in");
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    this.props.authorizate({
      login: this.state.login,
      password: this.state.password
    });
  }
  showBooksCatalog() {
    this.setState({
      activeComponent: "BooksCatalog"
    });
  }
  showOrders() {
    this.setState({
      activeComponent: "OrdersList"
    });
  }
  showCurrentOrder() {
    this.setState({
      activeComponent: "CurrentOrder"
    });
  }

  render() {
    let activeComponent;
    switch (this.state.activeComponent) {
      case "BooksCatalog":
        activeComponent = <BooksCatalog />;
        break;
      case "OrdersList":
        activeComponent = <OrdersList />;
        break;
      default:
        activeComponent = <></>;
    }
    const currentOrderStyle =
      this.state.activeComponent === "CurrentOrder" ? "block" : "none";
    return (
      <MainTemplate
        showBooksCatalog={this.showBooksCatalog}
        showOrders={this.showOrders}
        showCurrentOrder={this.showCurrentOrder}
      >
        <CurrentOrder showStyle={currentOrderStyle} />
        {activeComponent}
      </MainTemplate>
    );
  }
}

const mapStateToProps = state => ({
  unauthorizated: state.message.unauthorizated
});

export default connect(
  mapStateToProps,
  { getUser }
)(Main);
