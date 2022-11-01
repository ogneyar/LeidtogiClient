
import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import './PopUp.css'


// обязательные пропсы:
// props.name
// props.visible
// props.setVisible
const PopUp = observer((props) => {
    
    const [ top, setTop ] = useState(0)
    const [ left, setLeft ] = useState(0)

    const onClickPopUp = (e) => {
        e.preventDefault()
        setTop(e.clientY)
        setLeft(e.clientX)
        props.setVisible(true)
    }

    const onClickBackground = () => {
        props.setVisible(false)
    }

    window.addEventListener('scroll', () => {
        props.setVisible(false)
    })
    

    return (
        <>
            <div
                className='PopUp'
                onClick={e => onClickPopUp(e)}
            >
                {props.name}
            </div>
            
            <div
                className='PopUp_background'
                style={!props.visible ? {display: "none"} : {display: "flex"}}
                onClick={onClickBackground}
            >
                <div
                    className='PopUp_Menu'
                    style={!props.visible? {display: "none", visibility: "hidden"} : {display: "block", top, left}}
                >
                    {props.children}
                </div>
            </div>
        </>
    )
})

export default PopUp
