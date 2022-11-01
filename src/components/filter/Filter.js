import React from 'react'

import Limit from './limit/Limit'
import MixAll from './mix/MixAll'
import NoImages from './noImages/NoImages'
import Sort from './sort/Sort'
import LineMenu from '../lineMenu/LineMenu'
import FilterPrice from './filters/FilterPrice'

import './Filter.css'


const Filter = () => {
    return (
        <div
            className="Filter"
        >
            {/* Боковое меню */}
            <LineMenu />

            {/* для админа */}
            <NoImages />
            <MixAll />
            {/* для пользователя */}
            <FilterPrice />
            <Sort />
            <Limit />
        </div>
    )
}

export default Filter
