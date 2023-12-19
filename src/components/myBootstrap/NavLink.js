import React from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'

import './NavLink.css'


const NavLinker = (props) => {
    
    let className = "NavLink "
    if (props?.className) className = className + props.className
    let style = {}
    if (props?.style) style = props.style

    return (
        <NavLink 
            className={className}
            style={style}
            to={props.to}
            onClick={() => {
                // window.scrollTo(0,0)
                $('html, body').animate(
                    {
                        scrollTop: 0
                    }, 
                    700, 
                    function(){}
                )
            }}
        >
            {props?.children}
        </NavLink>
    )
}

export default NavLinker
