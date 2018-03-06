// npm packages
import React, {Component} from 'react';
import {Form, Input, Button, Checkbox} from 'muicss/react';
import {connect} from 'react-redux';
import {pick, isEmpty, isNull} from 'lodash';

// our packages
import {
  fetchData,
  saveDataInState,
  saveDataInDB,
  updateDataInDB,
  fetchCsrfData,
  enableCSRF,
  disableCSRF,
} from '../../services/settings/actions';

class Settings extends Component {
  componentWillMount() {
    this.props.fetchData();
    this.props.fetchCsrfData();
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const {formData, keys, dataLoaded, serverData} = this.props.settings.config;
    const {saveDataInDB, updateDataInDB} = this.props;
    dataLoaded
      ? updateDataInDB({data: pick(formData, keys), id: serverData.id})
      : saveDataInDB(pick(formData, keys));
  };

  handleInputChange = e => {
    const key = e.target.getAttribute('name');
    const {value} = e.target;
    this.props.saveDataInState({key, value});
  };

  handleCheckboxChange = () => {
    const {csrf, config} = this.props.settings;
    if (csrf.isEnabled) {
      // disable if enabled
      this.props.disableCSRF({id: csrf.id});
    } else if (!this.isFormEmpty()) {
      // enable if disabled
      this.props.enableCSRF(pick(config.formData, config.keys));
    }
  };

  isFormEmpty = () => {
    const {formData} = this.props.settings.config;
    const values = Object.values(formData).map(
      item => (isNull(item) ? item : item.toString())
    );
    return values.filter(isEmpty).length > 0;
  };

  render() {
    const {dataLoaded, formData} = this.props.settings.config;
    const {isEnabled} = this.props.settings.csrf;
    return (
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <legend>Settings</legend>
          <Input
            required
            label="IP"
            placeholder="ip"
            name="ip"
            value={formData.ip}
            onChange={this.handleInputChange}
          />
          <Input
            required
            label="Port"
            placeholder="port"
            name="port"
            value={formData.port}
            onChange={this.handleInputChange}
          />
          <Input
            required
            label="Username"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={this.handleInputChange}
          />
          <Input
            required
            label="Token"
            placeholder="token"
            name="token"
            value={formData.token}
            onChange={this.handleInputChange}
          />
          <Button variant="raised">{dataLoaded ? 'Update' : 'Submit'}</Button>
        </Form>
        <hr />
        <Checkbox
          name="isCSRFActive"
          label="Enable/Disable CSRF Protection"
          checked={isEnabled}
          onChange={this.handleCheckboxChange}
          disabled={this.isFormEmpty()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  fetchCsrfData: () => dispatch(fetchCsrfData()),
  saveDataInState: data => dispatch(saveDataInState(data)),
  saveDataInDB: data => dispatch(saveDataInDB(data)),
  updateDataInDB: data => dispatch(updateDataInDB(data)),
  enableCSRF: data => dispatch(enableCSRF(data)),
  disableCSRF: data => dispatch(disableCSRF(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
