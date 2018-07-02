import React from 'react'
import { NavLink } from 'react-router-dom'
const defaultStyle = { textDecoration: 'none' }

export default props => (
  <NavLink
    to={props.to || '/'}
    style={props.style || defaultStyle}
    activeStyle={props.activeStyle || defaultStyle}
    className={props.className || ''}
    activeClassName={props.activeClassName || ''}
  >
    {props.children}
  </NavLink>
)
