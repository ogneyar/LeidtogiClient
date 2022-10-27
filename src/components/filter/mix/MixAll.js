import React, { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../..'
import './MixAll.css'

const MixAll = observer(() => {

    const { user, product } = useContext(Context)

    const [ value, setValue ] = useState(product.mixAll === false ? false : true)

    useEffect(() => {
    },[])

    const onChangeInput = () => {
        localStorage.setItem('mixAll', !value)
        setValue(!value)
        product.setMixAll(!value)
    }

    return (
        <div
            className='MixAll'
            style={user.user.id!==1 ? {display:"none",visible:"hidden"} : {}}
            onClick={onChangeInput}
        >
            Перемешать&nbsp;

            <input 
                type="checkbox" 
                checked={value} 
                onChange={onChangeInput}
                onClick={() => {}} 
            />
        </div>
    )
})

export default MixAll
