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
    const [ details, setDetails ] = useState("")

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
        let confirm = window.confirm("Вы уверены что хотите изменить статус заказа №" + id + " на ДОСТАВЛЕН?")
        if (confirm) {
            if (user.user.id === 1) {
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
            }else {
                alert("У Вас не достаточно прав доступа, обратитесь к разработчику!")
            }
        }
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
            details 
            ? 
            <div
                className="OrderAdmin_details"
            >
                <strong>№</strong>&nbsp;{details.id}&nbsp;
                <br />
                <strong>Доставка:</strong>&nbsp;{details.delivery}&nbsp;
                <br />
                {details.delivery !== "pickup" && 
                <>
                    <strong>Адрес:</strong>&nbsp;{details.address}
                    <br />
                </>}                
                {details.phone && 
                <>
                    <strong>Телефон:</strong>&nbsp;{details.phone}&nbsp;
                    <br />
                </>}
                {details.name && 
                <>
                    <strong>Ф.И.О.:</strong>&nbsp;{details.name}&nbsp;
                    <br />
                </>}
                {details.trackNumber ? 
                <>
                    <strong>Трек номер:</strong>&nbsp;{details.trackNumber}&nbsp;
                    <br />
                </>
                : 
                <>
                    <strong>Добавить трек номер</strong>
                    <br />
                </>
                }
                <strong>Корзина:</strong>&nbsp;
                <br />
                {JSON.parse(details.cart).map(i => {
                    return "Артикул: " + i.itemCode + ". Наименование: " + i.name + " - " + i.quantity.value + ` шт. (Цена за штуку - ${i.itemPrice/100}р.) - ` + i.quantity.value * i.itemPrice/100 + "р. | "
                })}&nbsp;
                <br />
                <strong>Email:</strong>&nbsp;{details.email}
                <br />
                {details.createdAt && 
                <>
                    <strong>Дата создания заявки:</strong>&nbsp;{details.createdAt}&nbsp;
                    <br />
                </>}
                <br /><br />
                {/* {JSON.stringify(details)} */}
                {/* <br /><br /> */}
                <button
                    className='OrderAdmin_block_button'
                    onClick={() => setDetails("")}
                >
                    Назад
                </button>
            </div>
            :
            <div className='OrderAdmin_block'>
                {orders && Array.isArray(orders) && orders.map(i => {
                    return <>
                        <p>
                            <div
                                className="OrderAdmin_block_details"
                                onClick={() => setDetails(i)}
                                title="Подробное описание заказа"
                            >
                                {i.id})&nbsp;Статус:&nbsp;{i.state}&nbsp;
                            </div>
                            <br />
                            {i.pay === 1 ? "Оплачен:  ДА " : <>Оплачен:&nbsp;<span style={{cursor:"pointer"}} onClick={() => onClickSetPay(i.id)} title="Установить статус - оплачен.">НЕТ</span></>}&nbsp;
                            {i.state !== "taken" && i.state !== "delivered" && i.pay === 1 ?
                            <>
                                <br /><br />
                                <button
                                    className='OrderAdmin_block_button'
                                    onClick={() => onClickButtonOrderEnd(i.id)}
                                    title="Изменить статус на 'Доставлен'"
                                >
                                    Доставлен?
                                </button>
                            </>
                            : ""}
                            <hr />
                        </p>
                    </>
                }).reverse()}
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
