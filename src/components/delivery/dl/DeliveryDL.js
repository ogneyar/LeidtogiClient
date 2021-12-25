import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
// import { observer } from 'mobx-react-lite'

import { getMicroCalc } from '../../../http/delivery/dlAPI'
import Loading from '../../Loading'
import './DeliveryDL.css'


export const DeliveryBusinessLines = (props) => {

    const [allCities, setAllCities] = useState([])
    const [listCities, setListCities] = useState([])

    const [ loading, setLoading ] = useState(false)
    const [ info, setInfo ] = useState({
        price:"", period_from:"", period_to:"", weight:""
    })
    const [ name, setName ] = useState("")
    const [ listCitiesNull, setListCitiesNull ] = useState(false)

    useEffect(() => {
        // props?.setIconImageHref("images/delivery/boxberry/boxberry.png")

        let delivery_city = localStorage.getItem('delivery_city')
        if (delivery_city) {
            setName(delivery_city)
            // onClickButtonListPoints(delivery_city)
        }
        // eslint-disable-next-line
    },[])

    const onClickButtonMicroCalc = async () => {
        setLoading(true)

        let cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        let weight = 0
        cart.forEach( i => weight += (Number(i?.value) * Number(i?.size?.weight)) )
        if (!weight) weight = 5
        weight = weight * 1000
        weight = Math.ceil(weight)

        await getMicroCalc()
            .then(data => {
                let terminals_standard = data?.data?.terminals_standard
                setInfo({...terminals_standard, weight})
            })
            .finally(() => setLoading(false))
    }

    return (
        <div
            className="DeliveryDL"
        >
            <div className="DeliveryDL_Tooltip">
                Введите название Вашего районного города и нажмите "Найти склад Деловых Линий".
                После, найдите на карте и нажмите на значёк склада Деловых Линий.
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
                            // onClick={() => onClickButtonListPoints(name)}
                        >
                            Найти склад Деловых Линий
                        </Button>
                        <hr />

                        <Button
                            disabled={!name}
                            variant="outline-primary"
                            onClick={onClickButtonMicroCalc}
                        >
                            Стоимость доставки
                        </Button>
                    </>}
                    
                </div>
                
                {info?.price
                ?
                    <div className="DeliveryDL_LeftPanel_TotalSumm">
                        <div>Стоимость доставки:&nbsp;{info.price} р.</div>
                        {info?.period_to 
                        ? 
                            <div>Срок доставки:&nbsp;
                                {info?.period_to} д.
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
}

export default DeliveryBusinessLines