import React from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import config from "../config";
import NavCurrentOrder from "../components/NavCurrentOrder";
import { addBook } from "../actions/doActions";
import ModalComponent from "../components/ModalComponent";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      booksNubmer: 0
    };
    this.addBook = this.addBook.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.orderedBooks) {
      let booksCount = 0;
      nextProps.orderedBooks.forEach(book => {
        booksCount += book.count;
      });
      this.setState({
        booksNubmer: booksCount
      });
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  addBook({ name, author, pagesNumber, category, description, price, count }) {
    this.props.addBook({
      name,
      author,
      pagesNumber,
      category,
      description,
      price,
      count
    });
  }

  render() {
    return (
      <div className="nav-bar-container">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="#/sign-in">Library</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.user && this.props.user.role === config.ROLE_USER ? (
                <NavItem>
                  <NavLink>
                    <NavCurrentOrder
                      booksNumber={this.state.booksNubmer}
                      handleClick={this.props.showCurrentOrder}
                    />
                  </NavLink>
                </NavItem>
              ) : (
                ""
              )}
              <NavItem>
                <NavLink onClick={this.props.showBooksCatalog}>
                  Books catalog
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.props.showOrders}>Orders</NavLink>
              </NavItem>
              {this.props.user && this.props.user.role === config.ROLE_ADMIN ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <ModalComponent
                        buttonLabel="Add new book"
                        title="Add new book"
                        resolve={fields => {
                          const {
                            name,
                            author,
                            pagesNumber,
                            category,
                            description,
                            price,
                            count
                          } = fields;
                          this.addBook({
                            name,
                            author,
                            pagesNumber,
                            category,
                            description,
                            price,
                            count
                          });
                        }}
                        btnColor="primary"
                        fields={[
                          {
                            title: "Name",
                            name: "name",
                            type: "text",
                            value: ""
                          },
                          {
                            title: "Author",
                            name: "author",
                            type: "text",
                            value: ""
                          },
                          {
                            title: "Pages",
                            name: "pagesNumber",
                            type: "number",
                            value: 0
                          },
                          {
                            title: "Category",
                            name: "category",
                            type: "number",
                            value: 0
                          },
                          {
                            title: "Description",
                            name: "description",
                            type: "text",
                            value: ""
                          },
                          {
                            title: "Price",
                            name: "price",
                            type: "number",
                            value: 0
                          },
                          {
                            title: "Count",
                            name: "count",
                            type: "number",
                            value: 1
                          }
                        ]}
                      />
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Disabled option</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                ""
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  orderedBooks: state.currentOrder.orderedBooks
});
export default connect(
  mapStateToProps,
  { addBook }
)(NavBar);
