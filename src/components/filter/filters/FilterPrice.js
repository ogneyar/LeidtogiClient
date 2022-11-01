
import React, { useState } from 'react'
import PopUp from '../../myBootstrap/popup/PopUp'

import './FilterPrice.css'


const FilterPrice = () => {

    const [ visibleMenu, setVisibleMenu ] = useState(false)

    const [ i_from, set_i_from ] = useState("-- | -------")
    
    // const onClickFilterPrice = (e) => {
    //     e.preventDefault()
    //     setTop(e.clientY)
    //     setLeft(e.clientX)
    //     setVisibleMenu(true)
    // }
    
    const onMouseDown_i_from = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // let i_from = document.querySelector("#FilterPrice_i_from")
        // i_from.style.color = "red"
        // i_from.innerHTML = "-&nbsp;|&nbsp;--------"
        // alert("jhgkjhk")
        // console.log(i_from.innerHTML)
        set_i_from("- | --------")
    }
    
    const onClick_i_from = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }


    return (
        <div className="FilterPrice">
            <PopUp
                name="Фильтровать"
                visible={visibleMenu}
                setVisible={setVisibleMenu}
            >
                <div>По цене</div>
                <div><span>от 100</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>до 1000</span></div>
                <div
                    className="FilterPrice_div"
                >
                    <span 
                        className="FilterPrice_span"
                        id="FilterPrice_span_from"
                    >
                        <i 
                            id="FilterPrice_i_from"
                            onMouseDown={e => onMouseDown_i_from(e)}
                            onClick={e => onClick_i_from(e)}
                        >
                            {i_from}
                        </i>
                    </span>
                    <span 
                        className="FilterPrice_span"
                        id="FilterPrice_span_before"
                    >
                        ----<i id="ilterPrice_i_before">&nbsp;|&nbsp;</i>-----
                    </span>
                </div>
            </PopUp>
        </div>
    )
}

export default FilterPrice