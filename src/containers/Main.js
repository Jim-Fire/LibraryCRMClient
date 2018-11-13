import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { getUser } from '../actions/authActions'
import MainTemplate from '../templates/MainTemplate';
import BooksCatalog from '../components/BooksCatalog';
import OrdersList from '../components/OrdersList';
import { connect } from 'react-redux';

export class Main extends Component {
  constructor(props){
      super(props);
      this.state = {
          activeComponent: null
      };
      this.handleSignIn = this.handleSignIn.bind(this);
      this.showBooksCatalog = this.showBooksCatalog.bind(this);
      this.showOrders = this.showOrders.bind(this);
      
  }  
  
  componentWillReceiveProps(nextProps){
    if(nextProps.unauthorizated){
        console.log('Redirecring to login page... ');
        this.props.history.push('/sign-in');
    }
  } 
   
  handleSignIn(e){
    e.preventDefault();
    this.props.authorizate({
        login: this.state.login,
        password: this.state.password
    });
  }
  showBooksCatalog(){
    this.setState({
        activeComponent: 'BooksCatalog'
    });
  }
  showOrders(){
    this.setState({
        activeComponent: 'OrdersList'
    });
  }

  render() {
    let activeComponent;
    switch(this.state.activeComponent){
        case 'BooksCatalog': activeComponent = (<BooksCatalog />);break;
        case 'OrdersList': activeComponent = (<OrdersList />);break;
        default: activeComponent = (<BooksCatalog />);
    }

    return (
        <MainTemplate 
            showBooksCatalog={this.showBooksCatalog}
            showOrders={this.showOrders}
        >
            {activeComponent}
        </MainTemplate>
    )
  }
}

const mapStateToProps = state => ({
    unauthorizated: state.message.unauthorizated,
});

export default connect(mapStateToProps,{ getUser })(Main)
