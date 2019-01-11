import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';


class UserTr extends Component {
  render() {
    const {id, firstName, lastName, phone, age} = this.props.user;

    return (
      <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{phone}</td>
        <td>{age}</td>
        <td><Button onClick={this.props.removeUser.bind(this, id)}>delete</Button></td>
      </tr>
    );
  }
}

UserTr.propTypes = {
  user: PropTypes.object.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserTr;
