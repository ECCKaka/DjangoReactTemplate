import React, { Component } from 'react';
import Button from 'antd/es/button';
import './App.css';
import connect from 'redux-connect-decorator'
import { fetchUser } from "../actions/userActions"
import { fetchResume } from "../actions/resumeActions"
import Template from './Header';

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
        <div className="App">
          <Template/>
          <Button onClick={this.fetchResume.bind(this)}>load resume</Button>
        </div>

      )

    }

}

export default App;
