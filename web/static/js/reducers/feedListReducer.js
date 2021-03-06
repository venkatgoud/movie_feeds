import Constants from '../constants';

const initialState = {
  list: [],      
  error: null,
  fetching: false
};

export default function reducer(state = initialState, action = {}) {   
  switch (action.type) {
    case Constants.FETCH_FEED_LIST_REQUEST:
      return { ...state, fetching: true };

    case Constants.FETCH_FEED_LIST_SUCCESS:
      return { ...state, list: action.feedList, fetching: false};

    case Constants.FETCH_FEED_LIST_FAILURE:
      return { ...state, error: 'FETCH_FEED_LIST_FAILURE', fetching: false};
    default:
      return state;
  }
}