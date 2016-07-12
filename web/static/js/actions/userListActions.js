import Constants              from '../constants'; 
import { httpGet, httpPost,httpDelete }  from '../utils'; 

const Actions = {
  fetchUsers: () => {
    return dispatch => {
      // First dispatch: the app state is updated to inform that the API call is starting.
      dispatch({ type: Constants.FETCH_USER_LIST_REQUEST });

      httpGet('/api/users')
      .then((res) => {
      // Here, we update the app state with the results of the API call.
        dispatch({
          type: Constants.FETCH_USER_LIST_SUCCESS,
          userList: res.data
        });
      });
    };
  },
  deleteUser: (id) => {
    return dispatch => {
      // First dispatch: the app state is updated to inform that the API call is starting.
      dispatch({ type: Constants.DELETE_USER_REQUEST });       
      httpDelete(`/api/users/${id}`)       
      .then((res) => {
      // Here, we update the app state with the results of the API call.
        dispatch({
          type: Constants.DELETE_USER_SUCCESS,
          userList: res.data
        });
      });
    };
  }
};

export default Actions;
