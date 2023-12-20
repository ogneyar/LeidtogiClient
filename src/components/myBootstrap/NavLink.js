import React from 'react'
import { NavLink } from 'react-router-dom'

import { SCROLL_TOP, SCROLL_TOP_MOBILE } from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'
import isSSR from '../../utils/isSSR'

import './NavLink.css'


const NavLinker = (props) => {
    
    let className = "NavLink "
    if (props?.className) className = className + props.className
    let style = {}
    if (props?.style) style = props.style

    let scroll = SCROLL_TOP
    if (( ! isSSR ) && window.innerWidth <= 575) scroll = SCROLL_TOP_MOBILE

    return (
        <NavLink 
            className={className}
            style={style}
            to={props.to}
            onClick={() => scrollUp(scroll)}
        >
            {props?.children}
        </NavLink>
    )
}

export default NavLinker
