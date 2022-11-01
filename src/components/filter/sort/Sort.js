
import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../../..'
import './Sort.css'
import PopUp from '../../myBootstrap/popup/PopUp'

const Sort = observer(() => {
    
    const { productStore } = useContext(Context)

    const [ visibleMenu, setVisibleMenu ] = useState(false)

    const onClickSortOnPrice = () => {
        setVisibleMenu(false)
        localStorage.setItem("sort","priceUp")
        productStore.setSort("priceUp")
        productStore.setPage(1)
    }

    const onClickSortOnName = () => {
        setVisibleMenu(false)
        localStorage.setItem("sort","nameUp")
        productStore.setSort("nameUp")
        productStore.setPage(1)
    }


    return (
        <div
            className='Sort'
            // onClick={e => onClickSort(e)}
        >
            <PopUp
                name="Сортировать"
                visible={visibleMenu}
                setVisible={setVisibleMenu}
            >
                <div 
                    onClick={onClickSortOnPrice}
                    className="Sort_Menu_div"
                >
                    По цене (по возрастанию)
                </div>
                <div 
                    onClick={onClickSortOnName}
                    className="Sort_Menu_div"
                >
                    По алфавиту (по возрастанию)
                </div>
            </PopUp>
        </div>
    )
})

export default Sort
