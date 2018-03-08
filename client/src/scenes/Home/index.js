// npm packages
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RingLoader} from 'react-spinners';
import {Container, Row, Col, Panel} from 'muicss/react';
import {isEmpty} from 'lodash';

// our packages
import {fetchData, setLoading} from '../../services/home/actions';

import './home.styl';

class Home extends Component {
  componentWillMount() {
    this.props.setLoading();
    this.props.fetchData();
  }

  renderMainBody = () => {
    const lastBuild = this.props.home.data;
    const params = lastBuild.actions[0].parameters;
    console.log(params);
    return (
      <Container className="parent">
        <Row className="row">
          <Col md="4" />
          <Col md="4" className="center-me">
            <Panel>
              <span className="icon-small">
                {lastBuild.result === 'SUCCESS' ? (
                  <i className="material-icons">thumb_up</i>
                ) : (
                  <i className="material-icons">thumb_down</i>
                )}
                <h4>{lastBuild.fullDisplayName}</h4>
              </span>
              <p>Filename: {lastBuild.artifacts[0].fileName}</p>
              <p>DC-Back: #{params[0].value}</p>
              <p>DC-Front: #{params[1].value}</p>
            </Panel>
          </Col>
          <Col md="4" />
        </Row>
      </Container>
    );
  };

  renderLoader = () => (
    <Container fluid className="parent">
      <Row className="row">
        <Col md="4" />
        <Col md="4" className="center-me">
          <RingLoader
            color="#4A90E2"
            loading={this.props.home.loading}
            size={100}
          />
        </Col>
        <Col md="4" />
      </Row>
    </Container>
  );

  render() {
    return this.props.home.loading || isEmpty(this.props.home.data)
      ? this.renderLoader()
      : this.renderMainBody();
  }
}

const mapStateToProps = state => ({
  home: state.home,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  setLoading: () => dispatch(setLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
