import React, { useEffect, useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import ReactHtmlParser from 'react-html-parser'
// eslint-disable-next-line
import { YMaps, Map, Placemark } from 'react-yandex-maps'

import { 
    sdekCalculate, sdekDeliveryPoints, sdekLocationRegions, sdekLocationSities,
    // eslint-disable-next-line
    sdekOrder, sdekGetOrder, sdekEditOrder, sdekDeleteOrder, sdekRefusalOrder, sdekNewIntakes, sdekPrintOrders, sdekGetPrintOrders,
} from '../../../http/delivery/sdekAPI'

import { DELIVERY_INDEX_FROM } from '../../../utils/consts'
import { Alert } from '../../myBootstrap'
import { Context } from '../../..'
import './DeliverySdek.css'


const DeliverySdek = observer((props) => {
    
    const { user } = useContext(Context)

    useEffect(() => {
        if (user.user.address) {
            let address = user.user.address
            let result = address.match(/\d\d\d\d\d\d/)
            if (result.index !== -1) {
                setIndex(address.substring(result.index, result.index + 6))
            }
        }
    },[user?.user?.address])
    
    // eslint-disable-next-line
    const [tariff, setTariff] = useState("138")

    const [info, setInfo] = useState({
        total_sum:"", period_min:"", period_max:"", weight_calc:"", currency:"", delivery_sum:""
    })
    const [index, setIndex] = useState("")

    const [alertVisible, setAlertVisible] = useState(false)
    const [textAlert, setTextAlert] = useState("")

    
    const [ latitude, setLatitude ] = useState(55.75) // Долгота Белой Калитвы - 48.177645
    const [ longitude, setLongitude ] = useState(37.57) // Широта Белой Калитвы - 48.177645
    // 55.75, 37.57 Москва
    const [ placemark, setPlacemark ] = useState([]) //

    // const [ zoom, setZoom ] = useState(12) //

    // eslint-disable-next-line
    const onClickButtonCalculate = async () => {
        let cart
        cart = localStorage.getItem('cart')
        if (cart && index.length === 6) {
            cart = JSON.parse(cart)
            let weight = 0
            cart.forEach( i => weight += (Number(i.value) * Number(i.size.weight)) )
            weight = weight * 1000
            weight = Math.ceil(weight)
            setInfo({ total_sum:"", period_min:"", period_max:"", weight_calc:"", currency:"", delivery_sum:"" })
            let indexFrom
            indexFrom = "101000" // Москва
            // indexFrom = "390000" // Рязань
            // indexFrom = "347056" // Углекаменный
            // indexFrom = "305000" // Курск
            let response = await sdekCalculate({
                tariff_code: tariff,
                from_location: { postal_code: indexFrom }, 
                to_location: { postal_code: index }, 
                packages: [{ weight }] 
            })
            if (response?.error) alert(response.error)
            else setInfo(response)

        }else if (index.length < 6) {
            setTextAlert(`Введите правильный индекс!`)
            setAlertVisible(true)
        }
    }


    const onClickButtonDeliveryPoints = async (props) => {

        let response
        if (props?.code) {
            response = await sdekDeliveryPoints({
                region_code: props.code,
            })
        }else {
            response = await sdekDeliveryPoints({
                postal_code: index,
            })
        }
        // console.log(response)
       if (response?.error) {
            setTextAlert(`Ошибка: ${response?.error?.message}`)
            setAlertVisible(true)
        }else {
            if (response && Array.isArray(response) && response.length === 1) {
                // setTextAlert(`Ближайший офис СДЭК находится по адресу: ${response[0].location.address_full}`)
                // setAlertVisible(true)
                setLatitude(response[0].location.latitude)
                setLongitude(response[0].location.longitude)

                setPlacemark([{latitude: response[0].location.latitude, longitude: response[0].location.longitude, code: response[0].code, address: response[0].location.address_full}])
                // setZoom(12)
            }else if (response && Array.isArray(response) && response[0]?.location !== undefined) {
                // setTextAlert(`Необходимо выбрать удобный/ближайший для вас офис.`)
                // setAlertVisible(true)
                setLatitude(response[0]?.location?.latitude)
                setLongitude(response[0]?.location?.longitude)

                setPlacemark(
                    response.map(i => {
                        return {latitude: i.location.latitude, longitude: i.location.longitude, code: i.code, address: i.location.address_full}
                    })
                )
                // setZoom(12)
            }else {
                if (props?.code) {
                    setTextAlert(`По такому индексу ничего не найдено.`)
                    setAlertVisible(true)
                }else {
                    await onClickButtonLocationSities()
                }
            }
            
        }
    }
    
    // eslint-disable-next-line
    const onClickButtonLocationRegions = async () => {
        
        let response = await sdekLocationRegions({})

        // console.log(response)

       if (response?.error) {
            setTextAlert(`Ошибка: ${response?.error?.message}`)
            setAlertVisible(true)
        }else {
            setTextAlert(`${response.map(i => i?.region).join(' ')}`)
            // response.map(i => i?.city).join(' ')
            setAlertVisible(true)
        }
    }

    // eslint-disable-next-line
    const onClickButtonLocationSities = async () => {
        
        let response = await sdekLocationSities({
            postal_code: index,
            // size: 34243,
            // page: 0
        })

        // console.log(response)

        if (response?.error) {
            setTextAlert(`Ошибка: ${response.error?.message}`)
            setAlertVisible(true)
        }else {
            // setTextAlert(`${response.map(i => i?.city).join(' ')}`)
            // setAlertVisible(true)

            // console.log(response)
            // console.log(response[0].code)
            await onClickButtonDeliveryPoints({code:response[0].region_code})
        }
    }

    const calculateAndOpenPayment = async () => {
        let cart
        cart = localStorage.getItem('cart')
        if (cart && index.length === 6) {
            cart = JSON.parse(cart)
            let weight = 0
            cart.forEach( i => weight += (Number(i.value) * Number(i.size.weight)) )
            weight = weight * 1000
            weight = Math.ceil(weight)            
            
            // let indexFrom = "101000" // Москва
            // let indexFrom = "390000" // Рязань
            // let indexFrom = "347056" // Углекаменный
            // let indexFrom = "305000" // Курск

            let response = await sdekCalculate({
                tariff_code: tariff,
                from_location: { postal_code: DELIVERY_INDEX_FROM }, 
                to_location: { postal_code: index }, 
                packages: [{ weight }] 
            })
            if (response?.error) alert(response.error)
            else {
                // console.log(response.total_sum );
                props?.setDeliverySum(response.total_sum)
                props?.setPayment(true)
            }

        }else if (index.length < 6) {
            setTextAlert(`Введите правильный индекс!`)
            setAlertVisible(true)
        }
    }

    // useEffect(() => {
    //     window?.ymaps?.ready(console.log("ready"))
    // },[window?.ymaps?.ready])

    return (
        <div className="DeliverySdek">

            <div>
                <p>Введите индекс и нажмите "Найти ближайший склад СДЭК", а после на карте нажмите на зелёный значёк склада СДЭК</p>
            </div>
    
            <div className="DeliverySdekLeftPanel">

                <div className="DeliverySdekLeftPanelBox">
                    
                    <hr />
                    <label className="mt-2 mr-2">Ваш индекс: </label>
                    {/* <hr style={{width:"100%",margin:"5px",padding:0}}/> */}
                    <hr />
                    <Form.Control 
                        value={index}
                        style={{width:"120px"}}
                        maxLength="6"
                        type="number"
                        onChange={e => setIndex(e.target.value)}
                        className='mb-2' 
                        placeholder="Индекс" 
                    />
                    {/* <label className="">{info?.adName}</label> */}
                    <hr />
                    <Button
                        disabled={!index}
                        variant="outline-primary"
                        onClick={onClickButtonDeliveryPoints}
                    >
                        Найти ближайший склад СДЭК
                    </Button>
                    <hr />

                    <Button
                        variant="outline-primary"
                        onClick={onClickButtonLocationSities}
                    >
                        Список населенных пунктов
                    </Button>

                    <hr />
                    <Button
                        variant="outline-primary"
                        onClick={onClickButtonCalculate}
                    >
                        Узнать стоимость доставки
                    </Button>
                    
                </div>

                
                {info?.total_sum
                ?
                    <div className="mt-3 mr-3 mb-3 ml-3">
                        <div>Стоимость с НДС:&nbsp;{info.total_sum} р.</div>
                        {info?.period_min 
                        ? 
                            <div>Срок доставки:&nbsp;
                                {info?.period_min === info?.period_max 
                                ? info?.period_min 
                                : 
                                    <>от {info?.period_min} - {info?.period_max}</>
                                } д.</div> 
                        : null}
                        {info?.weight_calc 
                        ? 
                            <div>Общий вес:&nbsp;{info.weight_calc / 1000} кг.</div> 
                        : null}
                    </div>
                :null
                }

                {/* <div className="d-flex flex-row align-items-end justify-content-between flex-wrap">
                    <Button
                        variant="outline-primary"
                        onClick={onClickButtonCalculate}
                    >
                        Расчитать доставку
                    </Button>
                    <Button
                        style={{"display":(user?.user?.id === undefined || user?.user?.id !== 1) ? "none" : "block"}}
                        variant="success"
                        onClick={onClickButtonOrder}
                    >
                        Заказать товар с доставкой
                    </Button>
                </div> */}
                
                
                {/* <div 
                    style={{"display":(user?.user?.id === undefined || user?.user?.id !== 1) ? "none" : "block"}}
                >

                    <hr />

                    <div 
                        className="mt-3 d-flex flex-row align-items-end justify-content-between flex-wrap"
                    >
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonGetOrder}
                        >
                            Инфо о заказе
                        </Button>
                        <Button
                            variant="success"
                            onClick={onClickButtonEditOrder}
                        >
                            Изменить заказ
                        </Button>
                    </div>

                    <div
                        className="mt-3 d-flex flex-row align-items-end justify-content-between flex-wrap"
                    >
                        <Button
                            variant="warning"
                            onClick={onClickButtonRefusalOrder}
                        >
                            Отказ от заказа
                        </Button>
                        <Button
                            variant="danger"
                            onClick={onClickButtonDeleteOrder}
                        >
                            Удалить заказ
                        </Button>
                    </div>

                    <hr />

                    <div 
                        className="mt-3 d-flex flex-row align-items-end justify-content-between flex-wrap"
                    >
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonNewIntakes}
                        >
                            Заявка на вызов курьера
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonDeliveryPoints}
                        >
                            Список офисов
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonLocationRegions}
                        >
                            Список регионов
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonLocationSities}
                        >
                            Список населенных пунктов
                        </Button>
                        
                    </div>

                    <hr />

                    <div 
                        className="mt-3 d-flex flex-row align-items-end justify-content-between flex-wrap"
                    >
                        <Button
                            variant="outline-primary"
                            onClick={onClickButtonPrintOrders}
                        >
                            Формирование квитанции
                        </Button>
                        <Button
                            variant="primary"
                            onClick={onClickButtonGetPrintOrders}
                        >
                            Получение квитанции
                        </Button>
                    </div>

                </div> */}


            </div>

            {/* <br />
            <hr /> */}
            
            <YMaps
                // ready={console.log("ready")}
                // onLoad={console.log("onLoad")}
            >
                <Map
                    // defaultState={{ 
                    state={{ 
                        // Широта (latitude), Долгота (longitude)
                        // center: [55.75, 37.57], // Москва
                        // center: [48.177645, 40.802384], // Белая Калитва
                        center: [latitude, longitude], 
                        // type: 'yandex#hybrid',
                        type: 'yandex#map',
                        // zoom: zoom || 12
                        zoom: 12
                    }} 
                    // width="1080px" 
                    width="100%" 
                    height="400px" >
                
                    {placemark && Array.isArray(placemark) && placemark[0]?.latitude !== undefined
                    ?
                        placemark.map(i => 
                            <Placemark 
                                key={i?.latitude + i?.longitude}
                                // geometry={[55.684758, 37.738521]} 
                                geometry={[i?.latitude, i?.longitude]} 
                                // properties={{
                                //     hintContent: 'Собственный значок метки',
                                //     balloonContent: 'Это красивая метка'
                                //   }}
                                options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: 'images/delivery/sdek/sdek.png',
                                    iconImageSize: [40, 40],
                                    // iconImageOffset: [-3, -40],
                                    // preset: "islands#dotIcon"

                                  }}
                                onClick={()=> {
                                    if (props?.setAddress) props?.setAddress(i?.address)
                                    calculateAndOpenPayment()
                                }}
                                
                            />
                        )
                    :null}

                
                </Map>
            </YMaps>

            <Alert 
                show={alertVisible} 
                onHide={() => {
                    setAlertVisible(false)
                    setTextAlert("")
                }}
            >
                {ReactHtmlParser(textAlert)}
            </Alert> 

        </div>
    )
})

export default DeliverySdek
