import React, { Component } from "react";
import config from "../config";
import { connect } from "react-redux";
import { createOrder, setBooksIntoOrder } from "../actions/doActions";
import {
  Card,
  CardBody,
  Badge,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import ModalComponent from "./ModalComponent";

class CurrentOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: Math.round(Math.random() * 100000),
      description: "",
      orderedBooks: [],
      books: []
    };
    this.resetOrder = this.resetOrder.bind(this);
  }
  resetOrder() {
    const orderedBooks = [];
    const message = "Order cleaned!";
    this.props.setBooksIntoOrder({ orderedBooks, message });
    this.setState({
      description: "",
      orderedBooks: []
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.showStyle === "block") {
      return;
    }
    if (nextProps.orderedBooks) {
      // orderedBooks { bookId, count }
      //console.log('nextProps.orderedBooks',nextProps.orderedBooks);
      const orderedBooks = [];
      this.state.books.forEach(book => {
        for (let i = 0; i < nextProps.orderedBooks.length; i++) {
          if (nextProps.orderedBooks[i].bookId === book._id) {
            orderedBooks.push({
              bookId: book._id,
              name: book.name,
              author: book.author,
              price: book.price,
              count: nextProps.orderedBooks[i].count
            });
          }
        }
      });
      this.setState({
        orderedBooks
      });
    }
    if (nextProps.books) {
      this.setState({
        books: nextProps.books
      });
    }
  }
  render() {
    const orderedBooks = this.state.orderedBooks.map((book, i) => (
      <li key={i} className="ordered-books">
        <div className="book-info-wrapper">
          <span>Name: {book.name}</span>
          <span>Author: {book.author}</span>
          <span>Count: {book.count}</span>
          <span>Price: {book.price}</span>
        </div>
      </li>
    ));
    let summary = 0;
    this.state.orderedBooks.forEach(book => {
      summary += book.price * book.count;
    });
    return (
      <div
        className="books-catalog-wrapper"
        style={{ paddingTop: "15px", display: this.props.showStyle }}
      >
        <Card className="card-container">
          <CardBody>
            <div>
              <FormGroup>
                <Label>Order Number:</Label>
                <Input
                  type="number"
                  onChange={e => {
                    this.setState({ orderNumber: e.target.value });
                  }}
                  value={this.state.orderNumber}
                />
              </FormGroup>
            </div>
            <div>Summary: {summary}$</div>
            <div>
              Status:{" "}
              <Badge disabled color="warning">
                In progress
              </Badge>
            </div>
            <div>
              <FormGroup>
                <Label>Description:</Label>
                <Input
                  type="textarea"
                  onChange={e => {
                    this.setState({ description: e.target.value });
                  }}
                  value={this.state.description}
                />
              </FormGroup>
            </div>
            {orderedBooks.length ? (
              <ul>
                <b>Ordered Books:</b> {orderedBooks}
              </ul>
            ) : (
              <b>
                No books here! <br />
              </b>
            )}
            <div className="btn-group-custom">
              <ModalComponent
                btnColor="success"
                buttonLabel="Confirm order"
                title="Confirm order?"
                resolve={() => {
                  const { orderNumber, description, orderedBooks } = this.state;
                  this.props.createOrder({
                    orderNumber,
                    description,
                    orderedBooks
                  });
                }}
              />
              <ModalComponent
                btnColor="danger"
                buttonLabel="Reset"
                title="Reset order?"
                resolve={() => {
                  this.resetOrder();
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  orderedBooks: state.currentOrder.orderedBooks,
  books: state.data.books
});
export default connect(
  mapStateToProps,
  { createOrder, setBooksIntoOrder }
)(CurrentOrder);
