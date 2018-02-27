// npm packages
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BarLoader} from 'react-spinners';
import {Container, Row, Col} from 'muicss/react';

import 'muicss/dist/css/mui.min.css';

// our packages
import Header from './header';
import SideDrawer from './sidedrawer';
import Content from './content';
import Footer from './footer';
import {
  fetchData,
  toggleSideBar,
  setLoading,
  dbConfigured,
} from '../../services/main/actions';
import db from '../../utils/db';

import './style.styl';

const sideBarClassName = status => (status ? '' : 'hide-sidedrawer');

class Base extends Component {
  componentWillMount() {
    if (this.props.root.configureDB) {
      db.configure();
      this.props.dbConfigured();
    }
    this.props.setLoading();
    this.props.fetchData();
  }

  handleToggleSideBar = () => {
    this.props.toggleSideBar();
  };

  renderMainBody = () => (
    <div id="body" className={sideBarClassName(this.props.root.showSideBar)}>
      <SideDrawer schema={this.props.root.schema} />
      <Header toggleSideBar={this.handleToggleSideBar} />
      <Content />
      <Footer />
    </div>
  );

  renderLoader = () => (
    <Container fluid className="parent">
      <Row className="row">
        <Col md="4" />
        <Col md="4" className="center-me">
          <BarLoader
            color="#4A90E2"
            loading={this.props.root.loading}
            width={400}
            height={5}
          />
        </Col>
        <Col md="4" />
      </Row>
    </Container>
  );

  render() {
    return this.props.root.loading
      ? this.renderLoader()
      : this.renderMainBody();
  }
}

const mapStateToProps = state => ({
  root: state.root,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  toggleSideBar: () => dispatch(toggleSideBar()),
  setLoading: () => dispatch(setLoading()),
  dbConfigured: () => dispatch(dbConfigured()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Base);
