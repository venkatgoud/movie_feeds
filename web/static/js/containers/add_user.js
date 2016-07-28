import React, { Component } from 'react';
import { connect }      		from 'react-redux';
import { Alert } 						from 'react-bootstrap';
import UserActions    			from '../actions/userActions';
import User 								from '../components/user' 

export class AddUser extends Component {

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
		this.setState({			 
			name: user.name,
			username: user.username,
			password: '',
			user_type: user.user_type,
			enabled: user.enabled,
			locked: user.locked}
		)				 
		this.props.dispatch(UserActions.createUser(user))
	}

	onCancel = () => {
		this.context.router.push('/users/')
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

	componentWillReceiveProps(nextProps){
		this.setState({error: nextProps.error})		 
	}

	componentWillUnmount(){
		this.setState({error: null})
	}

	render() {
		console.log('add user render' , this.state);		 
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
					name={this.state.name}
					username={this.state.username}
					user_type={this.state.user_type}
					enabled={this.state.enabled}
					locked={this.state.locked} 
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
