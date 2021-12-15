import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import { getListCities, getListCitiesByName, getListPointsByCityCode, getDeliveryCosts } from '../../../http/delivery/boxberryAPI'
import Loading from '../../Loading'
import { DELIVERY_BOXBERRY_CURIER_PRICE } from '../../../utils/consts'
import './DeliveryBoxberry.css'


const DeliveryBoxberry = observer((props) => {

    const [arrayCities, setArrayCities] = useState([])
    const [borderVisible, setBorderVisible] = useState([])

    useEffect(() => {
        getListCities()
            .then(data => {
                setArrayCities(data)
                setBorderVisible(true)
            })
    },[])

    // eslint-disable-next-line
    const [ loading, setLoading ] = useState(false) //
    // eslint-disable-next-line
    const [info, setInfo] = useState({
        price:"", price_base:"", price_service:"", delivery_period:"", weight:""
    })
    const [name, setName] = useState("")


    const calculateAndOpenPayment = async () => {
        let cart = localStorage.getItem('cart')
        if (cart && name) {
            setLoading(true)

            cart = JSON.parse(cart)
            let weight = 0
            cart.forEach( i => weight += (Number(i?.value) * Number(i?.size?.weight)) )
            if (!weight) weight = 5
            weight = weight * 1000
            weight = Math.ceil(weight)
            
            let listCities = await getListCitiesByName(name)
            if (listCities[0]?.Code) {
                let response = await getListPointsByCityCode(listCities[0].Code)

                if (response?.error) {
                    props?.setTextAlert(`Ошибка: ${response?.error}`)
                }else {
                    response = await getDeliveryCosts({
                        target: response[0].Code, // 16126
                        weight
                    })
                    if (response?.error) {
                        if (response.error?.message) {
                            props?.setTextAlert("Ошибка: " + response.error.message)
                        }else {
                            props?.setTextAlert("Ошибка: " + response.error)
                        }
                    }else {
                        props?.setDelivery("boxberry")
                        props?.setDeliverySum(Number(response.price) + DELIVERY_BOXBERRY_CURIER_PRICE)
                        props?.setPayment(true)
                    }
                }
            }else {
                props?.setTextAlert(`В таком городе нет склада Boxberry`)
                setBorderVisible(false)
            }
            setLoading(false)

        }else if (!name) {
            props?.setTextAlert(`Введите районный город!`)
        }
    }

    const onClickButtonListPoints = async () => {
        if (name) {
            setLoading(true)
            setInfo({ price:"", price_base:"", price_service:"", delivery_period:"", weight:"" })
            let listCities = await getListCitiesByName(name)
            if (listCities[0]?.Code) {
                let response = await getListPointsByCityCode(listCities[0]?.Code)

                if (response?.error) {
                    props?.setTextAlert(`Ошибка: ${response?.error}`)
                }else {
                    // props?.setTextAlert(JSON.stringify(response[0]))
                    let gps = response[0].GPS.split(",")
                    props?.setLatitude(gps[0])
                    props?.setLongitude(gps[1])
                    
                    props?.setPlacemark([{
                        latitude: gps[0], 
                        longitude: gps[1], 
                        code: response[0].Code,  // код ПВЗ
                        address: response[0].Address,
                        phone: response[0].Phone,
                        work: response[0].WorkShedule,
                        description: response[0].TripDescription,
                        onClick: () => calculateAndOpenPayment()
                    }])
                }
            }else {
                props?.setTextAlert(`В таком городе нет склада Boxberry`)
                setBorderVisible(false)
            }
            setLoading(false)
        }
    }

    const onClickButtonDeliveryCosts = async () => {
        let cart = localStorage.getItem('cart')
        if (cart && name) {
            setLoading(true)

            cart = JSON.parse(cart)
            let weight = 0
            cart.forEach( i => weight += (Number(i?.value) * Number(i?.size?.weight)) )
            if (!weight) weight = 5
            weight = weight * 1000
            weight = Math.ceil(weight)
            setInfo({ price:"", price_base:"", price_service:"", delivery_period:"", weight:"" })
            
            let listCities = await getListCitiesByName(name)
            if (listCities[0]?.Code) {
                let response = await getListPointsByCityCode(listCities[0].Code)

                if (response?.error) {
                    props?.setTextAlert(`Ошибка: ${response?.error}`)
                }else {
                    response = await getDeliveryCosts({
                        target: response[0].Code, // 16126
                        weight
                    })
                    if (response?.error) {
                        if (response.error?.message) {
                            props?.setTextAlert("Ошибка: " + response.error.message)
                        }else {
                            props?.setTextAlert("Ошибка: " + response.error)
                        }
                    }else setInfo({...response, price: Number(response.price) + DELIVERY_BOXBERRY_CURIER_PRICE, weight})
                }
            }else {
                props?.setTextAlert(`В таком городе нет склада Boxberry`)
                setBorderVisible(false)
            }
            setLoading(false)
        }
    }

    return (
        <div
            className="DeliveryBoxberry"
        >
            <div>
                <p>Введите индекс и нажмите "Найти склад Boxberry".</p>
                <p>После, найдите на карте и нажмите на значёк склада Boxberry.</p>
            </div>

            <div className="DeliveryBoxberryLeftPanel">

                <div className="DeliveryBoxberryLeftPanelBox">
                    
                    {loading 
                    ? 
                        <Loading width={150}/>
                    :
                    <>
                        <hr />
                        <label className="DeliveryBoxberryLeftPanelBox_LabelIndex">Ваш районный город: </label>
                        <hr />

                        <Form.Control 
                            value={name}
                            style={{width:"150px"}}
                            type="text"
                            onChange={e => {
                                setName(e.target.value)
                                if (!borderVisible) setBorderVisible(true)
                            }}
                            className='' 
                            placeholder="Город" 
                        />
                        {name 
                        ? 
                            arrayCities && borderVisible
                            ?
                                <div className='arrayCities'>
                                    {arrayCities
                                        .filter(j => j.Name.toLowerCase().includes(name.toLowerCase()))
                                        .map((i,index) => {
                                            if (index < 5 && name.toLowerCase() !== i.Name.toLowerCase()) {
                                                return <>
                                                    <p 
                                                        onClick={() => {
                                                            setName(i.Name)
                                                            setBorderVisible(false)
                                                        }}
                                                    >
                                                        {i.Name}
                                                    </p>
                                                    <hr />
                                                </>
                                            }else if (name.toLowerCase() === i.Name.toLowerCase()) setBorderVisible(false)
                                            
                                            return null
                                        })
                                    }
                                </div>
                            : null
                        : null}
                        <hr />
                        <Button
                            disabled={!name}
                            variant="outline-primary"
                            onClick={onClickButtonListPoints}
                        >
                            Найти склад Boxberry
                        </Button>
                        <hr />

                        <Button
                            disabled={!name}
                            variant="outline-primary"
                            onClick={onClickButtonDeliveryCosts}
                        >
                            Стоимость доставки
                        </Button>
                    </>}
                    
                </div>
                {/* price:"", price_base:"", price_service:"", delivery_period:"", weight:"" */}
                
                {info?.price
                ?
                    <div className="DeliveryBoxberryLeftPanel_TotalSumm">
                        <div>Стоимость доставки:&nbsp;{info.price} р.</div>
                        {info?.delivery_period 
                        ? 
                            <div>Срок доставки:&nbsp;
                                {info?.delivery_period}
                            </div> 
                        : null}
                        {info?.weight 
                        ? 
                            <div>Общий вес:&nbsp;{info.weight / 1000} кг.</div> 
                        : null}
                    </div>
                :null
                }

            </div>

        </div>
    )
})

export default DeliveryBoxberry