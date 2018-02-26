// npm packages
import React, {Component} from 'react';
import {Form, Input, Button} from 'muicss/react';

class Settings extends Component {
  state = {
    token: '',
  };

  handleFormSubmit = e => {
    e.preventDefault();
    // TODO: Store it using localforage and update the token.
    // TODO: Renew the jenkins object.
    console.log(e.target);
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
        <Button variant="raised">Submit</Button>
      </Form>
    );
  }
}

export default Settings;
