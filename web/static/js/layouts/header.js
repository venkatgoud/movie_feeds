import React            from 'react';
import { Glyphicon, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link }         from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
 

export default class Header extends React.Component {
	render() {
		return (
		  <Navbar>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="#"><b>LOGO</b></a>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>		      	
		      	<LinkContainer to="/users">
			      	<NavItem eventKey={1}>
			        	<Glyphicon glyph="user" />Users
			        </NavItem>
		      	</LinkContainer>

		      	<LinkContainer to="/feeds">
			        <NavItem eventKey={2}>
			        	<Glyphicon glyph="flash" />Feeds
		        	</NavItem>
	        	</LinkContainer>
	        	<LinkContainer to="/targets">
			        <NavItem eventKey={2}>
			        	<Glyphicon glyph="film" />Targets
		        	</NavItem>
	        	</LinkContainer>

		        <NavDropdown eventKey={3} title="Reports" id="basic-nav-dropdown">          
		          <MenuItem eventKey={3.1}>Report One</MenuItem>
		          <MenuItem eventKey={3.2}>Report Two</MenuItem>
		          <MenuItem eventKey={3.3}>Report Three</MenuItem>           
		        </NavDropdown>
		      </Nav>
		      <Nav pullRight>         
		        <NavDropdown eventKey={1} title="Administrator" id="basic-nav-dropdown">
		          <MenuItem eventKey={4.1}><Glyphicon glyph="log-out" />Logout</MenuItem>           
		        </NavDropdown>         
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		);
	}
}

