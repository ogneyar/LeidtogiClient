import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { observer } from 'mobx-react-lite';

import { getImage, getCharcteristics, getDescription } from '../../../http/parser/husqvarnaAPI'
import Loading from '../../../components/Loading';
import InfoPage from '../../info/InfoPage';

import './HusqvarnaParserPage.css'


const HusqvarnaParserPage = observer((props) => {

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    
    // const [quantity, setQuantity] = useState(0)
    // const [number, setNumber] = useState(0)
    
    const [ article, setArticle ] = useState("9678968-01")
    

    
    const onClickButtonGetImage = async () => {
        setMessage("")
        setLoading(true)
        if (article !== "") {
            await getImage(article).then(data => {
                // console.log("data",data)
                setMessage(`<img src="${data}" alt="" />`)
                // setArticle("")
            })
        }
        setLoading(false)
    }

    const onClickButtonGetCharacteristics =async () => {
        setMessage("")
        setLoading(true)
        if (article !== "") {
            await getCharcteristics(article).then(data => {
                console.log("data",data)
                setMessage(data)
                // setArticle("")
            })
        }
        setLoading(false)
    }

    const onClickButtonGetDescription =async () => {
        setMessage("")
        setLoading(true)
        if (article !== "") {
            await getDescription(article).then(data => {
                // console.log("data",data)
                setMessage(data)
                // setArticle("")
            })
        }
        setLoading(false)
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

                {loading ? <Loading /> 
                : 
                <>
                    <input className="pl-3 pr-3" type="text" value={article} onChange={(e) => setArticle(e.target.value)} />
                    <hr />
                    <button onClick={onClickButtonGetImage} >Гет имэйдж</button>
                    <button onClick={onClickButtonGetCharacteristics}>Гет чарактеристик</button>
                    <button onClick={onClickButtonGetDescription}>Гет дескрипшин</button>
                    <br />
                </>
                }
                <button onClick={() => props?.setBrand("")} >назад</button>
            </div>
        </InfoPage>
    )


})

export default HusqvarnaParserPage;
