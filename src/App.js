import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { HashRouter,  Route, Switch } from 'react-router-dom'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import MessageModal from './containers/MessageModal';
import Main from './containers/Main'
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
       <MessageModal />
       <HashRouter >
         <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/sign-in' component={ SignIn } />
          <Route exact path='/sign-up' component={ SignUp } />
          <Route exact path='/view-book/:id' component={()=><p>Home path</p>} />
          <Route exact path='/view-order/:id' component={()=><p>Home path</p>} />
         </Switch>
       </HashRouter>
      </div>
      </Provider>
    );
  }
}

export default App;
