
import React, { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import isSSR from '../../../utils/isSSR'
import { Context } from '../../..'
import './mix.css'

const MixPromo = observer(() => {

    // const { userStore, productStore } = useContext(Context)
    let userStore = null, productStore = null
    if ( ! isSSR ) {
        let context = useContext(Context)
        userStore = context.userStore
        productStore = context.productStore
    }

    const [ value, setValue ] = useState(productStore?.mixPromo === false ? false : true)

    useEffect(() => {
    },[])

    const onChangeInput = () => {
        localStorage?.setItem('mixPromo', !value)
        setValue(!value)
        productStore?.setMixPromo(!value)
    }

    return (
        <div
            className='Mix'
            style={userStore?.user.id!==1 ? {display:"none",visible:"hidden"} : {}}
            onClick={onChangeInput}
        >
            MixPromo&nbsp;

            <input 
                type="checkbox" 
                checked={value} 
                onChange={onChangeInput}
                onClick={() => {}} 
            />
        </div>
    )
})

export default MixPromo
