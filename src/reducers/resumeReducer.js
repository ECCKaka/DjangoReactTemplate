export default function reducer(state={
    resume: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_TWEETS": {
        return {...state, fetching: true}
      }
      case "FETCH_TWEETS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_TWEETS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          resume: action.payload,
        }
      }
      case "ADD_TWEET": {
        return {
          ...state,
          resume: [...state.resume, action.payload],
        }
      }
      case "UPDATE_TWEET": {
        const { id, text } = action.payload
        const newTweets = [...state.resume]
        const tweetToUpdate = newTweets.findIndex(tweet => tweet.id === id)
        newTweets[tweetToUpdate] = action.payload;

        return {
          ...state,
          resume: newTweets,
        }
      }
      case "DELETE_TWEET": {
        return {
          ...state,
          resume: state.resume.filter(tweet => tweet.id !== action.payload),
        }
      }
    }

    return state
}
