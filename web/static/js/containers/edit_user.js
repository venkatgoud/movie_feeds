import React, { Component } from 'react';
import { connect }      	from 'react-redux'; 
import { AlertDismissable }	from '../components/alert_dismissable';
import UserActions    		from '../actions/userActions';
import User 				from '../components/user'

export default class EditUser extends Component {

	onSubmit = (user) => {
		this.props.dispatch(UserActions.updateUser(this.props.routeParams.id, user))
	}

	onCancel = () => {
		this.context.router.push('/users/')
	}

	componentDidMount(){
		if (this.props.routeParams && this.props.routeParams.id){
			this.props.dispatch(UserActions.fetchUser(this.props.routeParams.id))	 
		}		 
	}

	showAlert(){
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
				<h3 className="text-primary">Edit User</h3>
				<User					 
					name={this.props.name}
					username={this.props.username}
					user_type={this.props.user_type}
					enabled={this.props.enabled}
					locked={this.props.locked} 
					onSubmit={this.onSubmit}
					onCancel={this.onCancel}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {	 
	return {         
   		error: state.user.error,
   		saving: state.user.saving,
   		name: state.user.name,
   		username: state.user.username,
   		user_type: state.user.user_type,
   		enabled: state.user.enabled,
   		locked: state.user.locked
	}
};

EditUser.contextTypes = {
    router: React.PropTypes.object
}

export default connect(mapStateToProps)(EditUser);
