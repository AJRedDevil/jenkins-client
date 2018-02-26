// npm packages
import React, {Component} from 'react';
import {range} from 'lodash';
import {withRouter} from 'react-router-dom';

// our packages
// eslint-disable-next-line import/no-named-as-default
import SubMenu from './submenu';

const Category = ({text, onCategoryClick, identifier}) => (
  <strong onClick={onCategoryClick} identifier={identifier}>
    {text}
  </strong>
);

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuActiveStatus: {},
    };
  }

  componentWillMount() {
    const totalSubmenu = this.props.schema.length;
    const status = range(totalSubmenu).reduce((acc, index) =>
      Object.assign(...acc, {
        [index]: false,
      })
    );
    this.setState({subMenuActiveStatus: status});
  }

  goToHome = () => {
    this.props.history.push('/');
    this.props.toggleSideBar();
  };

  toggleSubMenu = e => {
    const index = parseInt(e.target.getAttribute('identifier'), 10);
    this.setState({
      ...this.state,
      subMenuActiveStatus: {
        ...this.state.subMenuActiveStatus,
        [index]: !this.state.subMenuActiveStatus[index],
      },
    });
  };

  renderMenu = () =>
    this.props.schema.map((item, index) => {
      return (
        <li key={item.id}>
          <Category
            text={item.category}
            identifier={index}
            onCategoryClick={this.toggleSubMenu}
          />
          <SubMenu
            isActive={this.state.subMenuActiveStatus[index]}
            items={item.items}
            toggleSideBar={this.props.toggleSideBar}
          />
        </li>
      );
    });

  render() {
    return (
      <div>
        <Category
          text="Home"
          identifier="Home"
          onCategoryClick={this.goToHome}
        />
        {this.renderMenu()}
      </div>
    );
  }
}

export default withRouter(Menu);
