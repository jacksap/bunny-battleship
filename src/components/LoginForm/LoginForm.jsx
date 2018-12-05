import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import './LoginForm.css'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    }
  }

  handleChange = (field, e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [field]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
      .then(() => {
        this.props.handleSignuporLogin();
        this.props.history.push('/');
      })
      // invalid credentials - don't alert in YOUR app :)
      .catch(err => alert('Invalid Credentials!'));
  }

  render() {
    return (
      <div className='LoginForm'>
        <h1 className="LoginHeader">Log In</h1>
      <div className='LoginWrapper'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <input type="email" placeholder="Email" value={this.state.email} className="InputForm" onChange={(e) => this.handleChange('email', e)} />
            </div>
          </div>
          <div>
            <div className="InputForm">
              <input type="password" placeholder="Password" value={this.state.pw} className="InputForm" onChange={(e) => this.handleChange('pw', e)} />
            </div>
          </div>
          <div>
            <div className="LoginFlex">
              <button className="ButtonInput">Log In</button>&nbsp;&nbsp;&nbsp;
              <Link to='/' className="LoginSubmit">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
      </div>
    );
  }
};

export default LoginForm;