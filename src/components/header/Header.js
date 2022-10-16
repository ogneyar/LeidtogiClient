import React from 'react'
import Top from './Top'
import NavBar from './NavBar'
import Address from './Address'
import Aside from './Aside'
// eslint-disable-next-line
import Banner from './Banner'
// eslint-disable-next-line
import Carousel from './Carousel'

import './Header.css'


const Header = () => {
    return (
        <header
            className="Header"
        >
            <Top />
            <NavBar />  {/* Адрес есть и тут /> */}
            <Address /> {/* и тут /> */}
            <Banner />
            {/* <Carousel /> */}
            <Aside />
        </header>
    )
}

export default Header
