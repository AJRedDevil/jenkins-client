// npm packages
import React, {Component} from 'react';
import {Form, Input, Button, Checkbox} from 'muicss/react';
import {connect} from 'react-redux';
import {pick} from 'lodash';

// our packages
import {
  loadData,
  saveData,
  saveInDB,
  enableCSRF,
  disableCSRF,
} from '../../services/settings/actions';

const KEY = 'jenkinsInfo';

class Settings extends Component {
  componentWillMount() {
    this.props.loadData(KEY);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const {newState, keys} = this.props.settings;
    this.props.saveInDB({
      key: KEY,
      value: pick(newState, keys),
    });
    this.props.saveData({dataLoaded: true});
    newState.isCSRFActive
      ? this.props.enableCSRF(newState)
      : this.props.disableCSRF();
  };

  handleInputChange = e => {
    const key = e.target.getAttribute('name');
    const {value} = e.target;
    this.props.saveData({key, value});
  };

  handleCheckboxChange = e => {
    const {name} = e.target;
    const params = {
      key: name,
      value: !this.props.settings.newState.isCSRFActive,
    };
    this.props.saveData(params);
  };

  render() {
    const {jenkinsInfo, dataLoaded, newState} = this.props.settings;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <legend>Settings</legend>
        <Input
          required
          label="IP"
          placeholder="ip"
          name="ip"
          value={newState.ip || jenkinsInfo.ip}
          onChange={this.handleInputChange}
        />
        <Input
          required
          label="Username"
          placeholder="username"
          name="username"
          value={newState.username || jenkinsInfo.username}
          onChange={this.handleInputChange}
        />
        <Input
          required
          label="Token"
          placeholder="token"
          name="token"
          value={newState.token || jenkinsInfo.token}
          onChange={this.handleInputChange}
        />
        <Checkbox
          name="isCSRFActive"
          label="CSRF Protection"
          checked={newState.isCSRFActive}
          onChange={this.handleCheckboxChange}
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
  enableCSRF: data => dispatch(enableCSRF(data)),
  disableCSRF: () => dispatch(disableCSRF()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
