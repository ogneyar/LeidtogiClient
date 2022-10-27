// eslint-disable-next-line
import React, { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../..'
import './Sort.css'

const Sort = observer(() => {
    
    const { product } = useContext(Context)

    // const [ products, setProducts ] = useState(false)

    const [ visibleMenu, setVisibleMenu ] = useState(false)
    const [ top, setTop ] = useState(0)
    const [ left, setLeft ] = useState(0)

    // useEffect(() => {
    //     //if (product && product.products) setProducts(product.products[0])
    // },[product, product.products])

    const onClickSort = (e) => {
        e.preventDefault()
        setTop(e.clientY)
        setLeft(e.clientX)
        setVisibleMenu(true)
    }

    const onClickSortOnPrice = () => {
        setVisibleMenu(false)
        product?.setSort("priceUp")
    }

    const onClickSortOnAlphabet = () => {
        setVisibleMenu(false)
    }

    const onClickBackground = () => {
        setVisibleMenu(false)
    }

    window.addEventListener('scroll', () => {
        setVisibleMenu(false)
    })

    return (
        <>
            <div
                className='Sort'
                onClick={e => onClickSort(e)}
            >
                Сортировать&nbsp;
                <i></i>
            </div>
            
            <div
                className='Sort_background'
                style={!visibleMenu ? {display: "none"} : {display: "flex"}}
                onClick={onClickBackground}
            >
                <div
                    className='Sort_Menu'
                    style={!visibleMenu ? {display: "none", visibility: "hidden"} : {display: "block", top, left}}
                >
                    <div 
                        onClick={onClickSortOnPrice}
                        className="Sort_Menu_div"
                    >
                        По цене (по возрастанию)
                    </div>
                    <div 
                        onClick={onClickSortOnAlphabet}
                        className="Sort_Menu_div"
                    >
                        По алфавиту (по возрастанию)
                    </div>
                </div>
            </div>
        </>
    )
})

export default Sort
