import React, { useState, useEffect, useContext } from 'react'
// import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { getAllOrders, editOrder, getOrder, editOrderCart } from '../../http/orderAPI'
// import { ADMIN_ROUTE } from '../../utils/consts'
import { URL } from '../../utils/consts'
import Loading from '../Loading'

import { Context } from '../..'
import './OrderAdmin.css'
import { Input } from '../myBootstrap'


const OrderAdmin = (props) => {

    const { user } = useContext(Context) 

    // const history = useHistory()

    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState("")
    const [ orders, setOrders ] = useState("")
    const [ details, setDetails ] = useState("")
    const [ editCart, setEditCart ] = useState(false)
    const [ createLink, setCreateLink ] = useState("")
    const [ quantity, setQuantity ] = useState(10)  // количество отображаемых заказов
    const [ amount, setAmount ] = useState(0)  // ИТОГО стоимость выбранного заказа
    const [ addPosition, setAddPosition ] = useState(false)
    const [ inputArticle, setInputArticle ] = useState("")
    const [ inputQuantity, setInputQuantity ] = useState("")

    useEffect(() => {
        setAllOrders()
    }, [])

    useEffect(() => {
        if (details) {
            let total = 0
            JSON.parse(details.cart).forEach(i => {
                if (i) total += i.quantity.value * i.itemPrice
            })
            setAmount(total/100)
        }
    }, [details])

    const setAllOrders = () => {
        getAllOrders()
            .then(data => {
                if (data.error === undefined) setOrders(data)
                else setError(data.error)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => setLoading(false))
    }

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

    const onClickButtonCreateLink = async (id, state) => {
        if (state === "forming") {
            let confirm = window.confirm("Вы уверены что хотите подтвердить заказ №" + id + "?")
            if (confirm) {
                if (user.user.id === 1) {
                    await editOrder(id, { state: "confirmed"})
                    let { uuid } = await getOrder(id)
                    setCreateLink(`${URL}payment_order?uuid=${uuid}`)
                    setEditCart(false)
                }else {
                    alert("У Вас не достаточно прав доступа, обратитесь к разработчику!")
                }
            }
        }else {
            let data = await getOrder(id)
            setCreateLink(`${URL}payment_order?uuid=${data.uuid}`)
        }
    }

    const onClickButtonBack = () => {
        setEditCart(false)
        setCreateLink("")
        setAllOrders()
        setDetails("")
    }

    const onHide = () => {
        props?.onHide()
        setQuantity(10)
        setDetails("")
        setEditCart(false)
        setCreateLink("")
    }

    const onClickDeletePosition = async (id, positionId) => {
        await editOrderCart(id, {
            deletePosition: true, 
            positionId
        }).then(data => {
            setDetails(data)
        })
    }

    const onClickButtonAddPosition = async (id) => {
        if (!addPosition) setAddPosition(true)
        else if (inputArticle) {
            // alert(inputArticle)
            let quantity = inputQuantity
            if (! quantity) quantity = 1
            
            await editOrderCart(id, {
                addPosition: true, 
                article: inputArticle, 
                quantity
            }).then(data => {
                setDetails(data)
            })
        }
    }


    return (
        <Modal
            className="OrderAdmin"
            closeButton
            show={props?.show}
            onHide={onHide}
            // onHide={() => null}
            // size="sm"
            // size="lg"
            width="600"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            // animation={true}
        >
            <Modal.Header 
                closeButton
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

                {editCart && <><br />--------------------------------------</>}

                {details && details.cart && typeof(details.cart) === "string" 
                && JSON.parse(details.cart).map(i => {
                    if (i === null) return null
                    return <div key={"details"+i.positionId}>
                        <span>{i.positionId}) Артикул: {i.itemCode}.</span> 
                        {editCart && JSON.parse(details.cart).length > 1 && 
                            <span 
                                className="OrderAdmin_details_deletePosition" 
                                onClick={() => onClickDeletePosition(details.id, i.positionId)}
                            >X</span>
                        }
                        <br />
                        <span>Наименование: {i.name}</span> <br />
                        <span>Количество: {i.quantity.value} шт. Цена: {i.itemPrice/100}р. </span> <br /> 
                        <span>Стоимость (шт * цену): {i.quantity.value * i.itemPrice/100}р.</span>
                    </div>
                })}&nbsp;

                {amount && <span>ИТОГО: {amount}р.<br /></span>}

                {/* {console.log(details.cart)} */}

                {editCart && 
                <span>
                    {addPosition && 
                        <div
                            className="OrderAdmin_details_addPosition"
                        >
                            <span>Артикул</span>
                            <Input 
                                type="text"
                                value={inputArticle}
                                onChange={e => setInputArticle(e.target.value)}
                            />
                            <span>Количество</span>
                            <Input 
                                type="number" 
                                placeholder="По умолчанию 1 штука" 
                                value={inputQuantity}
                                onChange={e => setInputQuantity(e.target.value)}
                            />
                        </div>
                    }
                    <Button
                        variant={addPosition ? "warning" :  "outline-warning"}
                        onClick={() => onClickButtonAddPosition(details.id)}
                    >
                        {addPosition ? "Добавить" :  "Добавить позицию"}
                    </Button>
                    <br />
                </span>
                }

                {editCart && <>--------------------------------------<br /><br /></>}

                {/* <br /> */}
                <strong>Email:</strong>&nbsp;{details.email}
                <br />
                {details.createdAt && 
                <>
                    <strong>Дата создания заявки:</strong>&nbsp;{details.createdAt}&nbsp;
                    <br />
                </>}
                <br />

                {editCart && <> editCart </>}

                <Button 
                    variant="outline-success"
                    // className='OrderAdmin_block_button'
                    onClick={() => setEditCart(!editCart)}
                    disabled={(details.state !== "forming" || createLink) ? true : false}
                >
                    Редактировать корзину
                </Button>

                <br /><br />

                <Button 
                    variant="outline-primary"
                    // className='OrderAdmin_block_button'
                    onClick={() => onClickButtonCreateLink(details.id, details.state)}
                    disabled={(details.state !== "forming" && details.state !== "confirmed") || details.pay || editCart ? true : false}
                >
                    Сформировать ссылку
                </Button>
                
                {createLink && 
                <div 
                    className="OrderAdmin_block_link"
                >
                    {createLink}
                </div>
                }

                <br /><br />
                <Button 
                    variant="outline-dark"
                    // className='OrderAdmin_block_button'
                    onClick={() => onClickButtonBack()}
                >
                    Назад
                </Button>
            </div>
            :
            <div className='OrderAdmin_block'>
                {orders && Array.isArray(orders) && orders.map((i, idx) => {
                    if (idx < orders.length - quantity) return null
                    return (
                        <div 
                            key={i.id + i.state}
                            className='OrderAdmin_block_one'
                        >
                            <div
                                className="OrderAdmin_block_details"
                                onClick={() => setDetails(i)}
                                title="Подробное описание заказа"
                            >
                                {i.id})&nbsp;Статус:&nbsp;{i.state}&nbsp;
                            </div>
                            {/* <br /> */}
                            <div
                                className='OrderAdmin_block_body'
                            >
                                {i.pay === 1 
                                ? "Оплачен: ДА " 
                                : 
                                <div
                                    className='OrderAdmin_block_body_status_button'
                                    onClick={() => onClickSetPay(i.id)} 
                                    title="Установить статус - оплачен."
                                >
                                    Оплачен:&nbsp;<span>НЕТ</span>
                                </div>
                                }
                                &nbsp;
                                {i.state !== "taken" && i.state !== "delivered" && i.pay === 1 
                                ?
                                <button
                                    className='OrderAdmin_block_button'
                                    onClick={() => onClickButtonOrderEnd(i.id)}
                                    title="Изменить статус на 'Доставлен'"
                                >
                                    Доставлен?
                                </button>
                                : ""}
                            </div>
                            {/* <hr /> */}
                        </div>
                   )
                }).reverse()}
                <Button
                    variant="outline-success"
                    onClick={() => setQuantity(quantity + 10)} 
                >
                    Ещё
                </Button>
            </div>
            }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default observer(OrderAdmin)
