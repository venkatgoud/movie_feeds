import Constants from '../constants';

const initialState = {
    
  error: null,
  saving: false,
  fetching: false
};

export default function reducer(state = initialState, action = {}) {   
  switch (action.type) {

    case Constants.ADD_NEW_USER_SUCCESS:
    case Constants.UPDATE_USER_SUCCESS:
      return {...state, saving: false, fetching: false, error: null}

    case Constants.ADD_NEW_USER_REQUEST:
    case Constants.UPDATE_USER_REQUEST:
      return {...state, saving: true, fetching: false, error: null}      

    case Constants.ADD_NEW_USER_FAILURE:
    case Constants.UPDATE_USER_FAILURE:
      return {...state, fetching: false, saving: false, error: action.errors}

    case Constants.FETCH_USER_DETAILS_REQUEST:
      return {...state, fetching: true, saving: false}
    
    case Constants.FETCH_USER_DETAILS_SUCCESS:
      return {...state, 
        fetching: false,
        saving: false,
        error: null, 
        name: action.user.name, 
        username: action.user.username,
        user_type: action.user.user_type,
        locked: action.user.locked,
        enabled: action.user.enabled
      }

    case Constants.FETCH_USER_FAILURE:
      return {...state, fetching: false, error: action.errors}
    default:
      return state;
  }
}
