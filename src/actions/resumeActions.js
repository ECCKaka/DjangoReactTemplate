import axios from "axios";
import { URL_PREFIX } from './utils';

// axios.get("http://127.0.0.1:8000/api/user/1/" )
export function fetchResume(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_TWEETS"});

    axios.get(URL_PREFIX + "/api/user/" + id + "/" )
      .then((response) => {
        console.log(response, 'response', URL_PREFIX + "/api/user/" + id);
        dispatch({type: "FETCH_TWEETS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        console.log(err, 'err', URL_PREFIX + "/api/user/" + id);
        dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }
}

export function addTweet(id, text) {
  return {
    type: 'ADD_TWEET',
    payload: {
      id,
      text,
    },
  }
}

export function updateTweet(id, text) {
  return {
    type: 'UPDATE_TWEET',
    payload: {
      id,
      text,
    },
  }
}

export function deleteTweet(id) {
  return { type: 'DELETE_TWEET', payload: id}
}
