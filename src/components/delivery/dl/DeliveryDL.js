import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
// import { observer } from 'mobx-react-lite'
// eslint-disable-next-line
import { calculator, getMicroCalc, getKladr, getUrlTerminals, getTerminalsCatalog, getTerminal } from '../../../http/delivery/dlAPI' 
import Loading from '../../Loading'
import './DeliveryDL.css'
import getDerivalCity from '../../../service/delivery/dl/getDerivalCity'
import getDate from '../../../service/delivery/dl/getDate'
import getCargo from '../../../service/delivery/dl/getCargo'
import getBrandName from '../../../service/delivery/dl/getBrandName'


export const DeliveryBusinessLines = (props) => {
    // eslint-disable-next-line
    const [allCities, setAllCities] = useState([])
    // eslint-disable-next-line
    const [listCities, setListCities] = useState([])
    
    const [ loading, setLoading ] = useState(false)
    const [ info, setInfo ] = useState({
        price:"", period_from:"", period_to:"", weight:""
    })
    const [ name, setName ] = useState("")
    // eslint-disable-next-line
    const [ listCitiesNull, setListCitiesNull ] = useState(false)
    
    const [kladr, setKladr] = useState("")
    const [terminals, setTerminals] = useState([])

    useEffect(() => {
        props?.setIconImageHref("images/delivery/dl/dl.png")

        let delivery_city = localStorage.getItem('delivery_city')
        if (delivery_city) {
            setName(delivery_city)
            onClickButtonSearchTerminal(delivery_city)
        }
        // eslint-disable-next-line
    },[])

    // нажатие на карте метки СКЛАДА
    const calculateAndOpenPayment = async (code) => { 
        let cart = localStorage.getItem('cart')
        if (cart) {
            setLoading(true)
           
            if (code) {
                
                cart = JSON.parse(cart)

                let brand = await getBrandName(cart)
                
                let delivery = {
                    derival: {
                        address: { street: getDerivalCity(brand) },
                        produceDate: getDate()
                    },
                    arrival: { address: { street: code } }
                }
                let cargo = getCargo(cart)

                let response = await calculator(delivery, cargo)
                
                if (response?.error) {
                    if (response.error?.message) {
                        props?.setTextAlert("Ошибка: " + response.error.message)
                    }else {
                        props?.setTextAlert("Ошибка: " + response.error)
                    }
                }else {
                    props?.setDelivery("dl")
                    props?.setDeliverySum(Number(response?.data?.price))
                    props?.setPayment(true)
                }

            }else {
                props?.setTextAlert(`Не известен номер склада Деловых Линий`)
            }
                
            setLoading(false)

        }else {
            props?.setTextAlert(`Отсутствуют данные о корзине товаров!`)
        }
    }

    const onClickButtonMicroCalc = async (name) => {
        setLoading(true)

        setInfo({price:"", period_from:"", period_to:"", weight:""})

        let cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        let brand = await getBrandName(cart)
        let cargo = getCargo(cart)
        
        // let weight = cargo.totalWeight

        // если вес не известен, расчитываем доставку 5ти килограммов
        // лимит до 30 килограмм
        // let weightNull = false
        // if (!weight) {
        //     weight = 5
        //     weightNull = true
        // }

        // weight = weight * 1000
        // weight = Math.ceil(weight)
        let delivery
        await getKladr(name).then(data => {
            if (data && Array.isArray(data) && data[0]?.code !== undefined) {
                if (data.length > 1) {
                    setListCities(data.map(i => {
                        return <>
                            <p 
                                style={{position:"relative",margin:0,padding:0}}
                                onClick={() => {
                                    setLoading(true)
                                    setName(i.searchString)
                                    localStorage.setItem('delivery_city', i.searchString)
                                    // localStorage.setItem('delivery_region', i.region_name.split(" ")[0])
                                    setListCities(undefined)
                                    // setKladr(i.code)
                                    
                                    delivery = {
                                        derival: {
                                            address: { street: getDerivalCity(brand) },
                                            produceDate: getDate()
                                        },
                                        arrival: { address: { street: i.code } }
                                    }
                                    
                                    calculator(delivery, cargo)
                                        .then(data => {
                                            setInfo({price: data?.data?.price, weight: cargo?.totalWeight})
                                        }).finally(() => setLoading(false))

                                    // getMicroCalc(i.code, derival_city) 
                                    //     .then(dat => {
                                    //         let terminals_standard = dat?.data?.door_to_terminal_standard
                                    //         if (weightNull) setInfo({...terminals_standard, weight: 0})
                                    //         else setInfo({...terminals_standard, weight})
                                    //     }).finally(() => setLoading(false))
                                }} 
                            >
                                <div style={{paddingBottom:"10px"}}>{i.searchString}</div>
                                <small style={{position:"absolute",left:"0px",top:"15px",color:"grey"}}>{i.region_name}</small>
                            </p>
                            <hr />
                        </>
                    }))
                    setLoading(false)
                }else {
                    // setKladr(data[0].code)
                    
                    delivery = {
                        derival: {
                            address: { street: getDerivalCity(brand) },
                            produceDate: getDate()
                        },
                        arrival: { address: { street: data[0].code } }
                    }
                    
                    calculator(delivery, cargo)
                        .then(data => {
                            setInfo({price: data?.data?.price, weight: cargo?.totalWeight})
                        }).finally(() => setLoading(false))

                    // getMicroCalc(data[0].code, derival_city) 
                    //     .then(data => {
                    //         let terminals_standard = data?.data?.door_to_terminal_standard
                    //         if (weightNull) setInfo({...terminals_standard, weight: 0})
                    //         else setInfo({...terminals_standard, weight})
                    //     }).finally(() => setLoading(false))
                }
            }else {
                props?.setTextAlert(`Такой город в списке городов Деловых Линий не найден!`)
            }
        }).catch(() => setLoading(false))
        // .finally(() => setLoading(false))
    }
    

    useEffect(() => {
        if (kladr) {
            setLoading(true)
            getTerminal(kladr).then(data => {
                if (data && Array.isArray(data) && data[0]?.city !== undefined) {
                    getUrlTerminals().then(response => {
                        getTerminalsCatalog(response.url).then(catalog => {
                            catalog.forEach(i => {
                                
                                if (i.name === data[0]?.city) {

                                    props?.setLatitude(i?.latitude)
                                    props?.setLongitude(i?.longitude)

                                    setTerminals(i?.terminals?.terminal)
                                }
                            })
                            setLoading(false)

                        }).catch(() => setLoading(false))
                    }).catch(() => setLoading(false))

                }
            }).catch(() => setLoading(false))
        }
        // eslint-disable-next-line
    },[kladr])


    const onClickButtonSearchTerminal = async (q) => {
        setLoading(true)

        setInfo({price:"", period_from:"", period_to:"", weight:""})

        // let region = localStorage.getItem('delivery_region')
        // if (region) q = q + " " + region

        await getKladr(q).then(data => {
            if (data && Array.isArray(data) && data[0]?.code !== undefined) {
                if (data.length > 1) {
                    setListCities(data.map(i => {
                        return <>
                            <p 
                                style={{position:"relative",margin:0,padding:0}}
                                onClick={() => {
                                    setName(i.searchString)
                                    localStorage.setItem('delivery_city', i.searchString)
                                    // localStorage.setItem('delivery_region', i.region_name.split(" ")[0])
                                    setListCities(undefined)
                                    setKladr(i.code)
                                }} 
                            >
                                <div style={{paddingBottom:"10px"}}>{i.searchString}</div>
                                <small style={{position:"absolute",left:"0px",top:"15px",color:"grey"}}>{i.region_name}</small>
                            </p>
                            <hr />
                        </>
                    }))
                }else {
                    setKladr(data[0].code)
                    // localStorage.setItem('delivery_region', data[0].region_name.split(" ")[0])
                }
            }else {
                props?.setTextAlert(`Такой город в списке городов Деловых Линий не найден!`)
            }
        }).finally(() => setLoading(false))

    }

    
    useEffect(() => {
        if (terminals && Array.isArray(terminals) && terminals[0]?.name !== undefined) {
            props?.setPlacemark(
                terminals.map(i => {
                    let phone = null
                    if (i?.phones[0]?.number !== undefined) phone = i?.phones[0].number
                    return {
                        latitude: i.latitude, 
                        longitude: i.longitude,
                        address: i.fullAddress,
                        phone,
                        id: i?.id,
                        description: i?.calcSchedule?.arrival,
                        onClick: () => calculateAndOpenPayment(kladr)
                    }
                })
            )
        }
        // eslint-disable-next-line
    },[terminals])


    return (
        <div
            className="DeliveryDL"
        >
            <div className="DeliveryDL_Tooltip">
                Введите название Вашего районного города и нажмите "Найти склад Деловых Линий". На карте отобразятся ближайшие склады.
                После, найдите на карте и нажмите на значёк склада Деловых Линий ближайший к Вам. <img src="images/delivery/dl/dl.png" width="30px" alt=""/>
            </div>

            <div className="DeliveryDL_LeftPanel">

                <div className="DeliveryDL_LeftPanel_Box">
                    
                    {loading 
                    ? 
                        <Loading width={150}/>
                    :
                    <>
                        <hr />
                        <label className="DeliveryDL_LeftPanel_Box_LabelIndex">Ваш районный город: </label>
                        <hr />

                        <Form.Control 
                            value={name}
                            style={{width:"150px"}}
                            type="text"
                            onFocus={() => {
                                // findListCities()
                            }}
                            // onBlur={() => setOnBlurName(true)}
                            onChange={e => {
                                setName(e.target.value)
                                if (e.target.value) localStorage.setItem('delivery_city', e.target.value)
                                else localStorage.removeItem('delivery_city')
                                // localStorage.removeItem('delivery_region')
                            }}
                            className='' 
                            placeholder="Город" 
                        />
                        {name && listCities && listCities[0] !== undefined
                        ? 
                            <div className='DeliveryDL_ListCities'>
                                {listCities}
                            </div>
                        : null}
                        <hr />
                        <Button
                            disabled={!name}
                            variant="outline-primary"
                            onClick={() => onClickButtonSearchTerminal(name)}
                        >
                            Найти склад Деловых Линий
                        </Button>
                        <hr />

                        <Button
                            disabled={!name}
                            variant="outline-primary"
                            onClick={() => onClickButtonMicroCalc(name)}
                        >
                            Стоимость доставки
                        </Button>
                    </>}
                    
                </div>
                
                {info?.price
                ?
                    <div className="DeliveryDL_LeftPanel_TotalSumm">
                        {/* <div>Расчёт доставки до:&nbsp;<strong>{name}</strong></div> */}
                        <div>Стоимость доставки:&nbsp;{info.price} р.</div>
                        {info?.period_to 
                        ? 
                            <div>Срок доставки:&nbsp;
                                {info?.period_to} д.
                            </div> 
                        : null}
                        {info?.weight 
                        ? 
                            <div>Общий вес:&nbsp;{info.weight} кг.</div> 
                        : null}
                    </div>
                :null
                }

            </div>

        </div>
    )
}

export default DeliveryBusinessLines