import React, { useState, useEffect, useContext } from 'react'
// import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { getAllOrders, editOrder } from '../../http/orderAPI'
// import { ADMIN_ROUTE } from '../../utils/consts'
import Loading from '../Loading'
import { Context } from '../..'
import './OrderAdmin.css'


const OrderAdmin = (props) => {

    const { user } = useContext(Context) 

    // const history = useHistory()

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
        // setLoading(true)
        // forming, onway, delivered, taken
        await editOrder(id, { state: "delivered"})
            .then(data => {
                if (data.error === undefined) {
                    setOrders(orders.map(i => {
                        if (i.id === id) return {...i, state: "delivered"}
                        return i
                    }))
                    // alert("Статус заказа изменён!")
                    // history.push(ADMIN_ROUTE)
                    // window.open(ADMIN_ROUTE,'_self',false)
                }else setError(data.error)
            })
            .catch(err => {
                setError(err)
            })
            // .finally(() => setLoading(false))
    }

    const onClickSetPay = async (id) => {
        let confirm = window.confirm("Вы уверены что хотите изменить статус заказа №" + id + " на ОПЛАЧЕННЫЙ?")
        if (confirm) {
            if (user.user.id === 1) {
                await editOrder(id, { pay: 1})
                    .then(data => {
                        if (data.error === undefined) {
                            setOrders(orders.map(i => {
                                if (i.id === id) return {...i, pay: 1}
                                return i
                            }))
                        }else setError(data.error)
                    })
                    .catch(err => {
                        setError(err)
                    })
            }else {
                alert("У Вас не достаточно прав доступа, обратитесь к разработчику!")
            }
        }
    }


    return (
        <Modal
            className="OrderAdmin"
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
            <div className='OrderAdmin_block'>
                {orders && Array.isArray(orders) && orders.map(i => {
                    return <>
                        <p>
                            {i.id})&nbsp;Статус:&nbsp;{i.state}&nbsp;
                            {i.pay === 1 ? "Оплачен:  ДА " : <>Оплачен: <span style={{cursor:"pointer"}} onClick={() => onClickSetPay(i.id)}>НЕТ</span></>}&nbsp;
                            {i.state !== "taken" && i.state !== "delivered" ?
                                <button
                                    className='OrderAdmin_block_button'
                                    onClick={() => onClickButtonOrderEnd(i.id)}
                                >
                                    Доставлен?
                                </button>
                            : ""}
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
