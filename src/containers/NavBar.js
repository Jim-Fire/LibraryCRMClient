import React from 'react';
import { connect } from 'react-redux';
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
  DropdownItem } from 'reactstrap';
import config from '../config';  

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    console.log('Navbar props',this.props)
    return (
      <div className='nav-bar-container'>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink >Current Order</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.props.showBooksCatalog}>Books catalog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.props.showOrders}>Orders</NavLink>
              </NavItem>
              {(this.props.user && this.props.user.role===config.ROLE_ADMIN)?(
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Add new book
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Disabled option
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>):('')
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(mapStateToProps,{ })(NavBar);