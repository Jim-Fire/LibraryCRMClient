import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../actions/dataActions";
import { getUser } from "../actions/authActions";
import {
  deleteBook,
  updateBook,
  addBookIntoOrder,
  showAppWarning
} from "../actions/doActions";
import CardComponent from "./CardComponent";

class BooksCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
  }
  componentDidMount() {
    this.props.fetchBooks();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.books) {
      this.setState({ books: nextProps.books });
    }
  }
  handleDeleteBook(id) {
    if (id) {
      this.props.deleteBook({ bookId: id });
    } else {
      console.log("Expects _id:", id);
    }
    const newBooks = this.state.books.filter(book => {
      return book._id !== id;
    });
    this.setState({
      books: newBooks
    });
  }
  handleUpdateBook({
    bookId,
    name,
    author,
    countPagesNumber,
    countCategory,
    description,
    countPrice,
    count
  }) {
    const pagesNumber = countPagesNumber;
    const category = countCategory;
    const price = countPrice;
    if (bookId) {
      this.props.updateBook({
        bookId,
        name,
        author,
        pagesNumber,
        category,
        description,
        price,
        count
      });
    } else {
      console.log("Expects _id:", bookId);
    }
    const newBooks = this.state.books.filter(book => {
      return book._id !== bookId;
    });
    newBooks.unshift({
      bookId,
      name,
      author,
      pagesNumber,
      category,
      description,
      price,
      count
    });
    this.setState({
      books: newBooks
    });
  }
  addBook({ count, bookId }) {
    if (bookId) {
      const book = { count, bookId };
      const message = "Books successfully added to current order";
      this.props.addBookIntoOrder({ book, message });
    } else {
      console.log("Expects _id", bookId);
    }
  }
  showWarning(message) {
    this.props.showAppWarning(message);
  }
  render() {
    const books = this.state.books.map((book, i) => (
      <li key={i}>
        <CardComponent
          {...book}
          role={this.props.user.role}
          showWarning={message => {
            this.showWarning(message);
          }}
          addBook={({ count, bookId }) => {
            this.addBook({ count, bookId });
          }}
          handleDeleteBook={id => {
            this.handleDeleteBook(id);
          }}
          handleUpdateBook={({
            bookId,
            name,
            author,
            countPagesNumber,
            countCategory,
            description,
            countPrice,
            count
          }) => {
            this.handleUpdateBook({
              bookId,
              name,
              author,
              countPagesNumber,
              countCategory,
              description,
              countPrice,
              count
            });
          }}
        />
      </li>
    ));
    const rendered = books.length ? books : "Loading...";
    return (
      <div className="books-catalog-wrapper">
        <ul>{rendered}</ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  books: state.data.books,
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  {
    fetchBooks,
    getUser,
    deleteBook,
    updateBook,
    showAppWarning,
    addBookIntoOrder
  }
)(BooksCatalog);
