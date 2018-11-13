import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { register, registerFailed } from '../actions/authActions';
import AuthTemplate from '../templates/AuthTemplate';
import { connect } from 'react-redux';

export class SignUp extends Component {
  constructor(props){
      super(props);
      this.state = {
        login:'',
        password:'',
        passwordConfirm:'',
        fullname:'',
        phone:''
      };
      this.handleSignUp = this.handleSignUp.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.user){
        console.log('Redirect to Main page...');
        setTimeout(()=>{
            this.props.history.push('/sign-in');
        },100);
    }
  }  
  
   
  handleSignUp(e){
    e.preventDefault();
    const { login, password, passwordConfirm, fullname, phone } = this.state;
    if(password === passwordConfirm){
        this.props.register({ login, password, fullname, phone });
    }else{
        this.props.registerFailed({
            message: 'Your confirm password is not equal password'
        });
    }
  }  
  render() {
    return (
        <AuthTemplate>
            <Form className='auth-form'>
                <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input 
                        type="email" 
                        name="email" 
                        id="Email" 
                        placeholder="Your email"
                        onChange={(e)=>{
                            this.setState({login: e.target.value});
                        }}
                        value={this.state.login}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Password">Password</Label>
                    <Input 
                        type="password" 
                        name="password" 
                        id="Password" 
                        placeholder="Your password..."
                        onChange={(e)=>{
                            this.setState({password: e.target.value});
                        }}
                        value={this.state.password}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="PasswordConfirm">Confirm password</Label>
                    <Input 
                        type="password" 
                        name="passwordConfirm" 
                        id="PasswordConfirm" 
                        placeholder="Confirm your password..."
                        onChange={(e)=>{
                            this.setState({passwordConfirm: e.target.value});
                        }}
                        value={this.state.passwordConfirm}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="Fullname">Fullname</Label>
                    <Input 
                        type="text" 
                        name="fullname" 
                        id="Fullname" 
                        placeholder="Your fullname..."
                        onChange={(e)=>{
                            this.setState({fullname: e.target.value});
                        }}
                        value={this.state.fullname}
                        />
                </FormGroup>
                <FormGroup>
                    <Label for="Phone">Phone</Label>
                    <Input 
                        type="phone" 
                        name="phone" 
                        id="Phone" 
                        placeholder="Your phone..."
                        onChange={(e)=>{
                            this.setState({phone: e.target.value});
                        }}
                        value={this.state.phone}
                        />
                </FormGroup>
                <Button onClick={this.handleSignUp}>Sign Up</Button>
            </Form>
        </AuthTemplate>
    )
  }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps,{ register, registerFailed })(SignUp)
