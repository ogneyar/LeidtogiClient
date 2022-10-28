import React from 'react'

import Limit from './limit/Limit'
import MixAll from './mix/MixAll'
import NoImages from './noImages/NoImages'
import Sort from './sort/Sort'

import './Filter.css'


const Filter = () => {
    return (
        <div
            className="Filter"
        >
            {/* для админа */}
            <NoImages />
            <MixAll />
            {/* для пользователя */}
            <Sort />
            <Limit />
        </div>
    )
}

export default Filter
