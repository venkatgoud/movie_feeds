import React, {PropTypes, } from 'react';
import { Glyphicon, Navbar, Nav, NavItem, NavDropdown, MenuItem, ButtonGroup, Button } 
  from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect }        from 'react-redux';
import UserListActions    from '../actions/userListActions';
import ConfirmDelete      from '../components/confirm_delete'


function boolFormatter(cell, row){
  return cell;
}

class UserList extends React.Component {

  constructor(props) {
      super(props);
      // Initialise state here.
      this.state = {
        showConfirmDelete: false,
        isSelected: false
      };
  }

  onRowSelect(row, isSelected){
    // console.log(row);
    // console.log("selected: " + isSelected)
    this.setState({isSelected: true})     
  }

  selectRowProp = {
    mode: "radio",  //checkbox for multi select, radio for single select.
    clickToSelect: true,   //click row will trigger a selection on that row.
    bgColor: "rgb(0, 193, 213)",   //selected row background color 
    onSelect: this.onRowSelect.bind(this)    
  };
  
  onAddUser(e){
    console.log("onAddUser");        
    this.context.router.push("/users/add")
  }
  
  onDeleteUser(e) {
    console.log("onDeleteUser",this.refs.userTable.state.selectedRowKeys);
    this.setState({showConfirmDelete: true})     
  }

  onEditUser(e){     
    const id = this.refs.userTable.state.selectedRowKeys[0];    
    this.context.router.push(
      `/users/edit/${id}`
    )         
  }

  componentDidMount() {
    const { dispatch } = this.props;     
    dispatch(UserListActions.fetchUsers());
  }

  okDelete() {
    this.setState({showConfirmDelete: false})
    const { dispatch } = this.props;  
    const id = this.refs.userTable.state.selectedRowKeys[0];       
    dispatch(UserListActions.deleteUser(id));
    dispatch(UserListActions.fetchUsers());
  }

  cancelDelete() {
    this.setState({showConfirmDelete: false})
  }  

  render() {
    
    var askConfirmDelete = this.state.showConfirmDelete

        ? <ConfirmDelete 
          title="Delete User"
          body = "Are you sure you want to delete this user?"
          closeBtnCaption = "Cancel"
          okBtnCaption = "Ok" 
          onOK={this.okDelete.bind(this)}
          onCancel={this.cancelDelete.bind(this)}
          showModal={true}                      
        />
        :null ;

    return (
      <div id="userlist">         
        <ButtonGroup bsClass="btn-group pull-right">
          <Button onClick={this.onAddUser.bind(this)}> <Glyphicon glyph="plus" /></Button>
          <Button disabled={!this.state.isSelected} onClick={this.onDeleteUser.bind(this)}> <Glyphicon glyph="minus" /></Button>
          <Button disabled={!this.state.isSelected} onClick={this.onEditUser.bind(this)}> <Glyphicon glyph="edit" /></Button> 
        </ButtonGroup>
         
        {askConfirmDelete}

        <BootstrapTable 
          data={this.props.users} 
          hover={true} 
          pagination={false}
          search={true} 
          selectRow={this.selectRowProp} 
          ref='userTable'>

          <TableHeaderColumn dataField="id" 
            isKey={true} dataAlign="center">Id </TableHeaderColumn>

          <TableHeaderColumn dataField="username"  dataAlign="center" dataSort={true}>
            User Name</TableHeaderColumn>  

          <TableHeaderColumn dataField="name" dataAlign="center"
            dataSort={true}>Name</TableHeaderColumn>
   
          <TableHeaderColumn dataField="user_type" dataAlign="center">
            User Type</TableHeaderColumn>

          <TableHeaderColumn dataField="updated_at" dataAlign="center">
            Updated on</TableHeaderColumn>   

          <TableHeaderColumn dataField="inserted_at" dataAlign="center">
            Created on</TableHeaderColumn>

          <TableHeaderColumn dataField="locked" dataAlign="center" dataFormat={boolFormatter}>
            Locked</TableHeaderColumn>

          <TableHeaderColumn dataField="enabled" dataAlign="center" dataFormat={boolFormatter}>
            Enabled</TableHeaderColumn>

        </BootstrapTable>
      </div>
    );
  }
}

UserList.contextTypes = {
    router: React.PropTypes.object
}

 
const mapStateToProps = (state) => ({     
  users: state.users.list 
});
 
export default connect(mapStateToProps)(UserList);
