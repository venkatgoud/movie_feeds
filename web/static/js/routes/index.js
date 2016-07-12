import React                    from 'react';
import { IndexRoute, Route }    from 'react-router'; 
import MainLayout               from '../layouts/main';
import UserList                 from '../containers/user_list';
import AddUser                  from '../containers/add_user';
import EditUser                 from '../containers/edit_user';
import FeedList                 from '../containers/feed_list';
import TargetList               from '../containers/target_list';

export default function configRoutes(store) {
	return (     
      <Route path="/" component={MainLayout}>
        <IndexRoute component={UserList} />
        <Route path="/users" component={UserList}/>
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/edit/:id" component={EditUser} />         
        <Route path="/feeds" component={FeedList} />
        <Route path="/targets" component={TargetList} />
        
      </Route>     
  );
}