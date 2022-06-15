import React from 'react'

import Limit from './limit/Limit'
import Sort from './sort/Sort'
import NoImages from './noImages/NoImages'

import './Filter.css'


const Filter = () => {
    return (
        <div
            className="Filter"
        >
            <NoImages />
            <Sort />
            <Limit />
        </div>
    )
}

export default Filter
