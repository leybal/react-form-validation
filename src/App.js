import React, {Component} from 'react';
import firebase from 'firebase';

import { userService } from './services/user.service';
import {DB_CONFIG} from "./config/db_config";

import UserForm from './components/UserForm';
import UsersTable from './components/UsersTable';

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sortBy: 'id',
      sortDirect: 'asc'
    };
    this.firebaseApp = firebase.initializeApp(DB_CONFIG);
    this.database = this.firebaseApp.database().ref().child('users');
  }

  componentWillMount() {
    let previousUsers = this.state.users;

    this.database.orderByChild(this.state.sortBy).on('child_added', snap => {
      previousUsers.push({
        id: snap.key,
        firstName: snap.val().firstName,
        lastName: snap.val().lastName,
        phone: snap.val().phone,
        age: snap.val().age,
      });

      if (this.state.sortDirect === 'desc') {
        previousUsers.reverse()
      }

      this.setState({...this.state, users: previousUsers})
    });

    this.database.on('child_removed', snap => {
      for (let i = 0; i < previousUsers.length; i++) {
        if (previousUsers[i].id === snap.key) {
          previousUsers.splice(i, 1);
          break;
        }
      }

      this.setState({...this.state, users: previousUsers})
    })
  }

  addUser = (userData) => {
    userService.addUser(this.database, userData)
  };

  removeUser = (id) => {
    userService.removeUser(this.database, id)
  };

  compareBy = (key, sortDirect) => {
    if (sortDirect === 'asc') {
      return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      }
    } else {
      return function (a, b) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      }
    }
  };

  changeSort = (sortBy, sortDirect) => {
    let usersCopy = [...this.state.users];
    usersCopy.sort(this.compareBy(sortBy, sortDirect));

    this.setState({
      users: usersCopy,
      sortBy: sortBy,
      sortDirect: sortDirect
    })
  };

  render() {
    return (
      <div className="App">
        <Header/>

        <Container>
          <Row className="mb-5">
            <Col>
              <UserForm addUser={this.addUser} removeUser={this.removeUser}/>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <UsersTable users={this.state.users} removeUser={this.removeUser} changeSort={this.changeSort}/>
            </Col>
          </Row>
        </Container>

        <Footer/>
      </div>
    );
  }
}

export default App;
