import Constants from '../constants';

const initialState = {
  list: [],      
  error: null,
  fetching: false
};

export default function reducer(state = initialState, action = {}) {   
  switch (action.type) {
    case Constants.FETCH_USER_LIST_REQUEST:
      return { ...state, fetching: true };

    case Constants.FETCH_USER_LIST_SUCCESS:
      return { ...state, list: action.userList, fetching: false};

    case Constants.FETCH_USER_LIST_FAILURE:
      return { ...state, error: action.errors, fetching: false};
    default:
      return state;
  }
}
