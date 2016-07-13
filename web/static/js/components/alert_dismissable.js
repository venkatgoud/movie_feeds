import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

export default class AlertDismissable extends Component {

	constructor(props){
		super(props)
		// this.handleAlertDismiss = this.handleAlertDismiss.bind(this)		
		this.state = {
			alertVisible : true
		}
	}

	handleAlertDismiss = (e) => {
    this.setState({alertVisible: false});
  }

	render() {
		if (this.state.alertVisible) {
			return (
				<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
	        <h4>{this.props.text}</h4>                     		 
	      </Alert> 
			);
		}	
		return false;	
	}
}

