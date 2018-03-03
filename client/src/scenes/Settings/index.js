// npm packages
import React, {Component} from 'react';
import {Form, Input, Button, Checkbox} from 'muicss/react';
import {connect} from 'react-redux';
import {pick} from 'lodash';

// our packages
import {
  fetchData,
  saveDataInState,
  saveDataInDB,
  enableCSRF,
  disableCSRF,
} from '../../services/settings/actions';

const KEY = 'jenkinsInfo';

class Settings extends Component {
  componentWillMount() {
    this.props.fetchData(KEY);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const {newState, keys} = this.props.settings;
    this.props.saveDataInDB({
      key: KEY,
      value: pick(newState, keys),
    });
    this.props.saveDataInState({dataLoaded: true});
    newState.isCSRFActive
      ? this.props.enableCSRF(newState)
      : this.props.disableCSRF();
  };

  handleInputChange = e => {
    const key = e.target.getAttribute('name');
    const {value} = e.target;
    this.props.saveDataInState({key, value});
  };

  handleCheckboxChange = e => {
    const {name} = e.target;
    const params = {
      key: name,
      value: !this.props.settings.newState.isCSRFActive,
    };
    this.props.saveDataInState(params);
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
          label="Port"
          placeholder="port"
          name="port"
          value={newState.port || jenkinsInfo.port}
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
  fetchData: data => dispatch(fetchData(data)),
  saveDataInState: data => dispatch(saveDataInState(data)),
  saveDataInDB: data => dispatch(saveDataInDB(data)),
  enableCSRF: data => dispatch(enableCSRF(data)),
  disableCSRF: () => dispatch(disableCSRF()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
