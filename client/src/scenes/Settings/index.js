// npm packages
import React, {Component} from 'react';
import {Form, Input, Button} from 'muicss/react';
import {connect} from 'react-redux';

// our packages
import {loadData, saveData, saveInDB} from '../../services/settings/actions';

const KEY = 'jenkinsInfo';

class Settings extends Component {
  componentWillMount() {
    this.props.loadData(KEY);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.saveInDB({
      key: KEY,
      value: this.props.settings.newState,
    });
    this.props.saveData({dataLoaded: true});
  };

  handleChange = e => {
    e.preventDefault();
    const key = e.target.getAttribute('identifier');
    const {value} = e.target;
    this.props.saveData({key, value});
  };

  render() {
    const {jenkinsInfo, dataLoaded, newState} = this.props.settings;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <legend>Settings</legend>
        <Input
          required
          placeholder="ip"
          identifier="ip"
          value={newState.ip || jenkinsInfo.ip}
          onChange={this.handleChange}
        />
        <Input
          required
          placeholder="username"
          identifier="username"
          value={newState.username || jenkinsInfo.username}
          onChange={this.handleChange}
        />
        <Input
          required
          placeholder="token"
          identifier="token"
          value={newState.token || jenkinsInfo.token}
          onChange={this.handleChange}
        />
        <Button variant="raised">{dataLoaded ? 'Update' : 'Submit'}</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  loadData: data => dispatch(loadData(data)),
  saveData: data => dispatch(saveData(data)),
  saveInDB: data => dispatch(saveInDB(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
