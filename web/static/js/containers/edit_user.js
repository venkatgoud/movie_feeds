import React, { Component } from 'react';
import { connect }      	from 'react-redux'; 
import { Alert } 						from 'react-bootstrap';
import UserActions    		from '../actions/userActions';
import User 				from '../components/user'

export default class EditUser extends Component {

	constructor(props){
		super(props)
		
		this.state = {
			error: null,
			name: '',
			username: '',
			password: '',
			user_type: 'user',
			enabled: true,
			locked: false
		}	
	}

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

	componentWillReceiveProps(nextProps){
		this.setState({error: nextProps.error})		 
	}

	componentWillUnmount(){
		this.setState({error: null})
	}

	displayChangeSetErrors = (error)=>{
		return Object.getOwnPropertyNames(error).map(function(element){			 
			return <p> {element + " " + error[element]} </p>			
		})
	}

	showAlert = () => {		
		if (this.state.error) {		
			return <Alert bsStyle="danger"> 
				<h4>Oops, something went wrong! Please check the errors below.</h4>
				{this.displayChangeSetErrors(this.state.error)}
			</Alert>				 			 
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
