// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'

import { mlkAddNewProduct, mlkChangePriceOne, mlkChangePriceAll } from '../../../http/parser/milwaukeeAPI';

import Loading from '../../../components/Loading';
import { observer } from 'mobx-react-lite';
import InfoPage from '../../info/InfoPage';

import './MilwaukeeParserPage.css'


const MilwaukeeParserPage = observer((props) => {

    const [feed, setFeed] = useState(null)

    const [valueBefore, setValueBefore] = useState("")
    const [valueAfter, setValueAfter] = useState("")
    const [value, setValue] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    

    const onClickButtonChangePricesMLK = async () => {
        setMessage("")
        setLoading(true)

        if (! feed ) {
            setMessage("Файл пуст")
            return
        }

        const formData = new FormData()
        formData.append("feed", feed)
        
        // let length = await mlkGetLength(formData)
        // if (! length) setMessage("Файл пуст")
        // else setMessage("Файл НЕ пуст - " + length)
        // setLoading(false)
        // return

        if ( ! valueBefore || ! valueAfter ) {
            // setLoading(true)
            await mlkChangePriceAll(formData)
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
        // setLoading(true)
        let mess = "Начало:"
        setMessage(mess)
        for(let i = Number(valueBefore); i <= Number(valueAfter); i++) {
            await mlkChangePriceOne(formData, i)
            // eslint-disable-next-line
                .then(data => {
                    if (data?.error) {
                        mess += "<br />" + data.error
                        setMessage(data.error)
                    }else {
                        // console.log("data",data)
                        mess += "<br />" + i + ": " + JSON.stringify(data)
                        setMessage(i + ": " + JSON.stringify(data))
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
        setMessage("")
        setLoading(true)

        if (! feed ) {
            setMessage("Файл пуст")
            return
        }

        const formData = new FormData()
        formData.append("feed", feed)

        if ( ! valueBefore || ! valueAfter || ! value ) return
        
        let mess = ""
        for(let i = Number(valueBefore); i < Number(valueAfter); i=i+Number(value)) {
            await mlkAddNewProduct(formData, i, value)
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

   
    return (
        <InfoPage>
            <div className="MilwaukeeParserPage_Header">
                <label>Заведение новых товаров Milwaukee на сайт!</label>
                <label>Или обновление цен!</label>
                
                {message && message !== ""
                ?
                    <div className="inputBox">
                        {ReactHtmlParser(message)}
                    </div>

                : null}

                <input 
                    type="file" 
                    className="m-3" 
                    onChange={(e) => setFeed(e.target.files[0])} 
                    placeholder="Выберите файл" 
                />

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
                            <button 
                                disabled={ ! valueBefore || ! valueAfter || ! value || ! feed }
                                className="m-3 p-2" 
                                onClick={onClickButtonParserMLK}
                            >
                                Добавить товары
                            </button>
                            {/* <br /> */}
                            <label>или</label>
                            {/* <br /> */}
                            <button 
                                disabled={ ! feed }
                                onClick={onClickButtonChangePricesMLK}
                            >Обновить цены</button>

                        </div>
                    </div>
                    
                    
                </>}
                
                <br />
                <button 
                    className="d-flex flex-column justify-content-center align-items-center p-2"
                    onClick={() => props?.setBrand("")} 
                >назад</button>

            </div>

        </InfoPage>
    )

})

export default MilwaukeeParserPage;
