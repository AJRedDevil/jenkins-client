// npm packages
import React, {Component} from 'react';
import {range, isObject} from 'lodash';
import {withRouter} from 'react-router-dom';

// our packages
// eslint-disable-next-line import/no-named-as-default
import SubMenu from './submenu';

const Category = ({text, onCategoryClick, link, identifier}) => (
  <strong onClick={onCategoryClick} link={link} identifier={identifier}>
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

  handleCategoryClick = e => {
    const link = e.target.getAttribute('link');
    this.props.history.push(link);
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

  renderCategorySubMenu = (item, index) => (
    <div>
      <Category
        text={item.category}
        onCategoryClick={this.toggleSubMenu}
        identifier={index}
      />
      <SubMenu
        isActive={this.state.subMenuActiveStatus[index]}
        items={item.items}
      />
    </div>
  );

  renderCategoryOnly = item => (
    <Category
      text={item.text}
      link={item.link}
      onCategoryClick={this.handleCategoryClick}
    />
  );

  render() {
    return this.props.schema.map((item, index) => {
      return (
        <li key={item.id}>
          {isObject(item.category)
            ? this.renderCategoryOnly(item.category)
            : this.renderCategorySubMenu(item, index)}
        </li>
      );
    });
  }
}

export default withRouter(Menu);
