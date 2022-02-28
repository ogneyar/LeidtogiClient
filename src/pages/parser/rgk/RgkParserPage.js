import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { observer } from 'mobx-react-lite';

import { rgkGetLength, rgkAddNewProduct, rgkChangePrice } from '../../../http/parser/rgkAPI';
import Loading from '../../../components/Loading';
import InfoPage from '../../info/InfoPage';

import './RgkParserPage.css'


const RgkParserPage = observer((props) => {

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    
    const [quantity, setQuantity] = useState(0)
    const [number, setNumber] = useState(0)
    

    const onClickButtonChangePricesRGK = async () => {
        // await rgkUpdateFeed()
        setMessage("Начало:")
        setLoading(true)
        
        let volume
        await rgkGetLength()
            // eslint-disable-next-line
            .then(data => {
                volume = data
            })
        
        let mess = "Начало:"
        for(let i = 0; i < volume; i++) {
            await rgkChangePrice(i + 1)
                // eslint-disable-next-line
                .then(data => {
                    mess += "<br />" + data
                    setMessage(data)
                })
                // eslint-disable-next-line
                .catch(error => {
                    mess += "<br />" + JSON.stringify(error)
                    setMessage(JSON.stringify(error))
                })
        }
        setMessage(mess + "<br />Конец.")
        setLoading(false)
    }
    
    const onClickButtonParserRGK = async () => {
        setMessage("")
        setLoading(true)
        await rgkGetLength()
            // eslint-disable-next-line
            .then(data => {
                // setMessage(data)
                setQuantity(data)
            })
        setLoading(false)
    }

    useEffect(() => {
        if (quantity > 0 && number < quantity) {
            rgkAddNewProduct(Number(number) + 1)
                .then(data => {
                    if (data?.error) {
                        setMessage(" Не смог добавить!")
                        setNumber(Number(number) + 1)
                        setQuantity(0)
                    }else {
                        setMessage(" Успешно добавлен!")
                        setNumber(data)
                    }
                })
                .catch(() => {
                    setMessage(" Не смог добавить!")
                    setNumber(Number(number) + 1)
                    setQuantity(0)
                })
        }
        if (Number(number) === Number(quantity) && number !== 0) {
            setNumber(Number(quantity) + 1)
            setMessage("Закончил!")
        }
    // eslint-disable-next-line
    },[quantity, number])


    return (
        <InfoPage>
            <div className="RgkParserPage_Header">
                <label>Заведение товаров RGK на сайт!</label>

                {quantity && quantity !== 0
                ? "Общее количество товаров: " + quantity
                : null}

                <br />


                {message && message !== ""
                ?
                    <div className="inputBox">
                        {number && number !== 0 && number < quantity
                        ? number + ": "
                        : null}
                        {ReactHtmlParser(message)}
                    </div>

                : null}

                {loading ? <Loading /> 
                : 
                <>
                    <button onClick={onClickButtonParserRGK} >Начать парсинг</button>
                    <br />
                    <button onClick={onClickButtonChangePricesRGK}>Обновление цен</button>
                </>
                }
                <button onClick={() => props?.setBrand("")} >назад</button>
            </div>
        </InfoPage>
    )


})

export default RgkParserPage;
