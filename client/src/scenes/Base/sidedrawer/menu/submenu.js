// npm packages
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const titleState = isActive => (isActive ? 'block' : 'None');

export const SubMenu = props => (
  <ul style={{display: titleState(props.isActive)}}>
    {props.items.map(item => (
      <li key={item.id}>
        <Link to={item.link} onClick={props.toggleSideBar}>
          {item.text}
        </Link>
      </li>
    ))}
  </ul>
);
SubMenu.propTypes = {
  isActive: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      link: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};
export default SubMenu;
