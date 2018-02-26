// npm packages
import React, {Component} from 'react';
import {Form, Input, Button} from 'muicss/react';
import {isNull} from 'lodash';

// our packages
import db from '../../utils/db';

class Settings extends Component {
  state = {
    token: '',
    tokenExist: false,
  };

  componentWillMount() {
    db
      .fetch('token')
      .then(
        data =>
          isNull(data)
            ? this.setState({...this.state, tokenExist: false})
            : this.setState({...this.state, tokenExist: true})
      )
      .catch(error => console.error(error));
  }

  handleFormSubmit = e => {
    e.preventDefault();
    db
      .save('token', this.state.token)
      // TODO: Toast message
      .then(
        data =>
          isNull(data)
            ? console.log(data) // TODO: Toast error message
            : this.setState({...this.state, tokenExist: true, token: ''})
      )
      .catch(error => console.error(error));
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({...this.state, token: e.target.value});
  };

  render() {
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <legend>Settings</legend>
        <Input
          required
          placeholder="token"
          value={this.state.token}
          onChange={this.handleChange}
        />
        <Button variant="raised">
          {this.state.tokenExist ? 'Update' : 'Submit'}
        </Button>
      </Form>
    );
  }
}

export default Settings;
