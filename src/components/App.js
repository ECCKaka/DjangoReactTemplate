import React, { Component } from 'react';
import Button from 'antd/es/button';
import './App.css';
import connect from 'redux-connect-decorator'
import { fetchUser } from "../actions/userActions"
import { fetchResume } from "../actions/resumeActions"
import Template from './Header';
import Login from './login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    resume: store.resume.resume,
  };
})
class App extends Component {

    fetchResume() {
      this.props.dispatch(fetchResume(1))
    }

    render() {
      const { user, resume } = this.props;
      console.log(this.props);
      return (
        <Router>
          <Switch>
            <Route exact path='/'>
              <Template/>
              <Button onClick={this.fetchResume.bind(this)}>load resume</Button>
            </Route>
            <Route exact path='/test'>
              <Login/>
            </Route>
          </Switch>
        </Router>

      )

    }

}

export default App;
