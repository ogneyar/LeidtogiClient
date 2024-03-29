
import React from 'react'

import Top from './top/Top'
import NavBar from './navbar/NavBar'
import Address from './address/Address'
// import Banner from './banner/BannerSSR'
// import Carousel from './carousel/Carousel'
import Aside from './aside/Aside'
// import LineMenu from '../lineMenu/LineMenu'

import './Header.css'


const Header = () => { 
    return (
        <header
            className="Header"
        >
            <Top />
            <NavBar />  {/* Адрес есть и тут /> */}
            <Address /> {/* и тут /> */}
            {/* <Banner /> */}  {/* Банер перенесён в MainPage /> */}
            {/* <Carousel /> */}
            <Aside />

            {/* {window.location.host === "192.168.0.244:3000" &&
                <LineMenu /> // Добавил эту строку для тестирования LineMenu со смартфона
            } */}

        </header>
    )
}

export default Header
