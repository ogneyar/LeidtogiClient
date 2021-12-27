import React, { useState, useEffect, useContext } from 'react'
// import ReactDomServer from 'react-dom/server'
import { Button } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'

import { Alert, Input } from '../../components/myBootstrap'
import { fetchHusqvarnaGetImage, fetchHusqvarnaGetCharcteristic } from '../../http/paserAPI'
// eslint-disable-next-line
import { fetchAllProducts, updateProduct, fetchProductSizes } from '../../http/productAPI'
import { getAllProductSizes } from '../../http/productSizeAPI'
import { getAllProductInfos } from '../../http/productInfoAPI'
import translit from '../../utils/translite'
import { API_URL } from '../../utils/consts'
import InfoPage from '../info/InfoPage'
import { Context } from '../..'
import { locationCitiesSdek, setFeed } from '../../http/testerAPI'
import Loading from '../../components/Loading'


const TesterPage = () => {
    // eslint-disable-next-line
    const { product, brand } = useContext(Context)

    const [ showAlert, setShowAlert ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ article, setArticle ] = useState("9678968-01")

    const [ xml, setXML ] = useState("")

    const [ locationCities, setLocationCities ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ page, setPage ] = useState(0)

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

    }


    useEffect(() => {
    }, [message])

    const getProductWithOutGabarites = async () => {
        let sizes = await getAllProductSizes()
        setShowAlert(true)
        let messageInfo = product
            .allProducts
            .filter(i => {
                let no = true
                sizes.forEach(j => {
                    if (i.id === j.productId) no = false
                })
                return no
            })
            .map(j => j.id)
            .join(" ")
        if (!messageInfo) messageInfo = "Нет таких."
        setMessage(messageInfo)
    }

    const getProductWithOutDescription = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = product
            .allProducts
            .filter(i => {
                let no = true
                infos.forEach(j => {
                    if (i.id === j.productId && j.title === "description") no = false
                })
                return no
            })
            .map(j => j.id)
            .join(" ")
        if (!messageInfo) messageInfo = "Нет таких."
        setMessage(messageInfo)
    }

    const getProductWithOutCharacteristics = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = product
            .allProducts
            .filter(i => {
                let no = true
                infos.forEach(j => {
                    if (i.id === j.productId && j.title === "characteristics") no = false
                })
                return no
            })
            .map(j => j.id)
            .join(" ")
        if (!messageInfo) messageInfo = "Нет таких."
        setMessage(messageInfo)
    }

    const getProductWithOutEquipment = async () => {
        let infos = await getAllProductInfos()
        setShowAlert(true)
        let messageInfo = product
            .allProducts
            .filter(i => {
                let no = true
                infos.forEach(j => {
                    if (i.id === j.productId && j.title === "equipment") no = false
                })
                return no
            })
            .map(j => j.id)
            .join(" ")
        if (!messageInfo) messageInfo = "Нет таких."
        setMessage(messageInfo)
    }

    const getXML = async () => {
        if (product?.allProducts) {
            setXML("...")

            let response = await setFeed()

            if (response?.error) setXML("ошибка")
            else setXML("успех")

        }else setXML("")
    }

    const getLocationCities = async (page) => {
        // let page = 0
        setLoading(true)
        await locationCitiesSdek({page})
            .then(data => {
                if (data <= 1) {
                    setLocationCities("Закончил успешно - " + API_URL + "deliveries/sdek/locationCities.json")
                    setPage(0)
                }else {
                    // setTimeout(() => {
                    //     getLocationCities(++page)
                    // },[1000])
                    setLocationCities("Количество записей - " + data)
                    setPage(page + 1)
                }
            })
            .finally(() => setLoading(false))
    }

    if (loading) return <Loading />

    return (
        <InfoPage>
            <div>
                <br />
                Создание locationCities.json для СДЭК
                <hr />
                {locationCities &&
                <>
                    {locationCities}
                    <br />
                </> 
                }
                {page ?
                <>
                    Номер страницы: {page}
                    <br />
                </> 
                : null}
                <Button onClick={() => getLocationCities(page)}>
                    Создать locationCities
                </Button>
                <hr />

                <br />
                Создание фида yml для Яндекс.Метрики
                <hr />
                {xml &&
                <>
                    {xml}
                    <br />
                </> 
                }
                <Button onClick={getXML}>
                    Создать фид
                </Button>
                <hr />

                <br />
                Поиск отсутствующих параметров
                <hr />
                <Button onClick={getProductWithOutGabarites}>
                    Поcмотреть товары без габаритов
                </Button>
                <hr />
                <Button onClick={getProductWithOutDescription}>
                    Поcмотреть товары без описания
                </Button>
                <hr />
                <Button onClick={getProductWithOutCharacteristics}>
                    Поcмотреть товары без характеристик
                </Button>
                <hr />
                <Button onClick={getProductWithOutEquipment}>
                    Поcмотреть товары без комплектации
                </Button>
                <hr />
                <br />
                Husqvarana
                <hr />
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
