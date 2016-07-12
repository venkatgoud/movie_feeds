import React, {PropTypes} from 'react';
import { Glyphicon, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect }      from 'react-redux';
import FeedActions      from '../actions/feedActions';
 
class FeedList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;     
    dispatch(FeedActions.fetchFeeds());
  }
  render() {    
    return (
      <BootstrapTable data={this.props.feeds} striped={true} hover={true}>
        <TableHeaderColumn dataField="id" 
          isKey={true} dataAlign="center" 
          dataSort={true}>Id </TableHeaderColumn>

        <TableHeaderColumn dataField="title">
          Title</TableHeaderColumn>  

        <TableHeaderColumn dataField="targets" 
          dataSort={true}>Targets</TableHeaderColumn>
 
        <TableHeaderColumn dataField="sources">
          Sources</TableHeaderColumn>

        <TableHeaderColumn dataField="updated_at">
          Updated on</TableHeaderColumn>   

        <TableHeaderColumn dataField="inserted_at">
          Created on</TableHeaderColumn>

        <TableHeaderColumn dataField="inserted_by">
          Inserted By</TableHeaderColumn>

        <TableHeaderColumn dataField="updated_by">
          Updated By</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}

const mapStateToProps = (state) => ({     
  feeds: state.feeds.list 
});

export default connect(mapStateToProps)(FeedList);
