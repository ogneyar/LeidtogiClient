import React from 'react'
import { useHistory } from 'react-router-dom'

import { SCROLL_TOP, SCROLL_TOP_MOBILE, SHOP_ROUTE } from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'
import { NavLink } from '../../components/myBootstrap'

import './ShopButton.css'


const ShopButton = () => {
    
    const history = useHistory()

    return (
        <NavLink
            className="ShopButton"
            // onClick={() => {
            //     history.push(SHOP_ROUTE)
            //     if (window.innerWidth > 575) scrollUp(SCROLL_TOP)
            //     else scrollUp(SCROLL_TOP_MOBILE)
            // }}
            to={SHOP_ROUTE}
        >
            ПРОДУКЦИЯ
        </NavLink>
    )
}

export default ShopButton