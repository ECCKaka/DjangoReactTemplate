import React from "react"
import connect from 'redux-connect-decorator'
import { fetchUser } from "../actions/userActions"
import { fetchResume } from "../actions/resumeActions"
import Button from 'antd/es/button';
// import './Layout.css';

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    resume: store.resume.resume,
  };
})
class Layout extends React.Component {


  fetchResume() {
    this.props.dispatch(fetchResume(1))
  }

  render() {
    const { user, resume } = this.props;
    console.log(this.props);
    if (!resume.length) {
      return (
        <Button onClick={this.fetchResume.bind(this)}>load resume</Button>
      )
    }

    const mappedTweets = resume.map(tweet => <li key={tweet.id}>{tweet.text}</li>)

    return <div>
      <h1>{user.name}</h1>
      <ul>{mappedTweets}</ul>
    </div>
  }
}
export default Layout
