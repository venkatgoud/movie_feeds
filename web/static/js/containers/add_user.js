import React, { Component } from 'react';
import { connect }      	from 'react-redux';
import UserActions    	from '../actions/userActions';
import User 				from '../components/user'
import AlertDismissable		from '../components/alert_dismissable'

export class AddUser extends Component {

	onSubmit = (user) => {		 
		this.props.dispatch(UserActions.createUser(user))
	}

	onCancel = () => {
		this.context.router.push('/users/')
	}

	showAlert = () => {
		if (this.props.error) {
			<AlertDismissable text="Save failed: {props.error}"/>	
		}	
	}

	render() {		 
		return (
			<div className="container">
				<div>
					{this.showAlert()}
				</div>														 
				<h3 className="text-primary">Add User</h3>
				<User
					enabled = {true}
					locked = {false}
					onSubmit={this.onSubmit}
					onCancel={this.onCancel}
				/>
			</div>
		);
	}
}
 
const mapStateToProps = (state) => ({         
   error: state.user.error,
   saving: state.user.saving,
   name: state.user.name,
   username: state.user.username,
   user_type: state.user.usertype,
   locked: state.user.locked,
   enabled: state.user.enabled
});

AddUser.contextTypes = {
    router: React.PropTypes.object
}
 
export default connect(mapStateToProps)(AddUser);
