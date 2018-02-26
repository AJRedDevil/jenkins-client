// npm packages
import React, {Component} from 'react';
import {range} from 'lodash';
import uuidv4 from 'uuid/v4';

import 'muicss/dist/css/mui.min.css';

// our packages
import Header from './components/header';
import SideDrawer from './components/sidedrawer';
import Content from './components/content';
import Footer from './components/footer';

import './style.styl';

const data = range(1, 4).map(i => ({
  id: uuidv4(),
  category: `Category ${i}`,
  items: range(1, 4).map(j => ({id: uuidv4(), value: `Item ${j}`})),
}));

const sideBarClassName = status => (status ? '' : 'hide-sidedrawer');

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
    this.handleToggleSideBar = this.handleToggleSideBar.bind(this);
  }

  handleToggleSideBar() {
    this.setState({...this.state, show: !this.state.show});
  }

  render() {
    return (
      <div id="body" className={sideBarClassName(this.state.show)}>
        <SideDrawer data={data} />
        <Header toggleSideBar={this.handleToggleSideBar} />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default MainApp;
