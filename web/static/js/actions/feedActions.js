import Constants              from '../constants'; 
import { httpGet, httpPost }  from '../utils'; 

const Actions = {
  fetchFeeds: () => {
    return dispatch => {
      // First dispatch: the app state is updated to inform that the API call is starting.
      dispatch({ type: Constants.FETCH_FEED_LIST_REQUEST });

      dispatch({
          type: Constants.FETCH_FEED_LIST_SUCCESS,
          feedList: []
        });

      // httpGet('/api/feeds')
      // .then((data) => {
      // Here, we update the app state with the results of the API call.
      //   dispatch({
      //     type: Constants.FETCH_FEED_LIST_SUCCESS,
      //     feedList: data
      //   });
      // });
    };
  },   
};

export default Actions;
