import { combineReducers }  from 'redux'; 
import userReducer          from './userReducer';
import userListReducer      from './userListReducer';
import feedListReducer      from './feedListReducer';

export default combineReducers({	 
	user: userReducer,
	users: userListReducer,
	feeds: feedListReducer
});