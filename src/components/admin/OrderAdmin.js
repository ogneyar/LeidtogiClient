import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { getAllOrders, editOrder } from '../../http/orderAPI'
import Loading from '../Loading'


const OrderAdmin = (props) => {

    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState("")
    const [ orders, setOrders ] = useState("")

    useEffect(() => {
        getAllOrders()
            .then(data => {
                if (data.error === undefined) setOrders(data)
                else setError(data.error)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => setLoading(false))
    }, []);

    const onClickButtonOrderEnd = async (id) => {
        setLoading(true)
        // forming, onway, delivered, taken
        await editOrder(id, { state: "delivered"})
            .then(data => {
                if (data.error === undefined) {
                    orders.map(i => {
                        if (i.id === id) return {...i, state: "delivered"}
                        return i
                    })
                    alert("Изменил, обнови страницу...")
                }else setError(data.error)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => setLoading(false))
    }


    return (
        <Modal
            closeButton
            show={props?.show}
            onHide={props?.onHide}
            // onHide={() => null}
            // size="sm"
            // size="lg"
            width="600"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            // animation={true}
        >
            <Modal.Header 
                // closeButton
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Заказы
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            {loading ? <Loading />
            :
            error ? <div>{error}</div>
            :
            <div className='d-flex flex-column'>
                {orders && Array.isArray(orders) && orders.map(i => {
                    return <>
                        <p>
                            {i.id}&nbsp;{i.state}&nbsp;{i.pay}&nbsp;
                            <button
                                onClick={() => onClickButtonOrderEnd(i.id)}
                            >Доставлен?</button>
                        </p>
                    </>
                })}
            </div>
            }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={props?.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default observer(OrderAdmin)
