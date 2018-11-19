import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import MessageModal from "./containers/MessageModal";
import Main from "./containers/Main";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MessageModal />
          <HashRouter>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/main" component={Main} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/sign-up" component={SignUp} />
            </Switch>
          </HashRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
