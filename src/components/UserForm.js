import React, {Component} from 'react';
import {ValidationForm, TextInput} from "react-bootstrap4-form-validation"
import PropTypes from 'prop-types';

class UserForm extends Component {
  initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    age: ''
  };

  state = {...this.initialState};

  handleChange = (e) => this.setState({[e.target.name]: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state);
    this.setState({...this.initialState});

    let inputs = document.querySelectorAll('form input.form-control'),
      form = document.querySelector('form.was-validated');
    inputs.forEach((input) => {
      input.classList.remove("is-valid", "is-valid")
    });
    form.classList.remove("was-validated")
  };

  render() {
    return (
      <React.Fragment>
        <ValidationForm onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <TextInput name="firstName" id="firstName"
                       onChange={this.handleChange}
                       value={this.state.firstName}
                       required
                       minLength="2"
                       maxLength="15"
                       successMessage="Looks good!"
                       errorMessage={{
                         minLength: "Minimum {minLength} characters is required",
                       }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <TextInput name="lastName" id="lastName"
                       onChange={this.handleChange}
                       value={this.state.lastName}
                       minLength="2"
                       maxLength="15"
                       errorMessage={{
                         minLength: "Minimum {minLength} characters is required",
                       }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <TextInput name="phone" id="phone"
                       value={this.state.phone}
                       onChange={this.handleChange}
                       required
                       maxLength="15"
                       pattern="^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$"
                       successMessage="Looks good!"
                       errorMessage={{
                         pattern: "Look at the example"
                       }}
            />
            <p>
              Examples: <br/>
              0923456789 <br/>
              (+33)1.23 45-6789
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <TextInput name="age" id="age"
                       value={this.state.age}
                       onChange={this.handleChange}
                       required
                       maxLength="15"
                       successMessage="Looks good!"
                       errorMessage="What is your age?"
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Submit</button>
          </div>
        </ValidationForm>
      </React.Fragment>
    )
  }
}

UserForm.propTypes = {
  addUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserForm;
