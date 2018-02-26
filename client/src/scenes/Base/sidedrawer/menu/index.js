// npm packages
import React, {Component} from 'react';
import {range} from 'lodash';

const Category = ({text, onCategoryClick, identifier}) => (
  <strong onClick={onCategoryClick} identifier={identifier}>
    {text}
  </strong>
);

const Link = ({text}) => (
  <li>
    <a href="#">{text}</a>
  </li>
);

const titleState = status => (status ? 'block' : 'None');

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuActiveStatus: {},
    };
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
  }

  componentWillMount() {
    const totalSubmenu = this.props.data.length;
    const status = range(totalSubmenu).reduce((acc, index) =>
      Object.assign(...acc, {
        [index]: false,
      })
    );
    this.setState({subMenuActiveStatus: status});
  }

  toggleSubMenu(e) {
    const index = parseInt(e.target.getAttribute('identifier'), 10);
    this.setState({
      ...this.state,
      subMenuActiveStatus: {
        ...this.state.subMenuActiveStatus,
        [index]: !this.state.subMenuActiveStatus[index],
      },
    });
  }

  render() {
    return this.props.data.map((item, index) => {
      return (
        <li key={item.id}>
          <Category
            text={item.category}
            identifier={index}
            onCategoryClick={this.toggleSubMenu}
          />
          <ul
            style={{display: titleState(this.state.subMenuActiveStatus[index])}}
          >
            {item.items.map(link => <Link text={link.value} key={link.id} />)}
          </ul>
        </li>
      );
    });
  }
}

export default Menu;
