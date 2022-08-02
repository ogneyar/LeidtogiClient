import React from 'react'
import { useHistory } from 'react-router-dom'

import { SCROLL_TOP, SCROLL_TOP_MOBILE, SHOP_ROUTE } from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'
import './ShopButton.css'


const ShopButton = () => {
    
    const history = useHistory()

    return (
        <div
            className="ShopButton"
            onClick={() => {
                history.push(SHOP_ROUTE)
                if (window.innerWidth > 575) scrollUp(SCROLL_TOP)
                else scrollUp(SCROLL_TOP_MOBILE)
            }}
        >
            Посетить магазин
        </div>
    )
}

export default ShopButton