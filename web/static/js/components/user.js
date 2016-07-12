import React, {PropTypes} from 'react';
import { Alert, Form, FormGroup, FormControl, Button, Col, Checkbox, ControlLabel} 
	from 'react-bootstrap';

export default class User extends React.Component {

	constructor(props){
		super(props)

		// Initialise state here.		
		this.state = {
			name: props.name || '',
			username: props.username || '',
			password: '',
			user_type: props.user_type || 'user',
			enabled: props.enabled || true,
			locked: props.locked || false
		}		 
	} 

	handleSubmit = (e) => {
		//TODO - do some validation		
		this.props.onSubmit({
			name: this.state.name,
			username: this.state.username,
			password: this.state.password,
			user_type: this.state.user_type,
			enabled: this.state.enabled,
			locked: this.state.locked
			}
		) 
	}

	handleCancel = (e) => {
		this.props.onCancel()
	}

	handleChange = (key) => {
		return function (e) {
			var state = {};
			if (key === 'enabled' || key === 'locked'){
				let selection = false
				if (e.target.value == 'on') {
					selection = true
				}
				state[key] = selection				
			}
			else
      		{	
      			state[key] = e.target.value;
      		    this.setState(state);
      		}
    	}.bind(this);
	}

	componentWillReceiveProps(nexProps) {
		this.setState({
			name: nexProps.name || '',
			username: nexProps.username || '',
			password: '',
			user_type: nexProps.user_type || 'user',
			enabled: nexProps.enabled || true,
			locked: nexProps.locked || false	
		})	
	}

	render() {	
		console.log(this.state);
		return (
			<div className='container'>			
		 	<Form horizontal>		 	 		 	
			 	<FormGroup controlId="formName">
			      <Col componentClass={ControlLabel} sm={2}>
			        Name
			      </Col>
			      <Col sm={10}>
			        <FormControl 
			        	type="text" 
			        	placeholder="name" 
			        	required
			        	value={this.state.name}
			        	onChange={this.handleChange('name')}/>
			      </Col>		       
				</FormGroup>

				<FormGroup controlId="formUsername">		       
			      <Col componentClass={ControlLabel} sm={2}>
			        User name
			      </Col>
			      <Col sm={10}>
			        <FormControl 
			        	type="text" 
			        	placeholder="username" 
			        	required
			        	value={this.state.username}
			        	onChange={this.handleChange('username')}/>
			      </Col>
				</FormGroup>

				<FormGroup controlId="formPassword">
			      <Col componentClass={ControlLabel} sm={2}>
			        Password
			      </Col>
			      <Col sm={10}>
			        <FormControl 
			        	type="password" 
			        	placeholder="Password"
			        	required
			        	value = {this.state.password} 
			        	onChange={this.handleChange('password')}
			        	/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formUsertype">
				  <Col componentClass={ControlLabel} sm={2}>
			        Type
			      </Col>
			      <Col sm={10}>						       
				      <FormControl componentClass="select" 
				      	placeholder="select"
				      	onChange={this.handleChange('user_type')}
				      	value={this.state.user_type}>
				        <option value="user">user</option>
				        <option value="manager">manager</option>
				        <option value="admin">admin</option>
				      </FormControl>
			      </Col>
			    </FormGroup>
					    
				 <FormGroup>
			      <Col smOffset={2} sm={10}>
			        <Checkbox
			        	onChange={this.handleChange('enabled')} 
			        	checked={this.state.enabled}>
			        	Enabled			        	 
			        </Checkbox>
			      </Col>
			      <Col smOffset={2} sm={10}>
			        <Checkbox
			        	onChange={this.handleChange('locked')}
			        	checked={this.state.locked}>
			        	Locked
			        </Checkbox>
			      </Col>
			    </FormGroup>


			    <FormGroup>
			      <Col smOffset={2} sm={4}>
			        <Button type="button" onClick={this.handleSubmit}>
			          Save
			        </Button>
			      </Col>
			      <Col >
			        <Button type="button" onClick={this.handleCancel}>
			          Cancel
			        </Button>
			      </Col>
			    </FormGroup>   
 		 	</Form>
 		 </div>
 		)		 
	} 
}


