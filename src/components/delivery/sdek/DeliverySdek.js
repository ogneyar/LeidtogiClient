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
import Loading from '../../Loading'


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
    
    const [ loading, setLoading ] = useState(false) //

    const [ smallWidth, setSmallWidth ] = useState(window.innerWidth < 1000) //

    
    useEffect(() => {
        if (textAlert) {
            setAlertVisible(true)
        }
    },[textAlert])


    const onClickButtonCalculate = async (args) => {
        setLoading(true)
        let cart
        cart = localStorage.getItem('cart')
        if (cart && index.length === 6) {
            cart = JSON.parse(cart)
            let weight = 0
            cart.forEach( i => weight += (Number(i.value) * Number(i.size.weight)) )
            weight = weight * 1000
            weight = Math.ceil(weight)
            setInfo({ total_sum:"", period_min:"", period_max:"", weight_calc:"", currency:"", delivery_sum:"" })
            let response
            if (args?.address) {
                response = await sdekCalculate({
                    tariff_code: tariff,
                    from_location: { postal_code: DELIVERY_INDEX_FROM }, 
                    to_location: { address: args.address }, 
                    packages: [{ weight }] 
                })
            }else {
                response = await sdekCalculate({
                    tariff_code: tariff,
                    from_location: { postal_code: DELIVERY_INDEX_FROM }, 
                    to_location: { postal_code: index }, 
                    packages: [{ weight }] 
                })
            }
            if (response?.error) {
                if (response.error?.message) {
                    setTextAlert("Ошибка: " + response.error.message)
                }else {
                    setTextAlert("Ошибка: " + response.error)
                }
            }else if (response?.errors) {
                if (response.errors[0].code === "ERR_PVZ_WITH_TARIFF_MISTAKE") {
                    if (!args?.address) {
                        let region_code = await getRegionCodeLocationSities()
                        response = await sdekDeliveryPoints({region_code})
                        if (response && Array.isArray(response) && response[0]?.location !== undefined && response[0].location?.address_full !== undefined) {
                            let address = response[0].location.address_full
                            await onClickButtonCalculate({address})
                        }else {
                            setTextAlert(`Ошибка: не найден адрес для региона ${region_code} (DeliverySdek).`)
                        }
                    }
                }else {                    
                    setTextAlert("Ошибка: " + response.errors[0]?.message)
                }
            }else setInfo(response)

        }else if (index.length < 6) {
            setTextAlert(`Введите правильный индекс!`)
        }
        setLoading(false)
    }


    const onClickButtonDeliveryPoints = async (args) => {
        if (index.length < 6) {
            setTextAlert(`Введите правильный индекс!`)
        }else {
            setLoading(true)
            setInfo({ total_sum:"", period_min:"", period_max:"", weight_calc:"", currency:"", delivery_sum:"" })
            let response
            if (args?.region_code) {
                response = await sdekDeliveryPoints({
                    region_code: args.region_code,
                })
            }else {
                response = await sdekDeliveryPoints({
                    postal_code: index,
                })
            }
            if (response?.error) {
                setTextAlert(`Ошибка: ${response?.error?.message}`)
            }else {
                if (response && Array.isArray(response) && response.length === 1) {
                    setLatitude(response[0].location.latitude)
                    setLongitude(response[0].location.longitude)

                    setPlacemark([{latitude: response[0].location.latitude, longitude: response[0].location.longitude, code: response[0].code, address: response[0].location.address_full}])
                    
                }else if (response && Array.isArray(response) && response[0]?.location !== undefined) {
                    setLatitude(response[0]?.location?.latitude)
                    setLongitude(response[0]?.location?.longitude)

                    setPlacemark(
                        response.map(i => {
                            return {latitude: i.location.latitude, longitude: i.location.longitude, code: i.code, address: i.location.address_full}
                        })
                    )
                }else {
                    if (args?.region_code) {
                        setTextAlert(`По такому индексу ничего не найдено.`)
                    }else {
                        let region_code = await getRegionCodeLocationSities()
                        if (region_code) await onClickButtonDeliveryPoints({region_code})
                        else setTextAlert(`По такому индексу ничего не найдено.`)
                    }
                }
                
            }
            setLoading(false)
        }
    }
    
    // eslint-disable-next-line
    const onClickButtonLocationRegions = async () => {
        let response = await sdekLocationRegions({})
       if (response?.error) {
            setTextAlert(`Ошибка: ${response?.error?.message}`)
        }else {
            setTextAlert(`${response.map(i => i?.region).join(' ')}`)
        }
    }

    
    const getRegionCodeLocationSities = async () => {
        let response = await sdekLocationSities({
            postal_code: index,
            // size: 34243,
            // page: 0
        })
        if (response?.error) {
            return {error:`Ошибка: ${response.error?.message}`}
        }else {
            return response[0]?.region_code
        }
        
    }

    const calculateAndOpenPayment = async (args) => {
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

            let response
            if (args?.address) {
                response = await sdekCalculate({
                    tariff_code: tariff,
                    from_location: { postal_code: DELIVERY_INDEX_FROM }, 
                    to_location: { address: args.address }, 
                    packages: [{ weight }] 
                })
            }else {
                response = await sdekCalculate({
                    tariff_code: tariff,
                    from_location: { postal_code: DELIVERY_INDEX_FROM }, 
                    to_location: { postal_code: index }, 
                    packages: [{ weight }] 
                })
            }
            if (response?.error) {
                if (response.error?.message) {
                    setTextAlert(`Ошибка: ${response.error.message}`)
                }else {
                    setTextAlert(`Ошибка: ${response.error}`)
                }
            }else if (response?.errors) {
                setTextAlert(`Ошибка: ${response.errors[0].message}`)
            }else {
                props?.setDeliverySum(response.total_sum)
                props?.setPayment(true)
            }

        }else if (index.length < 6) {
            setTextAlert(`Введите правильный индекс!`)
        }
    }

    const resize = () => {
        let div = document.getElementById("DeliverySdek")

        if (window.innerWidth < 1000) {
            div.style.width = window.innerWidth - 100 + "px"
            setSmallWidth(true)
        }else {
            div.style.width = "100%"
            setSmallWidth(false)
        }
        
    }

    useEffect(() => {
        window.addEventListener('resize', resize)
    },[])

    return (
        <div className="DeliverySdek" id="DeliverySdek"> 

            <div>
                <p>Введите индекс и нажмите "Найти ближайший склад СДЭК", а после на карте нажмите на зелёный значёк склада СДЭК</p>
            </div>
    
            <div className="DeliverySdekLeftPanel">

                <div className="DeliverySdekLeftPanelBox">
                    
                    {loading 
                    ? 
                        <Loading width={150}/>
                    :
                    <>
                        <hr />
                        <label className="DeliverySdekLeftPanelBox_LabelIndex">Ваш индекс: </label>
                        {/* <hr style={{width:"100%",margin:"5px",padding:0}}/> */}
                        <hr />

                        <Form.Control 
                            value={index}
                            style={{width:"120px"}}
                            maxLength="6"
                            type="number"
                            onChange={e => setIndex(e.target.value)}
                            className='' 
                            placeholder="Индекс" 
                        />
                        {/* <label className="">{info?.adName}</label> */}
                        <hr />
                        <Button
                            disabled={!index}
                            variant="outline-primary"
                            onClick={onClickButtonDeliveryPoints}
                        >
                            Найти склад СДЭК
                        </Button>
                        <hr />

                        {/* <Button
                            variant="outline-primary"
                            onClick={onClickButtonLocationSities}
                        >
                            Список населенных пунктов
                        </Button>
                        <hr /> */}

                        <Button
                            disabled={!index}
                            variant="outline-primary"
                            onClick={onClickButtonCalculate}
                        >
                            Стоимость доставки
                        </Button>
                    </>}
                    
                </div>

                
                {info?.total_sum
                ?
                    <div className="DeliverySdekLeftPanel_TotalSumm">
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

            </div>
            
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
                    height={smallWidth ? "600px" : "400px"} 
                    // height="600px" 
                >
                
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
                                    calculateAndOpenPayment({address: i?.address})
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
