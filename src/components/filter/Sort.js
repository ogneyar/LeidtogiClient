import React, { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../..'
import './Sort.css'

const Sort = observer(() => {

    const { user, product } = useContext(Context)

    const [ value, setValue ] = useState(product.sort === false ? false : true)

    useEffect(() => {
    },[])

    return (
        <div
            className='Sort'
            style={user.user.id!==1 ? {display:"none",visible:"hidden"} : {}}
        >
            Перемешать&nbsp;

            <input 
                type="checkbox" 
                checked={value} 
                onClick={() => {
                    // alert(product.sort)
                    localStorage.setItem('sort', !value)
                    setValue(!value)
                    product.setSort(!value)
                }} 
            />
        </div>
    )
})

export default Sort
