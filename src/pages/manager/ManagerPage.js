
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import OrderService from '../../service/manager/OrderService'

import './ManagerPage.css'


const ManagerPage = observer(() => {
    
    const [ action, setAction ] = useState(null)

    
    return (
        <Container
            className="ManagerPage Mobile"
        >
            <center>
                <h2>Менеджерская</h2>

                <div>
                    {action && action == "order" 
                    ?
                        <OrderService back={() => setAction(null)} />
                    :
                    <>
                        <br />
                        <button
                            className="btn btn-success"
                            onClick={() => setAction("order")}
                        >
                            Заказы    
                        </button>
                        <br /><br />
                    </>
                    } 
                </div>
            </center>
        </Container>
    )
})

export default ManagerPage
