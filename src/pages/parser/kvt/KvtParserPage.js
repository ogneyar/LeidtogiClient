import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { observer } from 'mobx-react-lite';
// eslint-disable-next-line
import { addProduct, getLength, changePrices } from '../../../http/parser/kvtAPI'
import Loading from '../../../components/Loading';
import InfoPage from '../../info/InfoPage';

import './KvtParserPage.css'


const KvtParserPage = observer((props) => {
    
    const [feed, setFeed] = useState(null)
    const [checkFeed, setCheckFeed] = useState(false)
    const [checkPrice, setCheckPrice] = useState(false)
    const [price, setPrice] = useState(null)
    const [checkUpdatePrice, setCheckUpdatePrice] = useState(false)

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
        
    // const [ article, setArticle ] = useState("9678968-01")
    
    const [ number, setNumber ] = useState(1)

    
    const onClickButtonAddNewProduct = async () => {
        setMessage("")
        const formData = new FormData()
        if (feed) {
            formData.append("feed", feed)
        }
        if (price) {
            formData.append("price", price)
        }
        setLoading(true)
        let mess
        if (number > 0) {
            await addProduct(formData, number).then(data => {
                // console.log("data",data)
                setMessage(data)
            })
        }else {
            let length = await getLength(formData)
            let quantity = 10
            mess = "Начало:"
            for(let i = 1; i <= length; i = i + quantity) {

                await addProduct(formData, i, quantity)
                    // eslint-disable-next-line
                    .then(data => {
                        if (data?.error) {
                            mess += "<br />" + i + ": " + data.error
                            setMessage(i + ": " + data.error)
                            console.log(i + ": " + data.error)
                        }else {
                            mess += "<br />" + data.map(i => i + "<br />").join("")
                            setMessage(data.map(i => i + "<br />").join(""))
                            console.log(data.map(i => i + "<br />").join(""))
                        }
                    })
                    // eslint-disable-next-line
                    .catch(error => {
                        mess += "<br />" + i + ": (Ошибка) " + JSON.stringify(error)
                        setMessage(i + ": (Ошибка) " + JSON.stringify(error))
                        console.log(i + ": (Ошибка) " + error)
                    })

            }
            
        }
        if (mess) setMessage(mess + "<br />Конец.")
        setLoading(false)
    }

    // оновление цен
    let onClickButtonChangePrices = async () => {
        setMessage("")
        const formData = new FormData()
        if (price) {
            formData.append("price", price)
        }
        setLoading(true)
        await changePrices(formData)
            // eslint-disable-next-line
            .then(data => {
                if (data?.error) {
                    setMessage(data.error)
                    console.log(data.error)
                }else {
                    setMessage(JSON.stringify(data))
                    console.log(data)
                }
            })
            // eslint-disable-next-line
            .catch(error => {
                setMessage("(Ошибка) " + JSON.stringify(error))
                console.log("(Ошибка) " + error)
            })
        setLoading(false)

    }


    return (
        <InfoPage>
            <div className="KVTParserPage"> 
                 
                {message && message !== ""
                ?
                <>
                    <div className="KVTParserPage_inputBox">
                        {ReactHtmlParser(message)}
                    </div>
                    <br />
                </>
                : null}
                
                {loading ? <Loading /> 
                : 
                <>
                    <label>Заведение товаров КВТ на сайт!</label>
                    <br />
                    <div className="KVTParserPage_box">
                        <span>Файл с товарами</span>
                        <input 
                            type="file"
                            className="KVTParserPage_box_file" 
                            onChange={(e) => setFeed(e.target.files[0])} 
                            placeholder="Выберите файл" 
                            disabled={checkFeed}
                        />
                        <div 
                            className="KVTParserPage_box_div"
                            onClick={() => setCheckFeed(!checkFeed)}    
                        >
                            <input 
                                type="checkbox"
                                className="KVTParserPage_box_checkbox" 
                                // onChange={() => setCheckFeed(!checkFeed)} 
                                checked={checkFeed}
                            />&nbsp;
                            использовать файл на сервере (feed.xlsx)
                        </div>
                        <hr />
                        <span>Файл с ценами</span>
                        <input 
                            type="file" 
                            className="KVTParserPage_box_file" 
                            onChange={(e) => setPrice(e.target.files[0])} 
                            placeholder="Выберите файл" 
                            disabled={checkPrice}
                        />
                        <div 
                            className="KVTParserPage_box_div"
                            onClick={() => setCheckPrice(!checkPrice)}    
                        >
                            <input 
                                type="checkbox"
                                className="KVTParserPage_box_checkbox" 
                                checked={checkPrice}
                            />&nbsp;
                            использовать файл на сервере (price.xlsx)
                        </div>
                        <hr />
                        {/* <input className="pl-3 pr-3" type="text" value={article} onChange={(e) => setArticle(e.target.value)} /> */}
                        <span>Номер позиции (0 - для добавления всех товаров)</span>
                        <input 
                            className="KVTParserPage_box_input"
                            type="text" 
                            value={number} 
                            onChange={(e) => setNumber(e.target.value)} 
                        />                        
                        {/* <hr /> */}
                        <button 
                            disabled={ (! feed && ! checkFeed) || (! price && ! checkPrice)}
                            className="m-3 p-2" 
                            onClick={onClickButtonAddNewProduct}
                        >
                            Добавить товары
                        </button>
                    </div>

                    <br />

                    <label>Обновление цен!</label>
                    <br />
                    <div className="KVTParserPage_box">
                        <span>Файл с ценами</span>
                        <input 
                            type="file" 
                            className="KVTParserPage_box_file" 
                            onChange={(e) => setPrice(e.target.files[0])} 
                            placeholder="Выберите файл" 
                            disabled={ checkUpdatePrice }
                        />
                        <div 
                            className="KVTParserPage_box_div"
                            onClick={() => setCheckUpdatePrice(!checkUpdatePrice)}    
                        >
                            <input 
                                type="checkbox"
                                className="KVTParserPage_box_checkbox" 
                                checked={checkUpdatePrice}
                            />&nbsp;
                            использовать файл на сервере (price.xlsx)
                        </div>
                        <hr />
                        <button 
                            disabled={ ! price && ! checkUpdatePrice }
                            onClick={onClickButtonChangePrices}
                        >
                            Обновить цены
                        </button>
                        {/* <span>Для обавления цен не важно какая цифра указана</span> */}
                    </div>

                    <br />

                </>}

                <button 
                    className="KVTParserPage_button" 
                    onClick={() => props?.setBrand("")}
                >
                    назад
                </button>

            </div>
        </InfoPage>
    )


})

export default KvtParserPage;
