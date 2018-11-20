import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/dataActions";
import { deleteOrder, confirmRejectOrder } from "../actions/doActions";
import OrderComponent from "./AllOrdersComponent";

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      orderStatus: null
    };
    this.deleteOrderById = this.deleteOrderById.bind(this);
  }
  componentDidMount() {
    this.props.fetchOrders();
  }

  componentWillReceiveProps(nextProps) {
    console.log("Redeived props:", nextProps);
    if (nextProps.orders) {
      this.setState({ orders: nextProps.orders });
    }
    if (nextProps.orderStatus !== this.state.orderStatus) {
      this.setState({ orderStatus: nextProps.orderStatus });
      this.props.fetchOrders();
    }
  }
  deleteOrderById(id) {
    if (id) {
      this.props.deleteOrder({ id });
    } else {
      console.log("Expects _id:", id);
    }
    const newOrders = this.state.orders.filter(order => {
      return order._id !== id;
    });
    this.setState({
      orders: newOrders
    });
  }
  resolveRejectOrder(id, confirm, statusDescription) {
    if (id) {
      this.props.confirmRejectOrder({ confirm, id, statusDescription });
    } else {
      console.log("Expects _id:", id);
    }
  }
  render() {
    console.log(this.props);
    let role = this.props.user ? this.props.user.role : 1;
    const orders = this.state.orders.map(order => (
      <li key={order._id}>
        <OrderComponent
          {...order}
          role={role}
          deleteOrderById={id => {
            this.deleteOrderById(id);
          }}
          resolveRejectOrder={(id, confirm, statusDescription) => {
            this.resolveRejectOrder(id, confirm, statusDescription);
          }}
        />
      </li>
    ));
    const rendered = orders.length > 0 ? orders : "";
    return (
      <div className="books-catalog-wrapper">
        <ul>{rendered}</ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  orders: state.data.orders,
  user: state.auth.user,
  orderStatus: state.do.orderStatus
});
export default connect(
  mapStateToProps,
  { fetchOrders, deleteOrder, confirmRejectOrder }
)(OrdersList);
