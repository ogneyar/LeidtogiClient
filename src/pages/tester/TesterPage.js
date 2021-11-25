import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'

import { Alert, Input } from '../../components/myBootstrap'
import { fetchHusqvarnaGetImage, fetchHusqvarnaGetCharcteristic } from '../../http/paserAPI'
import { fetchAllProducts, updateProduct } from '../../http/productAPI'
import translit from '../../utils/translite'
import InfoPage from '../info/InfoPage'


const TesterPage = () => {

    const [ showAlert, setShowAlert ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ article, setArticle ] = useState("9678968-01")

    const onClickButtonGetImage = () => {
        if (article !== "") {
            fetchHusqvarnaGetImage(article).then(data => {
                setMessage(`<img src="${data}" alt="" />`)
                setShowAlert(true)
                setArticle("")
            })
        }
    }

    const onClickButtonGetCharcteristic = () => {
        if (article !== "") {
            fetchHusqvarnaGetCharcteristic(article).then(data => {
            setMessage(data)
                setShowAlert(true)
                setArticle("")
            })
        }
    }

    // eslint-disable-next-line
    const onClickButtonSetUrl = async () => {
        let response = await fetchAllProducts()
        // .then(data => {
        //     setMessage(message + data.map(i => i.id + "\n\r"))
        //     setShowAlert(true)
        // })

        // console.log("response",response);

        setShowAlert(true)

        await response.forEach(async i => {
            if (!i?.url || !i.url.includes(i?.article)) {
                setTimeout(async() => {
                    let url = translit(i?.name) + "_" + i?.article
                    await updateProduct(i?.id,{url})
                        .then(() => setMessage(message + "id: " + i.id + " url: " + url + "<br /><br />"))
                },50)
            }
        })

        // if (message) setMessage(message + "Закончил!<br /><br />")
    }

    useEffect(() => {
    }, [message])

    return (
        <InfoPage>
            <div>
                <Input type="text" value={article} onChange={(e) => setArticle(e.target.value)} />
                <hr />
                <Button onClick={onClickButtonGetImage}>
                    Получить фото товара
                </Button>
                <hr />
                <Button onClick={onClickButtonGetCharcteristic}>
                    Получить характеристики товара
                </Button>
                
                <hr />

                {/* <Button onClick={onClickButtonSetUrl}>
                    Задать url товарам
                </Button> */}

            </div>
            <Alert show={showAlert} onHide={() => setShowAlert(false)}>
                {/* {React.createElement(
                    "img", 
                    {src: `${message}`},
                    null
                )} */}
                {ReactHtmlParser(message)}
            </Alert>
        </InfoPage>
    )
}

export default TesterPage
