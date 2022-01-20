// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'

import { fetchParserXLSX, fetchParserRGK, changePriceOneMilwaukee, changePriceAllMilwaukee } from '../../http/paserAPI';
import Loading from '../../components/Loading';
import { observer } from 'mobx-react-lite';
import InfoPage from '../info/InfoPage';

import './ParserPage.css'


const ParserPage = observer(() => {

    const [valueBefore, setValueBefore] = useState("")
    const [valueAfter, setValueAfter] = useState("")
    const [value, setValue] = useState("")
    const [ brand, setBrand ] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    
    const [quantity, setQuantity] = useState(0)
    const [number, setNumber] = useState(0)
    

    const onClickButtonChangePricesMLK = async () => {
        if ( ! valueBefore || ! valueAfter ) {
            setMessage("")
            setLoading(true)
            await changePriceAllMilwaukee()
                .then(data => {
                    if (data?.error) {
                        setMessage(data.error)
                    }else {
                        setMessage(data)
                    }
                })
                .catch(error => {
                    setMessage(JSON.stringify(error))
                })
            setLoading(false)
            
            return
        }
        setMessage("Начало:")
        setLoading(true)
        let mess = "Начало:"
        for(let i = Number(valueBefore); i <= Number(valueAfter); i++) {
            await changePriceOneMilwaukee(i)
            // eslint-disable-next-line
                .then(data => {
                    if (data?.error) {
                        mess += "<br />" + data.error
                        setMessage(data.error)
                    }else {
                        mess += "<br />" + data
                        setMessage(data)
                    }
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

    const onClickButtonParserMLK = async () => {
        if ( ! valueBefore || ! valueAfter || ! value ) return
        setMessage("")
        setLoading(true)
        let mess = ""
        for(let i = Number(valueBefore); i < Number(valueAfter); i=i+Number(value)) {
            await fetchParserXLSX(brand, i, value)
                // eslint-disable-next-line
                .then(data => {
                    mess += data
                })
                // eslint-disable-next-line
                .finally(() => {
                    setMessage(mess)
                })
        }
        setLoading(false)
        setMessage(mess + "Закончил.")
    }

    const onClickButtonChangePricesRGK = async () => {
        setMessage("")
        setLoading(true)
    }
    
    const onClickButtonParserRGK = async () => {
        setMessage("")
        setLoading(true)
        await fetchParserRGK(undefined)
            // eslint-disable-next-line
            .then(data => {
                // setMessage(data)
                setQuantity(data)
            })
        setLoading(false)
    }

    useEffect(() => {
        if (quantity > 0 && number < quantity) {
            fetchParserRGK(Number(number) + 1)
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

    // useEffect(() => {
    //     if (number > 0) {
    //         setMessage(`Номер записи: ${number}`)
    //     }
    // },[number])

    if (!brand)
        return (
            <InfoPage>
                <div className="ParserPage_Header">
                    <label>Заведение товаров на сайт!</label>
                    <button onClick={() => setBrand("milwaukee")} >Milwaukee</button>
                    <button onClick={() => setBrand("rgk")} >RGK</button>
                </div>
            </InfoPage>
        )

    if (brand === "rgk")
        return (
            <InfoPage>
                <div className="ParserPage_Header">
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
                    <button onClick={() => setBrand("")} >назад</button>
                </div>
            </InfoPage>
        )

    if (brand === "milwaukee")
        return (
            <InfoPage>
                <div className="ParserPage_Header">
                    <label>Заведение товаров Milwaukee на сайт!</label>
                    
                    {message && message !== ""
                    ?
                        <div className="inputBox">
                            {ReactHtmlParser(message)}
                        </div>

                    : null}

                    {loading ? <Loading /> 
                    : 
                    <>
                        <div className="inputBox d-flex flex-column justify-content-center align-items-center">
                            <input className="m-3" value={valueBefore} onChange={(e) => setValueBefore(e.target.value)} placeholder="Введите значение ОТ" />
                            <input className="m-3" value={valueAfter} onChange={(e) => setValueAfter(e.target.value)} placeholder="Введите значение ДО" />
                            <input className="m-3" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Введите ПО сколько" />
                            
                            <div
                                className="d-flex flex-column justify-content-center align-items-center"
                            >
                                

                                <button className="m-3 p-2" onClick={onClickButtonParserMLK}>Начать парсинг</button>

                            </div>
                        </div>
                        
                        <br />
                        <button onClick={onClickButtonChangePricesMLK}>Обновление цен</button>
                    </>}
                    
                    <br />
                    <button 
                        className="d-flex flex-column justify-content-center align-items-center p-2"
                        onClick={() => setBrand("")} 
                    >назад</button>

                </div>

            </InfoPage>
        )

})

export default ParserPage;
