import React from 'react'
import Top from './Top'
import NavBar from './NavBar'
import Aside from './Aside'
// eslint-disable-next-line
import Banner from './Banner'

import './Header.css'


const Header = () => {
    return (
        <header
            className="Header"
        >
            <Top />
            <NavBar />
            {/* <Banner /> */}
            <Aside />
        </header>
    )
}

export default Header
