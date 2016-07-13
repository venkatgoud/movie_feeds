import Constants              from '../constants'; 
import { httpGet, httpPost,httpDelete }  from '../utils'; 

const Actions = {
  fetchUsers: () => {
    return dispatch => {
      //dispatch so UI might do something with this 
      dispatch({ type: Constants.FETCH_USER_LIST_REQUEST });

      httpGet('/api/users')
      .then((res) => {       
        dispatch({
          type: Constants.FETCH_USER_LIST_SUCCESS,
          userList: res.data
        });
      })
      .catch((error) => {
        error.response.json()
        .then((json) => {
          dispatch({
          type: Constants.FETCH_USER_LIST_FAILURE,
          errors: json.errors
        });  
        })
      });
    };
  },
  deleteUser: (id) => {
    return dispatch => {
      //dispatch so UI might do something with this 
      dispatch({ type: Constants.DELETE_USER_REQUEST });       
      httpDelete(`/api/users/${id}`)       
      .then((res) => {
      // Here, we update the app state with the results of the API call.
        dispatch({
          type: Constants.DELETE_USER_SUCCESS,
          userList: res.data
        });
      })
      .catch((error) => {
        error.response.json()
        .then((json) => {
          dispatch({
          type: Constants.DELETE_USER_SUCCESS,
          errors: json.errors
        });
        })
      });
    };
  }
};

export default Actions;
