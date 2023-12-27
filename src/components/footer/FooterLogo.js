
import React from 'react'
import { Image } from 'react-bootstrap'

import { NavLink } from '../myBootstrap'
import { URL } from '../../utils/consts'

import './FooterLogo.css'


const FooterLogo = () => {
    
    return (
        <div
            className="FooterLogo"
        >
            <NavLink 
                className="NavLink"
                to="/"
            >
                <Image 
                    className="FooterLogoImage" 
                    src={URL + "images/logo.png"} 
                />                
            </NavLink>
        </div> 
    )
}

export default FooterLogo
