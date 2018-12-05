import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './SignupForm.css'

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (field, e) => {
    this.props.updateMessage('');
    this.setState({
      // Using ES2015 Computed Property Names
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      // successfully signed up - show GamePage
      .then(() => {
        this.props.handleSignuporLogin();
        this.props.history.push('/');
      })
      // invalid user data
      .catch(err => this.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className='SignupForm'>
        <header className="SignupHeader">Sign Up</header>
        <form onSubmit={this.handleSubmit} className="SignUpForm">
          <div>
            <div>
              <input className="SignupFormInput" type="text" placeholder="Name" value={this.state.name} onChange={(e) => this.handleChange('name', e)} />
            </div>
          </div>
          <div>
            <div>
              <input className="SignupFormInput" type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
            </div>
          </div>
          <div>
            <div>
              <input className="SignupFormInput" type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
            </div>
          </div>
          <div>
            <div>
              <input className="SignupFormInput" type="password" placeholder="Confirm Password" value={this.state.passwordConf} onChange={(e) => this.handleChange('passwordConf', e)} />
            </div>
          </div>
          <div>
            <div>
              <button className='ButtonInput' disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default SignupForm;