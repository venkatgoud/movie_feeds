import React, {PropTypes} from 'react';
import {Button,Modal,ModalDialog,ModalHeader,ModalBody,ModalFooter} from 'react-bootstrap';


export default class ConfirmDelete extends React.Component {

	constructor(props) {
 	 	super(props);
     
    this.state = {
      showModal: true 
    };  	 
  }

	close = () => {
		this.setState({ showModal: false });
		this.props.onCancel()
	}

	render() {		
		return (
			<div className="static-modal">
		    <Modal show={this.props.showModal || this.state.showModal} onHide={this.close}>
		      <Modal.Header closeButton>
		        <Modal.Title>{this.props.title}</Modal.Title>
		      </Modal.Header>

		      <Modal.Body>
		        {this.props.body}
		      </Modal.Body>

		      <Modal.Footer>
		        <Button onClick={this.close}>{this.props.closeBtnCaption}</Button>
		        <Button onClick={this.props.onOK} bsStyle="primary">{this.props.okBtnCaption}</Button>
		      </Modal.Footer>
		    </Modal>
	  	</div>
		);
	}
}
