import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { observer } from 'mobx-react-lite';
// eslint-disable-next-line
import { addProduct, getLength, addAllProducts, getImage, getCharcteristics, getDescription } from '../../../http/parser/husqvarnaAPI'
import Loading from '../../../components/Loading';
import InfoPage from '../../info/InfoPage';

import './HusqvarnaParserPage.css'


const HusqvarnaParserPage = observer((props) => {

    const [feed, setFeed] = useState(null)

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
        setLoading(true)
        let mess
        if (number > 0) {
            await addProduct(formData, number).then(data => {
                // console.log("data",data)
                setMessage(data)
            })
        }else {
            let length = await getLength(formData)
            mess = "Начало:"
            for(let i = 0; i < length; i++) {
                await addProduct(formData, i+1)
                    // eslint-disable-next-line
                    .then(data => {
                        if (data?.error) {
                            mess += "<br />" + data.error
                            setMessage(data.error)
                            console.log("data",data.error)
                        }else {
                            mess += "<br />" + i + ": " + JSON.stringify(data)
                            setMessage(i + ": " + JSON.stringify(data))
                            console.log("data",data)
                        }
                    })
                    // eslint-disable-next-line
                    .catch(error => {
                        mess += "<br />" + JSON.stringify(error)
                        setMessage(JSON.stringify(error))
                        console.log("error",error)
                    })
            }
            // await addAllProducts(formData).then(data => {
            //     // console.log("data",data)
            //     setMessage(data)
            // })
        }
        if (mess) setMessage(mess + "<br />Конец.")
        setLoading(false)
    }

    const onClickButtonChangePrices =async () => {
        setMessage("")
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }


    return (
        <InfoPage>
            <div className="HusqvarnaParserPage_Header">
                <label>Заведение товаров Husqvarna на сайт!</label>

                {/* {quantity && quantity !== 0
                ? "Общее количество товаров: " + quantity
                : null}

                <br /> */}

 
                {message && message !== ""
                ?
                <>
                    <div className="inputBox">
                        {/* {number && number !== 0 && number < quantity
                        ? number + ": "
                        : null} */}
                        {ReactHtmlParser(message)}
                    </div>
                    <br />
                </>
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
                    {/* <input className="pl-3 pr-3" type="text" value={article} onChange={(e) => setArticle(e.target.value)} /> */}
                    <input 
                        className="pl-3 pr-3" 
                        type="text" 
                        value={number} 
                        onChange={(e) => setNumber(e.target.value)} 
                    />
                    <hr />

                    <button 
                        // disabled={ ! feed }
                        className="m-3 p-2" 
                        onClick={onClickButtonAddNewProduct}
                    >
                        Добавить товары
                    </button>
                    
                    <label>или</label>
                    
                    <button 
                        disabled={ ! feed }
                        onClick={onClickButtonChangePrices}
                    >
                        Обновить цены
                    </button>

                    <br />
                </>
                }
                <button onClick={() => props?.setBrand("")} >назад</button>
            </div>
        </InfoPage>
    )


})

export default HusqvarnaParserPage;