import React from "react"
import connect from 'redux-connect-decorator'
import { fetchUser } from "../actions/userActions"
import { fetchTweets } from "../actions/tweetsActions"
import Button from 'antd/es/button';
// import './Layout.css';

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
  };
})
class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUser())
  }

  fetchTweets() {
    this.props.dispatch(fetchTweets())
  }

  render() {
    const { user, tweets } = this.props;

    if (!tweets.length) {
      return (
        <Button onClick={this.fetchTweets.bind(this)}>load tweets</Button>
      )
    }

    const mappedTweets = tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>)

    return <div>
      <h1>{user.name}</h1>
      <ul>{mappedTweets}</ul>
    </div>
  }
}
export default Layout
