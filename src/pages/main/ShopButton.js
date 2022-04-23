import React from 'react'
import { useHistory } from 'react-router-dom'

import { SHOP_ROUTE } from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'
import './ShopButton.css'


const ShopButton = () => {
    
    const history = useHistory()

    return (
        <div
            className="ShopButton"
            onClick={() => {
                history.push(SHOP_ROUTE)
                scrollUp(200)
            }}
        >
            Посетить магазин
        </div>
    )
}

export default ShopButton