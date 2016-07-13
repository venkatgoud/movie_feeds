import Constants                       from '../constants'; 
import { httpGet, httpPost, httpPut }  from '../utils'; 

const Actions = {
  createUser: (data) => {
        return dispatch => {
        //dispatch so UI might do something with this 
        dispatch({type: Constants.ADD_NEW_USER_REQUEST})
  
        httpPost('/api/users', {user: data})
        .then((data) => {
          dispatch({
              type: Constants.ADD_NEW_USER_SUCCESS,
              user: data
            });
        })
        .catch((error) => {
          error.response.json()
          .then((json) => {
            dispatch({
                type: Constants.ADD_NEW_USER_FAILURE,
                errors: json.errors
              });
          })
        })
    }      
  },

  fetchUser: (id) => {    
    return dispatch => {
      dispatch({type: Constants.FETCH_USER_DETAILS_REQUEST})

      httpGet(`/api/users/${id}`)
      .then((response) => {
        dispatch({
          type: Constants.FETCH_USER_DETAILS_SUCCESS,
          user: response.data
        });
      })
      .catch((error) => {
        error.response.json()
        .then((json)=>{
          dispatch({
                type: Constants.FETCH_USER_DETAILS_FAILURE,
                errors: json.errors
              });
        })        
      })
    }
  },

  updateUser: (id,user) => {    
    return dispatch => {
      dispatch({type: Constants.UPDATE_USER_REQUEST}) 

      httpPut(`/api/users/${id}`, {user: user})
      .then((response) => {
        dispatch({
          type: Constants.UPDATE_USER_SUCCESS,
          user: response.data
        })
      })
      .catch((error) => {
        error.response.json()
        .then((json) => {
          dispatch({
          type: Constants.UPDATE_USER_FAILURE,
          errors: json.errors
          });
        })        
      })
    }
  }
};

export default Actions;
