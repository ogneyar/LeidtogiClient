
import React from 'react'

import Limit from '../filter/limit/Limit'
import Sort from '../filter/sort/Sort'
import FilterPrice from '../filter/filters/FilterPrice'

import './LineMenu.css'


const LineMenu = () => {


    // if (true) return 

    return (
        <div
            className="LineMenu"
        >
            <div
                className="LineMenu_box"
            >
                <div
                    className="LineMenu_body"
                >
                    <Limit />
                    <Sort />
                    <FilterPrice />
                </div>
            </div>
        </div>
    )
}

export default LineMenu