import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserTr from './UserTr';

import {Table} from 'reactstrap';

import './UsersTable.css';


class UsersTable extends Component {
  handleClick = (e, colName, direction) => {
    let spanList = document.querySelectorAll('th span');
    spanList.forEach((span) => {
      span.classList.remove("active")
    });
    e.currentTarget.classList.add('active');
    this.props.changeSort(colName, direction);
  };

  render() {
    return (
      <Table>
        <thead>
        <tr>
          <th>
            First name
            <span onClick={e => this.handleClick(e, 'firstName', 'asc')} className="ml-1">&#8593;</span>
            <span onClick={e => this.handleClick(e, 'firstName', 'desc')}>&#8595;</span>
          </th>
          <th>
            Last name
            <span onClick={e => this.handleClick(e, 'lastName', 'asc')} className="ml-1">&#8593;</span>
            <span onClick={e => this.handleClick(e, 'lastName', 'desc')}>&#8595;</span>
          </th>
          <th>
            Phone
            <span onClick={e => this.handleClick(e, 'phone', 'asc')} className="ml-1">&#8593;</span>
            <span onClick={e => this.handleClick(e, 'phone', 'desc')}>&#8595;</span>
          </th>
          <th>
            Age
            <span onClick={e => this.handleClick(e, 'age', 'asc')} className="ml-1">&#8593;</span>
            <span onClick={e => this.handleClick(e, 'age', 'desc')}>&#8595;</span>
          </th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {this.props.users.map((user) => (
          <UserTr key={user.id} user={user} removeUser={this.props.removeUser}/>
        ))}
        </tbody>
      </Table>
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  removeUser: PropTypes.func.isRequired,
  changeSort: PropTypes.func.isRequired,
};

export default UsersTable;
