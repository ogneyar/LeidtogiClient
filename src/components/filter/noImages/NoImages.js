import React, { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../..'
import './NoImages.css'

const NoImages = observer(() => {

    const { user, product } = useContext(Context)

    const [ value, setValue ] = useState(product.mixNoImg === false ? false : true)

    useEffect(() => {
    },[])
    
    const onChangeInput = () => {
        localStorage.setItem('mixNoImg', !value)
        setValue(!value)
        product.setMixNoImg(!value)
    }

    return (
        <div
            className='NoImages'
            style={user.user.id!==1 ? {display:"none",visible:"hidden"} : {}}
            onClick={onChangeInput}
        >
            MixNoImg&nbsp;

            <input 
                type="checkbox" 
                checked={value} 
                onChange={onChangeInput}
                onClick={() => {}} 
            />
        </div>
    )
})

export default NoImages
