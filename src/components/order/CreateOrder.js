import React from 'react'
import { Button } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom'

import { CREATE_ORDER_ROUTE, SCROLL_TOP } from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'


const CreateOrder = (props) => {
    
    // const history = useHistory()

    return (
        <div
            className="CreateOrder"
        >
                <Button
                    onClick={() => {
                        props?.setLoad()
                        scrollUp(SCROLL_TOP)
                        // history.push(CREATE_ORDER_ROUTE)
                        // window.open(CREATE_ORDER_ROUTE,'_self',false) 
                        window.location.href = CREATE_ORDER_ROUTE
                    }}
                    className="CreateOrderButton"
                    size="lg"
                    variant="success"
                >
                    Оформить заказ
                </Button>
            
        </div>
    )
}

export default CreateOrder
